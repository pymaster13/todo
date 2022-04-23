from django.contrib.auth import get_user_model
from rest_framework.status import (HTTP_400_BAD_REQUEST,
                                   HTTP_200_OK)
from rest_framework.generics import (GenericAPIView, RetrieveAPIView)
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from knox.models import AuthToken

from .exceptions import UpdateUserError
from .serializers import (CreateUserSerializer, LoginUserSerializer,
                          UserSerializer, UpdateUserSerializer)
from .services import update_user


User = get_user_model()


class UserView(RetrieveAPIView):
    """API endpoint for showing information about user."""

    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user


class UpdateUserView(APIView):
    """API endpoint for editing information about user."""

    serializer_class = UpdateUserSerializer
    permission_classes = [IsAuthenticated]

    def put(self, request):
        serializer = self.serializer_class(data=request.data)

        try:
            serializer.is_valid(raise_exception=True)
        except Exception:
            return Response(serializer.errors,
                            status=HTTP_400_BAD_REQUEST)

        try:
            user = update_user(request.user, serializer.validated_data)
        except UpdateUserError as e:
            return Response({'error': str(e)}, status=HTTP_400_BAD_REQUEST)

        return Response({
            "id": user.id,
            "username": user.username,
            "email": user.email,
        },  status=HTTP_200_OK)


class CreateUserView(GenericAPIView):
    """API endpoint for creation of user."""

    serializer_class = CreateUserSerializer

    def post(self, request):

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response({
            "id": user.id,
            "username": user.username,
            "email": user.email,
            "token": AuthToken.objects.create(user)[1]
        })


class LoginUserView(GenericAPIView):
    """API endpoint for user authentication."""

    serializer_class = LoginUserSerializer

    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        return Response({
            "id": user.id,
            "username": user.username,
            "email": user.email,
            "token": AuthToken.objects.create(user)[1]
        })

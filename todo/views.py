from rest_framework import mixins
from rest_framework.generics import GenericAPIView, RetrieveAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.status import (HTTP_400_BAD_REQUEST,
                                   HTTP_200_OK)
from rest_framework.viewsets import ModelViewSet

from .models import Todo
from .exceptions import (CreateTodoError, GetTodoError,
                         DeleteForeignTodoError)
from .serializers import TodoSerializer
from .services import create_todo, delete_todo


class TodosView(ModelViewSet):
    """API endpoint for showing users todos."""

    serializer_class = TodoSerializer
    queryset = Todo.objects.all()
    permission_classes = [IsAuthenticated]

    def list(self, request):
        queryset = self.filter_queryset(self.get_queryset())

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)

        response = serializer.data
        for todo in response:
            todo['edit'] = bool(todo.get('owner') == request.user.username)

        return Response(response)


class GetTodoView(RetrieveAPIView):
    """API endpoint for getting 1 todo."""

    queryset = Todo.objects.all()
    serializer_class = TodoSerializer
    permission_classes = [IsAuthenticated]

    def retrieve(self, request, pk):
        todo = self.get_object()
        serializer = self.get_serializer(todo)
        response = serializer.data
        response['edit'] = bool(todo.owner == request.user)
        return Response(response)


class CreateTodoView(GenericAPIView):
    """API endpoint for creation of todo."""

    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            todo = create_todo(request.data['contents'], request.user)
            return Response({
                'id': todo.id,
                'contents': todo.contents,
                'owner': todo.owner.username,
                'date_on': todo.date_on
                }, status=HTTP_200_OK)
        except CreateTodoError as e:
            return Response({'error': str(e)}, status=HTTP_400_BAD_REQUEST)


class DeleteTodoView(GenericAPIView):
    """API endpoint for deleting of todo."""

    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            delete_todo(request.data['id'], request.user)
            return Response(status=HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=HTTP_400_BAD_REQUEST)

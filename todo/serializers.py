from rest_framework import serializers
from django.contrib.auth import get_user_model

from .models import Todo


User = get_user_model()


class TodoSerializer(serializers.ModelSerializer):
    """Serializer returning information about todo.
        Returns:
            id: int,
            contents: str,
            owner (username): str,
            date_on: str
    """
    owner = serializers.CharField(source='owner.username')

    class Meta:
        model = Todo
        fields = ('id', 'contents', 'owner', 'date_on')


class CreateTodoSerializer(serializers.Serializer):
    """Serializer for creating todo.
        Args:
            contents: str,
    """
    contents = serializers.CharField()

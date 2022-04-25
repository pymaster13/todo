from django.contrib.auth.models import User

from .models import Todo
from .exceptions import (CreateTodoError, GetTodoError, DeleteForeignTodoError)


def create_todo(content: str, user: User) -> Todo:
    """Help function for creating todo"""

    try:
        todo = Todo.objects.create(
                    contents=content,
                    owner=user)
        return todo
    except Exception:
        raise CreateTodoError('Ошибка во время создания заметки')


def delete_todo(id: int, user: User) -> Todo:
    """Help function for deleting todo"""

    try:
        todo = Todo.objects.get(id=id)
    except Exception:
        raise GetTodoError('Такой заметки в БД нет.')

    if todo.owner != user:
        raise DeleteForeignTodoError(
            'Пользователь не может удалить чужую заметку.')

    todo.delete()
    return id

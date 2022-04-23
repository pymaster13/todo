from django.contrib.auth import get_user_model

from .exceptions import UpdateUserError


User = get_user_model()


def update_user(request_user: str, data: dict):
    """Help function for updating user data."""

    current_user = User.objects.get(username=request_user)

    if current_user.id != data['id']:
        raise UpdateUserError('У вас нет прав для изменения данных.')

    current_user.username = data['username']
    current_user.email = data['email']

    if data.get('password'):
        current_user.set_password(data['password'])

    current_user.save()

    return current_user

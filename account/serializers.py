from django.contrib.auth import authenticate, get_user_model
from rest_framework import serializers
from rest_framework.validators import UniqueValidator


User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    """Serializer returning information about user.
        Returns:
            id: int,
            username: str,
            email: str
    """
    class Meta:
        model = User
        fields = ('id', 'username', 'email')


class UpdateUserSerializer(serializers.Serializer):
    """Serializer returning information about user.
        Returns:
            id: int,
            username: str,
            email: str
    """
    id = serializers.IntegerField()
    username = serializers.CharField()
    email = serializers.EmailField()
    password = serializers.CharField(required=False)

    def validate(self, attrs):
        user = User.objects.get(id=attrs['id'])
        errors = []

        if User.objects.filter(username=attrs['username']):
            if User.objects.get(username=attrs['username']).id != user.id:
                errors.append('Пользователь с таким именем уже существует.')

        if User.objects.filter(username=attrs['email']):
            if User.objects.get(username=attrs['email']).id != user.id:
                errors.append(
                    'Пользователь с таким почтовым ящиком уже существует.')

        if not errors:
            return attrs

        if len(errors) < 2:
            raise serializers.ValidationError(errors[0])
        else:
            raise serializers.ValidationError(
                'Пользователь с такими данными уже существует'
                )

class CreateUserSerializer(serializers.ModelSerializer):
    """Serializer for creating of user.
        Params:
            email: str,
            username: str,
            password: str.
        Returns:
            User object
    """
    class Meta:
        model = User
        fields = ('username', 'email', 'password')
        extra_kwargs = {
            'username': {
                'validators': [UniqueValidator(
                                User.objects.all(),
                                message='Такой логин уже занят.')],
                'error_messages': {
                    'required': "Имя пользователя не может быть пустым."}},

            'email': {
                'validators': [UniqueValidator(
                                User.objects.all(),
                                message='Такой почтовый ящик уже занят.')]},
                'error_messages': {
                    'required': "Электронная почта не может быть пустой."}
            }

    def create(self, validated_data: list[str]) -> User:
        user = User.objects.create(username=validated_data['username'])
        user.set_password(validated_data['password'])
        user.email = validated_data['email']
        user.is_active = True
        user.save()
        return user


class LoginUserSerializer(serializers.Serializer):
    """Serializer for user authentication.
        Params:
            username: str,
            password: str.
        Returns:
            User object
    """
    username = serializers.CharField(required=True, error_messages={'blank': 'Логин не может быть пустым.'})
    password = serializers.CharField(required=True, error_messages={'blank': 'Пароль не может быть пустым.'})

    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            return user
        raise serializers.ValidationError("Проверьте корректность введенных данных.")

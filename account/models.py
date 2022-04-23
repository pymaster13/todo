from django.db import models
from django.contrib.auth.models import AbstractUser


class Account(AbstractUser):
    email = models.EmailField(unique=True)
    first_name = None
    last_name = None

    def __str__(self):
        return self.username

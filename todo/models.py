from django.db import models
from django.contrib.auth import get_user_model


User = get_user_model()


class Todo(models.Model):
    contents = models.TextField(max_length=512,
                                null=False,
                                verbose_name='Todo content')
    owner = models.ForeignKey(User, on_delete=models.CASCADE,
                              null=False, related_name="todo",
                              verbose_name='Todo owner')
    date_on = models.DateTimeField(auto_now_add=True)

    # def __str__(self):
    #     return f'Todo: {self.contents} ({self.owner}, {self.date_on})'

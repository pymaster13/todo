from django.urls import path

from .views import TodosView, CreateTodoView, DeleteTodoView, GetTodoView


urlpatterns = [
    path('', TodosView.as_view({'get': 'list'}), name='todos'),
    path('create/', CreateTodoView.as_view(), name='create_todo'),
    path('<int:pk>/', GetTodoView.as_view(), name='create_todo'),
    path('delete/', DeleteTodoView.as_view(), name='delete_todo'),
]

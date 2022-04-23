from django.urls import path
from knox.views import LogoutView

from .views import CreateUserView, LoginUserView, UserView, UpdateUserView


urlpatterns = [
    path('register/', CreateUserView.as_view(),name='register'),
    path('login/', LoginUserView.as_view(),name='login'),
    path('info/', UserView.as_view(), name='info'),
    path('update/', UpdateUserView.as_view(), name='update'),
    path('logout/', LogoutView.as_view(), name='logout'),
]

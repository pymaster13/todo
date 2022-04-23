from django.contrib import admin

from .models import Todo


@admin.register(Todo)
class TodoAdmin(admin.ModelAdmin):
    list_display = ('id', 'contents', 'owner', 'date_on')
    search_fields = ('contents', 'owner', 'date_on')
    ordering = ('contents', 'owner', 'date_on')

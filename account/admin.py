from django.contrib import admin
from django.contrib.auth import get_user_model
from django.contrib.auth.admin import UserAdmin as DjangoUserAdmin


User = get_user_model()


@admin.register(User)
class UserAdmin(DjangoUserAdmin):
    fieldsets = (
        ('Personal info', {'fields': ('username', 'email', 'is_active', 'is_superuser')}),
        ('Password info', {'fields': ('password',)}),
        ('Groups, permissions', {
            'fields': ('groups', 'user_permissions'),
        })
        )

    add_fieldsets = (
        ('Create', {
            'classes': ('wide',),
            'fields': ('username', 'email', 'password'),
        }),
        )

    list_display = ('username', 'email', 'is_active', 'is_superuser')
    search_fields = ('username', 'email')
    ordering = ('username', 'email')
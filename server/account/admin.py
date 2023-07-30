from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser


class CustomUserAdmin(UserAdmin):
    model = CustomUser
    ordering = ("email",)
    list_display = ("id", "username", "email", "is_verified", "otp")


admin.site.register(CustomUser, CustomUserAdmin)

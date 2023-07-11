from django.contrib.auth.base_user import BaseUserManager


class CustomUserManager(BaseUserManager):
    # create user
    def create_user(self, fullname, username, email, password, **extra_fields):
        if not fullname:
            raise ValueError("Fullname is required")
        if not username:
            raise ValueError("Username is required")
        if not email:
            raise ValueError("Email is required")
        if not password:
            raise ValueError("Password is required")
        email = self.normalize_email(email)
        user = self.model(
            fullname=fullname, username=username, email=email, **extra_fields
        )
        user.set_password(password)
        user.save(using=self.db)
        return user

    # create superuser
    def create_superuser(self, fullname, username, email, password, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        extra_fields.setdefault("is_active", True)

        return self.create_user(
            fullname=fullname,
            username=username,
            email=email,
            password=password,
            **extra_fields
        )

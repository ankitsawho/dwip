from django.urls import path
from .views import *
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path("get-detail/<int:pk>/", GetUserDetail.as_view()),
    path("token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("register/", RegisterAPI.as_view()),
    path("verify/", VerifyOTP.as_view()),
    path("send-otp/", SendOTPForPasswordChange.as_view()),
    path("change-password/", ChangePasswordAPI.as_view()),
]

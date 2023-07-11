from rest_framework.views import APIView
from django.contrib.auth import get_user_model
from .serializers import *
from rest_framework.response import Response
from .email import send_otp_via_email
from rest_framework import status
from rest_framework_simplejwt.authentication import JWTAuthentication

User = get_user_model()


class RegisterAPI(APIView):
    permission_classes = []

    def post(self, request):
        data = request.data
        serialized_data = UserRegisterSerializer(data=data)
        if not serialized_data.is_valid():
            return Response(
                {"message": "Login Failed", "data": {}},
                status=status.HTTP_400_BAD_REQUEST,
            )
        fullname = serialized_data.data["fullname"]
        username = serialized_data.data["username"]
        email = serialized_data.data["email"]
        password = serialized_data.data["password"]
        already_user = User.objects.filter(email=email)
        if already_user.exists():
            return Response(
                {
                    "message": "User Already Exists",
                    "data": {},
                },
                status=status.HTTP_409_CONFLICT,
            )
        already_user = User.objects.filter(username=username)
        if already_user.exists():
            return Response(
                {
                    "message": "Username Taken",
                    "data": {},
                },
                status=status.HTTP_409_CONFLICT,
            )

        user = User.objects.create(fullname=fullname, username=username, email=email)
        user.set_password(password)
        user.save()
        send_otp_via_email(email)
        return Response(
            {
                "message": "Login Successful, Please verify your email",
                "data": {"fullname": fullname, "username": username, "email": email},
            },
            status=status.HTTP_201_CREATED,
        )


class VerifyOTP(APIView):
    permission_classes = []

    def post(self, request):
        try:
            data = request.data
            serializer = VerifyAccountSerializer(data=data)
            if serializer.is_valid():
                email = serializer.data["email"]
                otp = serializer.data["otp"]
                user = User.objects.get(email=email)
                if not user.otp == otp:
                    return Response(
                        {"message": "Invalid OTP", "data": {}},
                        status=status.HTTP_409_CONFLICT,
                    )
                user.is_verified = True
                user.save()
                print(user.is_verified)

                return Response(
                    {
                        "message": "Verification successful",
                        "data": {"email": serializer.data["email"]},
                    },
                    status=status.HTTP_200_OK,
                )
            else:
                return Response(
                    {
                        "message": "Error",
                        "data": {},
                    },
                    status=status.HTTP_400_BAD_REQUEST,
                )
        except Exception:
            return Response(
                {"message": "something went wrong", "data": {}},
                status=status.HTTP_400_BAD_REQUEST,
            )


class SendOTPForPasswordChange(APIView):
    permission_classes = []

    def post(self, request):
        try:
            data = request.data
            serializer = SendOtpForPasswordChangeSerializer(data=data)
            if serializer.is_valid():
                email = serializer.data["email"]
                user = User.objects.filter(email=email)
                if not user.exists():
                    return Response(
                        {"message": "Error", "data": {}},
                        status=status.HTTP_400_BAD_REQUEST,
                    )
                send_otp_via_email(email, changePassword=True)
                return Response(
                    {
                        "message": "OTP sent successfully",
                        "data": {"email": email},
                    },
                    status=status.HTTP_200_OK,
                )
            else:
                return Response(
                    {
                        "message": "something went wrong",
                        "data": {},
                    },
                    status=status.HTTP_400_BAD_REQUEST,
                )
        except Exception as e:
            return Response(
                {"message": "something went wrong", "data": e},
                status=status.HTTP_400_BAD_REQUEST,
            )


class ChangePasswordAPI(APIView):
    permission_classes = []

    def post(self, request):
        try:
            data = request.data
            serializer = ChangePasswordSerializer(data=data)
            if serializer.is_valid():
                email = serializer.data["email"]
                otp = serializer.data["otp"]
                password = serializer.data["password"]
                user = User.objects.filter(email=email)
                if not user.exists():
                    return Response(
                        {"message": "Invalid Email", "data": {}},
                        status=status.HTTP_400_BAD_REQUEST,
                    )
                user = user.first()
                if not user.otp == otp:
                    return Response({"status": 400, "message": "Wrong OTP", "data": {}})
                user.set_password(password)
                user.save()
                return Response(
                    {
                        "message": "Password Change Successful",
                        "data": {"email": serializer.data["email"]},
                    },
                    status=status.HTTP_200_OK,
                )
            else:
                return Response(
                    {
                        "message": "something went wrong",
                        "data": {},
                    },
                    status=status.HTTP_400_BAD_REQUEST,
                )
        except Exception as e:
            return Response(
                {"message": "something went wrong", "data": {}},
                status=status.HTTP_400_BAD_REQUEST,
            )

from rest_framework import serializers


class UserSerializer(serializers.Serializer):
    fullname = serializers.CharField()
    username = serializers.CharField()
    email = serializers.EmailField()


class UserRegisterSerializer(serializers.Serializer):
    fullname = serializers.CharField()
    username = serializers.CharField()
    email = serializers.EmailField()
    password = serializers.CharField()


class VerifyAccountSerializer(serializers.Serializer):
    email = serializers.EmailField()
    otp = serializers.CharField()


class SendOtpForPasswordChangeSerializer(serializers.Serializer):
    email = serializers.EmailField()


class ChangePasswordSerializer(serializers.Serializer):
    email = serializers.EmailField()
    otp = serializers.CharField()
    password = serializers.CharField()

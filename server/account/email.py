from django.core.mail import send_mail
import random
from django.conf import settings
from django.contrib.auth import get_user_model

User = get_user_model()


def send_otp_via_email(email, changePassword=False):
    otp = random.randint(100000, 999999)
    subject = "Welcome to Dwip! Verify Your Account Now"
    message = f"Congratulations on joining Dwip!\n\nWe are thrilled to have you as part of our vibrant community. To ensure the security of your account and provide you with a seamless experience, we need to verify your email address. Simply enter the unique one-time password (OTP) provided below into the app to complete the verification process \n\nOTP: {otp}"
    if changePassword:
        subject = f"Password Change OTP - Dwip"
        message = f"We have received a request to change your password for your Dwip account. To proceed with the password change, please enter the unique one-time password (OTP) provided below: \n\nOTP: {otp}"
    email_from = settings.EMAIL_HOST_USER
    send_mail(subject, message, email_from, [email])
    user_object = User.objects.get(email=email)
    user_object.otp = otp
    user_object.save()

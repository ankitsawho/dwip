# Generated by Django 4.2.3 on 2023-07-25 11:44

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('account', '0002_customuser_is_verified_customuser_otp'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='customuser',
            name='fullname',
        ),
    ]
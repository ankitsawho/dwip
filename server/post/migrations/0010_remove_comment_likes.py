# Generated by Django 4.2.3 on 2023-07-25 18:45

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('post', '0009_remove_post_likes_like'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='comment',
            name='likes',
        ),
    ]

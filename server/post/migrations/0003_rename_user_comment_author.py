# Generated by Django 4.2.3 on 2023-07-06 15:02

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('post', '0002_remove_post_title'),
    ]

    operations = [
        migrations.RenameField(
            model_name='comment',
            old_name='user',
            new_name='author',
        ),
    ]

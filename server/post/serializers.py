from rest_framework import serializers
from .models import Post, Comment, Bookmark, Notification


class PostSerializer(serializers.ModelSerializer):
    author_name = serializers.CharField(source="author.fullname", read_only=True)
    author_username = serializers.CharField(source="author.username", read_only=True)

    class Meta:
        model = Post
        fields = [
            "id",
            "author",
            "author_name",
            "author_username",
            "content",
            "created_at",
            "likes",
        ]
        read_only_fields = ["created_at"]


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = [
            "id",
            "author",
            "post",
            "content",
            "created_at",
            "likes",
        ]
        read_only_fields = ["created_at"]


class BookmarkSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bookmark
        fields = "__all__"


class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = "__all__"

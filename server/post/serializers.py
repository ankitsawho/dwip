from rest_framework import serializers
from .models import Post, Comment, Bookmark, Notification, Like


class PostSerializer(serializers.ModelSerializer):
    author_username = serializers.CharField(source="author.username", read_only=True)
    comments_count = serializers.SerializerMethodField()
    likes_count = serializers.SerializerMethodField()

    class Meta:
        model = Post
        fields = [
            "id",
            "author",
            "author_username",
            "content",
            "created_at",
            "comments_count",
            "likes_count"
        ]
        read_only_fields = ["created_at"]
        
    def get_comments_count(self, post):
        return Comment.objects.filter(post=post).count()

    def get_likes_count(self, post):
        return Like.objects.filter(post=post).count()


class CommentSerializer(serializers.ModelSerializer):
    author_username = serializers.CharField(source="author.username", read_only=True)

    class Meta:
        model = Comment
        fields = [
            "id",
            "author",
            "author_username",
            "post",
            "content",
            "created_at",
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

class LikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Like
        fields = "__all__"
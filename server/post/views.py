from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Post, Comment, Bookmark, Notification, Like
from .serializers import PostSerializer, CommentSerializer, NotificationSerializer, LikeSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from django.contrib.auth import get_user_model
from account.serializers import UserSerializer
from django.db.models import Count

# Post


class PostListCreateAPIView(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]

    def get(self, request):
        posts = Post.objects.order_by("-created_at")
        serializer = PostSerializer(posts, many=True)
        return Response(
            {"message": "List of Posts", "data": serializer.data},
            status=status.HTTP_200_OK,
        )

    def post(self, request):
        author = request.user.id
        data = request.data
        data["author"] = author
        serializer = PostSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(
                {"message": "Post Created", "data": serializer.data},
                status=status.HTTP_201_CREATED,
            )
        return Response(
            {"message": "Error Occurred", "data": {}},
            status=status.HTTP_400_BAD_REQUEST,
        )
    
class PostByUser(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]

    def get(self, request, pk):
        posts = Post.objects.filter(author=pk).order_by("-created_at")
        serializer = PostSerializer(posts, many=True)
        return Response(
            {"message": "List of Posts", "data": serializer.data},
            status=status.HTTP_200_OK,
        )


class PostRetrieveUpdateDestroyAPIView(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]

    def get(self, request, pk):
        post = self.get_post(pk)
        if post is None:
            return Response(
                {"message": "Post not found", "data": {}},
                status=status.HTTP_404_NOT_FOUND,
            )
        serializer = PostSerializer(post)
        return Response(serializer.data)

    def delete(self, request, pk):
        post = self.get_post(pk)
        if post is None:
            return Response(
                {"message": "Post not found", "data": {}},
                status=status.HTTP_404_NOT_FOUND,
            )
        if post.author != request.user:
            return Response(
                {"message": "You are not authorized", "data": {}},
                status=status.HTTP_401_UNAUTHORIZED,
            )

        post.delete()
        return Response(
            {"message": "Post Deleted", "data": {}},
            status=status.HTTP_202_ACCEPTED,
        )

    def get_post(self, pk):
        try:
            return Post.objects.get(pk=pk)
        except Post.DoesNotExist:
            return None


# COMMENT


class CommentListAPIView(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]

    def get(self, request, pk):
        comments = Comment.objects.filter(post=pk)
        if not comments.exists():
            return Response(
                {"message": "Post not found", "data": {}},
                status=status.HTTP_404_NOT_FOUND,
            )
        serializer = CommentSerializer(comments, many=True)
        return Response(serializer.data)

    def post(self, request, pk):
        data = request.data
        author = request.user.id
        data["author"] = author
        data["post"] = pk
        serializer = CommentSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(
                {"message": "Created", "data": serializer.data},
                status=status.HTTP_201_CREATED,
            )
        return Response(
            {"message": "Error Occurred", "data": {}},
            status=status.HTTP_400_BAD_REQUEST,
        )


class CommentDeleteAPIView(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]

    def delete(self, request, pk):
        comment = Comment.objects.get(pk=pk)
        if comment is None:
            return Response(
                {"message": "Not Found", "data": {}},
                status=status.HTTP_404_NOT_FOUND,
            )
        if comment.author != request.user:
            return Response(
                {"message": "Not Authorized", "data": {}},
                status=status.HTTP_401_UNAUTHORIZED,
            )
        comment.delete()
        return Response(
            {"message": "Comment Deleted", "data": {}},
            status=status.HTTP_202_ACCEPTED,
        )


# Bookmark


class BookmarkView(APIView):
    def post(self, request):
        user = request.user
        post_id = request.data.get("post_id")
        try:
            post = Post.objects.get(id=post_id)
        except Post.DoesNotExist:
            return Response(
                {"message": "Not Found", "data": {}},
                status=status.HTTP_404_NOT_FOUND,
            )

        bookmark, created = Bookmark.objects.get_or_create(user=user, post=post)

        if created:
            return Response(
                {"message": "Post bookmarked successfully", "data": {}},
                status=status.HTTP_201_CREATED,
            )
        else:
            return Response(
                {"message": "Post already bookmarked", "data": {}},
                status=status.HTTP_200_OK,
            )

    def delete(self, request):
        user = request.user
        post_id = request.data.get("post_id")

        try:
            post = Post.objects.get(id=post_id)
        except Post.DoesNotExist:
            return Response(
                {"message": "Not Found", "data": {}},
                status=status.HTTP_404_NOT_FOUND,
            )

        try:
            bookmark = Bookmark.objects.get(user=user, post=post)
            bookmark.delete()
            return Response(
                {"message": "Post unbookmarked successfully", "data": {}},
                status=status.HTTP_200_OK,
            )
        except Bookmark.DoesNotExist:
            return Response(
                {"message": "Not Found", "data": {}},
                status=status.HTTP_404_NOT_FOUND,
            )


class BookmarkListView(APIView):
    def get(self, request):
        user = request.user
        bookmarks = Bookmark.objects.filter(user=user).order_by("-created_at")
        posts = [bookmark.post for bookmark in bookmarks]
        serializer = PostSerializer(posts, many=True)
        return Response(
            {"message": "List of Bookmarks", "data": serializer.data},
            status=status.HTTP_200_OK,
        )


# Notification


class NotificationView(APIView):
    def get(self, request):
        user = request.user
        notifications = Notification.objects.filter(user=user).order_by("-id")
        serializer = NotificationSerializer(notifications, many=True)
        return Response(
            {"message": "List of Notifications", "data": serializer.data},
            status=status.HTTP_200_OK,
        )

    def post(self, request):
        data = request.data
        notification = NotificationSerializer(data=data)
        if notification.is_valid():
            notification.save()
            return Response(
                {"message": "Created Successfully", "data": notification.data},
                status=status.HTTP_201_CREATED,
            )
        return Response(
            {"message": "Not Found", "data": notification.errors},
            status=status.HTTP_404_NOT_FOUND,
        )

    def delete(self, request):
        user = request.user
        notifd = request.data.get("id")

        try:
            notif = Notification.objects.get(id=notifd)
        except Notification.DoesNotExist:
            return Response(
                {"message": "Not Found", "data": {}},
                status=status.HTTP_404_NOT_FOUND,
            )
        notif.delete()

        return Response(
            {"message": "Notification removed", "data": {}},
            status=status.HTTP_202_ACCEPTED,
        )


# Search
User = get_user_model()


class SearchView(APIView):
    def post(self, request):
        query = request.data["query"]
        print(query)

        if str(query).strip() == "":
            return Response(
                {"message": "Invalid Search Query", "data": {}},
                status=status.HTTP_403_FORBIDDEN,
            )

        user_results = User.objects.filter(username__icontains=query)
        user_serializer = UserSerializer(user_results, many=True)
        post_results = Post.objects.filter(content__icontains=query)
        post_serializer = PostSerializer(post_results, many=True)

        response_data = {
            "users": user_serializer.data,
            "posts": post_serializer.data,
        }

        return Response(
            {"message": "Search Content", "data": response_data},
            status=status.HTTP_200_OK,
        )


class LikeAPIView(APIView):
    def post(self, request, post_id):
        post = Post.objects.get(pk=post_id)
        
        like, created = Like.objects.get_or_create(user=request.user, post=post)

        if created:
            return Response({"message": "Post liked successfully!"}, status=status.HTTP_201_CREATED)
        else:
            return Response({"message": "You have already liked this post."}, status=status.HTTP_400_BAD_REQUEST)
        
class IsLikedAPIView(APIView):
    def get(self, request, post_id):
        post = Post.objects.get(pk=post_id)
        user = request.user
        is_liked = Like.objects.filter(user=user, post=post).exists()
        return Response({"is_liked": is_liked}, status=status.HTTP_200_OK)
    
class DislikeAPIView(APIView):
    def delete(self, request, post_id):
        post = Post.objects.get(pk=post_id)
        user = request.user

        try:
            like = Like.objects.get(user=user, post=post)
            like.delete()
            return Response({"message": "Dwip disliked successfully!"}, status=status.HTTP_200_OK)
        except Like.DoesNotExist:
            return Response({"message": "You have not liked this post yet."}, status=status.HTTP_400_BAD_REQUEST)
        

class PopularPostsAPIView(APIView):
    def get(self, request, size):
        if(size == 0):
            popular_posts = Post.objects.annotate(likes_count=Count('like')).order_by('-likes_count')
        else:
            popular_posts = Post.objects.annotate(likes_count=Count('like')).order_by('-likes_count')[0:size]

        serializer = PostSerializer(popular_posts, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class RepostAPIView(APIView):
    def post(self, request, post_id):
        try:
            original_post = Post.objects.get(id=post_id)
        except Post.DoesNotExist:
            return Response({"error": "Original post not found."}, status=status.HTTP_404_NOT_FOUND)
        data = request.data
        new_post_data = {
            "author": request.user.id,
            "content": data['content'],
            "original_post": original_post.id,
        }
        
        serializer = PostSerializer(data=new_post_data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
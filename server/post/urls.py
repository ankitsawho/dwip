from django.urls import path
from .views import *

urlpatterns = [
    path("", PostListCreateAPIView.as_view(), name="post-list-create"),
    path("user/<int:pk>/", PostByUser.as_view(), name="user-posts"),
    path(
        "<int:pk>/",
        PostRetrieveUpdateDestroyAPIView.as_view(),
        name="post-retrieve-update-destroy",
    ),
    path("<int:pk>/comments/", CommentListAPIView.as_view()),
    path("comment/<int:pk>/", CommentDeleteAPIView.as_view()),
    path("bookmark/", BookmarkView.as_view()),
    path("bookmark-list/", BookmarkListView.as_view()),
    path("notification/", NotificationView.as_view()),
    path("search/", SearchView.as_view()),
    path("<int:post_id>/like/", LikeAPIView.as_view(), name="like-post"),
    path("<int:post_id>/is-liked/", IsLikedAPIView.as_view(), name="is-liked-post"),
    path("<int:post_id>/dislike/", DislikeAPIView.as_view(), name="dislike-post"),
    path("popular/<int:size>/", PopularPostsAPIView.as_view(), name="popular-posts"),
]

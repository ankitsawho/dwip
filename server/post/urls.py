from django.urls import path
from .views import *

urlpatterns = [
    path("", PostListCreateAPIView.as_view(), name="post-list-create"),
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
]

from django.urls import path,include
from .views import BrandListCreateView, AddProductListCreateView, PostListCreateView,InstagramPostView ,SchedulePostAPIView
from rest_framework.routers import DefaultRouter




urlpatterns = [
    path('api/brands/', BrandListCreateView.as_view(), name='brand-list-create'),
    path('api/products/', AddProductListCreateView.as_view(), name='product-list-create'),
    path('api/posts/', PostListCreateView.as_view(), name='post-list-create'),
    path('api/instagram/post/', InstagramPostView.as_view(), name='instagram-post'),
    path('api/scheduled-posts/', SchedulePostAPIView.as_view(), name='create-scheduled-post'),
]

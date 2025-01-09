from django.urls import path
from .views import BrandListCreateView, AddProductListCreateView, PostListCreateView

urlpatterns = [
    path('api/brands/', BrandListCreateView.as_view(), name='brand-list-create'),
    path('api/products/', AddProductListCreateView.as_view(), name='product-list-create'),
    path('api/posts/', PostListCreateView.as_view(), name='post-list-create'),
]

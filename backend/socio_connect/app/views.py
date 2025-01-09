from rest_framework import generics
from .models import Brand, AddProduct, Post
from .serializers import BrandSerializer, AddProductSerializer, PostSerializer

class BrandListCreateView(generics.ListCreateAPIView):
    queryset = Brand.objects.all()
    serializer_class = BrandSerializer

class AddProductListCreateView(generics.ListCreateAPIView):
    queryset = AddProduct.objects.all()
    serializer_class = AddProductSerializer

class PostListCreateView(generics.ListCreateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer

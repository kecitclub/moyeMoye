from rest_framework import serializers
from .models import Brand, AddProduct, Post

class BrandSerializer(serializers.ModelSerializer):
    class Meta:
        model = Brand
        fields = ['id', 'brand_name', 'brand_logo', 'brand_description', 'brand_tone']

class AddProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = AddProduct
        fields = ['id', 'product_name', 'product_images', 'description']

class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ['id', 'brand', 'product', 'date_created', 'date_to_be_posted']

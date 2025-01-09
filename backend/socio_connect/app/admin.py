from django.contrib import admin

from django.contrib import admin
from .models import Brand, AddProduct, Post

@admin.register(Brand)
class BrandAdmin(admin.ModelAdmin):
    list_display = ('brand_name', 'brand_tone')
    search_fields = ('brand_name',)

@admin.register(AddProduct)
class AddProductAdmin(admin.ModelAdmin):
    list_display = ('product_name', 'brand')
    search_fields = ('product_name', 'brand__brand_name')

@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = ('brand', 'product', 'date_created', 'date_to_be_posted')
    list_filter = ('brand', 'date_to_be_posted')
    search_fields = ('brand__brand_name', 'product__product_name')

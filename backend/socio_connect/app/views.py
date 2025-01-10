from rest_framework import generics
from .models import Brand, AddProduct, Post
from .serializers import BrandSerializer, AddProductSerializer, PostSerializer
import requests
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status



class BrandListCreateView(generics.ListCreateAPIView):
    queryset = Brand.objects.all()
    serializer_class = BrandSerializer

class AddProductListCreateView(generics.ListCreateAPIView):
    queryset = AddProduct.objects.all()
    serializer_class = AddProductSerializer

class PostListCreateView(generics.ListCreateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer


ACCESS_TOKEN = "EAAMqvStx3vIBO2QmgKMXXeqbbBiBhq0mF9sdPZCoeOcM7hMLnIAwb729EnceogO7RtJqfnmlLef5fvr9igsVdQm7wzOq6gjYBQik7MKvHfSZAEHteexszZCzZBZBqDBVqIlcbt2vjHG7C3fLGADZA7kDm61NWqoUObZCgc9AMcXdZCqHDTmgw1U2t733lc7NdB2e"
INSTAGRAM_ACCOUNT_ID = "17841471750023527"

import cloudinary
import cloudinary.uploader


cloudinary.config(
    cloud_name = "dxallozr5", 
    api_key = "459924959317992", 
    api_secret = "vGshrUjT04Y-XZh3vf_i3CJ6Va4", # Click 'View API Keys' above to copy your API secret
    secure=True
)


def upload_to_cloudinary(file):
    response = cloudinary.uploader.upload(file, folder="instagram_posts")
    print("Uploadeddddddd")
    return response.get("secure_url")  # Return the public URL of the uploaded image


from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import PostSerializer
import requests

ACCESS_TOKEN = "EAAMqvStx3vIBO2QmgKMXXeqbbBiBhq0mF9sdPZCoeOcM7hMLnIAwb729EnceogO7RtJqfnmlLef5fvr9igsVdQm7wzOq6gjYBQik7MKvHfSZAEHteexszZCzZBZBqDBVqIlcbt2vjHG7C3fLGADZA7kDm61NWqoUObZCgc9AMcXdZCqHDTmgw1U2t733lc7NdB2e"
INSTAGRAM_ACCOUNT_ID = "17841471750023527"

class InstagramPostView(APIView):
    def post(self, request, *args, **kwargs):
        serializer = PostSerializer(data=request.data)
        if serializer.is_valid():
            try:
                caption = serializer.validated_data['post_caption']
                post_image = serializer.validated_data['post_images']
                print(caption)

                # Step 1: Upload the image to Cloudinary
                public_image_url = upload_to_cloudinary(post_image)
                print("Url", public_image_url)
                # Step 2: Upload the image to Instagram
                upload_url = f"https://graph.facebook.com/v16.0/{INSTAGRAM_ACCOUNT_ID}/media"
                upload_payload = {
                    "image_url": public_image_url,
                    "caption": caption,
                    "access_token": ACCESS_TOKEN,
                }
                upload_response = requests.post(upload_url, data=upload_payload)
                upload_response.raise_for_status()
                upload_data = upload_response.json()
                container_id = upload_data.get("id")

                # Step 3: Publish the post
                publish_url = f"https://graph.facebook.com/v16.0/{INSTAGRAM_ACCOUNT_ID}/media_publish"
                publish_payload = {
                    "creation_id": container_id,
                    "access_token": ACCESS_TOKEN,
                }
                publish_response = requests.post(publish_url, data=publish_payload)
                publish_response.raise_for_status()
                publish_data = publish_response.json()

                # Save the post in the database
                serializer.save()
                return Response(
                    {"message": "Post published successfully!", "post_id": publish_data.get("id")},
                    status=status.HTTP_201_CREATED
                )
            except requests.exceptions.RequestException as e:
                return Response(
                    {"error": f"Meta API Error: {e}"},
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR
                )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

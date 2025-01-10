import os
import io
import sys
import requests
from rest_framework import generics
from .models import Brand, AddProduct, Post, SchedulePost
from .serializers import BrandSerializer, AddProductSerializer, PostSerializer,SchedulePostSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status,viewsets
from rest_framework.decorators import action
from django.core.files.base import ContentFile


base_path = "/home/ashish/MyPC/Hackathons/Dristi/moyeMoye"
model_path = os.path.join(base_path, "models")

# Add the model_path to sys.path
sys.path.append(model_path)

from image_gen_final import chat, generate_freepik_image, create_image_prompt

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

ACCESS_TOKEN = "EAAMqvStx3vIBO2QmgKMXXeqbbBiBhq0mF9sdPZCoeOcM7hMLnIAwb729EnceogO7RtJqfnmlLef5fvr9igsVdQm7wzOq6gjYBQik7MKvHfSZAEHteexszZCzZBZBqDBVqIlcbt2vjHG7C3fLGADZA7kDm61NWqoUObZCgc9AMcXdZCqHDTmgw1U2t733lc7NdB2e"
INSTAGRAM_ACCOUNT_ID = "17841471750023527"

# class for instant post
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

# clas for generating the post :
class SchedulePostViewSet(viewsets.ModelViewSet):
    queryset = SchedulePost.objects.all()
    serializer_class = SchedulePostSerializer

    @action(detail=False, methods=['post'])
    def create_scheduled_post(self, request):
        try:
            # Extract data from request
            product_id = request.data.get('product')
            brand_id = request.data.get('brand')
            # caption = request.data.get('caption', '')
            vibe = request.data.get('vibe', 'professional')
            post_type = request.data.get('post_type', 'image_only')
            scheduled_date = request.data.get('scheduled_date')

            # Validate input
            if not all([product_id, brand_id, scheduled_date]):
                return Response(
                    {"error": "Product, brand, and scheduled date are required"}, 
                    status=status.HTTP_400_BAD_REQUEST
                )

            # Get product and brand instances
            try:
                product = AddProduct.objects.get(id=product_id)
                brand = Brand.objects.get(id=brand_id)
            except (AddProduct.DoesNotExist, Brand.DoesNotExist):
                return Response(
                    {"error": "Invalid product or brand ID"}, 
                    status=status.HTTP_404_NOT_FOUND
                )

            # Generate image prompt using AI
            prompt = create_image_prompt(
                product=product.product_name,
                vibe=vibe
            )

            # Get refined prompt from chat model
            refined_prompt = chat(prompt)
            
            # Generate image using Freepik
            generated_image = generate_freepik_image(refined_prompt)
            print("THhe image is generated succ")
            if generated_image is None:
                return Response(
                    {"error": "Failed to generate image"}, 
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR
                )

            # Convert PIL Image to file
            image_io = io.BytesIO()
            generated_image.save(image_io, format='JPEG')
            image_io.seek(0)

            # Upload to Cloudinary
            try:
                cloudinary_url = upload_to_cloudinary(image_io)
                print(cloudinary_url)
            except Exception as e:
                return Response(
                    {"error": f"Failed to upload to Cloudinary: {str(e)}"}, 
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR
                )

            # Create SchedulePost instance
            scheduled_post = SchedulePost(
                brand=brand,
                product=product,
                post_caption="genu",
                post_type=post_type,
                scheduled_date=scheduled_date
            )
            
            # Save the Cloudinary URL to post_image field
            scheduled_post.post_image = cloudinary_url
            scheduled_post.save()

            # Return custom response
            response_data = {
                "caption": "GyanuChor",
                "image_url": cloudinary_url,
                # "post_details": self.get_serializer(scheduled_post).data
            }

            return Response(response_data, status=status.HTTP_201_CREATED)

        except Exception as e:
            return Response(
                {"error": str(e)}, 
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )



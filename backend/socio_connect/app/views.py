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


ACCESS_TOKEN = "EAAMqvStx3vIBO1tFMFNQgUSA39sP4w3B0RgkxthGg1xfRxKGijjTKu6dyRxd90onfQL1R7GqZBLuePNHMolu0HjgNZBiRvgM1J2jjYKmkQTRVUQXZAC0ZAFZCeyzV4mgOp9nKmxGyRhNuO1agMOt9LLtAoyWl411rZCPKTwTDmquS6uBMY8FVUzLxhEDQziCOh5DIB6ZCGRVid9hnGegjx7RxA9wOMZD"
INSTAGRAM_ACCOUNT_ID = "17841471750023527"

class InstagramPostView(APIView):
    def post(self, request, *args, **kwargs):
        # Parse the request data
        serializer = PostSerializer(data=request.data)
        if serializer.is_valid():
            try:
                # Extract data from the serializer
                brand = serializer.validated_data['brand']
                product = serializer.validated_data['product']
                caption = f"{brand.brand_name} - {product.product_name}: {serializer.validated_data.get('date_to_be_posted', 'Scheduled Post')}"

                # Use dummy image for now; update as per requirement
                image_url = "https://plus.unsplash.com/premium_photo-1711051475117-f3a4d3ff6778?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bGFwdG9wfGVufDB8fDB8fHww"

                # Step 1: Upload the image
                upload_url = f"https://graph.facebook.com/v16.0/{INSTAGRAM_ACCOUNT_ID}/media"
                upload_payload = {
                    "image_url": image_url,
                    "caption": caption,
                    "access_token": ACCESS_TOKEN,
                }
                upload_response = requests.post(upload_url, data=upload_payload)
                upload_response.raise_for_status()
                upload_data = upload_response.json()
                container_id = upload_data.get("id")

                # Step 2: Publish the post
                publish_url = f"https://graph.facebook.com/v16.0/{INSTAGRAM_ACCOUNT_ID}/media_publish"
                publish_payload = {
                    "creation_id": container_id,
                    "access_token": ACCESS_TOKEN,
                }
                publish_response = requests.post(publish_url, data=publish_payload)
                publish_response.raise_for_status()
                publish_data = publish_response.json()

                # Save post in the database
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
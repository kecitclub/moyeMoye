import requests

# Replace these with your actual values
ACCESS_TOKEN = "EAAMqvStx3vIBOzZBvECVvn7OTzDbTTEudHihScbGT85qjQDE9sdlDZAys9ZAqaEIcW7K9RwONiUDMZC3Nq1VLIkx0ZByjqE6xBl4MK9pYRdmXZAQAywMGQXCoYHPQCMKFykxhSpCSFIXQM9TPcAABTpdRQG2w0FxuMHIo25AhVP37fvKYmUEmHAuPjZBQRB83sU"
INSTAGRAM_ACCOUNT_ID = "17841471750023527"
IMAGE_URL = "https://imgs.search.brave.com/UVTzlx8yebZlFirCcop3Rd5lYdLpfnFYHW52px0GMDQ/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTE1/Mjg1MDExNi9waG90/by9sYXB0b3Atb24t/dGFibGUuanBnP3M9/NjEyeDYxMiZ3PTAm/az0yMCZjPW5wVjVs/ZHJzT0dsZ21XaHRf/U2FIMl9KVzRkU2J6/a0ZzMmJnT1ZZSksy/WFk9"  # URL of the image to post
CAPTION = "This is an example post created using the Meta Graph API!"

def publish_instagram_post(access_token, account_id, image_url, caption):
    try:
        # Step 1: Upload the image
        upload_url = f"https://graph.facebook.com/v16.0/{account_id}/media"
        upload_payload = {
            "image_url": image_url,
            "caption": caption,
            "access_token": access_token,
        }
        upload_response = requests.post(upload_url, data=upload_payload)
        upload_response.raise_for_status()
        upload_data = upload_response.json()
        container_id = upload_data.get("id")
        print(f"Media container created: {container_id}")

        # Step 2: Publish the post
        publish_url = f"https://graph.facebook.com/v16.0/{account_id}/media_publish"
        publish_payload = {
            "creation_id": container_id,
            "access_token": access_token,
        }
        publish_response = requests.post(publish_url, data=publish_payload)
        publish_response.raise_for_status()
        publish_data = publish_response.json()

        print(f"Post published successfully! Post ID: {publish_data.get('id')}")
    except requests.exceptions.RequestException as e:
        print(f"An error occurred: {e}")

# Call the function to publish the post
publish_instagram_post(ACCESS_TOKEN, INSTAGRAM_ACCOUNT_ID, IMAGE_URL, CAPTION)

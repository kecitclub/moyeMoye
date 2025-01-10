from django.db import models

class Brand(models.Model):
    brand_name = models.CharField(max_length=255, unique=True)
    brand_logo = models.ImageField(upload_to='brand_logos/')
    brand_description = models.TextField()
    
    BRAND_TONE_CHOICES = [
        ('formal', 'Formal'),
        ('professional', 'Professional'),
        ('friendly', 'Friendly'),
        ('casual', 'Casual'),
    ]
    brand_tone = models.CharField(
        max_length=50,
        choices=BRAND_TONE_CHOICES,
        default='formal'
    )

    def __str__(self):
        return self.brand_name

class AddProduct(models.Model):
    product_name = models.CharField(max_length=255)
    product_images = models.ImageField(upload_to='product_images/')
    description_about_product = models.TextField()
    brand = models.ForeignKey(Brand, on_delete=models.CASCADE, related_name='products')

    def __str__(self):
        return self.product_name

class Post(models.Model):
    brand = models.ForeignKey(Brand, on_delete=models.CASCADE, related_name='posts')
    product = models.ForeignKey(AddProduct, on_delete=models.CASCADE, related_name='posts')
    post_images = models.ImageField(upload_to='post_images/')
    post_caption = models.CharField(max_length=255)
    date_created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Post for {self.brand.brand_name} - {self.product.product_name}"

    class Meta:
        ordering = ['-date_created']

class SchedulePost(models.Model):
    POST_TYPE_CHOICES = [
        ('image_only', 'Image Only'),
        ('image_text', 'Image with Text'),
    ]
    
    brand = models.ForeignKey(Brand, on_delete=models.CASCADE, related_name='scheduled_posts')
    product = models.ForeignKey(AddProduct, on_delete=models.CASCADE, related_name='scheduled_posts')
    product_name = models.CharField(max_length=255, null=True)
    post_image = models.ImageField(upload_to='scheduled_post_images/',null=True)
    post_caption = models.CharField(max_length=255,null=True)
    post_type = models.CharField(
        max_length=20,
        choices=POST_TYPE_CHOICES,
        default='image_only'
    )
    scheduled_date = models.DateTimeField()
    date_created = models.DateTimeField(auto_now_add=True)
    vibe = models.CharField(
        max_length=50,
        default='professional'
    )
    text = models.CharField(max_length=255)

    def __str__(self):
        return f"Scheduled post for {self.product.product_name} on {self.scheduled_date.strftime('%Y-%m-%d')}"

    class Meta:
        ordering = ['scheduled_date']
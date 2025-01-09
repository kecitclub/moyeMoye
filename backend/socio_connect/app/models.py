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
    date_created = models.DateTimeField(auto_now_add=True)
    date_to_be_posted = models.DateTimeField()

    def __str__(self):
        return f"Post for {self.brand.brand_name} - {self.product.product_name} on {self.date_to_be_posted.strftime('%Y-%m-%d')}"

    class Meta:
        ordering = ['-date_to_be_posted']

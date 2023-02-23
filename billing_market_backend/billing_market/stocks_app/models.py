from django.db import models


class ProductCategory(models.Model):
    product_category_id = models.BigAutoField(primary_key=True)
    catogery_name = models.CharField(max_length=20, unique=True)

    def __str__(self):
        return f'{self.catogery_name}'


class GST(models.Model):
    gst_id = models.BigAutoField(primary_key=True)
    hsn_code = models.CharField(max_length=8, unique=True)
    cgst = models.IntegerField(default=0)
    sgst = models.IntegerField(default=0)
    igst = models.IntegerField(default=0)
    discription = models.TextField(blank=True)

    def __str__(self):
        return f'{self.hsn_code} {self.discription}'


class Offer(models.Model):
    offer_id = models.BigAutoField(primary_key=True)
    offer_name = models.CharField(max_length=30)
    offer_in_percentile = models.FloatField(default=0)
    offer_in_rupees = models.FloatField(default=0)
    offer_start_date = models.DateField()
    offer_end_date = models.DateField()
    offer_description =models.TextField(blank=True)

    def __str__(self):
        return f'{self.offer_name} {self.offer_in_percentile}'


class Product(models.Model):
    product_id = models.BigAutoField(primary_key=True)
    product_name = models.CharField(max_length=100)
    product_category = models.ForeignKey(ProductCategory, on_delete=models.CASCADE, related_name='category_products', blank=True)
    product_cost_per_quantity = models.FloatField()
    product_gst = models.ForeignKey(GST, on_delete=models.CASCADE, related_name='gst_products', blank=True)
    product_cost_with_gst = models.FloatField(default=0)
    product_offer = models.ForeignKey(Offer, on_delete=models.CASCADE, related_name='offer_products', blank=True)
    product_quantity = models.FloatField(default=0)
    product_total_cost = models.FloatField(default=0)

    def __str__(self):
        return f'{self.product_name}'
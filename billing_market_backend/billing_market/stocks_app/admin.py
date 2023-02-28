from django.contrib import admin
from . models import Product, Offer, GST, ProductCategory


class ProductAdmin(admin.ModelAdmin):
    list_display = ['product_id','product_name', 'product_category', 'product_cost_per_quantity', 'product_gst', 'product_cost_with_gst', 'product_offer', 'product_quantity', 'product_total_cost']
admin.site.register(Product, ProductAdmin)


class OfferAdmin(admin.ModelAdmin):
    list_display = ['offer_id', 'offer_name', 'offer_in_percentile', 'offer_in_rupees', 'offer_start_date', 'offer_end_date', 'offer_description']
admin.site.register(Offer, OfferAdmin)


class GstAdmin(admin.ModelAdmin):
    list_display= ['gst_id', 'hsn_code', 'cgst', 'sgst', 'igst', 'discription']
admin.site.register(GST, GstAdmin)


class ProductCategoryAdmin(admin.ModelAdmin):
    list_display=['product_category_id', 'catogery_name']
admin.site.register(ProductCategory, ProductCategoryAdmin)

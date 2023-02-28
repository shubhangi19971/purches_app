from django.contrib import admin
from . models import Order, Vendors, OrderProduct

class VenderAdmin(admin.ModelAdmin):
    
    list_display = ['vendor_id', 'vendor_name', 'vendor_information', 'vendor_contact', 'vendor_gst_number']
admin.site.register(Vendors, VenderAdmin)


class OrderAdmin(admin.ModelAdmin):
    list_display =['order_id' , 'order_number', 'order_total_cost_without_gst','order_total_cost_with_gst', 'order_status','order_date','order_delivery_date','vendors']
admin.site.register(Order, OrderAdmin)


class OrderProductAdmin(admin.ModelAdmin):
    list_display = ['order_product_id', 'order', 'product_order', 'order_product_quantity','order_product_cost_per_quantity','order_product_total_cost', 'order_product_total_cost_with_gst']
admin.site.register(OrderProduct,OrderProductAdmin )


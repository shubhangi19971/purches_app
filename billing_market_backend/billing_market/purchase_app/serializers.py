from rest_framework import serializers
from.models import Order, OrderProduct, Vendors

class OrderProductSerializer(serializers.ModelSerializer):
    order_product_id = serializers.IntegerField(read_only=True)
    class Meta:
        model = OrderProduct
        fields = ['order_product_id','product_order']
    


class OrderSerializer(serializers.ModelSerializer):
    product_in_order = OrderProductSerializer(read_only = True, many=True)
    products = OrderProductSerializer(write_only= True, many=True)

    class Meta:
        model = Order
        fields = '__all__'
    
    def create(self, validated_data):
        orderproducts_data = validated_data.pop('products')
        order = Order.objects.create(**validated_data)
        for orderproduct_data in orderproducts_data:
            print(orderproduct_data.get('order_product_quantity'))
            OrderProduct.objects.create(order=order, **orderproduct_data)
        return order


class VendorSerializer(serializers.ModelSerializer):
    vendors_order = OrderSerializer(read_only = True, many=True)
    orders = OrderSerializer(write_only = True, many=True) 
   
    class Meta:
        model = Vendors
        fields ='__all__'
    def create(self, validated_data):
        orders_data = validated_data.pop('orders')
        vendor = Vendors.objects.create(**validated_data)
        for order_data in orders_data:
            products = order_data.pop('products')
            obj = Order.objects.create(vendors=vendor, **order_data)
            for product in products:
                OrderProduct.objects.create(order=product, **product)
        return vendor
   
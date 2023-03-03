from rest_framework.generics import ListAPIView, RetrieveUpdateDestroyAPIView
from .serializers import ProductSerializer
from.models import Product


class ProductAPI(ListAPIView):
    serializer_class = ProductSerializer
    queryset = Product.objects.all()



class ProductDetails(RetrieveUpdateDestroyAPIView):
    serializer_class = ProductSerializer
    queryset = Product.objects.all()



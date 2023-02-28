from rest_framework.generics import ListAPIView, RetrieveAPIView
from .serializers import ProductSerializer
from.models import Product


class ProductAPI(ListAPIView):
    serializer_class = ProductSerializer
    queryset = Product.objects.all()



class ProductDetails(RetrieveAPIView):
    serializer_class = ProductSerializer
    queryset = Product.objects.all()



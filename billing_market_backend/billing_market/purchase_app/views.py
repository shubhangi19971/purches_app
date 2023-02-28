from django.shortcuts import render
from rest_framework.generics import ListCreateAPIView,RetrieveUpdateDestroyAPIView
from rest_framework.response import Response
from .serializers import OrderSerializer, OrderProductSerializer,VendorSerializer
from.models import Order, OrderProduct, Vendors
from django.shortcuts import get_object_or_404
from rest_framework.authentication import BasicAuthentication, SessionAuthentication
from rest_framework.permissions import IsAuthenticated




class OrderAPI(ListCreateAPIView):
    #permission_classes = [IsAuthenticated]
    #authentication_classes=[BasicAuthentication, SessionAuthentication]
    serializer_class = OrderSerializer
    queryset = Order.objects.all()


class OrderDetails(RetrieveUpdateDestroyAPIView):
    serializer_class = OrderSerializer
    queryset = Order.objects.all()


class VendorList(ListCreateAPIView):
    queryset = Vendors.objects.all()
    serializer_class = VendorSerializer



    
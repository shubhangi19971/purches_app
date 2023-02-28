from django.urls import path
from . import views


urlpatterns =[
    path('products/', views.ProductAPI.as_view()),
    path('products/<int:pk>/', views.ProductDetails.as_view())
]
from django.urls import path
from . import views

urlpatterns =[
    path('order/', views.OrderAPI.as_view()),
    path('order/<int:pk>/', views.OrderDetails.as_view()),
    path('vendor/', views.VendorList.as_view()),
  
]
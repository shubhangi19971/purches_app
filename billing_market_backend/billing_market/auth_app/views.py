from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from.serializers import EmployeeSerializer
from.models import EmployeeUser



class EmployeeUserAPI(APIView):

    def post(self,request):
        serializer = EmployeeSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(data=serializer.data)
        return Response(data=serializer.errors)
    

from rest_framework import serializers
from.models import EmployeeUser


class EmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = EmployeeUser
        fields = ('id', 'username', 'password', 'first_name', 'last_name', 'dob', 'contact', 'email', 'city', 'pincode', 'user_role')

    def create(self, validated_data):
        return EmployeeUser.objects.create_user(**validated_data)    
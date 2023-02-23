from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import EmployeeUser


class EmployeeUserAdmin(UserAdmin):
    model = EmployeeUser
    list_display = ['username', 'first_name', 'last_name', 'contact', 'email', 'address', 'city', 'pincode', 'user_role']

admin.site.register(EmployeeUser, EmployeeUserAdmin)
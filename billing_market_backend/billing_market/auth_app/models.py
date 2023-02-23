from django.db import models
from django.contrib.auth.models import AbstractUser
from phonenumber_field.modelfields import PhoneNumberField


class EmployeeUser(AbstractUser):
    dob = models.DateField(default='2023-02-22')
    contact = PhoneNumberField(region='IN', unique=True, blank=True)
    email = models.EmailField(unique=True)
    address = models.TextField(blank=True)
    city = models.CharField(max_length=30, blank=True)
    pincode = models.CharField(max_length=6, blank=True)
    ROLES = (
        ('CEO', 'CEO'),
        ('Manager','Manager'),
        ('Accountant', 'Accountant'),
        ('SalesMan', 'SalesMan'),
        ('Staff', 'Staff')
    )
    user_role = models.CharField(max_length=20, choices=ROLES, default='SalesMan')

    REQUIRED_FIELDS = ('email',)

    def __str__(self):
        return f'{self.first_name}  {self.last_name}'

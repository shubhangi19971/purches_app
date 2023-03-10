# Generated by Django 4.1.7 on 2023-02-24 11:46

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import phonenumber_field.modelfields


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('stocks_app', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Customer',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('contact_number', phonenumber_field.modelfields.PhoneNumberField(blank=True, max_length=128, region='IN', unique=True)),
                ('address', models.TextField(blank=True)),
            ],
        ),
        migrations.CreateModel(
            name='Invoice',
            fields=[
                ('Invoice_id', models.BigAutoField(primary_key=True, serialize=False)),
                ('invoice_number', models.CharField(editable=False, max_length=10, unique=True)),
                ('total_cost_without_gst', models.FloatField(default=0)),
                ('total_cost_with_gst', models.FloatField(default=0)),
                ('total_cost_with_offer_and_gst', models.FloatField(default=0)),
                ('invoice_date', models.DateField(auto_now=True)),
                ('customer', models.ForeignKey(blank=True, on_delete=django.db.models.deletion.CASCADE, related_name='customer_invoice', to='sales_app.customer')),
                ('invoice_created_by', models.ForeignKey(blank=True, on_delete=django.db.models.deletion.CASCADE, related_name='employee_name', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='InvoiceProduct',
            fields=[
                ('invoice_product_id', models.BigAutoField(primary_key=True, serialize=False)),
                ('invoice_product_quantity', models.FloatField(default=1)),
                ('invoice_product_cost_per_quantity', models.FloatField(default=0)),
                ('invoice_product_cost_per_quantity_with_offer', models.FloatField(default=0)),
                ('invoice_product_total_cost', models.FloatField(default=0)),
                ('invoice_product_total_cost_with_gst', models.FloatField(default=0)),
                ('invoice_product_total_cost_with_offer', models.FloatField(default=0)),
                ('invoice', models.ForeignKey(blank=True, on_delete=django.db.models.deletion.CASCADE, related_name='product_in_invoice', to='sales_app.invoice')),
                ('product_invoice', models.ForeignKey(blank=True, on_delete=django.db.models.deletion.CASCADE, related_name='invoice_list', to='stocks_app.product')),
            ],
        ),
    ]

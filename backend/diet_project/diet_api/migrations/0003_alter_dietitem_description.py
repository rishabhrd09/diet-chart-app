# Generated by Django 5.2 on 2025-04-26 17:47

from django.db import migrations, models

class Migration(migrations.Migration):

    dependencies = [
        ('diet_api', '0002_remove_dietitem_created_at_dietitem_quantity_ml_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='dietitem',
            name='description',
            field=models.TextField(blank=True, null=True),
        ),
    ]
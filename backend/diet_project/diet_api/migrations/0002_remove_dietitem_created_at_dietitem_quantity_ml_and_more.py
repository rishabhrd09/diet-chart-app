# Generated by Django 5.2 on 2025-04-27 00:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('diet_api', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='dietitem',
            name='created_at',
        ),
        migrations.AddField(
            model_name='dietitem',
            name='quantity_ml',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='dietitem',
            name='calories',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='dietitem',
            name='description',
            field=models.TextField(blank=True, default='NA'),
        ),
    ]

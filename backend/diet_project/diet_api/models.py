from django.db import models


class DietItem(models.Model):
    name = models.CharField(max_length=100)
    time = models.TimeField()
    calories = models.IntegerField(null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    quantity_ml = models.IntegerField(null=True, blank=True)

    def __str__(self):
        return self.name
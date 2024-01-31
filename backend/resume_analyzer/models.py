from django.db import models
import uuid

# Create your models here.

class Resume(models.Model):
    name = models.CharField(max_length=200, blank=True)
    email = models.CharField(max_length=200, blank=True)
    mobile = models.CharField(max_length=20, blank=True)
    resume = models.TextField(blank=True)
    skills = models.TextField(blank=True)
    uuid = models.UUIDField(blank=True, default=uuid.uuid4, unique=True, editable=False)
    experiences = models.TextField(blank=True)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return str(self.uuid)
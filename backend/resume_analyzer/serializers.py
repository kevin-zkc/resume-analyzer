from rest_framework import serializers
from .models import Resume

class ResumeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Resume
        fields = ['id', 'name', 'email', 'mobile', 'resume', 'skills', 'uuid', 'experiences']
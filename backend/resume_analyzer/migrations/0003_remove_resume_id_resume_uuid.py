# Generated by Django 5.0.1 on 2024-01-30 23:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('resume_analyzer', '0002_resume_skills_alter_resume_email_alter_resume_mobile_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='resume',
            name='id',
        ),
        migrations.AddField(
            model_name='resume',
            name='uuid',
            field=models.CharField(default=0, max_length=200, primary_key=True, serialize=False),
            preserve_default=False,
        ),
    ]
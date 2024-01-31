from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from pyresparser import ResumeParser
import pandas as pd
import spacy
import base64

from .models import Resume
from .serializers import ResumeSerializer

# Create your views here.
@api_view(['POST'])
def add_resume(request):
    data = request.data
    base64_string = data["resume"]
    with open('resume_analyzer/files/temp.pdf', 'wb') as the_file:
        the_file.write(base64.b64decode(base64_string))
        the_file.close()
    parsed_data = ResumeParser('resume_analyzer/files/temp.pdf').get_extracted_data()
    print(parsed_data)
    serializer = ResumeSerializer(data={
        'name': parsed_data['name'],
        'email': parsed_data['email'],
        'mobile': parsed_data['mobile_number'],
        'skills': ', '.join(parsed_data['skills']),
        'resume': base64_string,
        'experiences': '\n'.join(parsed_data['experience']),
    })
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    else:
        return Response(status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])    
def resume_detail(request, id, format=None):

    try:    
        resume = Resume.objects.get(uuid=id)
    except Resume.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    if request.method == 'GET':
        serializer = ResumeSerializer(resume)
        return Response(serializer.data)
    elif request.method == 'PUT':
        serializer = ResumeSerializer(resume, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        resume.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
@api_view(['POST'])
def job_description_compare(request, id, format=None):

    try:    
        resume = Resume.objects.get(uuid=id)
    except Resume.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    nlp = spacy.load('en_core_web_sm')
    job_description = request.data["job_description"]
    nlp_text = nlp(job_description)
    noun_chunks = list(nlp_text.noun_chunks)
    tokens = [token.text for token in nlp_text if not token.is_stop] # remove stop words 
    data = pd.read_csv("resume_analyzer/files/skills.csv") # set of all skills
    skills = list(data.columns.values)
    skillset = []

    for token in tokens:
        if token.lower() in skills:
            skillset.append(token.lower())

    for token in noun_chunks:
        token = token.text.lower().strip()
        if token in skills:
            skillset.append(token)

    rating = 0
    if (skillset.__len__() != 0):
        resume_skillset = [skill.lower() for skill in resume.skills.split(', ')]
        for skill in skillset:
            if skill in resume_skillset:
                rating += 1
        rating = rating / skillset.__len__() * 100

    return Response({
        'rating': str(round(rating, 2)),
        'skills': skillset
    })

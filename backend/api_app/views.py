from django.shortcuts import render
from django.http import HttpResponse

#rest_framework
from rest_framework.response import Response
from rest_framework.decorators import api_view 

@api_view(['GET'])
def apiOverview(request):
    api_urls = {
        'List'      : '/task-list/',
        'Details'   : '/task-detail/<str:pk>',
        'Create'    : '/task-create/',
        'Update'    : '/task-update/<str:pk>',
        'Delete'    : '/task-delete/<str:pk>',

    }
    return Response(api_urls)   

from .models import Task 
from .serializers import TaskSerializer

@api_view(['GET'])
def taskList(request):
    tasks = Task.objects.all()
    serialized = TaskSerializer(tasks, many=True)
    return Response(serialized.data)

@api_view(['GET'])
def taskDetail(request, pk):
    # or Task.objects.get(id=pk) 
    tasks = Task.objects.filter(id=pk).get() 
    serialized = TaskSerializer(tasks, many=False)
    return Response(serialized.data)

@api_view(['POST'])
def taskCreate(request):
    serializer = TaskSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)

@api_view(['POST'])
def taskUpdate(request, pk):
    task = Task.objects.get(id=pk)
    serializer = TaskSerializer(instance=task, data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)

@api_view(['POST'])
def taskDelete(request, pk):
    task = Task.objects.get(id=pk)
    task.delete()
    return Response('Item Deleted')
    


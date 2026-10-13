from django.shortcuts import render
from django.http import HttpRequest, HttpResponse


# Create your views here.
def index(req: HttpRequest) -> HttpResponse:
    return render(req, "modelviewerapp/index.html")
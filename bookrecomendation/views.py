# Create your views here.

from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from .forms import UserRegisterForm, BookForm, RatingForm, PreferencesForm
from .models import Book, Rating, Preferences

def index(request):
    return render(request, 'base.html')

def register(request):
    if request.method == 'POST':
        form = UserRegisterForm(request.POST)
        if form.is_valid():
            user = form.save()
            user.set_password(user.password)
            user.save()
            return redirect('login')
    else:
        form = UserRegisterForm()
    return render(request, 'register.html', {'form': form})

def login_view(request):
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return redirect('index')
        else:
            return render(request, 'login.html', {'error': 'Invalid credentials'})
    return render(request, 'login.html')

def logout_view(request):
    logout(request)
    return redirect('register')

@login_required
def add_book(request):
    if request.method == 'POST':
        form = BookForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('index')
    else:
        form = BookForm()
    return render(request, 'add_book.html', {'form': form})

@login_required
def show_book(request):
    data=Book.objects.all()
    return render(request, 'showbooks.html', {"data":data})

@login_required
def log_rating(request):
    if request.method == 'POST':
        form = RatingForm(request.POST)
        if form.is_valid():
            rating = form.save(commit=False)
            rating.user = request.user
            rating.save()
            return redirect('index')
    else:
        form = RatingForm()
    return render(request, 'log_rating.html', {'form': form})

@login_required
def set_preferences(request):
    if request.method == 'POST':
        form = PreferencesForm(request.POST)
        if form.is_valid():
            preferences = form.save(commit=False)
            preferences.user = request.user
            preferences.save()
            return redirect('index')
    else:
        form = PreferencesForm()
    return render(request, 'set_preferences.html', {'form': form})

@login_required
def get_recommendations(request):
    user = request.user
    try:
        preferences = Preferences.objects.get(user=user)
    except Preferences.DoesNotExist:
        return render(request, 'recommendations.html', {'message': 'No preferences set.'})

    preferred_genres = preferences.preferred_genres.split(',')
    preferred_authors = preferences.preferred_authors.split(',')

    books = Book.objects.filter(genre__in=preferred_genres) | Book.objects.filter(author__in=preferred_authors)
    return render(request, 'recommendations.html', {'books': books})

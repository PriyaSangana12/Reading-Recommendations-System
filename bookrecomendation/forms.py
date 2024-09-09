from django import forms
from .models import Book, Rating, Preferences
from django.contrib.auth.models import User

class UserRegisterForm(forms.ModelForm):
    password = forms.CharField(widget=forms.PasswordInput)

    class Meta:
        model = User
        fields = ['username', 'password']

class BookForm(forms.ModelForm):
    class Meta:
        model = Book
        fields = ['title', 'author', 'genre', 'summary']

class RatingForm(forms.ModelForm):
    class Meta:
        model = Rating
        fields = ['book', 'rating', 'review']

class PreferencesForm(forms.ModelForm):
    class Meta:
        model = Preferences
        fields = ['preferred_genres', 'preferred_authors']
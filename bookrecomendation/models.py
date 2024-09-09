
# Create your models here.
from django.db import models
from django.contrib.auth.models import User

class Book(models.Model):
    title = models.CharField(max_length=200)
    author = models.CharField(max_length=200)
    genre = models.CharField(max_length=200)
    summary = models.TextField()

    def __str__(self):
        return self.title

class Rating(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    rating = models.IntegerField()
    review = models.TextField()

    def __str__(self):
        return f"{self.user.username} - {self.book.title}"

class Preferences(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    preferred_genres = models.CharField(max_length=500)
    preferred_authors = models.CharField(max_length=500)
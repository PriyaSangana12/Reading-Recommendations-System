from django.urls import path
from . import views

urlpatterns = [
    path('index', views.index, name='index'),
    path('', views.register, name='register'),
    path('login/', views.login_view, name='login'),
    path('logout/', views.logout_view, name='logout'),
    path('add_book/', views.add_book, name='add_book'),
    path('show_book/', views.show_book, name='show_book'),
    path('log_rating/', views.log_rating, name='log_rating'),
    path('set_preferences/', views.set_preferences, name='set_preferences'),
    path('recommendations/', views.get_recommendations, name='get_recommendations'),
]

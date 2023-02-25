from django.urls import path

from . import views

app_name = 'flashcard'
urlpatterns = [
    path('', views.index, name='index'),
    path('<int:question_id>/', views.detail, name='detail'),
    path('<int:question_id>/results/', views.results, name='results'),
    path('<int:question_id>/vote/', views.vote, name='vote'),
    path('all', views.CardListView.as_view(), name='card-list'),
    path(
        "new",
        views.CardCreateView.as_view(),
        name='card-create'
    )
]
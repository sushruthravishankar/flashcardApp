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
    ),
    path('rest-all', views.flashcard_list, name='rest-all'),
    path('rest-flashcard/<int:flashcard_id>', views.flashcard_comments_list, name='rest-flashcard'),
    path('comment/upvote/<int:comment_id>', views.comment_upvote, name='comment-upvote'),
    path('comment/downvote/<int:comment_id>', views.comment_downvote, name='comment-downvote'),
    path('rest-flashcard/<int:question_id>/comments', views.add_comment, name='add-comment'),
    path('rest-flashcard/all', views.all_flashcards_with_top_comment, name='all-flashcards-with-top-comment'),
    path('rest-flashcard/add/', views.add_flashcard_with_comment, name='add-flashcard'),
    path('login', views.login_user, name='login')
    # path('current')
]

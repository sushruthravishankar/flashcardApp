from django.contrib.auth import authenticate, login
from django.shortcuts import render
from django.contrib.auth.decorators import login_required
# Create your views here.

from django.http import HttpResponseRedirect, JsonResponse
from django.shortcuts import get_object_or_404, render
from django.urls import reverse, reverse_lazy
from django.views.generic import ListView, CreateView
from django.core import serializers as ser
from .models import Choice, Question, Card, Comments, Flashcard


def index(request):
    latest_question_list = Question.objects.order_by('-pub_date')[:5]
    context = {
        'latest_question_list': latest_question_list,
    }
    return render(request, 'flashcard/index.html', context)


def detail(request, question_id):
    question = get_object_or_404(Question, pk=question_id)
    return render(request, 'flashcard/detail.html', {'question': question})


def results(request, question_id):
    question = get_object_or_404(Question, pk=question_id)
    return render(request, 'flashcard/results.html', {'question': question})

def vote(request, question_id):
    question = get_object_or_404(Question, pk=question_id)
    try:
        selected_choice = question.choice_set.get(pk=request.POST['choice'])
    except (KeyError, Choice.DoesNotExist):
        # Redisplay the question voting form.
        return render(request, 'polls/detail.html', {
            'question': question,
            'error_message': "You didn't select a choice.",
        })
    else:
        selected_choice.votes += 1
        selected_choice.save()
        # Always return an HttpResponseRedirect after successfully dealing
        # with POST data. This prevents data from being posted twice if a
        # user hits the Back button.
        return HttpResponseRedirect(reverse('flashcard:results', args=(question.id,)))


class CardListView(ListView):
    model = Card
    queryset = Card.objects.all().order_by("date_created")


class CardCreateView(CreateView):
    model = Card
    fields = ["question", "answer"]
    success_url = reverse_lazy('flashcard:card-create')


from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from .serializers import *


@api_view(['GET', 'POST'])
def flashcard_list(request):
    if request.method == 'GET':
        data = Card.objects.all();
        serializer = CardSerializer(data, context={'request': request}, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = CardSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def add_flashcard_with_comment(request):
    print(request.data)
    question_text = request.data.get('question')
    answer_text = request.data.get('answer')
    if not question_text or not answer_text:
        return JsonResponse({'error': 'Both question and comment text are required'}, status=400)
    flashcard = Flashcard(question=question_text, created_by=request.user)
    flashcard.save()
    comment = Comments(question=flashcard, answer=answer_text, votes=1, created_by=request.user)
    comment.save()
    flashcard_serializer = FlashCardSerializer(flashcard)
    comment_serializer = CommentSerializer(comment)
    return Response(status=status.HTTP_201_CREATED)



@api_view(['GET'])
def flashcard_comments_list(request, flashcard_id):
    if request.method == 'GET':
        flashcard = get_object_or_404(Flashcard, pk=flashcard_id)
        comments = Comments.objects.filter(question=flashcard).order_by('-votes')
        serializer = CommentSerializer(comments, many=True)
        data = {
            'question': flashcard.question,
            'date_created': flashcard.date_created,
            'comments': serializer.data
        }
        return Response(data)

# @api_view(['GET'])
# def flashcard_top_comment(request, flashcard_id):
#     if request.method == 'GET':
#         flashcard = get_object_or_404(Flashcard, pk=flashcard_id)
#         answer = Comments.objects.filter(question=flashcard).order_by('-votes')[:1]
#         serializer = CommentSerializer(answer)
#         data = {
#             'question': flashcard.question,
#             'date_created': flashcard.date_created,
#             'answer': serializer.data
#         }
#         return Response(data)


class FlashcardWithTopCommentSerializer(serializers.ModelSerializer):
    top_comment = CommentSerializer(read_only=True)

    class Meta:
        model = Flashcard
        fields = ['id', 'question', 'top_comment']


class CommentWithUserSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = Comments
        fields = ['id', 'answer', 'votes', 'user']


@api_view(['GET'])
def all_flashcards_with_top_comment(request):
    flashcards = Flashcard.objects.all()
    flashcards_with_top_comment = []
    for flashcard in flashcards:
        top_comment = flashcard.comments_set.order_by('-votes').first()
        serializer = CommentSerializer(top_comment)
        serz = UserSerializer(flashcard.created_by)
        data = {
            'question': flashcard.question,
            'created_by': serz.data,
            'date_created': flashcard.date_created,
            'top_comment': serializer.data
        }
        flashcards_with_top_comment.append(data)
    return Response(flashcards_with_top_comment)


@api_view(['PUT'])
def comment_upvote(request, comment_id):
    comment = get_object_or_404(Comments, pk=comment_id)
    comment.votes += 1
    comment.save()
    # Always return an HttpResponseRedirect after successfully dealing
    # with POST data. This prevents data from being posted twice if a
    # user hits the Back button.
    # return HttpResponseRedirect(reverse('flashcard:results', args=(question.id,)))
    return JsonResponse({
        'status': 'success',
        'message': 'Comment upvoted successfully.'
    })

@api_view(['PUT'])
def comment_downvote(request, comment_id):
    comment = get_object_or_404(Comments, pk=comment_id)
    comment.votes -= 1
    comment.save()
    # Always return an HttpResponseRedirect after successfully dealing
    # with POST data. This prevents data from being posted twice if a
    # user hits the Back button.
    # return HttpResponseRedirect(reverse('flashcard:results', args=(question.id,)))
    return JsonResponse({
        'status': 'success',
        'message': 'Comment upvoted successfully.'
    })


# @login_required
@api_view(['POST', 'GET'])
def add_comment(request, question_id):
    if request.method == 'GET':
        question = get_object_or_404(Flashcard, pk=question_id)
        comments = Comments.objects.filter(question=question)
        serializer = CommentSerializer(comments, context={'request': request}, many=True)
        return Response(serializer.data)
    if request.method == 'POST':
        print(request.data)
        question = get_object_or_404(Flashcard, pk=question_id)
        serializer = CommentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(question=question, created_by=request.user)
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def login_user(request):
    if request.method == 'POST':
        print(request.data['username'])
        username = request.data['username']
        password = request.data['password']

        user = authenticate(request, username=username, password=password)

        if user is not None:
            login(request, user)
            return Response(status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)


# def current_user(request):
#     user = request.user
#     # print(user.username)
#     return JsonResponse({'user': user})


# def detail(request, question_id):
#     question = get_object_or_404(Question, pk=question_id)
#     return render(request, 'flashcard/detail.html', {'question': question})



# def vote(request, question_id):
#     question = get_object_or_404(Question, pk=question_id)
#     try:
#         selected_choice = question.choice_set.get(pk=request.POST['choice'])
#     except (KeyError, Choice.DoesNotExist):
#         # Redisplay the question voting form.
#         return render(request, 'polls/detail.html', {
#             'question': question,
#             'error_message': "You didn't select a choice.",
#         })
#     else:
#         selected_choice.votes += 1
#         selected_choice.save()
#         # Always return an HttpResponseRedirect after successfully dealing
#         # with POST data. This prevents data from being posted twice if a
#         # user hits the Back button.
#         return HttpResponseRedirect(reverse('flashcard:results', args=(question.id,)))

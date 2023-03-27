from django.db import models
from django.contrib.auth.models import User
import random
# Create your models here.
class Question(models.Model):
    question_text = models.CharField(max_length=200)
    pub_date = models.DateTimeField('date published')
    def __str__(self):
        return self.question_text

class Choice(models.Model):
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    choice_text = models.CharField(max_length=200)
    votes = models.IntegerField(default=0)

    def __str__(self):
        return self.choice_text

class Card(models.Model):
    question = models.CharField(max_length=100)
    answer = models.CharField(max_length=100)
    date_created = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.question


class Card(models.Model):
    question = models.CharField(max_length=100)
    answer = models.CharField(max_length=100)
    date_created = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.question


class Flashcard(models.Model):
    question = models.TextField()
    date_created = models.DateTimeField(auto_now_add=True)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE)
    def __str__(self):
        return self.question


class Comments(models.Model):
    question = models.ForeignKey(Flashcard, on_delete=models.CASCADE)
    answer = models.CharField(max_length=200)
    data_created = models.DateTimeField(auto_now_add=True)
    votes = models.IntegerField(auto_created=1)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE)



    def __str__(self):
        return self.answer


class FlashcardTopic(models.Model):
    name = models.CharField(max_length=50)
    background_colour = models.CharField(max_length=7, default="#"+''.join([random.choice('0123456789ABCDEF') for j in range(6)]))

    def __str__(self):
        return self.name

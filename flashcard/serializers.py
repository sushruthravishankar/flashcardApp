from rest_framework import serializers
from .models import Card, Flashcard, Comments


class CardSerializer(serializers.ModelSerializer):

    class Meta:
        model = Card
        fields = ('question', 'answer', 'date_created')


class FlashCardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Flashcard
        field = ('question', 'date_created', 'comments')


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comments
        fields = ['id', 'answer', 'votes']

class AnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comments
        fields = ['id', 'answer', 'votes']

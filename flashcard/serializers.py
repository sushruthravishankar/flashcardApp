from rest_framework import serializers
from .models import Card, Flashcard, Comments, User


class CardSerializer(serializers.ModelSerializer):

    class Meta:
        model = Card
        fields = ('question', 'answer', 'date_created')


class FlashCardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Flashcard
        field = ('question', 'date_created', 'comments')



class AnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comments
        fields = ['id', 'answer', 'votes']

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username']


class CommentSerializer(serializers.ModelSerializer):
    username = serializers.SerializerMethodField()

    class Meta:
        model = Comments
        fields = ['id', 'answer', 'votes', 'username']

    def get_username(self, obj):
        return obj.created_by.username


class CommentToAddSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comments
        fields = ['id', 'answer', 'votes']

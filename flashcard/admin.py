from django.contrib import admin

# Register your models here.
from django.contrib import admin
from .models import Choice, Question, Card, Flashcard, Comments


class ChoiceInline(admin.TabularInline):
    model = Choice
    extra = 3


class CardAdmin(admin.ModelAdmin):
    fieldsets = [
        (None, {'fields': ['question']}),
        (None, {'fields': ['answer']}),
    ]


fieldsets = [
    (None, {'fields': ['question_text']}),
    ('Date information', {'fields': ['pub_date'], 'classes': ['collapse']}),
]

class QuestionAdmin(admin.ModelAdmin):
    inlines = [ChoiceInline]


class CommentsAdmin(admin.TabularInline):
    model = Comments


class FlashcardAdmin(admin.ModelAdmin):
    model = Flashcard
    inlines = [CommentsAdmin]


admin.site.register(Question, QuestionAdmin)
admin.site.register(Card, CardAdmin)
admin.site.register(Flashcard, FlashcardAdmin)

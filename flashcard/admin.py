from django.contrib import admin

# Register your models here.
from django.contrib import admin
from .models import Choice, Question, Card


class ChoiceInline(admin.TabularInline):
    model = Choice
    extra = 3


class QuestionAdmin(admin.ModelAdmin):
    fieldsets = [
        (None, {'fields': ['question_text']}),
        ('Date information', {'fields': ['pub_date'], 'classes': ['collapse']}),
    ]
    inlines = [ChoiceInline]


class CardAdmin(admin.ModelAdmin):
    fieldsets = [
        (None, {'fields': ['question']}),
        (None, {'fields': ['answer']}),
    ]


admin.site.register(Question, QuestionAdmin)
admin.site.register(Card, CardAdmin)

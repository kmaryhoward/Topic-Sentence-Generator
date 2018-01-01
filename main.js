document.getElementById('ideaInputForm').addEventListener('submit', saveIdea);
const ideas = [];

function saveIdea(e) {
    var sentenceId = Math.random();
    var ideaAuthor = document.getElementById('nameOfAuthor').value;
    var action = document.getElementById('actionOfAuthor').value;
    var object = document.getElementById('objectOfAuthor').value;
    var ideaByAuthor = document.getElementById('ideaOfAuthor').value;
  

    var idea = {
        id: sentenceId,
        authorName: ideaAuthor,
        authorAction: action,
        authorObject: object,
        authorIdea: ideaByAuthor
    }

    if (localStorage.getItem('ideas') === null) {
        var ideas = [];
        ideas.push(idea);
        localStorage.setItem('ideas', JSON.stringify(ideas));
    } else {
        ideas = JSON.parse(localStorage.getItem('ideas'));
        ideas.push(idea);
        localStorage.setItem('ideas', JSON.stringify(ideas));
    }

    document.getElementById('ideaInputForm').reset();

    fetchIdeas();

    e.preventDefault();
}

function keepSentence(id) {
    var ideas = JSON.parse(localStorage.getItem('ideas'));

    for (var i = 0; i < ideas.length; i++) {
        if (ideas[i].id == id) {
            ideas[i].status = 'Keep';
        }
    }

    localStorage.setItem('ideas', JSON.stringify(ideas));

    fetchIdeas();
}

function deleteIdea(id) {
    var ideas = JSON.parse(localStorage.getItem('ideas'));

    for (var i = 0; i < ideas.length; i++) {
        if (ideas[i].id == id) {
            ideas.splice(i, 1);
        }
    }

    localStorage.setItem('ideas', JSON.stringify(ideas));

    fetchIdeas();
}

function fetchIdeas() {
    var ideas = JSON.parse(localStorage.getItem('ideas'));
    var ideasList = document.getElementById('ideasList');

    ideasList.innerHTML = '';

    for (var i = 0; i < ideas.length; i++) {
        var id = ideas[i].id;
        var authorName = ideas[i].authorName;
        var authorAction = ideas[i].authorAction;
        var authorObject = ideas[i].authorObject;
        var authorIdea = ideas[i].authorIdea;
        var combinedElements = [authorName, authorAction, authorObject, authorIdea];
        var presentElements = combinedElements.join(' ');

        ideasList.innerHTML += '<div class="well">' +
            '<h3>' + presentElements + '</h3>' +
            '<a href="#" class="btn btn-warning" onclick="keepSentence(\'' + id + '\')">Keep</a> ' +
            '<a href="#" class="btn btn-danger" onclick="deleteIdea(\'' + id + '\')">Delete</a>' +
            '</div>';

    }
}
$(document).ready(function() {
    $('form').on('submit', function() {
        fetchIdeas();
    });
});


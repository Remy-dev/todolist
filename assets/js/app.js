let app = {
    
    init: function() {
        console.log('Méthode init');

        // On ajoute nos écouteurs d'évènements sur nos tâches
        app.bindTasksEvents();

        // On ajoute un écouteur d'évènement pour l'ajout d'une tâche
        app.bindAddTaskEvent();
    },

    bindAddTaskEvent: function() {
        // On récupère l'élément form permettant d'ajouter une tâche
        let addTaskFormElement = document.querySelector('.task--add form');
        // console.log('addTaskFormElement : ',addTaskFormElement);

        // On ajoute l'écouteur d'évènement pour la soumission du formulaire
        addTaskFormElement.addEventListener('submit',app.handleAddTaskFormSubmit);
    },

    handleAddTaskFormSubmit: function(evt) {
        console.log('handleAddTaskFormSubmit');

        // On bloque le fonctionnement par défaut du formulaire
        // pour éviter le rechargement de la page
        evt.preventDefault();

        // On crée l'élément correspondant à une nouvelle tâche à partir d'un template
        let newTaskTemplateElement = document.getElementById('task-template');
        console.log('newTaskTemplateElement : ',newTaskTemplateElement);
        // On récupère l'intérieur du template puis on le duplique
        let newTaskElement = newTaskTemplateElement.content.cloneNode(true);

        console.log('newTaskElement : ',newTaskElement);

        // On récupère le nom de la tâche à partir du champ input du form
        let formElement = evt.currentTarget;
        let newTaskValue = formElement.querySelector('.task__name-edit').value;

        console.log('newTaskValue : ',newTaskValue);

        // On vient préciser le nom de la tâche dans le clone de la tâche
        newTaskElement.querySelector('.task__name-display').textContent = newTaskValue;
        newTaskElement.querySelector('.task__name-edit').value = newTaskValue;

        console.log('newTaskElement : ',newTaskElement);

        // On vient préciser la catégorie dans le clone de la tâche
        let newTaskCategoryValue = formElement.querySelector('.task__category select').value;
        console.log('newTaskCategoryValue : ',newTaskCategoryValue);
        // On utilise dataset : https://developer.mozilla.org/fr/docs/Web/API/HTMLElement/dataset
        newTaskElement.querySelector('.task').dataset.category = newTaskCategoryValue;
        newTaskElement.querySelector('.task__category p').textContent = newTaskCategoryValue;

        // On ajoute notre nouvelle tâche dans le DOM
        let tasksContainer = document.querySelector('.tasks');
        // prepend permet de rajouter l'élément en tant que 1er fils
        tasksContainer.prepend(newTaskElement);
    },

    // Méthode chargée d'ajouter les écouteurs d'évènements sur toutes les tâches
    bindTasksEvents: function () {
        // On doit d'abord récupérer l'ensemble des tâches
        // https://developer.mozilla.org/fr/docs/Web/API/Document/querySelectorAll
        // Avec le :not() on peut exclure certains éléments avec notre sélecteur
        let existingTasks = document.querySelectorAll('.tasks .task:not(.task--add)');

        // On parcourt ensuite les tâches une par une
        for (let i = 0; i < existingTasks.length ; i++) {
            app.bindSingleTaskEvents(existingTasks[i]);
        }
    },

    // Méthode chargée d'ajouter les écouteurs d'évènements sur une tâche à la fois
    bindSingleTaskEvents: function(singleTaskElement) {
        // On cible le titre de la tâche
        let taskTitleElement = singleTaskElement.querySelector('.task__name-display');

        // Puis on ajoute l'écouteur d'évènement sur le clic
        // console.log('taskTitleElement : ',taskTitleElement);
        taskTitleElement.addEventListener('click',app.handleClickOnTaskTitle);

        // On ajoute l'écouteur d'évènement sur le champ input contenant le titre
        let taskInputElement = singleTaskElement.querySelector('.task__name-edit');

        // Puis on ajoute l'écouteur d'évènement sur la perte de focus (blur)
        taskInputElement.addEventListener('blur',app.handleTaskTitle);
        // Et on ajoute également l'écouteur d'évènement sur la validation avec la touche Entrée
        taskInputElement.addEventListener('keydown',app.handleTaskTitleEnterKey);

        // On récupère le bouton permettant de compléter une tâche
        let taskCompleteButtonElement = 
            singleTaskElement.querySelector('.task__button--validate');

        console.log('Task Complete Button : ',taskCompleteButtonElement);

        // On ajoute l'écouteur d'évènement sur le bouton complete
        taskCompleteButtonElement.addEventListener('click',app.handleCompleteButtonClick);
    },

    handleCompleteButtonClick: function(evt) {
        console.log('handleCompleteButtonClick');

        // On récupère le bouton à l'origine de l'évènement
        let taskCompleteButtonElement = evt.currentTarget;
        console.log(taskCompleteButtonElement);

        // Pour changer l'affichage de la tâche, on a besoin de l'élément tâche
        // https://developer.mozilla.org/fr/docs/Web/API/Element/closest
        // closest va checher le premier ancêtre qui correspond au sélecteur fourni en argument
        let taskElement = taskCompleteButtonElement.closest('.task');
        console.log(taskElement);
        // On maintenant modifier les classes de la tâche (taskElement)
        // pour replace, on indique seulement le nom de la classe, sans le '.' car ici, on n'utilise
        // pas de sélecteur css
        taskElement.classList.replace('task--todo','task--complete');
        // replace est l'équivalent des 2 instructions suivantes :
        // taskElement.classList.remove('task--todo');
        // taskElement.classList.add('task--complete');
    },

    handleTaskTitleEnterKey: function(evt) {
        console.log('Je suis dans handleTaskTitleEnterKey');

        // On s'assure qu'on a bien tapé sur la touche Entrée
        if (evt.key == 'Enter') {
            // Je valide la modification du titre de la tâche
            // mais pas directement ici, j'utilise plutôt l'appel de handleTaskTitle
            // et je lui transmets l'event
            // console.log(evt.key);
            app.handleTaskTitle(evt);
        }
    },

    handleTaskTitle: function(evt) {
        console.log('Je suis dans handleTaskTitle');

        // On récupère l'élément input à l'origine de l'évènement
        let taskInputElement = evt.currentTarget;

        // On récupère la valeur de l'input
        let taskTitleValue = taskInputElement.value;

        // On cache l'input et on réaffiche le titre
        let taskElement = taskInputElement.closest('.task');
        taskElement.classList.remove('task--edit');

        // On récupère l'élément contenant le titre (balise <p>)
        // https://developer.mozilla.org/en-US/docs/Web/API/NonDocumentTypeChildNode/previousElementSibling
        let taskTitleElement = taskInputElement.previousElementSibling;
        // On modifie le contenu de la balise <p>
        taskTitleElement.textContent = taskTitleValue;
    },

    handleClickOnTaskTitle: function(evt) {
        console.log('Je suis dans handleClickOnTaskTitle');
        // On récupère l'élément à l'origine de l'évènement (click)
        let taskTitleElement = evt.currentTarget;

        console.log(evt);
        console.log(taskTitleElement);

        // On récupère l'élément tâche à partir de taskTitleElement
        // https://developer.mozilla.org/fr/docs/Web/API/Element/closest
        let taskElement = taskTitleElement.closest('.task');
        // La classe task--edit a un impact sur l'affichage d'une tâche
        // L'ajout de la classe task--edit permet de cacher l'élément <p>
        // contenant le titre de la tâche et d'afficher à la place l'élément input
        // permettant de modifier le titre de la tâche
        taskElement.classList.add('task--edit');

        // Bonus n°1 : ajout du focus pour être directement dans le champ d'édition
        let taskInputElement = taskElement.querySelector('.task__name-edit');
        // https://developer.mozilla.org/fr/docs/Web/API/HTMLElement/focus
        taskInputElement.focus();
    }
};

document.addEventListener('DOMContentLoaded',app.init);
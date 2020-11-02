let handler = {
    /**
    *  Méthode appelée à chaque fois qu'on veut éditer le titre d'une tâche
    * @param {} evt
    */
    clickOnTaskTitle: function (evt) {
        // evt.currentTarget nous permettra de savoir quelle tâche vient d'être cliquée pour être éditée

        let titleElement = evt.currentTarget;
        // On récupère l'élément le plus proche qui a comme classe css 'task'
        // Ici ce sera tout le bloc qui représente la tache
        let taskElement = titleElement.closest('.task');

        taskElement.classList.add('task--edit');

        let taskInputElement = taskElement.querySelector('.task__name-edit');

        taskInputElement.focus();
    },

    /**
     * Méthode appelée pour prendre en compte l'édition du titre d'une tâche quand on appuie sur la touche entrée
     * @param {Event} evt 
     */
    taskTitleEnterKey: function (evt) {
        // si la touche est "Entrée"
        if (evt.key === 'Enter') {
            handler.taskTitle(evt);
        }

    },

    /**
     * Méthode appelée pour prendre en compte l'édition de titre d'une tâche
     * @param {*} evt 
     */
    taskTitle: function (evt) {

        let inputElement = evt.currentTarget;
        // On récupère la valeur saisie dans le champ input type text
        let newTitle = inputElement.value;
        // permet de récupérer la balise p qui précède le input
        let titleElement = inputElement.previousElementSibling;

        titleElement.textContent = newTitle;

        let taskElement = titleElement.closest('.task');
        taskElement.classList.remove('task--edit')

        let dataTask = { 'id': taskElement.dataset.id, 'title': newTitle };
        task.modifyTask(dataTask);
    },

    /** Method call for validation of one task
     * 
     * @param {*} evt 
     */
    taskToggleComplete: function (evt) {

        let validateElement = evt.currentTarget;

        let taskElement = validateElement.closest('.task')
        if (taskElement.classList.contains('task--todo')) {
            taskElement.classList.replace('task--todo', 'task--complete')
            task.setProgressBar(taskElement, 100);
            let dataTask = { 'id': taskElement.dataset.id, 'completion': 100 };
            task.modifyTask(dataTask);
        } else if (taskElement.classList.contains('task--complete')) {
            taskElement.classList.replace('task--complete', 'task--todo')
            task.setProgressBar(taskElement, 0);
            let dataTask = { 'id': taskElement.dataset.id, 'completion': 0 };
            task.modifyTask(dataTask);
        }

    },

    taskArchive: function (evt) {

        let taskElement = evt.currentTarget.closest('.task');
        taskElement.classList.replace('task--todo', 'task--archive');
        taskElement.classList.replace('task--complete', 'task--archive');
        let dataTask = { 'id': taskElement.dataset.id, 'status': 2 };
        task.modifyTask(dataTask);
    },

    taskDesArchive: function (evt) {
        let taskElement = evt.currentTarget.closest('.task');
        taskElement.classList.replace('task--archive', 'task--todo');
        let dataTask = { 'id': taskElement.dataset.id, 'status': 1 };
        task.modifyTask(dataTask);
        task.bindEventListener(taskElement);
    },

    taskDelete: function (evt) {
        let taskElement = evt.currentTarget.closest('.task');
        let dataTask = { 'id': taskElement.dataset.id };
        task.deleteTask(dataTask);
    },

    /** Method call for add a task
     * 
     * @param {*} evt 
     */
    newTask: function (evt) {

        evt.preventDefault();

        let form = evt.currentTarget;
        let input = form.querySelector('.task__name > input');


        let title = input.value.trim();
        let category = form.querySelector('.task__category option:checked').label;
        let categoryId = form.querySelector('.task__category option:checked').value;

        if (title === '') {
            input.focus();
            // On sort de la method newTask
            return;
        }
        if (category === '') {
            return;
        }

        const taskData = {
            title,
            category,
            categoryId
        }

        task.createTask(taskData);

        form.reset();
        input.focus();

    },

    displayArchive: function () {

        let tasksList = document.querySelectorAll('.task');
        if (app.displayArchive === false) {
            for (taskToDisplay of tasksList) {
                if (taskToDisplay.classList.contains('task--archive')) {
                    taskToDisplay.style.display = 'block';
                } else {
                    taskToDisplay.style.display = 'none';
                }
            }
            document.querySelector('.filters__task--archived a').textContent = 'Voir les tâches actives';
            app.displayArchive = true;
        } else {
            for (taskToDisplay of tasksList) {
                if (taskToDisplay.classList.contains('task--archive')) {
                    taskToDisplay.style.display = 'none';
                } else {
                    taskToDisplay.style.display = 'block';
                }
            }
            document.querySelector('.filters__task--archived a').textContent = 'Voir les archives';
            app.displayArchive = false;
        }

    },
    filters: function (evt) {
        let buttonFilter = evt.currentTarget;
        let buttonsFilters = document.querySelectorAll('.filters__choice')
        for (let button of buttonsFilters) {
            if (button.classList.contains('is-info', 'is-selected')) {
                button.classList.remove('is-info', 'is-selected')
            }
        }

        buttonFilter.classList.add('is-info', 'is-selected')

        if (buttonFilter.classList.contains('is-info', 'is-selected')) {
            if (buttonFilter.firstChild.textContent === 'Incomplètes') {
                
                let tasksList = document.querySelectorAll('.task');
                for (taskToDisplay of tasksList) {
                    if (taskToDisplay.classList.contains('task--todo')) {
                        taskToDisplay.style.display = 'block';
                    } else {
                        taskToDisplay.style.display = 'none';
                    }
                }
            }
            if (buttonFilter.firstChild.textContent === 'Complètes') {
                let tasksList = document.querySelectorAll('.task');
                for (taskToDisplay of tasksList) {
                    if (taskToDisplay.classList.contains('task--complete')) {
                        taskToDisplay.style.display = 'block';
                    } else {
                        taskToDisplay.style.display = 'none';
                    }
                }
            }
            if (buttonFilter.firstChild.textContent === 'Toutes') {
                let tasksList = document.querySelectorAll('.task');
                for (taskToDisplay of tasksList) {
                    taskToDisplay.style.display = 'block';
                }
            }
            let categoryToDisplay = document.querySelector('.filters__task--category option:checked')
            let tasksList = document.querySelectorAll('.task');
            if (buttonFilter.nodeName === 'SELECT') {
                for (taskToDisplay of tasksList) {
                    if (categoryToDisplay.value === taskToDisplay.dataset.category || categoryToDisplay.label === 'Toutes les catégories') {
                        taskToDisplay.style.display = 'block';
                    } else {
                        taskToDisplay.style.display = 'none';
                    }
                }
            }
        }
        
    },

    /**
     * 
     * @param {json} categories 
     */
    fetchedCategories: function (categories) {

        let categoriesSelects = document.querySelectorAll('.task select, .filters__task--category > select');

        for (const select of categoriesSelects) {
            while (select.firstChild) {
                select.removeChild(select.firstChild)
            }

            // On remplit (popule) le select avec de nouvelles options
            category.createCategoryOptions(select, categories);
        }

        app.setCategories(categories);
    },

    fetchedTasks: function (tasks) {

        let tasksList = document.querySelector('.tasks')

        tasksList.innerHTML = '';

        for (const taskApi of tasks) {
            let apiTask = task.displayTask(taskApi);
            tasksList.prepend(apiTask);
        }
    }
}
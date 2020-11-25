let task = {

    /**
     * 
     */
    fetchAll: function () {

        let fetchOptions = {
            method: 'GET',
            mode: 'cors',
            cache: 'no-cache'
        };

        let request = fetch(app.apiBaseUrl + 'api/tasks', fetchOptions)

        request.then(
            function (response) {
                return response.json()
            }
        )
            .then(
                function (jsonResponse) {
                    handler.fetchedTasks(jsonResponse);
                }
            )
    },



    /**
     * 
     * @param {*} eltTask 
     * @param {*} percent 
     */
    setProgressBar: function (eltTask, percent) {
        eltTask.querySelector('.progress-bar__level').style.width = percent + '%'
    },

    /**
     * 
     * @param {*} taskData 
     */
    createTask: function (taskData) {

        let template = document.getElementById('empty-task');
        let newTask = template.content.cloneNode(true).querySelector('.task');

        newTask.querySelector('.task__name > input').setAttribute('value', taskData.title);
        newTask.querySelector('.task__name > p').textContent = taskData.title;
        newTask.querySelector('.task__category > p').textContent = taskData.category;


        // On prépare les entêtes HTTP (headers) de le requête
        // afin de spécifier que les données sont en JSON
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        let fetchOptions = {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            headers: myHeaders,
            body: JSON.stringify(taskData),
        };
        console.log(fetchOptions.body);
        fetch(app.apiBaseUrl + 'api/tasks/create', fetchOptions).then(

            function (response) {
                if (response.status == 201) {
                    console.log('modification effectuée');
                    task.fetchAll();
                }
                else {
                    console.log('échec modification');
                }
            }
        )

    },

    modifyTask: function (taskData) {
        // On prépare les entêtes HTTP (headers) de le requête
        // afin de spécifier que les données sont en JSON
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        let fetchOptions = {
            method: 'PUT',
            mode: 'cors',
            cache: 'no-cache',
            headers: myHeaders,
            body: JSON.stringify(taskData),
        };

        fetch(app.apiBaseUrl + 'api/tasks/update/' + taskData.id, fetchOptions).then(

            function (response) {
                if (response.status === 204) {
                    console.log('modification effectuée');
                    task.fetchAll();
                }
                else {
                    console.log('échec modification');
                }
            }
        )
    },

    deleteTask: function (taskId) {
        let fetchOptions = {
            method: 'DELETE',
            mode: 'cors',
            cache: 'no-cache'
        };

        fetch(app.apiBaseUrl + 'api/tasks/delete/' + taskId.id, fetchOptions).then(

            function (response) {
                if (response.status == 204) {
                    console.log('Suppression effectuée');
                    task.fetchAll();
                }
                else {
                    console.log('échec suppression');
                }
            }
        )
    },

    /**
     * 
     * @param {*} taskData 
     */
    displayTask: function (taskData) {
        let id = taskData.id;
        let title = taskData.title;
        let categoryId = taskData.category_id;
        let completion = taskData.completion;
        let status = taskData.status;
        let categoryName = taskData.category.name;

        let template = document.querySelector('#empty-task');
        let newTask = template.content.cloneNode(true);

        newTask = newTask.querySelector('.task');

        newTask.dataset.id = id;
        newTask.dataset.category = categoryId;

        newTask.querySelector('.task__name > input').setAttribute('value', title);
        newTask.querySelector('.task__name > p').textContent = title;
        newTask.querySelector('.task__category > p').textContent = categoryName;

        task.setProgressBar(newTask, completion);

        if (completion === 100) {
            newTask.classList.replace('task--todo', 'task--complete')
        }
        if (status === 2) {
            newTask.classList.replace('task--todo', 'task--archive')
            newTask.classList.replace('task--complete', 'task--archive')
            newTask.style.display = 'none';
        }
        



        task.bindEventListener(newTask);

        return newTask;
    },

    bindEventListener: function (taskToBeBind) {
        // attacher les écouteurs d'événements à notre nouvelle task
        if (taskToBeBind.classList.contains('task--todo') || taskToBeBind.classList.contains('task--complete')) {
        let elt1EditTitle = taskToBeBind.querySelector('.task__button--modify');
        elt1EditTitle.addEventListener('click', handler.clickOnTaskTitle);
        let elt2EditTitle = taskToBeBind.querySelector('.task__name');
        elt2EditTitle.addEventListener('click', handler.clickOnTaskTitle);
        }

        // On va chercher les inputs des tasks qui ont la classe task--todo et la classe task--complete
        // Le querySelectorAll permet de récupérer une liste d'éléments HTML, nous serons donc obligés de parcourir un à un les éléments HTML pour leur attacher un écouteur d'événement (for, for...of)
        let eltInputTitle = taskToBeBind.querySelector('.task--todo input');
        if (eltInputTitle === null) {
            eltInputTitle = taskToBeBind.querySelector('.task--complete input');
        }
        if (eltInputTitle === null) {
            eltInputTitle = taskToBeBind.querySelector('.task--archive input');
        }
        // On attache un écouteur d'événement blur et un écouteur d'événement keydown (entrée)
        eltInputTitle.addEventListener('blur', handler.taskTitle);
        eltInputTitle.addEventListener('keydown', handler.taskTitleEnterKey);

        // Passer la tâche en état fini --------------------------------
        // Il faut d'abord sélectionner tous les boutons qui permettront de déclencher l'état terminé d'une tâche
        let completeButton = taskToBeBind.querySelector('.task__button--validate');
        // Dans listCompleteButton, il y a une liste d'éléments HTML qui correspondent aux boutons task__button--validate !
        completeButton.addEventListener('click', handler.taskToggleComplete);

        // Passer la tâche en état non-fini / à faire --------------------------------
        // Il faut d'abord sélectionner tous les boutons qui permettront de revenir à l'état non terminé d'une tâche
        let incompleteButton = taskToBeBind.querySelector('.task__button--incomplete');
        // Dans listIncompleteButton, il y a une liste d'éléments HTML qui correspondent aux boutons task__button--incomplete !
        incompleteButton.addEventListener('click', handler.taskToggleComplete);

        // Passer la tâche en état archived --------------------------------
        let archiveButton = taskToBeBind.querySelector('.task__button--archive');
        archiveButton.addEventListener('click', handler.taskArchive);

        // Passer la tâche en état archived --------------------------------
        let desArchiveButton = taskToBeBind.querySelector('.task__button--desarchive');
        desArchiveButton.addEventListener('click', handler.taskDesArchive);

        // Supprimer la tâche --------------------------------
        let DesArchiveButton = taskToBeBind.querySelector('.task__button--delete');
        DesArchiveButton.addEventListener('click', handler.taskDelete);
    }

}
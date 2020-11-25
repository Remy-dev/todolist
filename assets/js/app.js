// Notre javascript principal

// On débute ici la déclaration de notre objet app
let app = {

    apiBaseUrl: 'http://127.0.0.1:8000/',
    categories: [],
    displayArchive: false,


    /**
     * Méthode qui déclenche tout notre programme
     *
     * app.init();
     *
     */
    init: function () {

        console.log('Ready player one')

        category.fetchAll();
        task.fetchAll();
        app.bindEventTaskForm();
        app.bindEventMenu();

    },

    /**
     * méthode appelée pour attacher l'écouteur d'événement submit sur le formulaire d'ajout de nouvelle tâche
     */
    bindEventTaskForm: function () {
        // Ajouter une nouvelle tâche à notre todolist --------------
        // Il faut d'abord récupérer l'élément html du formulaire, afin de pouvoir ensuite lui attacher un écouteur d'événements submit
        let formAddTask = document.querySelector('form');
        formAddTask.addEventListener('submit', handler.newTask);
    },

    bindEventMenu: function () {
        let buttonDisplayArchive = document.querySelector('.filters__task--archived a');
        buttonDisplayArchive.addEventListener('click', handler.displayArchive);
        let buttonsFilters = document.querySelectorAll('.filters__choice')
        for (let buttonFilter of buttonsFilters) {
            buttonFilter.addEventListener('click', handler.filters)
        }
    },

    /**
     * setter de la propriété app.categories
     * @param {json} categories 
     */
    setCategories: function (categories) {
        // On sauvegarde les catégories reçues en interne pour utilisation ultérieure.
        // On se fait un petit tableau associatif pour les retrouver via leur id unique.
        for (category of categories) {
            app.categories[category.id] = category;
        };
    }
}

// On déclenche le app.init() quand le DOM est complétement chargé
document.addEventListener('DOMContentLoaded', app.init);


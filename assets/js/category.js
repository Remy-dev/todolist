let category = {

    fetchAll: function() {

        let fetchOptions = {
            method: 'GET',
            mode: 'cors',
            cache: 'no-cache'
        };

        let request = fetch(app.apiBaseUrl + 'categories', fetchOptions)

        return request.then(
            function(response) {
                return response.json()
            }
        ).then(
            function (response) {
                handler.fetchedCategories(response);
            }
        )
    },

    /**
     * 
     * @param {HTML Element} selectElt 
     * @param {json} categories 
     */
    createCategoryOptions: function (selectElt, categories) {

        let option = document.createElement('option');
        option.label = 'Toutes les catégories';
        selectElt.appendChild(option);

        for (const category of categories) {
            // maintenant, on va pouvoir y remettre toutes les catégories récupérées par l'ajax
            if (category.status === 1) {
                let option = document.createElement('option');
                option.value = category.id;
                option.label = category.name;
                selectElt.appendChild(option);
            }
        }
    }
}
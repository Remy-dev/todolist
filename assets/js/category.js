let category = {

    fetchAll: function() {

        let fetchOptions = {
            method: 'GET',
            mode: 'cors',
            cache: 'no-cache'
        };

        let request = fetch(app.apiBaseUrl + 'api/categories', fetchOptions)

        return request.then(
            function (response) {
                console.log(response);
                return response.json();
            }).then(
                function (datas) {
                    handler.fetchedCategories(datas);
            }
        );
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

                let option = document.createElement('option');
                option.value = category.id;
                option.label = category.name;
                selectElt.appendChild(option);

        }
    }
}
$.ajax({
    type: 'GET',
    url: 'http://localhost:3000/api/patient',
    success: function(response) {
        var nameArray = response;
        var dataArray = nameArray['data'];
        var dataName = {};
        for (var i = 0; i < dataArray.length; i++) {
            $('div.collapsible-header').append(`
            <a class="collection-item avatar black-text" href="#">
            <span class="title">
            ${dataArray[i].name}
            </span>
            <p>${dataArray[i].city},${dataArray[i].state_province}</p>
            </a>`);
        }
        $('input.autocomplete').autocomplete({

            data: dataName,
            limit: 5,
        });
    }
});
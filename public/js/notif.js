$(document).ready(function() {
    //Autocomplete textbox
    $.ajax({
        type: 'GET',
        url: '/api/notif/patient/1',
        success: function(response) {
            let nameArray = response;
            let dataArray = nameArray['data'];
            let dataName = {};
            for (var i = 0; i < dataArray.length; i++) {
                dataName[dataArray[i].name] = dataArray[i].img;
                $('div.collection').append(`
                <li class="collection-item avatar">
                <img src="images/yuna.jpg" alt="" class="circle">
                <span class="title">${dataArray[i].id}</span>
                <p>
                Actino Type: ${dataArray[i].action_type} <br>
                Date Created: ${dataArray[i].date_created} <br>

                </p>
                </li>`);
            }
            $('input.autocomplete').autocomplete({

                data: dataName,
                limit: 5,
            });
        }
    });
});
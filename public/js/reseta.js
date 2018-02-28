$(document).ready(function(){
    $.ajax({
        type: 'GET',
        url: 'http://localhost:3000/api/pres/patient',
        data: {
            email: "kendrick004@gmail.com"
        },
        success: function(response){
            var nameArray = response;
            var dataArray = nameArray['data'];
            for(var i = 0; i < dataArray.length; i++){
                $('div.collection').append(`
                <span class="title">
                ${dataArray[i].notes}
                </span><br>`);
            }
        }
    });
});
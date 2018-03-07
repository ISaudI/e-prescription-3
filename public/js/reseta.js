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
            for(var i = 0; i < 1; i++){
                $('ul.collection').append(`
                    <li id="doc" class="collection-item"></li>
                    <li id="profile" class="collection-item"></li>
                    <li id="reseta" class="collection-item">${dataArray[i].notes}<br></li>
                `);
            }
        }
    });

    $.ajax({
        type: 'GET',
        url: 'http://localhost:3000/api/doctors',
        data: {
            name: "John"
        },
        success: function(response){
            var nameArray = response;
            var dataArray = nameArray['data'];
            for(var i = 0; i < dataArray.length; i++){
                $('li#doc').append(`
                    <h5 class="center-align">${dataArray[i].name}</h5><br>
                    <h6 class="center-align grey-text">${dataArray[i].license_no}</h6><br>
                    <h6>Office: ${dataArray[i].contact_no}</h6>
                `);
            }
        }
    });
    
    $.ajax({
        type: 'GET',
        url: 'http://localhost:3000/api/patient',
        data: {
            name: "kendrick"
        },
        success: function(response){
            var nameArray = response;
            var dataArray = nameArray['data'];
            for(var i = 0; i < dataArray.length; i++){
                $('li#profile').append(`
                    For: ${dataArray[i].name}<br>
                    Address: ${dataArray[i].country}<br>
                    ${dataArray[i].city}, ${dataArray[i].state_province}
                `);
            }
        }
    });

    // $.ajax({
    //     type: 'GET',
    //     url: 'http://localhost:3000/api/pres/details',
    //     data: {
    //         id: "1"
    //     },
    //     success: function(response){
    //         var nameArray = response;
    //         var dataArray = nameArray['data'];
    //         for(var i = 0; i < dataArray.length; i++){
    //             $('li#reseta').append(`
    //                 ${dataArray[i].drug_name} ${dataArray[i].notes}<br>
    //             `);
    //         }
    //     }
    // });
});
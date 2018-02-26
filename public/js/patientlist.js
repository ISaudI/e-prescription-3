$(document).ready(function() {
    //Autocomplete textbox
    $(function() {
        $.ajax({
            type: 'GET',
            url: 'http://localhost:3000/api/patient',
            success: function(response) {
                var nameArray = response;
                var dataArray = nameArray['data'];
                var dataName = {};
                for (var i = 0; i < dataArray.length; i++) {
                    dataName[dataArray[i].name] = dataArray[i].img;
                    $('div.collection').append(`
                    <a class="collection-item avatar black-text" href="#">
                    <img src='${dataArray[i].img}' alt="profile pic" class="circle">
                    <span class="title">
                    ${dataArray[i].name}
                    </span>
                    <p>${dataArray[i].city}, ${dataArray[i].state_province}
                    <br/>${dataArray[i].tel}</p>
                    </a>`);
                }
                $('input.autocomplete').autocomplete({

                    data: dataName,
                    limit: 5,
                });
            }
        });
    });
    $("#btnsearch").on('click',function(){
        $.ajax({
            type:'GET',
            url:'http://localhost:3000/api/patient',
            data: {
                name: $('input.autocomplete').val()
            },
            success:function(response){
                var searchArray = response;
                var searchData = searchArray['data'];
                $('div.collection').html('');
                for(var i = 0; i < searchData.length; i++){
                // dataSearch[searchData[i].name] = searchData[i].id;
                $('div.collection').append(`<a class="collection-item avatar black-text" href="#">
                <img src='${searchData[i].img}S' alt="profile" class="circle">
                <span class="title">
                ${searchData[i].name}
                </span>
                <p>${searchData[i].city}, ${searchData[i].state_province}
                <br/>${searchData[i].tel}</p>
                </a>`);
                } 

            }
        })
    });

    // $(window).load(function() {
    // 	// Animate loader off screen
    // 	$(".lds-dual-ring").fadeOut("slow");;
    // });

});
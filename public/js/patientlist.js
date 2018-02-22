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
                    dataName[dataArray[i].name] = dataArray[i].id; 
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
                var dataSearch = {};
                for(var i = 0; i < searchData.length; i++){
                    dataSearch[searchData[i].name] = searchData[i].id;
                }
                $('a.collection-item').append(JSON.stringify(dataSearch));
            }
        })
    });

    $(window).load(function() {
		// Animate loader off screen
		$(".lds-dual-ring").fadeOut("slow");;
    });

});
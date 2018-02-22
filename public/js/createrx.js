$(document).ready(function(){
    $('.modal').modal();
    $.ajax({
        type: 'GET',
        url: 'http://localhost:3000/api/drugs',
        success: function(response) {
            var drugArray = response;
            var dataArray = drugArray['data'];
            var dataDrug = {};
            for (var i = 0; i < dataArray.length; i++) {
                dataDrug[dataArray[i].name] = dataArray[i].id; 
            }
            $('input.autocomplete').autocomplete({
            
                data: dataDrug,
                limit: 5, 
            });
        }
    });
    $("#btnAddMed").on('click',function(){
        $.ajax({
            type:'GET',
            url:'http://localhost:3000/api/drugs',
            data: {
                name: $('input.autocomplete').val()
            },
            success:function(response){
                var addMedArray = response;
                var addMedData = addMedArray['data'];
                $('div.collection').html('');
                for(var i = 0; i < addMedData.length; i++){
                    // dataSearch[searchData[i].name] = searchData[i].id;
                    $('ul.collection').append(`<li class="collection-item avatar black-text" href="#">
                    <span class="title">
                    ${addMedData[i].name}
                    </span>
                    </li>`);
                }
               
            }
        })
    });
});
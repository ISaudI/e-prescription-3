$(document).ready(function(){
    /* Initialize components*/
    $('.modal').modal();
    Materialize.updateTextFields();

    /* Get all drugs in the prescription*/
    $.ajax({
        type:'GET',
        url:'http://localhost:3000/api/pres/details',
        data:{
            id:1
        },
        success: function(response){
            var prescDetails = response;
            var detailsData = prescDetails['data'];
            for (var i = 0; i<detailsData.length; i++){
                $('ul.collection').append(`
                    <li class="collection-item dismissable">
                    <span class="title">
                    ${detailsData[i].drug_name}
                    </span>
                    <p>${detailsData[i].notes}</p>
                    </li>`);
            }

        }
    });

    /* Get all drugs */
    $.ajax({
        type: 'GET',
        url: 'http://localhost:3000/api/drugs',
        success: function(response) {
            var drugArray = response;
            var dataArray = drugArray['data'];
            var dataDrug = {};
            for (var i = 0; i < dataArray.length; i++) {
                dataDrug[dataArray[i].name] = null; 
            }
            $('input.autocomplete').autocomplete({
                data: dataDrug,
                limit: 3, 
            });
        }
    });

    /* Selects desired drug */
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
                // $('div.collection').html('');
                for(var i = 0; i < addMedData.length; i++){
                    // dataSearch[searchData[i].name] = searchData[i].id;
                    $('ul.collection').append(`
                    <li class="collection-item dismissable">
                    <span class="title">
                    ${addMedData[i].name}<br/>
                    ${addMedData[i].id}
                    </span>
                    </li>`);
                    $.ajax({
                        type:'POST',
                        url:'http://localhost:3000/api/pres/details/create',
                        data:{
                            "presc_id" : 1,
                            "drug_id" : addMedData[i].id,
                            "notes": $('textarea#notes').val()
                        },
                        success:function(response){
                            alert('Medicine successfully added!');
                        }
                    });
                }
                $('#meds').val('');
               
            }
        })
    });
    // $("#btnSend").on('click', function(){
    //     /* example of adding to database */
    //     $.ajax({
    //         type: "POST",
    //         url: "http://localhost:3000/api/pres/details/create",
    //         timeout: 2000,
    //         data: { notes:'', drug_id:'' },
    //         success: function(data) {
    //             //show content
    //             alert('Success!')
    //         },
    //         error: function(jqXHR, textStatus, err) {
    //             //show error message
    //             alert('text status '+textStatus+', err '+err)
    //         }
    //     });
    // });
});
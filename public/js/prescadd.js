$(document).ready(function(){
    /* Initialize components*/
    $('.modal').modal();
    Materialize.updateTextFields();
    let pathArray = window.location.pathname.split( '/' );
    let pId = pathArray[2];
    /* Get the data of the prescription */
    $.ajax({
        type:'GET',
        url:`/api/pres/${pathArray[2]}`,
        success: function(response){

        }
    })

    /* Get all drugs in the prescription */
    $.ajax({
        type:'GET',
        url:'/api/pres/details',
        data:{
            id:pId
        },
        success: function(response){
            var prescDetails = response;
            var detailsData = prescDetails['data'];
            for (var i = 0; i<detailsData.length; i++){
                $('ul.collection').append(`
                    <li class="collection-item dismissable">
                    <input value='${detailsData[i].id}' class='hide'/>
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
        url: '/api/drugs',
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

    /* Selects desired drug  and add it to the prescription*/
    $("#btnAddMed").on('click',function(){
        $.ajax({
            type:'GET',
            url:'/api/drugs',
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
                            "presc_id" :pId,
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

    $("#btnSend").on('click', function(){
        confirm('Are you sure you want to submit?');
        $.ajax({
            type:'POST',
            url:'/api/pres/push',
            data:{
                id: pathArray[2]
            },
            success: function(response){
                alert('successfully added!');
            }
        })

    });

})
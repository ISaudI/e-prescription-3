$(document).ready(function(){
    /* Initialize components*/
    $('.modal').modal();
    Materialize.updateTextFields();

    let pathArray = window.location.pathname.split( '/' );
    let pId = pathArray[2];


    /* Get the data of the prescription */
    $.ajax({
        type:'GET',
        url:`/api/pres/${pId}`,
        success: function(response){
            let prescArray = response;
            let presData = prescArray['data'];
            for(i=0; i<presData.length; i++){
                document.getElementById('name').value = `${ presData[i].patient_name}`;
                document.getElementById('address').value = `${ presData[i].city}, ${ presData[i].state_province}`;
                if(presData[i].status == 1){
                    $(".btn-footer").remove();
                }
                if(presData[i].notes != null){
                    document.getElementById("presnote").disabled=true;
                    document.getElementById('presnote').value = `${ presData[i].notes}`;
                }
            }
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
            if(detailsData.length !== 0){
                document.getElementById("btnSend").disabled=false;
            }else{
                document.getElementById("btnSend").disabled=true;
            }
            for (var i = 0; i<detailsData.length; i++){
                $('ul.collection').append(`
                    <li class="collection-item dismissable">
                    <div class='col s4 right row'>
                        <p class='right delete-pres'><i class="material-icons prefix grey-text" id='${detailsData[i].id}'>delete_forever</i><p>
                        <p class='right edit-pres'><i class="material-icons prefix grey-text" id='${detailsData[i].id}'>edit</i><p>
                    </div>
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
                    $.ajax({
                        type:'POST',
                        url:'http://localhost:3000/api/pres/details/create',
                        data:{
                            "presc_id" :pId,
                            "drug_id" : addMedData[i].id,
                            "notes": $('textarea#notes').val()
                        },
                        success:function(response){
                            // alert('Medicine successfully added!');
                            window.location.reload(true);
                        }
                    });
                }
                $('#meds').val('');   
            }
        });
    });

    // $('.modal-trigger').on('click', function(){
    //     $.ajax({
    //         type:'POST',
    //         url: 'api/pres/update',
    //         data:{
    //             id:pId,
    //             data: $('input#presnote').val()
    //         },
    //         success: function(){
    //             console.log('note added');
    //         }
    //     })
    // });

    $("#btnSend").on('click', function(){
        confirm('Are you sure you want to submit?');
        $.ajax({
            type:'POST',
            url:'/api/pres/push',
            data:{
                id: pId
            },
            success: function(response){
                document.getElementById("btnSend").disabled = true;
                window.location.href='/prescription';
            }
        });
    });
})
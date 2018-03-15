$(document).ready(function(){
    /* Initialize components*/
    $('.modal').modal();
    Materialize.updateTextFields();
    $('select').material_select();
    $('.dropdown-button').dropdown({
        inDuration: 300,
        outDuration: 225,
        constrainWidth: false, // Does not change width of dropdown to that of the activator
        hover: true, // Activate on hover
        gutter: 0, // Spacing from edge 
        alignment: 'right', // Displays dropdown with edge aligned to the left of button
        stopPropagation: true // Stops event propagation
      }
      );
    //---end of initialization---

    /* Gets the pathname and splits it to get the prescription Id */
    let pathArray = window.location.pathname.split( '/' );
    let pId = pathArray[3];

    $(".btn-footerv").hide();
    $(".card").hide();       

    
    /* Prescription Info */
    let presData = $("input#name").data("info");
    if(presData.status !== 0){
        $(".btn-footer").hide();
        $(".dropdown").hide();
    }


    /* Checking of notification*/
    $.ajax({
        type:'GET',
        url:`/api/notif/prescription/${pId}`,
        success: function(response){
            let notifArray = response;
            let notifData = notifArray['data'];
            for(n=0; n<notifData.length; n++){
                if(notifData[n].action_type == "VOID"){
                    $(".card").show();                           
                    $("#voidmsg").show();
                    $("#voidmsg").html(`<span class="title red-text">You have voided this prescription</span>`);
                    $(".btn-footerv").hide();
                }
                else if(notifData[n].action_type == "PUSH" && notifData[n].cancel_flag == 1){
                    $(".card").show();                           
                    $("#voidmsg").show();
                    $("#voidmsg").html('<span class="title red-text">Your patient has rejected this prescription</span>');
                    $(".btn-footerv").hide();                    
                }
                else if(notifData[n].action_type == "PUSH" && notifData[n].ok_flag == 1){
                    $(".btn-footerv").show();
                }
            }
        }
    })

    /* Checks if presc_details is empty */
    if($('.collection').children().length > 0){
        $("#btnSend").prop("disabled", "");
        $('.collection').show();
    }else{
        $("#btnSend").prop("disabled", true);
        $('.collection').hide();
    }

   
    /* Get all drugs */
    $.ajax({
        type: 'GET',
        url: '/api/drugs',
        success: function(response) {
            let drugArray = response;
            let dataArray = drugArray['data'];
            let dataDrug = {};
            for (let i = 0; i < dataArray.length; i++) {
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
        if( $('input.autocomplete').val() !=="" && $('input#notes').val() !==""){
            $.ajax({
                type:'GET',
                url:'/api/drugs',
                data: {
                    name: $('input.autocomplete').val()
                },
                success:function(response){
                    let addMedArray = response;
                    let addMedData = addMedArray['data'];
                    for(let i = 0; i < addMedData.length; i++){
                        $.ajax({
                            type:'POST',
                            url:'/api/pres/details/create',
                            data:{
                                "presc_id" :pId,
                                "drug_id" : addMedData[i].id,
                                "notes": $('textarea#notes').val()
                            },
                            success:function(response){
                                // alert('Medicine successfully added!');
                                $('.collection').show();                                
                                window.location.reload(true);
                            }
                        });
                    }
                    $('#meds').val('');   
                }
            });
        }else{
            alert("Enter medicine and notes");        
        }
        
    });

    /* Getting the details of prescription */
    $(".edit_presdetail").click(function(){
        $this = $(this);
        let detailArray = $this.data("details");
        document.getElementById('updatemed').value = `${detailArray.drug_name}`;
        document.getElementById('detailsId').value = `${detailArray.id}`;
        document.getElementById('updatenotes').value = `${detailArray.notes}`;
               
    })

    /* Editing of a presc_detail */
    $("#btnUpdateMed").on('click',function(){
        if(confirm("Are you sure you want to update this medicine prescribed?")){
            $.ajax({
                type: 'POST',
                url:'/api/pres/details/update',
                data:{
                    id: $('input#detailsId').val(),
                    data:{
                        notes: $('textarea#updatenotes').val()
                    }
                },
                success: function(){
                    window.location.reload(true);
                    alert("successfully updated a medicine");
                }
            })
        }
    })

     /* Deleting of prescription details */
     $(".delete_presdetail").click(function(){
        $this = $(this);
        console.log($this.data("details"));
        let detailArray = $this.data("details");
        if(confirm("are you sure you want to delete this medicine?")){
            $.ajax({
                type:'POST',
                url: '/api/pres/details/delete',
                data:{
                    id: detailArray.id
                },
                success: function(){
                    window.location.reload(true);
                    alert("successfully deleted a medicine");
                }
            })
        }
    });

    /* Pushing of prescription */
    $("#btnSend").on('click', function(){
        if(confirm('Are you sure you want to send the prescription?')){
            $.ajax({
                type:'POST',
                url:'/api/pres/push',
                data:{
                    id: pId
                },
                success: function(response){
                    document.getElementById("btnSend").disabled = true;
                    window.location.href='/doctors/prescriptions';
                }
            })
        }
        else{
            alert('The prescription is not sent.');
        }
    });

    /* Voiding of Notification*/
    $('#btnVoid').click(function(){
        if(confirm("Are you sure you want to void this prescription?")){
            $.ajax({
                type:'POST',
                url: '/api/pres/void',
                data:{
                    id: pId
                },
                success: function(){
                    window.location.reload(true);

                }
            })
        }
    });
    
})
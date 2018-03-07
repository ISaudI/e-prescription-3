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
    let pId = pathArray[2];

    /* Prescription Info */
    let presData = $("input#name").data("info");
    if(presData.status !== 0){
        $(".btn-footer").remove();
        $(".btn-footerv").remove();
        $(".dropdown").remove();
    }else if(presData.status == 0){
        $(".btn-footerv").remove();
    }else{
        $("body").append(`<div class="btn-footerv">
        <button class="btn btn-flat btn-large white-text waves-effect red lighten-1"  style="width:100%;" id="btnVoid" >Void</button>
    </div>`);
    }

    /* Checks if presc_details is empty */
    if($('.collection').html().trim() !== ""){
        document.getElementById("btnSend").disabled=false;
        $('.collection').show();
    }else{
        document.getElementById("btnSend").disabled=true;
        $('.collection').hide();
        
    }

   
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
        if( $('input.autocomplete').val() !=="" && $('input#notes').val() !==""){
            $.ajax({
                type:'GET',
                url:'/api/drugs',
                data: {
                    name: $('input.autocomplete').val()
                },
                success:function(response){
                    var addMedArray = response;
                    var addMedData = addMedArray['data'];
                    for(var i = 0; i < addMedData.length; i++){
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
                    window.location.href='/prescription';
                }
            })
        }
        else{
            alert('The prescription is not sent.');
        }
    });
})
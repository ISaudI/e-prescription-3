$(document).ready(function(){

    let pathArray = window.location.pathname.split( '/' );
    let pId = pathArray[3];

    $("#divRequest").hide();
    $("#findPharmacy").hide();
    $("#voidcard").hide();

    /* Checking of notif */
    $.ajax({
        type:'GET',
        url:`/api/notif/prescription/${pId}`,
        success: function(response){
            let notifArray = response;
            let notifData = notifArray['data'];
            for(i=0; i<notifData.length; i++){
                if((notifData[i].action_type == "PUSH") && (notifData[i].ok_flag == 0) && (notifData[i].cancel_flag == 0)){
                    $("#divRequest").show();
                }
                else if((notifData[i].action_type == "PUSH") && (notifData[i].ok_flag == 1)){
                    $("#findPharmacy").show();
                }
                else if((notifData[i].action_type == "PUSH") && (notifData[i].cancel_flag == 1)){
                    $("#voidcard").show();
                    $("#voidmsg").show();
                    $("#voidmsg").html(`<span class="title red-text">You have rejected this prescription</span>`);
                }
                else if(notifData[i].action_type == "VOID"){
                    $("#voidcard").show();
                    $("#voidmsg").show();
                    $("#voidmsg").html(`<span class="title red-text">Your doctor has voided this prescription</span>`);
                }
            }
        }
    })

    $("#reject").on('click', function(){
        if(confirm("Are you sure you want to decline this prescription?")){
            $.ajax({
                type:'POST',
                url:'/api/notif/patient/decline',
                data:{
                    id: pId
                },
                success: function(response){
                    window.location.reload(true);
                }
            })
        }
    });

    $("#accept").on('click', function(){
        if(confirm("Are you sure you want to accept this prescription?")){
            $.ajax({
                type:'POST',
                url:'/api/notif/patient/approve',
                data:{
                    id: pId
                },
                success: function(response){
                    window.location.reload(true);
                }
            })
        }
    });
});
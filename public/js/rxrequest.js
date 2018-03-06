$(document).ready(function(){

    let pathArray = window.location.pathname.split( '/' );
    let pId = pathArray[2];

    $("#reject").on('click', function(){
        $.ajax({
            type:'POST',
            url:'/api/notif/patient/decline',
            data:{
                id: pId
            },
            success: function(response){
                document.getElementById("reject").disabled = true;
            }
        })
    });

    $("#accept").on('click', function(){
        $.ajax({
            type:'POST',
            url:'/api/notif/patient/approve',
            data:{
                id: pId
            },
            success: function(response){
                document.getElementById("accept").disabled = true;
            }
        })
    });
});
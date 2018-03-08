$(document).ready(function() {
    let pathArray = window.location.pathname.split( '/' );
    let pId = pathArray[2];

    $('#btnAdd').on('click', function(){
        let symptoms = prompt("For what illness is this prescription?","fever");
        if(pid !==0){
            $.ajax({
                type:"POST",
                url:'/api/pres/create',
                data:{
                    patient_id: pId,
                    doctor_id: config.user.id,
                    notes: symptoms,
                    status:0
                },
                success: function(response){
                    let prescArray = response;
                    let dataArray = prescArray['data']
                    window.location.href = `/prescription/${dataArray.insertId}`;
                }
            })
        }
    })
});
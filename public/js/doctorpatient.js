$(document).ready(function() {
    let pathArray = window.location.pathname.split( '/' );
    let pId = pathArray[3];

    $('#btnAdd').on('click', function(){
        let symptoms = prompt("For what illness is this prescription?","");
        if(pId !== 0){
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
                    window.location.href = `/doctors/prescriptions/${dataArray.insertId}`;
                }
            })
        }
    })
});
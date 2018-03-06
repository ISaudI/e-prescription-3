$(document).ready(function() {
    let queryParams = getQueryString()

    $.ajax({
        type:'GET',
        url:`/api/patient/${queryParams.id}`,
        success: function(response){
            let patientArray = response;
            let patientData = patientArray['data'];
            for(i=0; i<patientData.length; i++){
                $('div.head').append(`
                <div class='center-align'>
                    <img src='${patientData[i].img}' class='circle respinsive'/><br><br><span></span>
                </div>
                `);
                $('div.container').append(`
                <ul class='col s10 offset-s2'>
                    <li><i class="material-icons grey-text">person</i>
                    ${patientData[i].name}
                    </li>
                    <li><i class="material-icons grey-text">mail</i>
                    ${patientData[i].email}
                    </li>
                    <li><i class="material-icons grey-text">place</i>
                    ${patientData[i].city}, ${patientData[i].state_province}
                    </li>
                    <li><i class="material-icons grey-text">cake</i>
                    ${patientData[i].date_of_birth}
                    </li>
                </ul>
                `);
            }
        }
    })

    $('#btnAdd').on('click', function(){
        let symptoms = prompt("For what illness is this prescription?","fever");
        $.ajax({
            type:"POST",
            url:'/api/pres/create',
            data:{
                patient_id: queryParams.id,
                doctor_id: 1,
                notes: symptoms,
                status:0
            },
            success: function(response){
                let prescArray = response;
                let dataArray = prescArray['data']
                window.location.href = `/prescription/${dataArray.insertId}`;
            }
        })
    })
});
$.ajax({
        type:'GET',
        url:`/api/patient/1`,
        success: function(response){
            let patientArray = response;
            let patientData = patientArray['data'];
            for(i=0; i<patientData.length; i++){
                $('div.container').append(`
                <ul class='collection'>
                    <li class="collection-item"><i class="material-icons grey-text">person</i>
                    ${patientData[i].name}
                    </li>
                    <li class="collection-item"><i class="material-icons grey-text">mail</i>
                    ${patientData[i].email}
                    </li>
                    <li class="collection-item"><i class="material-icons grey-text">place</i>
                    ${patientData[i].city}, ${patientData[i].state_province}
                    </li>
                    <li class="collection-item"><i class="material-icons grey-text">cake</i>
                    ${patientData[i].date_of_birth}
                    </li>
                </ul>
                `);
            }
        }
    });

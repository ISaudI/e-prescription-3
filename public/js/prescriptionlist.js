//prescriptionlist.js

$(document).ready(function () {
    $.ajax({
        type: 'GET',
        url: '/api/pres/doctor',
        data: {email:'john.doe@gmail.com'},
        success: function (response) {
            let prescriptionArray = response,
                dataArray = prescriptionArray['data'];
            for (let i = 0; i < dataArray.length; i++) {
                $.ajax({
                    type:'GET',
                    url: `/api/patient/${dataArray[i].patient_id}`,
                    success: function(response){
                        let patientData = response,
                            patientArray = patientData['data'];
                        for (let x = 0; x < patientArray.length; x++){ // i variable was replaced by x as index for the 2nd loop
                                $('div.timeline').append(`
                                <div class="timeline-event">
                                <div class="card timeline-content"> 
                                <ul class="collapsible active" data-collapsible="accordion">
                                  <li>
                                    <div class="collapsible-header red lighten-1">${patientArray[x].name}
                                    </div>
                                    <div class="collapsible-body med-list-${dataArray[i].id}" style="display:block;"></div>
                                  </li>
                                </ul>
                                </div>
                                <div class="timeline-badge green white-text"><i class="material-icons">mode_edit</i></div>
                                </div>
                                `);         
                            $.ajax({
                                type:'GET',
                                url: `/api/pres/${dataArray[i].id}/details`,
                                success: function(response){
                                    let prescdetailsArray = response,
                                        prescDataArray = prescdetailsArray['data'];
                                    for (let z = 0; z < prescDataArray.length; z++){ // i variable was replaced by z as index for the 3rd loop
                                        $(`div.medlist-${dataArray[i].id}`).append(`
                                        ${prescDataArray[z].drug_short_name}
                                        ${prescDataArray[z].notes}
                                        <br />
                                        `);
                                    }
                                }
                            });
                            
                        }    
                    }
                });

            }
        }
    });
});
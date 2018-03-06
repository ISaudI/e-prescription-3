//prescriptionlist.js

$(document).ready(function () {
    //Rendering prescriptionlist through ajax
    

    $.ajax({
        type: 'GET',
        url: '/api/pres/doctor',
        data: {email:'john.doe@gmail.com'},
        success: function (response) {
            $('div.collection').append(`
            <div class="timeline">
            
            
            </div>
            </div>
            `);
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
                                        <div class="card ">
                                            <div class="card-content no-padding">
                                            <div class="deep-purple lighten-2 white-text" style="padding:3%;">
                                            <h5>${patientArray[x].name}</h5>
                                            <p> $HOSPITAL_NAME </p>
                                            </div>
                                            <div class="medlist-${dataArray[i].id}" style="padding:3%;">
                                            </div>
                                            </div>
                                        </div>
                                        </div>
                                        <div class="timeline-badge green white-text"><i class="material-icons">lightbulb_outline</i></div>
                                        `);
                            $.ajax({
                                type:'GET',
                                url: '/api/pres/details',
                                data: {id: dataArray[i].id},
                                success: function(response){
                                    let prescdetailsArray = response,
                                        prescDataArray = prescdetailsArray['data'];
                                    for (let z = 0; z < prescDataArray.length; z++){ // i variable was replaced by z as index for the 3rd loop
                                        $(`div.medlist-${dataArray[i].id}`).append(`
                                        <p>${prescDataArray[z].drug_short_name}.</p>
                                        <p>${prescDataArray[z].notes}.</p>
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
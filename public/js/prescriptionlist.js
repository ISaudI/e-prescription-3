//prescriptionlist.js

$(document).ready(function () {
    //Rendering prescriptionlist through ajax
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
                    url: `/api/patient/${dataArray[i].id}`,
                    success: function(response){
                        let patientData = response,
                            patientArray = patientData['data'];
                        for (let x = 0; x < patientArray.length; x++){ // i variable was replaced by x as index for the 2nd loop
                            $('div.collection').append(`
                            <div class="badge green darken-2 flex-center"><span class="text-white fa fa-lightbulb-o"></span></div>
                                        <ul style="border-left: 3px solid #bdbdbd; margin:3%">
                                        <li style="padding:3%">
                                        
                                        <div class="col s12 m6">
                                        <div class="card ">
                                        <div class="card-content no-padding">
                                        <div class="deep-purple lighten-2 white-text" style="padding:3%;">
                                        <h5>${patientArray[x].name}</h5>
                                        <p> $HOSPITAL_NAME </p>
                                        </div>
                                        <div class="medlist" style="padding:3%;">
                                        </div>
                                        </div>
                                        </div>
                                        </div>
                                        </li>
                                        </ul>
                                        `);
                            $.ajax({
                                type:'GET',
                                url: '/api/pres/details',
                                data: {id: dataArray[i].patient_id},
                                success: function(response){
                                    let prescdetailsArray = response,
                                        prescDataArray = prescdetailsArray['data'];
                                    for (let z = 0; z < prescDataArray.length; z++){ // i variable was replaced by z as index for the 3rd loop
                                        $('div.medlist').append(`
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
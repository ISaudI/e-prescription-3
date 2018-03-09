//prescriptionlist.js

$(document).ready(function () {
    $("#li-all").on("click",function(){
        $('.status-0').removeClass("none");
        $('.status-1').removeClass("none");
        $('.status-2').removeClass("none");
    });
    $("#li-draft").on("click",function(){
        $('.status-1').addClass("none");
        $('.status-2').addClass("none");
        $('.status-0').removeClass("none");
    });
    $("#li-presc").on("click",function (){
        $('.status-0').addClass("none");
        $('.status-2').addClass("none");
        $('.status-1').removeClass("none");
    });
    $("#li-void").on("click",function(){
        $('.status-0').addClass("none");
        $('.status-1').addClass("none");
        $('.status-2').removeClass("none");
    });
    $.ajax({
        type: 'GET',
        url: '/api/pres/doctor',
        data: {email: config.user.email},
        success: function (response) {
            let prescriptionArray = response,
                dataArray = prescriptionArray['data'];
            for (let i = 0; i < dataArray.length; i++) {
                $.ajax({
                    type:'GET',
                    url: `/api/patient/${dataArray[i].patient_id}`,
                    success: function(response){
                        let patientData = response,
                            patientArray = patientData['data'],
                            color = "",
                            light = "";
                        for (let x = 0; x < patientArray.length; x++){ // i variable was replaced by x as index for the 2nd loop
                            if(dataArray[i].status == 0){
                                color = "yellow";
                                light = "darken-3";
                            }else if(dataArray[i].status == 1){
                                color = "purple";
                                light = "lighten-3";
                            }else if(dataArray[i].status == 2){
                                color = "red";
                                light = "lighten-1";
                            }
                                $('div.timeline').append(`
                                <div class="timeline-event status-${dataArray[i].status}">
                                <div class="card timeline-content"> 
                                <ul class="collapsible active" data-collapsible="accordion">
                                  <li>
                                    <div class="collapsible-header ${color + ' ' + light}">${patientArray[x].name}
                                    </div>
                                    <div class="collapsible-body" style="display:block;">
                                        <a href="/doctors/prescriptions/${dataArray[i].id}">
                                        <div class="medlist-${dataArray[i].id}">
                                        </div>
                                        </a>
                                    </div>
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


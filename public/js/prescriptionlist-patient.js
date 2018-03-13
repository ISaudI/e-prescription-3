//prescriptionlist.js

$(document).ready(function () {
    $("#li-all").on("click",function(){
        $('.status-0').removeClass("none");
        $('.status-1').removeClass("none");
        $('.status-2').removeClass("none");
    });
    $("#li-accept").on("click",function(){
        $('.status-1').addClass("none");
        $('.status-2').addClass("none");
        $('.status-0').removeClass("none");
    });
    $("#li-reject").on("click",function (){
        $('.status-0').addClass("none");
        $('.status-2').addClass("none");
        $('.status-1').removeClass("none");
    });
    $("#li-void").on("click",function(){
        $('.status-0').addClass("none");
        $('.status-1').addClass("none");
        $('.status-2').removeClass("none");
    });

    let presData = $("ul.timeline").data("presc");    
    
    for(p=0; p<presData.length; p++){
        let pres = presData[p];
        $.ajax({
            type:"GET",
            url:`/api/pres/${pres.id}/details`,
            success: function(response){
                let prescdetailsArray = response,
                    prescDataArray = prescdetailsArray['data'];
                for (let i = 0; i < prescDataArray.length; i++){ 
                    $(`div.details-${pres.id}`).append(`
                    <p class="black-text">${prescDataArray[i].drug_short_name}<br/>
                    ${prescDataArray[i].notes}
                    </p>
                    `);
                }
            }
        });


        $.ajax({
            type:'GET',
            url:`/api/notif/prescription/${pres.id}`,
            success: function(response){
                let notifArray = response;
                let notifData = notifArray['data'];
                for(n=0; n<notifData.length; n++){
                    
                    if(notifData[n].action_type == "VOID"){
                        $(`#pres-${pres.id}`).addClass("status-2");
                    }
                    else if(notifData[n].cancel_flag == 1){
                        $(`#pres-${pres.id}`).addClass("status-1");
                                           
                    }
                    else{
                        $(`#pres-${pres.id}`).addClass("status-0");                                      
                    }

                    if($(`#pres-${pres.id}`).hasClass("status-2")){
                        $(`#pres-${pres.id}`).removeClass("status-0");                                                              
                    }
                    
                }
            }
        })

    }   
});


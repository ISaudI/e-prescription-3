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
    
    let presData = $("ul.timeline").data("presc");  
    
    

    for(p=0; p<presData.length; p++){
        let pres = presData[p];
        $.ajax({
            type:'GET',
            url: `/api/pres/${pres.id}/details`,
            success: function(response){
                let prescdetailsArray = response,
                    prescDataArray = prescdetailsArray['data'];
                for (let z = 0; z < prescDataArray.length; z++){ 
                    $(`div.details-${pres.id}`).append(`
                    <p class="black-text">
                    ${prescDataArray[z].drug_short_name}<br/>
                    ${prescDataArray[z].notes}
                    </p>
                    `);
                }
            }
        });
    }
    

});


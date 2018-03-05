$(document).ready(function() {
    let queryParams = getQueryString()

    $.ajax({
        type:'GET',
        url:`/api/doctors/${queryParams.id}`,
        success: function(response){
            let doctorArray = response;
            let doctorData = doctorArray['data'];
            for(i=0; i<doctorData.length; i++){
                $('div.container').append(`
                <ul class='collection'>
                    <li class="collection-item"><h5 class="center">
                    ${doctorData[i].name}</h5>
                    </li>
                    <li class="collection-item"><i class="material-icons grey-text">person</i>
                    ${doctorData[i].speciality}
                    </li>
                </ul>
                `);
            }
        }
    })
});
$(document).ready(function(){
    let pathArray = window.location.pathname.split( '/' );
    let pId = pathArray[2];
    $.ajax({
        type: 'GET',
        url: `/api/pres/${pId}`,
        success: function(response){
            var nameArray = response;
            var dataArray = nameArray['data'];
            for(var i = 0; i < dataArray.length; i++){
                $('ul.collection').append(`
                    <li id="doc" class="collection-item">
	                    <h5 class="center-align">${dataArray[i].doctor_name}</h5><br>
	                    <h6 class="center-align grey-text">${dataArray[i].license_no}</h6><br>
	                    <h6>Office: ${dataArray[i].contact_no}</h6>
                    </li>
                   
                    <li id="reseta" class="collection-item">${dataArray[i].notes}<br>
						
                    </li>
                `);
            }
        }
    });

});
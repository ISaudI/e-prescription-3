$(document).ready(function() {
    $.ajax({
        type: 'GET',
        url: '/api/notif/patient/1',
        success: function (response) {
            let notifArray = response,
                dataArray = notifArray['data'];
            for (var i = 0; i < dataArray.length; i++) {
				$('div.collection').append(`
                        <li class="collection-item avatar">
                        <span class="title">${dataArray[i].id}</span>
                        <p>
                        Action Type: ${dataArray[i].action_type} <br>
                        Date Created: ${dataArray[i].date_created} <br>
                        </p>
                        </li>`);
                $.ajax({
					type: 'GET',
        			url: `/api/doctors/${dataArray[i].id}`,
        			success: function(response) {
                        let doctorData = response,
                            doctorArray = doctorData['data'];
                            for (var x = 0; x < doctorArray.length; x++) {
                        		$(`p.doc`).append(`${doctorArray.name}`);
                            }
					}
				})
            }
        }
    });
});
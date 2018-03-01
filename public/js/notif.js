$(document).ready(function() {
    $.ajax({
        type: 'GET',
        url: '/api/notif/patient/1',
        success: function (response) {
            let notifArray = response,
                dataArray = notifArray['data'];
            for (var i = 0; i < dataArray.length; i++) {
                $('ul.collapsible').append(`
                    <li>
                        <div class="collapsible-header teal lighten-1 active"><h5>${dataArray[i].doctor_name}</h5></div>
                        <div class="collapsible-body">
                            <span>
                                You have received a prescription, from your last checkup with ${dataArray[i].doctor_name} on ${dataArray[i].date_created}
                            </span>
                        </div>
                    </li>`);
            }
        }
    });
});
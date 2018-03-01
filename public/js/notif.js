$(document).ready(function(){
    $.ajax({
        type: 'GET',
<<<<<<< HEAD
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
=======
        url: 'http://localhost:3000/api/doctors',
        success: function(response){
            var nameArray = response;
            var dataArray = nameArray['data'];
            var dataName = {};
            for(var i = 0; i < dataArray.length; i++){
                $('div.collapsible').append(`
                <li>
                 <div class="collapsible-header teal lighten-1 active">
                    <h5>
                        ${dataArray[i].name}
                    </h5>
                 </div>
                 <div class="collapsible-body"><span>Lorem ipsum dolor sit amet.</span></div>
                </li>`);
>>>>>>> parent of 3df5b97... Merge branch 'reseta-proto' of https://github.com/kendrick004/e-prescription into reseta-proto
            }
        }
    });
});
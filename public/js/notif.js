$(document).ready(function(){
    $.ajax({
        type: 'GET',
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
            }
        }
    });
});
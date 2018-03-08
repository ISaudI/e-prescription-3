$(document).ready(function(){
    $('#btn-login').click(function(){
        let user = $('#txt-user').val().trim();
        let pass = $('#txt-pass').val().trim();

        if(util.isBlank(user) && util.isBlank(pass)){
            alert('Please input username or password');
        }else{
            signin({
                email: user,
                pass: pass
            });
        }
    });

    $('input').keyup(function(e){
        if(e.keyCode == 13){
            $('#btn-login').trigger('click');
        }
    });

    function signin(data){
        $.ajax({
            url: config.url,
            method: 'POST',
            data: data,
            beforeSend: function(jqXHR, settings){
                $('#preloader').removeClass("hide");
                $('#btn-login').addClass("disabled");
                $('#txt-user').prop('disabled', true);
                $('#txt-pass').prop('disabled', true);
            },
            complete: function(jqXHR, settings){
                $('#preloader').addClass("hide");
                $('#btn-login').removeClass("disabled");
                $('#txt-user').prop('disabled', false);
                $('#txt-pass').prop('disabled', false);
            },
            success: function(data, status, jqXHR){
                if(data.status == 1){
                    if(config.role == 1){
                        window.location.href = '/doctors/profile'
                    }else{
                        window.location.href = '/patients/profile'
                    }
                }else{
                    alert("There is a problem with your request. Please try again.");
                }
            },
            error: function(jqXHR, textStatus, errorThrown){
                alert(errorThrown);
            }
        })
    }
});
$(function(){

    $(document).on('click', '.order-btn', function (){
        var targetModal = $($(this).data('target'));
        targetModal.find('h3.form-name').text($(this).data('h3'));
        targetModal.find('h5').text($(this).data('h5'));
        targetModal.find('img.main_img').attr("src", $(this).data('image'));
        targetModal.find('li.first_param').text($(this).data('firstparam'));
        targetModal.find('li.second_param').text($(this).data('secondparam'));
        targetModal.find('.price-block').text($(this).data('price'));
        targetModal.find('.sendRequestButton').data('product', $(this).data('h3'));
    });

    $(document).on('click', '.sendRequestButton', function (event){

        var form = $('.productRequestForm')[0];

        if(form.checkValidity() === false) {
            return true;
        }

        event.preventDefault();

        $.ajax({
            url: '/mailer.php',
            type: 'POST',
            data: {
                name: $(form).find('.nameField').val(),
                email: $(form).find('.emailField').val(),
                phone: $(form).find('.phoneField').val(),
                address: $(form).find('.addressField').val(),
                quantity: $(form).find('.quantityField').val(),
                product: $(form).find('h3.form-name').text(),
                mailType: 'requestProduct'
            },
            dataType: 'json',
            success: function(response){
                if(response === 1){
                    $(form).find('.resultOk').show('fast');
                } else {
                    $(form).find('.resultFail').show('fast');
                }
            }
        });

    });


    $(document).on('click', '.sendContactButton', function (event){

        var form = $('.contactManagerForm')[0];

        if(form.checkValidity() === false) {
            return true;
        }

        event.preventDefault();

        $.ajax({
            url: '/mailer.php',
            type: 'POST',
            data: {
                name: $(form).find('.contactName').val(),
                email: $(form).find('.contactEmail').val(),
                text: $(form).find('.contactText').val(),

                mailType: 'contactManager'
            },
            dataType: 'json',
            success: function(response){
                if(response === 1){
                    $(form).find('.resultOk').show('fast');
                } else {
                    $(form).find('.resultFail').show('fast');
                }
            }
        });

    });
});
$(document).ready(function() {
    $('#meuBotao').click(function() {
        const patas = $("#patas").val()
        const asas = $("#asas").val()
        const cor = $("#cor").val()
        const mamifero = $("#mamifero").val()

        const url = 'http://127.0.0.3:3034/';

        const data = {
        patas,
        asas,
        cor, 
        mamifero
        }; 

        $.ajax({
        url: url,
        type: 'POST',
        data: JSON.stringify(data),
        contentType: 'application/json',
        success: function(response) {
            console.log('Resposta do backend:', data);
            $('#feedback').html('Envio bem-sucedido!');  
            $('#infos').html('Dados cadastrados:', data); 
    
        },

        error: function(error) {
            console.error('Erro:', error);
            $('#feedback').html('O envio falhou');      

        }
        });

    });
});
$(document).on('ready',main)

function main(){
	cargarCamposLibro();
	$('#btnSubmit').on('click',validarForm);
}
function cargarCamposLibro(){
	$('#d_titulo').val(localStorage.getItem('titulo'));
	$('#d_autor').val(localStorage.getItem('autor'));
	$('#d_paginas').val(localStorage.getItem('paginas'));
	$('#d_editorial').val(localStorage.getItem('editorial'));
	$('#d_descrip').val(localStorage.getItem('descripcion'));
	$('#d_imagen').val(localStorage.getItem('imagen'));
}

function validarForm(){
	var verificar = true;
	$('.deslizante').hide();
	var regexRegEmail = /[\w-\.]{2,}@([\w-]{2,}\.)*([\w-]{2,}\.)[\w-]{2,4}/;

	if (!$('#emailEmisor').val()){
		$('.deslizante').text('El campo emisor del email es requerido').slideDown(1500)
		//alert("El campo emisor del emeil es requerido");
		$('#emailEmisor').focus();
		verificar = false;
	}
	else if (!regexRegEmail.exec($('#emailEmisor').val()))
	{
		$('.deslizante').text("La direccón de correo no es valida").slideDown(1500)
		//alert("La direccón de correo no es valida");
		$('#emailEmisor').focus();
		verificar = false;
	}
	else if (!$('#emailDest').val()){
		$('.deslizante').text('El campo email destino es requerido').slideDown(1500)
		//alert("El campo email destino es requerido");
		$('#emailDest').focus();
		verificar
		 = false;
	}else if (!regexRegEmail.exec($('#emailDest').val()))
	{
		$('.deslizante').text('La direccón de correo no es valida').slideDown(1500)
		//alert("La direccón de correo no es valida");
		$('#apellido').focus();
		verificar = false;
	}	

	if (verificar){
		 $(location).attr('href', 'mailto:'+$('#emailDest').val()+'?subject="Mis Libros"&body='
		 	+$('#d_titulo').val()+'\n '+$('#d_autor').val()+'\r'+$('#d_paginas').val()
		 	+' '+$('#d_editorial').val()+' '+$('#d_descrip').val()+' '+$('#d_imagen').val())
		 document.form_encuesta.submit();
	}
}
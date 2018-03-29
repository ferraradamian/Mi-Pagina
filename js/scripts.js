$(document).on('ready',main)

function main(){

	mostrarHistorial();

	$('#buscar').on('click',function(){		
		var texto = '';
		var titulo = $('#buscar_title').val();
		var autor = $('#buscar_autor').val();
		var categoria = $('#buscar_categoria').val();
		var palHistorial= palabraBuscada(titulo,autor,categoria);
		var fecha = new Date();
		fecha = fecha.toLocaleDateString("es");		
		$('#historial').hide();	
		
		if ( palHistorial != '') {
			cookie('<h5> '+fecha+' '+palHistorial+'</h5><br/>', indice());
		}	

		var buscar = 'http://www.etnassoft.com/api/v1/get/?';
		if(titulo.length > 1){
			buscar += '&book_title="'+titulo+'"';
		}
		if (autor.length > 1){
			buscar += '&book_author="'+autor+'"';
		}
		if (categoria.length > 1){
			buscar += '&category="'+categoria+'"';
		}
		console.log(buscar+'&callback=?');
		$('#items_libros').text('Cargando...');
			$.getJSON( buscar+'&callback=?',
				function ( results ){
					console.log(results);
	 				console.log(results.length);
	 				var mostar_art = 'mostar_art';
					$.each(results,function(i,item){
						if (i>=9) {
							mostar_art = 'ocultar_art';
						}
						texto += '<article class="'+mostar_art+'">';
						texto += '<img class="img_libro" src="'+item.thumbnail+'"/>';
						texto += '<div class="cont_desc_libro"><h4 class="tit_libro">Titulo: '+item.title+'<h4/>';
						texto += '<h4 class="aut_libro">Autor: '+item.author+'<h4/>';
						texto += '<h4 class="pag_libro">Paginas: '+item.pages+'<h4/>';
						texto += '<h4 class="edi_libro">Editorial: '+item.publisher+'<h4/>';
						texto += '<p class="desc_libro">Descripcion: '+item.content_short+'<p/><div>';
						texto += '<input type="button" class="compartir" value="compartir con un amigo">';
						texto += '</article>';
						if (i==9) {
							texto +='<input type="button" id="ver_mas" value="Ver mas">';
						}
					});
			$('#items_libros').text('');		
			$('#items_libros').append(texto);

			$('.compartir').on('click',function(){
				var tit = $(this).parent().parent().find('.tit_libro').text();
				var aut = $(this).parent().parent().find('.aut_libro').text();
				var pag = $(this).parent().parent().find('.pag_libro').text();
				var edi = $(this).parent().parent().find('.edi_libro').text();
				var desc = $(this).parent().parent().find('.desc_libro').text();
				var img = $(this).parent().parent().siblings('.img_libro').attr('src');
				guardarDatosLibro(tit,aut,pag,edi,desc,img);

				$(location).attr('href','compartirinfo.html'); 
			});

			$('#ver_mas').on('click',function(){
				$('#ver_mas').hide('slow');
				$('.ocultar_art').show('slow');
			});
		});
	});
}

function cookie(palabra,i){	
	if (typeof(Storage) !== "undefined") {
		if (!isPalabraStorage(palabra)){
			localStorage.setItem("PalabraBuscada"+i, palabra);
		}
	} else {
     	alert("Su navegador no soporta localStorage");
	}  	
}
function longStoragePalabrasBusc(){
	var count = 0;
	for (var i = 0; i < localStorage.length ; i++) {
		if (localStorage.key(i).search('PalabraBuscada')==0){
			count += 1;
		}
	}
	return count;
}
function indice(){
	var i = longStoragePalabrasBusc();
	if (i>9) {
		i=0;
	}else{
		i+=1;
	}
	return i
}
function isPalabraStorage(palabraBusc){
	var existe = false;
	for (var i = 1; i <= longStoragePalabrasBusc() ; i++) {
		if (localStorage.getItem("PalabraBuscada"+i) == palabraBusc){
			existe = true;
		}
	}
	return existe;
}
function mostrarHistorial(){
	var text = "";
	if (longStoragePalabrasBusc() > 0) {
		for (var i = 1; i <= longStoragePalabrasBusc(); i++) {
			text += localStorage.getItem("PalabraBuscada"+i);
		}
		$('#historial').html('<h2>Historial de busqueda:</h2><br/> '+text);
		$('#historial').show(2000);
	}else{
		$('#historial').hide();
	}	
}
function palabraBuscada(titulo,autor,categoria){
	var palabraBus = '';
	if (titulo != '') {
		palabraBus += 'Titulo: '+titulo+' ';
	}
	if (autor != '') {
		palabraBus += 'Autor: '+autor+' ';
	}
	if (categoria != '') {
		palabraBus += 'Categoria: '+categoria+' ';
	}
	return palabraBus;
}
function guardarDatosLibro(titulo,autor,paginas,editorial,descripcion,imagen){
	if (typeof(Storage) !== "undefined") {
			localStorage.setItem('titulo', titulo);
			localStorage.setItem('autor', autor);
			localStorage.setItem('paginas', paginas);
			localStorage.setItem('editorial', editorial);
			localStorage.setItem('descripcion', descripcion);
			localStorage.setItem('imagen',"Img: "+ imagen);
	} else {
     	alert("Su navegador no soporta localStorage");
	}
}
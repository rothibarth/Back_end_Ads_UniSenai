COLDIGO.produto = new Object();

$(document).ready(function(){
	
	//Carrega as marcas registradas no BD no select do formulario de inserir
	COLDIGO.produto.carregarMarcas = function(){
	
	alert("Tentando buscar marcas");
	
	 $.ajax({
			 type: "GET",
			 url: "/ProjetoTrilhaWeb/rest/marca/buscar",
			 success: function(marcas){
				 alert("Sucesso");
			 },
			 error: function(info){
				 alert("Erro");	 
			 }
		 });
	}
	 
	COLDIGO.produto.carregarMarcas(); 
	
	 
 });
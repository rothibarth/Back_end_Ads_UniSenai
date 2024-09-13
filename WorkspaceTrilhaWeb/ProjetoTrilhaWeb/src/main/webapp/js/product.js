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
				 
				 COLDIGO.exibirAviso("Erro ao buscar as marcas: " + info.status + " - " + info.statusText);
				 
				 $("#selMarca").html("");
				 var option = document.createElement("option");
				 option.setAttribute("value", "");
				 option.innerHTML = ("Erro ao carregar marcas!");
				 $("#selMarca").append(option);
				 $("#selMarca").addClass("aviso");
			 }
		 });
	}
	 
	COLDIGO.produto.carregarMarcas(); 
	
	 
 });
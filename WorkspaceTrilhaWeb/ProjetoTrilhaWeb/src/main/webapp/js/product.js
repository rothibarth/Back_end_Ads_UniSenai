COLDIGO.produto = new Object();

$(document).ready(function(){
	
	//Carrega as marcas registradas no BD no select do formulario de inserir
	COLDIGO.produto.carregarMarcas = function(){
		
	 $.ajax({
			 type: "GET",
			 url: "/ProjetoTrilhaWeb/rest/marca/buscar",
			 success: function(marcas){
				 
				 
				 if(marcas!=""){
					 
					 $("#selMarca").html("");
					 var option = document.createElement("option");
					 option.setAttribute ("value", "");
					 option.innerHTML = ("Escolha");
					 $("#selMarca").append(option);
					 
					 
					 for (var i = 0; i < marcas.lenght; i++){
						 
						 
						 var option = document.createElement("option");
						 option.setAttribute ("value", marcas[i].id);
						 option.innerHTML = (marcas[i].nome);
						 $("#selMarca").append(option);
						 
					 }
					 
				 }else{
					 
					 $("#selMarca").html("");
					 
					 var option = document.createElement("option");
					 option.setAttribute("value", "");
					 option.innerHTML = ("Cadastre uma marca primeiro!");
					 $("#selMarca").append(option);
					 $("#selMarca").addClass("aviso");

					 
				 }
				 
			 },
			
		 });
	}
	 
	COLDIGO.produto.carregarMarcas(); 
	
	 
 });
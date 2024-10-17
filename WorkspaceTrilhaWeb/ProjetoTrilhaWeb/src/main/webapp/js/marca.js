COLDIGO.marca = new Object();

$(document).ready(function(){
	
	COLDIGO.marca.cadastrarMarca = function(id){
		
		if(id!=undefined){
			select = "#selMarcaEdicao";
		}else{
			select = "#selMarca";
		}
		
		var marca = new Object();
		marca.nome = document.frmAddMarca.nome.value;
		
		if(marca.nome==""){
			COLDIGO.exibirAviso("Preencha todos os campos!");
		}else{
			
			$.ajax({
				type: "POST",
				url: COLDIGO.PATH + "marca/inserir",
				data:JSON.stringify(marca),
				success: function(msg){
					COLDIGO.exibirAviso(msg);
					$("#addMarca").trigger("reset");
				},
				error: function(info){
					COLDIGO.exibirAviso("Erro ao cadastrar uma nova marca:" + info.status + "-" + info.statusText);
				}
				
			});
		}
	}
	
	COLDIGO.marca.buscar = function(){
		
		var valorBusca = $("campoBuscaMarca").val();
		
		$.ajax({
			
			type: "GET",
			url: COLDIGO.PATH + marca/buscar,
			data: "valorBusca=" + valorBusca,
			success: function(dados){
				
				dados = JSON.parse(dados);
				$("listaMarcas").html(COLDIGO.marca.exibir(dados));
			},
			error: function(info){
				COLDIGO.exibirAviso("Erro ao consultar os contatos: " + info.status + "-" + info.statusText);
			}
			
		});
	};
	
	COLDIGO.marca.exibir = function(listaDeMarca){
		
		var tabela = "<table>" +
		"<tr>" +
		"<th>Nome</th>"+
		"<th></th>"+
		"<th class='acoes''>Ações</th>"+
		"</tr>";
		
		if(listaDeMarca != undefined && listaDeMarca.length > 0){
			
			for(var i=0; i<listaDeMarca.length; i++){
				
			}
		}
	}
	
});
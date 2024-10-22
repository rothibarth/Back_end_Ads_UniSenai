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
		
		var valorBusca = $("#campoBuscaMarca").val();
		
		$.ajax({
			
			type: "GET",
			url: COLDIGO.PATH + "marca/buscarNome",
			data: "valorBusca=" + valorBusca,
			success: function(dados){
				
				dados = JSON.parse(dados);
				$("#listaMarcas").html(COLDIGO.marca.exibir(dados));
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
		"<th class='acoes'>Ações</th>"+
		"</tr>";
		
		if(listaDeMarca != undefined && listaDeMarca.length > 0){
			
			for(var i=0; i<listaDeMarca.length; i++){
				
			tabela += "<tr>" +
						"<td>"+listaDeMarca[i].nome+"</td>" +  
						"<td>"+
						"</td>"+
						"<td>"+
							"<a onclick=\"COLDIGO.marca.exibirEdicao('"+listaDeMarca[i].id+"')\"><img src='../../imgs/edit.png' alt='Editar'></a>"+
							"<a onclick=\"COLDIGO.marca.excluir('"+listaDeMarca[i].id+"')\"><img src='../../imgs/delete.png' alt='Excluir'></a>"+
						"</td>"+
						"</tr>";
				
			}
		}else if(listaDeMarca == ""){
			tabela += "<tr><td colspan='6'>Nenhum registro encontrado</td></tr>";
		}
		
		tabela += "</table>";
		
		return tabela;
	};
	
		COLDIGO.marca.buscar();
		
		//EXCLUSÃO
		
		COLDIGO.marca.excluir = function(id){
			
			$.ajax({
				type:"DELETE",
				url: COLDIGO.PATH + "marca/excluir/" + id,
				success: function(msg){
					console.log("Mensagem de retorno:", msg); //teste pois nao tava funcionando
					COLDIGO.exibirAviso(msg);
					COLDIGO.marca.buscar();
				},
				error: function(info){
					COLDIGO.exibirAviso("Erro ao excluir marca: " + info.status + "-" + info.statusText);
				}
			});
		};
		
		COLDIGO.marca.editar = function(){
			
			var marca = new Object();
			marca.nome = document.frmEditaMarca.nome.value;
			marca.id = document.frmEditaMarca.id.value;
			$.ajax({
				type: "PUT",
				url: COLDIGO.PATH + "marca/alterar",
				data:JSON.stringify(marca),
				success: function(msg){
					COLDIGO.exibirAviso(msg);
					COLDIGO.marca.buscar();
					$("#modalEditaMarca").dialog("close");
				},
				error: function(info){
					COLDIGO.exibirAviso("Erro ao editar marca: " + info.status + " - " + info.statusText);

				}
			});

		};
		
		COLDIGO.marca.exibirEdicao = function(id){
			$.ajax({
				type: "GET",
				url: COLDIGO.PATH + "marca/buscarPorId",
				data: "id="+id,
				success: function(marca){
					
					document.frmEditaMarca.nome.value = marca.nome; 
					document.frmEditaMarca.id.value = marca.id;
					var modalEditaMarca = {
					title: "Editar Marca",
					height: 400,
					width: 550,
					modal: true,
					buttons:{
						"Salvar": function(){
							COLDIGO.marca.editar(id);
						},
						"Cancelar": function(){
							$(this).dialog("close");
						}
					},
					close: function(){
						//caso o usuario simplesmente feche a caixa de edição
						//não deve acontecer nada
					}
				};
					
				$("#modalEditaMarca").dialog(modalEditaMarca);
				
				},
				
			error: function(info){
				COLDIGO.exibirAviso("Erro ao buscar marca para edição:" + info.status + " - " + info.statusText);
			}	
			
			});
		};

	
});
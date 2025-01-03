//Cria o objeto COLDIGO que será usado como identificador do projeto
COLDIGO = new Object();

$(document).ready(function() {
	
	//Cria uma constante com o valor da URI raiz do REST
	COLDIGO.PATH = "/ProjetoTrilhaWeb/rest/";
	
    $("header").load("/ProjetoTrilhaWeb/pages/admin/general/header.html");
    $("footer").load("/ProjetoTrilhaWeb/pages/admin/general/footer.html");
    
    //Função para carregamento de paginas de conteudo, que
    //recebe como parametro o nome da pasta com a pagina a ser carregada
    
    COLDIGO.carregaPagina = function(pagename){
		
		//Remove o conteudo criado na abertura de uma janela modal pelo JQueryUI
		if($(".ui-dialog"))
			$(".ui-dialog").remove();
		//Limpa a tag section, excluindo todo o conteudo de dentro dela
		$("section").empty();
		
		//Limpa a tag section, excluindo todo o conteudo de dentro dela
		$("section").empty();
		//Carrega a pagina solicitada dentro da tag section
		$("section").load(pagename+"/", function(response, status, info){
			if(status == "error"){
				var msg = "Houve um erro ao encontrar a pagina: " + info.status + " - " + info.statusText;
				$("section").html(msg);
			}
		});
		
	}
	
	//Define as configurações base de uma modal de aviso
	COLDIGO.exibirAviso = function(aviso){
		var modal = {
			title: "Mensagem",
			height: 250,
			width: 400,
			modal: true,
			buttons: {
				"OK": function(){
					$(this).dialog("close");
				}
			}
		};
		$("#modalAviso").html(aviso);
		$("#modalAviso").dialog(modal);
	};
	
	//Exibe os valores financeiros no formato da moeda real
	COLDIGO.formatarDinheiro = function(valor){
		return valor.toFixed(2).replace('.', ',').replace(/(\d)(?=(\d{3})+\,)/g, "$1.");
	}
	
    
});

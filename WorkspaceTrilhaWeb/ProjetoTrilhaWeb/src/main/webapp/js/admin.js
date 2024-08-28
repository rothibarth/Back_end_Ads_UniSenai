//Cria o objeto COLDIGO que será usado como identificador do projeto
COLDIGO = new Object();

$(document).ready(function() {
	
    $("header").load("/ProjetoTrilhaWeb/pages/admin/general/header.html");
    $("footer").load("/ProjetoTrilhaWeb/pages/admin/general/footer.html");
    
    //Função para carregamento de paginas de conteudo, que
    //recebe como parametro o nome da pasta com a pagina a ser carregada
    
    COLDIGO.carregaPagina = function(pagename){
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
    
});

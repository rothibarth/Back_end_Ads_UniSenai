package br.com.coldigogeladeiras.rest;

import java.sql.Connection;
import java.util.ArrayList;
import java.util.List;

import javax.ws.rs.POST;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;

import com.google.gson.Gson;
import com.google.gson.JsonObject;


import br.com.coldigogeladeiras.bd.Conexao;
import br.com.coldigogeladeiras.modelo.Marca;
import br.com.coldigogeladeiras.jdbc.JDBCMarcaDAO;
@Path("marca")

public class MarcaRest extends UtilRest{
	
	@GET
	@Path("/buscar")
	@Produces(MediaType.APPLICATION_JSON)
	public Response buscar() {
		
	try {
		
		List<Marca> listaMarcas = new ArrayList<Marca>();
		
		Conexao conec = new Conexao();
		Connection conexao = conec.abrirConexao();
		JDBCMarcaDAO jdbcMarca = new JDBCMarcaDAO(conexao);
		listaMarcas = jdbcMarca.buscar();
		
		conec.fecharConexao();
		return this.buildResponse(listaMarcas);
	}catch(Exception e) {
		e.printStackTrace();
		return this.buildErrorResponse(e.getMessage());
	}
			
		
	}
	
	@POST
	@Path("/inserir")
	@Consumes("application/*")

	public Response inserir(String marcaParam) {
		
		try {
			
			Marca marca = new Gson().fromJson(marcaParam, Marca.class);
			Conexao conec = new Conexao();
			Connection conexao = conec.abrirConexao();
			
			JDBCMarcaDAO  jdbcMarca = new JDBCMarcaDAO(conexao);
			boolean retorno = jdbcMarca.inserir(marca);
			
			String msg = "";
			
			if(retorno) {
				msg = "Marca cadastrada com sucesso!";
			}else {
				msg = "Erro ao cadastrar marca.";
			}
			
			conec.fecharConexao();
			
			return this.buildResponse(msg);
			
			
		}catch(Exception e) {
			e.printStackTrace();
			return this.buildErrorResponse(e.getMessage());
		}
		
	}
	
	@GET
	@Path("/buscar")
	@Consumes("application/*")
	@Produces(MediaType.APPLICATION_JSON)
	
	public Response buscarPorNome(@QueryParam("valorBusca") String nome) {
		
		try {
			List<JsonObject> listaMarca = new ArrayList<JsonObject>();
			
			Conexao conec = new Conexao();
			Connection conexao = conec.abrirConexao();
			JDBCMarcaDAO jdbcMarca = new JDBCMarcaDAO(conexao);
			listaMarca = jdbcMarca.buscarPorNome(nome);
			conec.fecharConexao();
			
			String json = new Gson().toJson(listaMarca);
			return this.buildResponse(json);
			
		}catch(Exception e) {
			e.printStackTrace();
			
			return this.buildErrorResponse(e.getMessage());
		}
	}
}

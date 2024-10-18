package br.com.coldigogeladeiras.jdbc;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import com.google.gson.JsonObject;


import br.com.coldigogeladeiras.jdbcinterface.MarcaDAO;
import br.com.coldigogeladeiras.modelo.Marca;

public class JDBCMarcaDAO implements MarcaDAO {

	private Connection conexao;

	public JDBCMarcaDAO(Connection conexao) {
		this.conexao = conexao;
	}

	public List<Marca> buscar() {
				
		// Criação da instrução SQL para busca de todas as marcas
		String comando = "SELECT * FROM marcas";

		// Criação de uma lista para armazenar cada marca encontrada
		List<Marca> listMarcas = new ArrayList<Marca>();

		// Criação do objeto marca com valor null(ou seja, sem instancia-lo)
		Marca marca = null;

		// Abertura do try-catch
		try {

			// Uso da conexão do banco para prepara-lo para uma instrução SQL
			Statement stmt = conexao.createStatement();

			// Execução da instrução criada previamente
			// e armazenamento do resultado no objeto rs
			ResultSet rs = stmt.executeQuery(comando);

			// Enquanto houver uma proxima linha no resultado
			while (rs.next()) {

				// Criação de instancia da classe marca
				marca = new Marca();

				// Recebimento dos 2 dados retornados do BD para cada linha encontrada
				int id = rs.getInt("id");
				String nome = rs.getString("nome");

				// Setando no objeto marca os valores encontrados
				marca.setId(id);
				marca.setNome(nome);
				

				// Adução da instancia contida no objeto Marca na lista de marcas
				listMarcas.add(marca);

			}

			// Caso alguma Exception seja gerada no try, recebe-a no objeto "ex"
		} catch (Exception ex) {
			// Exibe a exceção na console
			ex.printStackTrace();
		}

		// Retorna para quem chamou o metodo a lista criada
		return listMarcas;
	}
	
	public boolean inserir(Marca marca) {
		
		String comando = " INSERT INTO marcas "
				+ " (id, nome) "
				+ " VALUES (?,?)";
		
		PreparedStatement p;

		try {
			
			p = this.conexao.prepareStatement(comando);
			
			p.setInt(1, marca.getId());
			p.setString(2, marca.getNome());
			
			//executa o comando no BD
			p.execute();
			
		}catch(SQLException e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}
	
	public List<JsonObject> buscarPorNome(String nome){ //NAO SEI SE TA CERTO OS COMANDOS SQL
		
		String comando = " SELECT * FROM marcas ";
		
		//Se o nome não estiver vazio...
		if(!nome.equals("")) {
			
		comando += " WHERE nome LIKE '%" + nome + "%' " ;
		}
		
		comando += " ORDER BY id ASC";
		
		List<JsonObject> listaMarca = new ArrayList<JsonObject>();
		JsonObject marca = null;
		
		try {
			Statement stmt = conexao.createStatement();
			ResultSet rs = stmt.executeQuery(comando);
			
			while(rs.next()) {
				int id = rs.getInt("id");
				String marcaNome = rs.getString("nome");
				
				marca = new JsonObject();
				marca.addProperty("nome", marcaNome);
				marca.addProperty("id", id);
				
				listaMarca.add(marca);
			}
			
		}catch(Exception e) {
			e.printStackTrace();
		}
		
		return listaMarca;
	}
	
	public Marca buscarPorId(int id) {
		
		String comando = " SELECT * FROM marcas WHERE marcas.id = ? ";
		Marca marca = new Marca();
		
		try {
			
			PreparedStatement p = this.conexao.prepareStatement(comando);
			p.setInt(1, id);
			ResultSet rs = p.executeQuery();
			while(rs.next()) {
				
				String nome = rs.getString("nome");
				
				marca.setId(id);
				marca.setNome(nome);
			}
			
		}catch(Exception e) {
			e.printStackTrace();
		}
		
		return marca;
	}
}

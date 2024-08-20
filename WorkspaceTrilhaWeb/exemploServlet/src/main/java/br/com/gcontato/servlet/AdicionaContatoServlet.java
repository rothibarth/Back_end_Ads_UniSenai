package br.com.gcontato.servlet;
import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
public class AdicionaContatoServlet extends HttpServlet{
	
	private static final long serialVersionUID = 1L;
	
	public AdicionaContatoServlet() {
		super();
	}
	
	@Override //que indica que estamos sobrescrevendo o método service
	//da classe mãe HttpServlet
	
	
	protected void service(HttpServletRequest request, 
			HttpServletResponse response)
	
		throws ServletException, IOException{
		
		PrintWriter out = response.getWriter();
		String nome = request.getParameter("nome");
		String fone = request.getParameter("fone");
		String email = request.getParameter("email");
		
		out.println("<h1>Nome: </h1>");
		out.println(nome);
		out.println("<h1>Telefone: </h1>");
		out.println(fone);
		out.println("<h1>Email: </h1>");
		out.println(email);
		
	}
	
	protected void doGet(HttpServletRequest request,
			HttpServletResponse response)
		throws ServletException, IOException{
		
	}
	
	protected void doPost(HttpServletRequest request,
			HttpServletResponse response)
		throws ServletException, IOException{
		
	}
				
	
}

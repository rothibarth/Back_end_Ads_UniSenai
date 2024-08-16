package br.com.gcontato.servlet;
import java.io.IOException;
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
		
	}
			
	
	
}

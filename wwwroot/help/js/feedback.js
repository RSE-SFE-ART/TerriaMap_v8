	var Window_feedback;
	function apri_Pagina(lingua) {
		var iMyWidth;
		var iMyHeight;
		//half the screen width minus half the new window width (plus 5 pixel borders).
		iMyWidth = (window.screen.width / 2) - (475 + 10);
		//half the screen height minus half the new window height (plus title and status bars).
		iMyHeight = (window.screen.height / 2) - (250 + 50);
		if(Window_feedback) {
			window.Window_feedback.close();
	}
	var sito_web = window.location.href;

	Window_feedback= window.open("http://dbeta.rse-web.it/form_feedback_terria.phtml"+ "?language=" + lingua + "&sito_web=" + sito_web,"", "left=320,width=980,height=630,top=150"); 

	
		
}
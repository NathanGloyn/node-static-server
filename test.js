(function presenter(document){
	console.log('presenter called');
	document.getElementById('btnAlert').addEventListener('click', display, false);
	
	function display(){
		alert('test');
	}
})(window.document);
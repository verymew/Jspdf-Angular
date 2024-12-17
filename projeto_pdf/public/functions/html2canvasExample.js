async function gravarPdf(dados){

	const { jsPDF } = window.jspdf;
	const doc = new jsPDF();
	
	var dadosReceb = dados;
	var dadosTratados = [];
	
	var check = document.getElementById('redCheck').value;
	var yellowCheck = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAABWklEQVR4nN2UvU4DMQzHoxLnWRjKs1Dx+ThdKbBSqTsqEtLhHC9DoXQFlbEwxFkO+aiu9MjXRSxgyVJkRX87v9gW4l9bdSsUIZxaLacW5YwQPtj5zDG6gxO+kyVuUB1aLRdWQxV2+WxKddCl6h3ScBkXhi0nDRfVUPSiCXLE7SbJKAFLnrhdu0E18KFRacyhXfWSNIybGMq58+O/uiVDvID+Gu1VEy/V8Y8EFuVNR/E3Qtir0d6rXUJ4/faKa1eCp18R13WCmQvRqiUyZgRBLAX0nXcQVsEEzNMlQAni3gRWy0cvAg0vUSzbiB5cCaZBFEW88uAn8+IK8U4W52HT6ki0rZoI4CHxdYyJYWlcLrwblrdiYFqXKS1sSrUvQsZbsetE200hZ0HxGtVQ9AjhPEN8lLSuG1yoBq4/cXTMPIrF+5qJAF5c3Hbc26ThnZ3PHONu4TtZ4n/GPgGRnUKlLmc0cAAAAABJRU5ErkJggg=='
	var greenCheck = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAAC60lEQVR4nO2Zz2tTQRDHH/46ePTHyR//hFjsKTcp7MrOOzyUelHRnqUQLb3k1noQW6glLf4HKW8GUvWi4NGW9qIogje1J/vj3Aj1yWxfAw0vyW7evk2EDAykDcn7fGd3ZmcnQTC0oQ0tt0W16KREGBWkpiWpWCB8lQh7ktQf7Qh7AuGLfo/U9K04vFGpVE4E/TZF6opEeCYRtiRBYufqlyA1OxaHl72Dj9Wii5JgWZBq2IMfd0GqIUhVZV1e8AIvSY1LUrt5wTOE7Ig4vFMY+LXlidMC4ZVrcNkqBGGJn+UUXtblWUHqbdHw8sgR3vAz3UXeJzw1RbyLatGZ3AJ8bBvZPi+q+eDj8G6/4GXT1e2e4AHhvEDYHgABuz2VWK7zPkHvvR9vv5UQFq3g+XR0cUiZ+uTHB8nawYtk/vtku1xoyLq8ah59bg88w28m89o7iJg1gucmi/sUH/DltUfJ+sFcE56d/76ftZ0QtrhpNIn+aD8iv5nCs6gOuTDSVcBhS1ws/JP1h5mRL3eAT1dhymQFcCDhSQtY6b4C+uIxgPCkBXzuvgIWrXKn2m2asGVT+MMc2DbJAaP6//zbY2OA3JGn5grsOxHA8KYgzuDJUEC3LcQ12hTIKTyZbiGDJM6q4Rt/55KpjYnC4KVxEhuW0U4iCoEn0zJqcZC1qyxZ/2NRueBJ90NPuwrgoZPNl2athPPIU+pxeN2omRMIP12IcAkvEH4YT/O4dbV9QKsIp5EndjUTFH2hORLhHB5hX6yKS8YC0lWo9vIwTlYXCSuPR38hsLWbtejcIFzqBamdnuemPKvsuwAMo57gmyIQlvoY/ZdBXuN7qEAg/wLU69KH0qnAhfGgVQ9c/UV+1dlwt2XIW/WxbUquIp9lPKsspjqp37kT1nJuusgHTG5w5O9QC1y2A9/GpyO3Hba9k94q+jNqxvqELcLSBnCE5zbcs/PFg2926Q94Df0a4RO/xy0xd5UD8TPr0IYW/P/2D5+LFXPdole1AAAAAElFTkSuQmCC'
	var getDiv = document.getElementById('imgPdf');
	
	//imagem
	var imgWidth = 0;
	var imgHeight = 0;
	const pageWidth = doc.internal.pageSize.width;
    const pageHeight = doc.internal.pageSize.height;
	var printResultadoAdi = await carregarImagem(getDiv);
    const scaleX = pageWidth / imgWidth;
    const scaleY = pageHeight / imgHeight;
	const scale = Math.min(scaleX, scaleY);
	
	console.log(yellowCheck)
	
	doc.addImage(printResultadoAdi, 'PNG', 0, 0, (imgWidth * scale), (imgHeight * scale));
		
	dadosReceb.forEach(item => dadosTratados.push([item.avaliacao, item.ordem, item.resposta, item.pontuacao]))	
	
    const colunas = ["Questão", "Ordem", "Resposta", "Gols"];
	
	doc.autoTable({
		  head: [colunas],
		  body: dadosTratados,
		  startY: 115,
		  headStyles: {
			    fillColor: "#059cf9",
			    cellPadding: 3,
		  },
		  showFoot: "lastPage",
		  foot: [["Total", "", "", 20]],
          bodyStyles: {
            fillColor: [230, 245, 255],
            minCellHeight: 12,
          },
          alternateRowStyles: {
            fillColor: [255, 255, 255],
          },
          footStyles: {
              fillColor: [255,255,255],
              textColor: [0,0,0],
          },
		  didParseCell: (data) => { 
			  
			  if(data.row.section === 'body' && data.column.index === 2 ){
				  
				  data.cell.text = ''; 
			  }
			 
		  },
		  didDrawCell: (data) => {
			  
			  if(data.row.section === 'body' && data.column.index === 2 ){
				  
	              const imgWidth = data.cell.width * 0.6;  
	              const imgHeight = data.cell.height * 0.6; 
	              const x = data.cell.x + (data.cell.width - imgWidth) / 2; 
	              const y = data.cell.y + (data.cell.height - imgHeight) / 2; 
	              
	              if(data.cell.raw == 'S'){
	            	  
	            	  doc.addImage(greenCheck, 'PNG', x, y, 5, 5);
	              } else {
	            	  
	            	  doc.addImage(check, 'PNG', x, y, 5, 5);
	              }
			  }
		  }

	});
	

	// Salvar o PDF
	doc.save('exemplo.pdf');
	
	function carregarImagem(imagem){
         
         return html2canvas(imagem, {scale: 3}).then(canvas => {
        	 
        	 imgHeight = canvas.height;
        	 imgWidth = canvas.width;
             return canvas.toDataURL("image/png")
         })
    }
}
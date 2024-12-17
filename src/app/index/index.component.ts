import { Component, OnInit } from '@angular/core';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import ApexCharts from 'apexcharts';
import html2canvas from 'html2canvas';


@Component({
  selector: 'app-index',
  imports: [CommonModule, ReactiveFormsModule ],
  templateUrl: './index.component.html',
  styleUrl: './index.component.css'
})
export class IndexComponent  implements OnInit{
  public name: string = "ju"
  public options: any;
  public chart: any;
  public chart2: any;
  public image: any;

  constructor() {

    this.options = {
      chart: {
        type: 'line'
      },
      series: [{
        name: 'sales',
        data: [30,40,35,50,49,60,70,91,125]
      }],
      xaxis: {
        categories: [1991,1992,1993,1994,1995,1996,1997, 1998,1999]
      }
    };

  }

  ngOnInit(): void {

    this.chart = new ApexCharts(document.querySelector("#chart"), this.options);
    this.chart.render();
    this.chart2 = new ApexCharts(document.querySelector("#chart2"), this.options);
    this.chart2.render();
    
  }

  async gerarPdf() : Promise<void>{

    let pdf = new jsPDF("p", "px", "a4");

    let imagem1 = await this.carregarImagem(this.chart);
    let imagem2 = await this.carregarImagem(this.chart2);
    let pgImagem = document.getElementById("row2");

    var imagemCriada = null;

    if(pgImagem){

      imagemCriada = await html2canvas(pgImagem).then((canvas) => {
        return canvas.toDataURL("image/png")
      })
    }

    //Populando pdf
    pdf.addImage(imagem1, 'PNG', 100, 150, 250, 150);
    pdf.addImage(imagem2, 'PNG', 100, 300, 250, 150);
    autoTable(pdf, {html: '#tabula',
              margin: { top: 50, left: 10, bottom: 20, right: 10 }})
   if(imagemCriada){
      pdf.addImage(imagemCriada, 'PNG', 50, 450, 350, 30)
    }

    pdf.save('pdfTabela.pdf'); 

  }

  carregarImagem(chartEscolhido: any) : Promise<any>{

    return chartEscolhido.dataURI().then((data: { imgURI: string; blob: Blob }) => {
        return data.imgURI
    });
  }

  tirarPrint(pgImagem: any) : Promise<any>{

    return html2canvas(pgImagem).then((canvas) => {
      var imagemCriada = canvas.toDataURL("image/png")

    })
  }

}

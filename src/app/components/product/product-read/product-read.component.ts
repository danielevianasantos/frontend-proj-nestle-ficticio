import { Router } from '@angular/router';
import { ProductService } from './../../Services/product.service';
import { ProdutoResult } from './../../Models/ProdutoResult';
import { Component, OnInit } from '@angular/core';
import { Produto } from '../../Models/Produto.model';

@Component({
  selector: 'app-product-read',
  templateUrl: './product-read.component.html',
  styleUrls: ['./product-read.component.css']
})
export class ProductReadComponent implements OnInit {
  public file: File = null;
  result: ProdutoResult;
  products: Produto[];
  displayedColumns = ['id','nome','preco','unidadePorCaixa','pesoPorUnidade','validade','categoriaProdutoId','action']
  constructor(private productService: ProductService , private router: Router) { }

  ngOnInit(): void {
    this.loadProducts();
  }
  deleteProduct(id: string): void {
    this.productService.delete(id).subscribe(() => {
      this.productService.showMessage("Produto excluido");
    });
    this.loadProducts();
  }
  loadProducts(): void {
    this.productService.read().subscribe((success) => {
      this.products = success;
    });
  }
  navigateToProductUpdate(id: string): void {
    this.router.navigate(['products/update/' + id]);
  }
  public exportarCsv(): void {
    this.productService.exportToFile('/DownloadCsv', 'Produtos.csv');
  }
  handleFileInput(event) {​​​​
    if(event.target.files && event.target.files[0]){​​​​ 
      this.file = event.target.files[0];  
    }​​​​
  }
  uploadFileToActivity() {
    this.productService.postFile(this.file).subscribe(
      success=> {
        this.result = success;
      });
  }
}

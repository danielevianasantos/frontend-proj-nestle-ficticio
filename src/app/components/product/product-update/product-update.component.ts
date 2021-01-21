import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from './../../Services/product.service';
import { Produto } from './../../Models/Produto.model';
import { ProdutoResult } from './../../Models/ProdutoResult';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.css']
})
export class ProductUpdateComponent implements OnInit {
  result: ProdutoResult;
  produto: Produto = {
    nome: '',
    preco: null,
    pesoPorUnidade: null,
    unidadePorCaixa: null,
    validade: '',
    categoriaProdutoId: ''
  };
  constructor(private productService: ProductService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.productService.readById(id).subscribe(success => {
      this.result = success;
      this.produto = this.result.singleData;
      });
    console.log('nome-> ' + this.produto.nome);
  }
  cancel(): void {
    this.router.navigate(['/products'])
  }
  updateProduct(): void {
    this.productService.update(this.produto).subscribe(success => {
      this.cancel();
    })
  }
}
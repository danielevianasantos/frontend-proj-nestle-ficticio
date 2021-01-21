import { Router } from '@angular/router';
import { ProductService } from './../../Services/product.service';
import { Produto } from './../../Models/Produto.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {

  product: Produto = {
    nome: '',
    preco: 0.0,
    pesoPorUnidade: 0.0,
    unidadePorCaixa: 0,
    validade: '',
    categoriaProdutoId: ''
  }
  constructor(private produtoservice: ProductService,
    private router: Router) { }

  ngOnInit(): void {
  }
  createProduct(): void {
    this.produtoservice.create(this.product).subscribe(()=>{
      this.produtoservice.showMessage('Produto criado!')
      this.router.navigate(['/products'])
    }
    )
  }
  cancel(): void {
    this.router.navigate(['/products'])
  }

}

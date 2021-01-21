import { CategoryService } from './../../Services/category.service';
import { Categoria } from './../../Models/Categoria.model';
import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'

@Component({
  selector: 'app-categories-create',
  templateUrl: './categories-create.component.html',
  styleUrls: ['./categories-create.component.css']
})
export class CategoriesCreateComponent implements OnInit {

  category: Categoria = {
    nome: '',
    fornecedorId: ''
  }

  constructor(private categoryservice: CategoryService,
    private router: Router) { }

  ngOnInit(): void {
  }

  createCategory(): void {
    this.categoryservice.create(this.category).subscribe(()=>{
      this.categoryservice.showMessage('Categoria criada!')
      this.router.navigate(['/categories'])
    }
    )
  }
  cancel(): void {
    this.router.navigate(['/categories'])
  }
}

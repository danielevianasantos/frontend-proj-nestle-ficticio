import { CategoriaResult } from './../../Models/CategoriaResult';
import { CategoryService } from './../../Services/category.service';
import { Categoria } from './../../Models/Categoria.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-categories-update',
  templateUrl: './categories-update.component.html',
  styleUrls: ['./categories-update.component.css']
})
export class CategoriesUpdateComponent implements OnInit {
  result: CategoriaResult
  category: Categoria = {
    nome:"",
    fornecedorId:""
  };
  constructor(private categoryService: CategoryService, private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.categoryService.readById(id).subscribe(success => {
      this.result = success;
      this.category = this.result.singleData;
      });
      console.log(this.result)
  }
  cancel(): void {
    this.router.navigate(['/categories'])
  }
  alterar(): void {
    this.categoryService.update(this.category).subscribe(success => {
      this.cancel();
    })
  }
}

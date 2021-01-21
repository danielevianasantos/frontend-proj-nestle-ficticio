import { Router } from '@angular/router';
import { CategoriaResult } from "./../../Models/CategoriaResult";
import { CategoryService } from "./../../Services/category.service";
import { Categoria } from "./../../Models/Categoria.model";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-categories-read",
  templateUrl: "./categories-read.component.html",
  styleUrls: ["./categories-read.component.css"],
})
export class CategoriesReadComponent implements OnInit {
  result: CategoriaResult;
  categories: Categoria[];
  public file: File = null;
  displayedColumns = ["id", "nome", "fornecedorId", "action"];
  constructor(private categoryService: CategoryService, private router: Router) {}

  ngOnInit(): void {
    this.carregarCategorias();
  }

  deleteCategory(id: string): void { console.log(id);
    this.categoryService.delete(id).subscribe(() => {
      this.categoryService.showMessage("Categoria excluida");
    });
    this.carregarCategorias();
  }

  carregarCategorias(): void {
    this.categoryService.read().subscribe((success) => {
      this.categories = success;
    });
  }
  
  updateCategory(id:string): void {console.log(id)
    this.router.navigate(['categories/update/'+id]);
  }

  public exportarCsv(): void {
    this.categoryService.exportToFile('/DownloadCsv', 'Categorias.csv');
  }

  handleFileInput(event) {​​​​
    if(event.target.files && event.target.files[0]){​​​​ 
      this.file = event.target.files[0];  
    }​​​​
  }

  uploadFileToActivity() {
    this.categoryService.postFile(this.file).subscribe(
      success=> {
        this.result = success;
      });
  }
}


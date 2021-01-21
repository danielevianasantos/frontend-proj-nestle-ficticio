import { Router } from '@angular/router';
import { CategoriaResult } from "./../Models/CategoriaResult";
import { Categoria } from "./../Models/Categoria.model";
import { catchError, map } from "rxjs/operators";
import { EMPTY } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class CategoryService {
  baseUrl = 'https://localhost:44367/CategoriaProduto';
  constructor(private router: Router, private snackBar: MatSnackBar, private http: HttpClient) {}
  showMessage(msg: string, isError: boolean = false): void {
    this.snackBar.open(msg, "OK", {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: isError ? ["msg-error"] : ["msg-success"],
    });
  }

  create(category: Categoria): Observable<Categoria> {
    return this.http
      .post<Categoria>(this.baseUrl + '/Cadastrar', category)
      .pipe(
        map((obj) => obj),
        catchError((e) => this.errorHandler(e))
      );
  }
  read(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(this.baseUrl + "/MostrarTudo")
  }
  readById(id: string): Observable<CategoriaResult> {
    const url = `${this.baseUrl + '/BuscarPorId?id='}`;
    return this.http.post<CategoriaResult>(url + id, id);
  }
  update(categoria: Categoria): Observable<CategoriaResult> {
    return this.http.put<CategoriaResult>(this.baseUrl + '/Atualizar', categoria);
  }
  delete(id: string): Observable<CategoriaResult> {
    const url = `${this.baseUrl + '/ExcluirCategoriaProduto'}`;
    return this.http.delete<CategoriaResult>(url + '?id=' + id);
  }
  errorHandler(e: any): Observable<any> {
    this.showMessage("Error!", true);
    return EMPTY;
  }
  exportToFile(route: string, filename: string = null): void {
    const token = 'my JWT';
    const headers = new HttpHeaders().set('authorization', 'Bearer ' + token);
    this.http.get(this.baseUrl + route, { headers, responseType: 'blob' as 'json' }).subscribe(
      (response: any) => {
        const dataType = response.type;
        const binaryData = [];
        binaryData.push(response);
        const downloadLink = document.createElement('a');
        downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, { type: dataType }));
        if (filename) {
          downloadLink.setAttribute('download', filename);
        }
        document.body.appendChild(downloadLink);
        downloadLink.click();
      }
    );
  }
  postFile(fileToUpload: File): Observable<CategoriaResult> {
    const formData: FormData = new FormData();
    formData.append('csvFile', fileToUpload, fileToUpload.name);
    return this.http
      .post<CategoriaResult>(this.baseUrl + '/ImportarCsv', formData );
  }
}

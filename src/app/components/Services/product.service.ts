import { Produto } from './../Models/Produto.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ProdutoResult } from '../Models/ProdutoResult';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseUrl = 'https://localhost:44367/Produto';
  constructor(private snackBar: MatSnackBar, private http: HttpClient) { }
  showMessage(msg: string, isError: boolean = false): void {
    this.snackBar.open(msg, 'OK',{
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: isError?['msg-error'] : ['msg-success']
    }
    )
  }
  read(): Observable<Produto[]>{
    return this.http.get<Produto[]>(this.baseUrl+'/MostrarTudo');
  }
  readById(id: string): Observable<ProdutoResult> {
    const url = `${this.baseUrl + "/BuscarPorId?id="}`;
    return this.http.post<ProdutoResult>(url + id, id);
  }
  create(produto: Produto): Observable<Produto>{
    return this.http.post<Produto>(this.baseUrl+'/Cadastrar', produto);
  }
  delete(id: string): Observable<ProdutoResult> {
    const url = `${this.baseUrl + "/ExcluirProduto"}`;
    return this.http.delete<ProdutoResult>(url + "?id=" + id);
  }
  update(produto: Produto): Observable<ProdutoResult> {
    return this.http.put<ProdutoResult>(this.baseUrl + '/Atualizar', produto);
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
  postFile(fileToUpload: File): Observable<ProdutoResult> {
    const formData: FormData = new FormData();
    formData.append('csvFile', fileToUpload, fileToUpload.name);
    return this.http
      .post<ProdutoResult>(this.baseUrl + '/ImportarCsv', formData );
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Observable, EMPTY } from "rxjs";
import { Fornecedor } from '../Models/Fornecedor.model';

@Injectable({
  providedIn: 'root'
})
export class ProviderService {

  baseUrl = "https://localhost:44367/Fornecedor"
  constructor(private snackBar: MatSnackBar,private http: HttpClient) { }
  showMessage(msg: string): void {
    this.snackBar.open(msg, '', { 
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top",
    });
  }
  create(provider: Fornecedor): Observable<Fornecedor>{
    return this.http.post<Fornecedor>(this.baseUrl, provider)
  }
}

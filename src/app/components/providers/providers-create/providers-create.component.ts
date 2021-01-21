import { ProviderService } from './../../Services/provider.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Fornecedor } from '../../Models/Fornecedor.model';


@Component({
  selector: 'app-providers-create',
  templateUrl: './providers-create.component.html',
  styleUrls: ['./providers-create.component.css']
})
export class ProvidersCreateComponent implements OnInit {

  provider: Fornecedor = {
    //id:'C497384E-49B6-454A-84B0-13ABAF8CA694',
    razaoSocial: "",
    cnpj: "",
    nomeFantasia: "",
    endereco: "",
    telefone: "",
    email: ""
  }
  constructor(private providerService: ProviderService,
    private router:Router) { }

  ngOnInit(): void {
  }
  createProvider(): void {
    this.providerService.create(this.provider)
      .subscribe(() => {
        this.providerService.showMessage('Feito!')
        this.router.navigate(['/providers'])
      })
    
    
  }
  cancel(): void {
    this.router.navigate(['/providers'])
  }
}

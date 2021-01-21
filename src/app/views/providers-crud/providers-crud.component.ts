import { HeaderService } from './../../components/template/header/header.service';
import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'
@Component({
  selector: 'app-providers-crud',
  templateUrl: './providers-crud.component.html',
  styleUrls: ['./providers-crud.component.css']
})
export class ProvidersCrudComponent implements OnInit {

  constructor(private router: Router, private headerService: HeaderService) 
  { 
    headerService.headerData = {
      title: 'Sistema Nestlé',
      icon: 'storefront',
      routeUrl: '/categories'
    }
  }

  ngOnInit(): void {
  }
  navigateToProductCreate(){
    this.router.navigate(['/providers/create'])
  }
}

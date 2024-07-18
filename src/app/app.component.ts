import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'portfolio-frontend-yavirac';
  isMenuVisible = true; // Variable para controlar la visibilidad del menú

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.updateTitle();
      }
    });
  }

  updateTitle(): void {
    const currentRoute = this.router.url;
    if (currentRoute.includes('catalogos')) {
      this.title = 'Catálogo';
    } else if (currentRoute.includes('catalogo-valor')) {
      this.title = 'Catálogo Valor';
    } else if (currentRoute.includes('datos-personales')) {
      this.title = 'Datos Personales';
    } 
  }

  toggleMenu(): void {
    this.isMenuVisible = !this.isMenuVisible;
  }
  
}

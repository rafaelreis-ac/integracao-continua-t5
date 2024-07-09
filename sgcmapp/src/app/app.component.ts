import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AlertaComponent } from './component/alerta/alerta.component';
import { SeletorTemaComponent } from './component/seletor-tema/seletor-tema.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    SeletorTemaComponent,
    AlertaComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'SGCM';
}

import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-barra-comandos',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './barra-comandos.component.html',
  styles: ``
})
export class BarraComandosComponent {

  @Output() eventoBusca = new EventEmitter();

  busca(termoBusca: string) {
    if (termoBusca.length >= 3 || termoBusca.length == 0) {
      this.eventoBusca.emit(termoBusca);
    }
  }

}

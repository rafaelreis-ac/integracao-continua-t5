import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-seletor-tema',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './seletor-tema.component.html',
  styles: ``
})
export class SeletorTemaComponent {

  temaSelecionado: string = '';

  ngOnInit(): void {
    this.temaSelecionado = localStorage.getItem('tema') || '';
    if (this.temaSelecionado) {
      this.mudarTema();
    }
  }

  mudarTema(): void {
    if (this.temaSelecionado) {
      let url = "/assets/css/estilo-tema-" + this.temaSelecionado + ".css";
      let linkTema = document.querySelector<HTMLLinkElement>("#link-tema");
      if (linkTema) {
        linkTema.href = url;
      }
      localStorage.setItem('tema', this.temaSelecionado);
    }
  }

}

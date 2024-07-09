import { Component } from '@angular/core';
import { AlertaService } from '../../service/alerta.service';
import { Alerta } from '../../model/alerta';
import { ETipoAlerta } from '../../model/e-tipo-alerta';
import { NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-alerta',
  standalone: true,
  imports: [],
  templateUrl: './alerta.component.html',
  styleUrl: './alerta.component.css'
})
export class AlertaComponent {

  constructor(
    private servico: AlertaService,
    private router: Router
  ) {}

  ngOnInit(): void {

    this.servico.receberAlerta().subscribe({
      next: (alerta: Alerta) => {
        this.exibirAlerta(alerta);
      }
    });

    this.router.events.subscribe({
      next: (evento) => {
        if (evento instanceof NavigationStart) {
          this.fecharAlerta();
        }
      }
    });

  }

  exibirAlerta(alerta: Alerta): void {
    const elAlerta = document.querySelector<HTMLElement>('div.alerta');
    const elMensagem = document.querySelector<HTMLElement>('div.alerta span#mensagem');
    if (elMensagem && elAlerta) {
      elMensagem.innerText = alerta.mensagem;
      elAlerta.classList.add(alerta.tipo);
      elAlerta.classList.remove('inativo');
    }
    setTimeout(() => {
      this.fecharAlerta();
    }, 5000);
  }

  fecharAlerta(): void {
    const elAlerta = document.querySelector<HTMLElement>('div.alerta');
    if (elAlerta) {
      elAlerta.classList.add('inativo');
      elAlerta.classList.remove(
        ETipoAlerta.SUCESSO,
        ETipoAlerta.ERRO
      );
    }
  }
 
}

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Atendimento } from '../../model/atendimento';
import { ETipoAlerta } from '../../model/e-tipo-alerta';
import { AlertaService } from '../../service/alerta.service';
import { AtendimentoService } from '../../service/atendimento.service';
import { BarraComandosComponent } from '../barra-comandos/barra-comandos.component';
import { IList } from '../i-list';

@Component({
  selector: 'app-atendimento',
  standalone: true,
  imports: [BarraComandosComponent, CommonModule],
  templateUrl: './atendimento.component.html',
  styles: ``
})
export class AtendimentoComponent implements IList<Atendimento> {

  constructor(
    private servico: AtendimentoService,
    private servicoAlerta: AlertaService
  ) {}

  ngOnInit(): void {
    this.get();
  }

  registros: Atendimento[] = [];

  get(termoBusca?: string | undefined): void {
    this.servico.get(termoBusca).subscribe({
      next: (resposta: Atendimento[]) => {
        this.registros = resposta
          .filter(item => {
            return ['CHEGADA', 'ATENDIMENTO'].includes(item.status);
          })
          .filter(item => {
            let data = new Date().setHours(0, 0, 0, 0);
            let hoje = new Date(data).toISOString().split('T')[0];
            return item.data == hoje;
          })
          .sort((a: any, b: any) => {
            let dataHora_a = a.data + " " + a.hora;
            let dataHora_b = b.data + " " + b.hora;
            return dataHora_a.localeCompare(dataHora_b);
          });
      }
    });
  }
  
  delete(id: number): void {
    throw new Error('Method not implemented.');
  }

  updateStatus(id: number): void {
    if (confirm('Confirma alteração no status do atendimento?')) {
      this.servico.updateStatus(id).subscribe({
        complete: () => {
          this.get();
          this.servicoAlerta.enviarAlerta({
            tipo: ETipoAlerta.SUCESSO,
            mensagem: "O status do atendimento foi alterado!"
          });
        }
      });
    }  
  }

}

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Atendimento } from '../../../model/atendimento';
import { AtendimentoService } from '../../../service/atendimento.service';
import { BarraComandosComponent } from '../../barra-comandos/barra-comandos.component';
import { IList } from '../../i-list';
import { AlertaService } from '../../../service/alerta.service';
import { ETipoAlerta } from '../../../model/e-tipo-alerta';

@Component({
  selector: 'app-agenda-list',
  standalone: true,
  imports: [CommonModule, BarraComandosComponent, RouterLink],
  templateUrl: './agenda-list.component.html',
  styles: ``
})
export class AgendaListComponent implements IList<Atendimento> {

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
            return ['AGENDADO', 'CONFIRMADO'].includes(item.status);
          })
          .filter(item => {
            let data = new Date().setHours(0, 0, 0, 0);
            let hoje = new Date(data).toISOString().split('T')[0];
            return item.data >= hoje;
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
    if (confirm('Deseja cancelar o agendamento?')) {
      this.servico.delete(id).subscribe({
        complete: () => {
          this.get();
          this.servicoAlerta.enviarAlerta({
            tipo: ETipoAlerta.SUCESSO,
            mensagem: "Agendamento cancelado com sucesso!"
          });
        }
      });
    }
  }

  updateStatus(id: number): void {
    if (confirm('Confirma alteração no status do agendamento?')) {
      this.servico.updateStatus(id).subscribe({
        complete:() => {
          this.get();
          this.servicoAlerta.enviarAlerta({
            tipo: ETipoAlerta.SUCESSO,
            mensagem: "O status do agendamento foi alterado!"
          });
        }
      });
    }  
  }

}

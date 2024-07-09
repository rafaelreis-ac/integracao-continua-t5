import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ETipoAlerta } from '../../../model/e-tipo-alerta';
import { Paciente } from '../../../model/paciente';
import { AlertaService } from '../../../service/alerta.service';
import { PacienteService } from '../../../service/paciente.service';
import { BarraComandosComponent } from '../../barra-comandos/barra-comandos.component';
import { IList } from '../../i-list';

@Component({
  selector: 'app-paciente-list',
  standalone: true,
  imports: [CommonModule, BarraComandosComponent, RouterLink],
  templateUrl: './paciente-list.component.html',
  styles: ``
})
export class PacienteListComponent implements IList<Paciente> {

  constructor(
    private servico: PacienteService,
    private servicoAlerta: AlertaService
  ) { }

  ngOnInit(): void {
    this.get();
  }

  registros: Paciente[] = Array<Paciente>();

  get(termoBusca?: string): void {
    this.servico.get(termoBusca).subscribe({
      next: (resposta: Paciente[]) => {
        this.registros = resposta;
      }
    });
  }

  delete(id: number): void {
    if (confirm('Confirma a exclusão do paciente?')) {
      this.servico.delete(id).subscribe({
        complete: () => {
          this.get();
          this.servicoAlerta.enviarAlerta({
            tipo: ETipoAlerta.SUCESSO,
            mensagem: "Paciente excluído com sucesso!"
          });
        }
      });
    }
  }

}

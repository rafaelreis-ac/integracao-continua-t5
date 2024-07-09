import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ETipoAlerta } from '../../../model/e-tipo-alerta';
import { Profissional } from '../../../model/profissional';
import { AlertaService } from '../../../service/alerta.service';
import { ProfissionalService } from '../../../service/profissional.service';
import { BarraComandosComponent } from '../../barra-comandos/barra-comandos.component';
import { IList } from '../../i-list';

@Component({
  selector: 'app-profissional-list',
  standalone: true,
  imports: [CommonModule, BarraComandosComponent, RouterLink],
  templateUrl: './profissional-list.component.html',
  styles: ``
})
export class ProfissionalListComponent implements IList<Profissional> {

  constructor(
    private servico: ProfissionalService,
    private servicoAlerta: AlertaService
  ) { }

  ngOnInit(): void {
    this.get();
  }

  registros: Profissional[] = Array<Profissional>();

  get(termoBusca?: string): void {
    this.servico.get(termoBusca).subscribe({
      next: (resposta: Profissional[]) => {
        this.registros = resposta;
      }
    });
  }

  delete(id: number): void {
    if (confirm('Confirma a exclusão do profissional?')) {
      this.servico.delete(id).subscribe({
        complete: () => {
          this.get();
          this.servicoAlerta.enviarAlerta({
            tipo: ETipoAlerta.SUCESSO,
            mensagem: "Profissional excluído com sucesso!"
          });
        }
      });
    }
  }

}

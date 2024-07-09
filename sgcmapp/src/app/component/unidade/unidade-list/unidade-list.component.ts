import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ETipoAlerta } from '../../../model/e-tipo-alerta';
import { Unidade } from '../../../model/unidade';
import { AlertaService } from '../../../service/alerta.service';
import { UnidadeService } from '../../../service/unidade.service';
import { BarraComandosComponent } from '../../barra-comandos/barra-comandos.component';
import { IList } from '../../i-list';

@Component({
  selector: 'app-unidade-list',
  standalone: true,
  imports: [CommonModule, BarraComandosComponent, RouterLink],
  templateUrl: './unidade-list.component.html',
  styles: ``
})
export class UnidadeListComponent implements IList<Unidade> {

  constructor(
    private servico: UnidadeService,
    private servicoAlerta: AlertaService
  ) { }

  ngOnInit(): void {
    this.get();
  }

  registros: Unidade[] = Array<Unidade>();

  get(termoBusca?: string): void {
    this.servico.get(termoBusca).subscribe({
      next: (resposta: Unidade[]) => {
        this.registros = resposta;
      }
    });
  }

  delete(id: number): void {
    if (confirm('Confirma a exclusão da unidade?')) {
      this.servico.delete(id).subscribe({
        complete: () => {
          this.get();
          this.servicoAlerta.enviarAlerta({
            tipo: ETipoAlerta.SUCESSO,
            mensagem: "Unidade excluída com sucesso!"
          });
        }
      });
    }
  }

}

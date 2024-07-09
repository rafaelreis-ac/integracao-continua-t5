import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ETipoAlerta } from '../../../model/e-tipo-alerta';
import { Paciente } from '../../../model/paciente';
import { AlertaService } from '../../../service/alerta.service';
import { PacienteService } from '../../../service/paciente.service';
import { IForm } from '../../i-form';

@Component({
  selector: 'app-paciente-form',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './paciente-form.component.html',
  styles: ``
})
export class PacienteFormComponent implements IForm<Paciente> {

  constructor(
      private servico: PacienteService,
      private servicoAlerta: AlertaService,
      private router: Router,
      private route: ActivatedRoute) { }

  ngOnInit(): void {

    const id = this.route.snapshot.queryParamMap.get('id');
    if (id) {
      this.servico.getById(+id).subscribe({
        next: (resposta: Paciente) => {
          this.registro = resposta;
        }
      });
    }

  }

  registro: Paciente = <Paciente>{};
  
  save(): void {
    this.servico.save(this.registro).subscribe({
      complete: () => {
        this.router.navigate(['/pacientes']);
        this.servicoAlerta.enviarAlerta({
          tipo: ETipoAlerta.SUCESSO,
          mensagem: "Operação realizada com sucesso!"
        });
      }
    });
  }

}

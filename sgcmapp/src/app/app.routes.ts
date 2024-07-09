import { Routes } from '@angular/router';
import { AgendaFormComponent } from './component/agenda/agenda-form/agenda-form.component';
import { AgendaListComponent } from './component/agenda/agenda-list/agenda-list.component';
import { AtendimentoComponent } from './component/atendimento/atendimento.component';
import { ConvenioFormComponent } from './component/convenio/convenio-form/convenio-form.component';
import { ConvenioListComponent } from './component/convenio/convenio-list/convenio-list.component';
import { EspecialidadeFormComponent } from './component/especialidade/especialidade-form/especialidade-form.component';
import { EspecialidadeListComponent } from './component/especialidade/especialidade-list/especialidade-list.component';
import { PacienteFormComponent } from './component/paciente/paciente-form/paciente-form.component';
import { PacienteListComponent } from './component/paciente/paciente-list/paciente-list.component';
import { ProfissionalFormComponent } from './component/profissional/profissional-form/profissional-form.component';
import { ProfissionalListComponent } from './component/profissional/profissional-list/profissional-list.component';
import { UnidadeFormComponent } from './component/unidade/unidade-form/unidade-form.component';
import { UnidadeListComponent } from './component/unidade/unidade-list/unidade-list.component';
import { UsuarioFormComponent } from './component/usuario/usuario-form/usuario-form.component';
import { UsuarioListComponent } from './component/usuario/usuario-list/usuario-list.component';

export const routes: Routes = [
    { path: 'agenda', component: AgendaListComponent },
    { path: 'agenda/form', component: AgendaFormComponent },
    { path: 'atendimento', component: AtendimentoComponent },
    { path: 'atendimento', component: AtendimentoComponent },
    { path: 'pacientes', component: PacienteListComponent },
    { path: 'pacientes/form', component: PacienteFormComponent },
    { path: 'profissionais', component: ProfissionalListComponent },
    { path: 'profissionais/form', component: ProfissionalFormComponent },
    { path: 'convenios', component: ConvenioListComponent},
    { path: 'convenios/form', component: ConvenioFormComponent},
    { path: 'config', children: [
        { path: 'unidades', component: UnidadeListComponent },
        { path: 'unidades/form', component: UnidadeFormComponent },
        { path: 'especialidades', component: EspecialidadeListComponent },
        { path: 'especialidades/form', component: EspecialidadeFormComponent },
        { path: 'usuarios', component: UsuarioListComponent },
        { path: 'usuarios/form', component: UsuarioFormComponent }
    ] },
    { path: '**', redirectTo: '' }
];

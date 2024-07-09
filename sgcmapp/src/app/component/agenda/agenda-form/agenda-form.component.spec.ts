import { Location } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { of } from 'rxjs';
import mockAtendimentos from '../../../../assets/json/atendimentos.json';
import mockConvenios from '../../../../assets/json/convenios.json';
import mockPacientes from '../../../../assets/json/pacientes.json';
import mockProfissionais from '../../../../assets/json/profissionais.json';
import { routes } from '../../../app.routes';
import { AlertaService } from '../../../service/alerta.service';
import { AtendimentoService } from '../../../service/atendimento.service';
import { ConvenioService } from '../../../service/convenio.service';
import { PacienteService } from '../../../service/paciente.service';
import { ProfissionalService } from '../../../service/profissional.service';
import { TestUtils } from '../../../utils/test-utils';
import { AgendaFormComponent } from './agenda-form.component';

describe('AgendaFormComponent', () => {
  let component: AgendaFormComponent;
  let fixture: ComponentFixture<AgendaFormComponent>;

  const serviceMock = {
    getById: jasmine.createSpy('getById').and.returnValue(of(mockAtendimentos[0])),
    save: jasmine.createSpy('save').and.returnValue(of(mockAtendimentos[0]))
  };

  const serviceConvenioMock = {
    get: jasmine.createSpy('get').and.returnValue(of(mockConvenios))
  };

  const servicePacienteMock = {
    get: jasmine.createSpy('get').and.returnValue(of(mockPacientes))
  };

  const serviceProfissionalMock = {
    get: jasmine.createSpy('get').and.returnValue(of(mockProfissionais))
  };

  const mockActivatedRoute = {
    snapshot: {
      queryParamMap: {
        get: jasmine.createSpy('get')
      }
    }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AgendaFormComponent,
        RouterModule.forRoot(routes),
        FormsModule,
        HttpClientTestingModule],
      providers: [
        { provide: AtendimentoService, useValue: serviceMock },
        { provide: ConvenioService, useValue: serviceConvenioMock },
        { provide: PacienteService, useValue: servicePacienteMock },
        { provide: ProfissionalService, useValue: serviceProfissionalMock },
        { provide: ActivatedRoute, useValue: mockActivatedRoute }]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgendaFormComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    mockActivatedRoute.snapshot.queryParamMap.get.calls.reset();
    serviceMock.getById.calls.reset();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('deve chamar servico.getById quando id está presente', () => {
    mockActivatedRoute.snapshot.queryParamMap.get.and.returnValue('1');
    component.ngOnInit();
    expect(serviceMock.getById).toHaveBeenCalledWith(1);
  });

  it('não deve chamar servico.getById quando id não está presente', () => {
    mockActivatedRoute.snapshot.queryParamMap.get.and.returnValue(null);
    component.ngOnInit();
    expect(serviceMock.getById).not.toHaveBeenCalled();
  });

  it('deve chamar servico.save quando clicar no botão "Salvar"', () => {
    mockActivatedRoute.snapshot.queryParamMap.get.and.returnValue('1');
    component.ngOnInit();
    let botaoSalvar = fixture.nativeElement.querySelector('input[value="Salvar"]');
    botaoSalvar.click();
    expect(serviceMock.save).toHaveBeenCalledWith(mockAtendimentos.find(item => item.id == 1));
  });

  it('deve mudar a rota ao salvar', async () => {
    let botaoSalvar = fixture.nativeElement.querySelector('input[value="Salvar"]');
    botaoSalvar.click();
    await fixture.whenStable();
    const location: Location = TestBed.inject(Location);
    expect(location.path()).toBeTruthy();
  });

  it('deve definir a propriedade routerLink no botão "Cancelar"', () => {
    let botaoCancelar = fixture.nativeElement.querySelector('input[value="Cancelar"]');
    expect(botaoCancelar.getAttribute('routerLink')).not.toBeNull();
  });

  it('deve ter uma rota definida para o componente', () => {
    const rota = TestUtils.encontrarRotaDoComponente(routes, AgendaFormComponent);
    expect(rota).toBeDefined();
  });

  it('deve listar as opções de convênio no formulário ao iniciar', () => {
    mockActivatedRoute.snapshot.queryParamMap.get.and.returnValue(null);
    component.ngOnInit();
    fixture.detectChanges();
    let select = fixture.nativeElement.querySelector('select#convenio');
    expect(select).not.toBeNull();
    mockConvenios.forEach(convenio => {
      expect(select.innerHTML).toContain(convenio.nome);
    });
  });

  it('deve listar as opções de paciente no formulário ao iniciar', () => {
    mockActivatedRoute.snapshot.queryParamMap.get.and.returnValue(null);
    component.ngOnInit();
    fixture.detectChanges();
    let select = fixture.nativeElement.querySelector('select#paciente');
    expect(select).not.toBeNull();
    mockPacientes.forEach(paciente => {
      expect(select.innerHTML).toContain(paciente.nome);
    });
  });

  it('deve listar as opções de profissional no formulário ao iniciar', () => {
    mockActivatedRoute.snapshot.queryParamMap.get.and.returnValue(null);
    component.ngOnInit();
    fixture.detectChanges();
    let select = fixture.nativeElement.querySelector('select#profissional');
    expect(select).not.toBeNull();
    mockProfissionais.forEach(profissional => {
      expect(select.innerHTML).toContain(profissional.nome);
    });
  });

  it('deve exibir uma mensagem de confirmação ao salvar ', () => {
    const servicoAlerta = TestBed.inject(AlertaService);
    spyOn(servicoAlerta, 'enviarAlerta');
    let botaoSalvar = fixture.nativeElement.querySelector('input[value="Salvar"]');
    botaoSalvar.click();
    expect(servicoAlerta.enviarAlerta).toHaveBeenCalled();
  });
});

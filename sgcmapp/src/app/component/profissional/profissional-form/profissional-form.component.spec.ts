import { Location } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { of } from 'rxjs';
import mockEspecialidades from '../../../../assets/json/especialidades.json';
import mockProfissionais from '../../../../assets/json/profissionais.json';
import mockUnidades from '../../../../assets/json/unidades.json';
import { routes } from '../../../app.routes';
import { AlertaService } from '../../../service/alerta.service';
import { EspecialidadeService } from '../../../service/especialidade.service';
import { ProfissionalService } from '../../../service/profissional.service';
import { UnidadeService } from '../../../service/unidade.service';
import { TestUtils } from '../../../utils/test-utils';
import { ProfissionalFormComponent } from './profissional-form.component';

describe('ProfissionalFormComponent', () => {
  let component: ProfissionalFormComponent;
  let fixture: ComponentFixture<ProfissionalFormComponent>;

  const serviceMock = {
    getById: jasmine.createSpy('getById').and.returnValue(of(mockProfissionais[0])),
    save: jasmine.createSpy('save').and.returnValue(of(mockProfissionais[0]))
  };

  const serviceEspecialidadeMock = {
    get: jasmine.createSpy('get').and.returnValue(of(mockEspecialidades))
  };

  const serviceUnidadeMock = {
    get: jasmine.createSpy('get').and.returnValue(of(mockUnidades))
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
        ProfissionalFormComponent,
        RouterModule.forRoot(routes),
        FormsModule,
        HttpClientTestingModule],
      providers: [
        { provide: ProfissionalService, useValue: serviceMock },
        { provide: EspecialidadeService, useValue: serviceEspecialidadeMock },
        { provide: UnidadeService, useValue: serviceUnidadeMock },
        { provide: ActivatedRoute, useValue: mockActivatedRoute }]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfissionalFormComponent);
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
    expect(serviceMock.save).toHaveBeenCalledWith(mockProfissionais.find(item => item.id == 1));
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
    const rota = TestUtils.encontrarRotaDoComponente(routes, ProfissionalFormComponent);
    expect(rota).toBeDefined();
  });

  it('deve listar as opções de especialidade no formulário ao iniciar', () => {
    mockActivatedRoute.snapshot.queryParamMap.get.and.returnValue(null);
    component.ngOnInit();
    fixture.detectChanges();
    let select = fixture.nativeElement.querySelector('select#especialidade');
    expect(select).not.toBeNull();
    mockEspecialidades.forEach(especialidade => {
      expect(select.innerHTML).toContain(especialidade.nome);
    });
  });

  it('deve listar as opções de unidade no formulário ao iniciar', () => {
    mockActivatedRoute.snapshot.queryParamMap.get.and.returnValue(null);
    component.ngOnInit();
    fixture.detectChanges();
    let select = fixture.nativeElement.querySelector('select#unidade');
    expect(select).not.toBeNull();
    mockUnidades.forEach(unidade => {
      expect(select.innerHTML).toContain(unidade.nome);
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

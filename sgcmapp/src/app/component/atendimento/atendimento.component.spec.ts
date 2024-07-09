import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { of } from 'rxjs';
import mockAtendimentos from '../../../assets/json/atendimentos.json';
import { routes } from '../../app.routes';
import { AtendimentoService } from '../../service/atendimento.service';
import { TestUtils } from '../../utils/test-utils';
import { AtendimentoComponent } from './atendimento.component';

describe('AtendimentoComponent', () => {
  let component: AtendimentoComponent;
  let fixture: ComponentFixture<AtendimentoComponent>;
  let service: AtendimentoService;

  const serviceMock = {
    get: jasmine.createSpy('get').and.returnValue(of(mockAtendimentos))
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AtendimentoComponent,
        RouterModule.forRoot(routes)],
      providers: [
        { provide: AtendimentoService, useValue: serviceMock }
      ]
    })
    .compileComponents();

    jasmine.clock().install();
    jasmine.clock().mockDate(new Date('2024-07-01'));
    
    fixture = TestBed.createComponent(AtendimentoComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(AtendimentoService);
    fixture.detectChanges();
  });

  afterEach(function() {
      jasmine.clock().uninstall();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('deve chamar o método "get" do serviço ao iniciar', () => {
    expect(service.get).toHaveBeenCalled();
  });

  it('deve exibir os nomes dos pacientes', () => {
    fixture.detectChanges();
    let linhas = fixture.nativeElement.querySelectorAll('table > tbody > tr') as HTMLTableRowElement[];
    linhas.forEach(linha => {
      let nome = linha?.cells[2]?.textContent?.trim() || '';
      expect(mockAtendimentos.map(a => a.paciente.nome).includes(nome)).toBeTrue();
    });
  });

  it('deve exibir mensagem de nenhum registro encontrado', () => {
    component.registros = [];
    fixture.detectChanges();
    let mensagem = fixture.nativeElement.querySelector('tfoot > tr > td > span');
    expect(mensagem.textContent).toContain('Nenhum registro encontrado');
  });

  it('deve ter uma rota definida para o componente', () => {
    const rota = TestUtils.encontrarRotaDoComponente(routes, AtendimentoComponent);
    expect(rota).toBeDefined();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { of } from 'rxjs';
import mockConvenios from '../../../../assets/json/convenios.json';
import { routes } from '../../../app.routes';
import { AlertaService } from '../../../service/alerta.service';
import { ConvenioService } from '../../../service/convenio.service';
import { TestUtils } from '../../../utils/test-utils';
import { ConvenioListComponent } from './convenio-list.component';

describe('ConvenioListComponent', () => {
  let component: ConvenioListComponent;
  let fixture: ComponentFixture<ConvenioListComponent>;
  let service: ConvenioService;

  const serviceMock = {
    get: jasmine.createSpy('get').and.returnValue(of(mockConvenios)),
    delete: jasmine.createSpy('delete').and.returnValue(of({}))
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ConvenioListComponent,
        RouterModule.forRoot(routes)],
      providers: [
        { provide: ConvenioService, useValue: serviceMock }
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConvenioListComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(ConvenioService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('deve chamar o método "get" do serviço ao iniciar', () => {
    expect(service.get).toHaveBeenCalled();
  });

  it('deve exibir os nomes dos convênios', () => {
    fixture.detectChanges();
    let linhas = fixture.nativeElement.querySelectorAll('table > tbody > tr');
    linhas.forEach((linha: any, index: any) => {
      const colunaPaciente = linha.cells[1];
      const textoCelula = colunaPaciente.textContent.trim();
      expect(textoCelula).toEqual(mockConvenios[index].nome);
    });
  });

  it('deve exibir o total de registros', () => {
    fixture.detectChanges();
    let totalRegistros = fixture.nativeElement.querySelector('tfoot > tr > td > span');
    expect(totalRegistros.textContent).toContain(mockConvenios.length);
  });

  it('deve exibir mensagem de nenhum registro encontrado', () => {
    component.registros = [];
    fixture.detectChanges();
    let mensagem = fixture.nativeElement.querySelector('tfoot > tr > td > span');
    expect(mensagem.textContent).toContain('Nenhum registro encontrado');
  });

  it('deve chamar o método "delete" do componente ao clicar em "Excluir"', () => {
    spyOn(component, 'delete').and.callThrough();
    let botoes = fixture.nativeElement.querySelectorAll('a.botao.excluir') as HTMLAnchorElement[];
    botoes.forEach((botao, index) => {
      botao.click();
      expect(component.delete).toHaveBeenCalledWith(mockConvenios[index].id);
    });
  });

  it('deve chamar o método "delete" do serviço ao remover um registro', () => {
    spyOn(window, 'confirm').and.returnValue(true);
    const id = 1;
    component.delete(id);
    expect(service.delete).toHaveBeenCalledWith(id);
  });

  it('deve ter uma rota definida para o componente', () => {
    const rota = TestUtils.encontrarRotaDoComponente(routes, ConvenioListComponent);
    expect(rota).toBeDefined();
  });

  it('deve exibir uma mensagem de confirmação ao excluir', () => {
    const servicoAlerta = TestBed.inject(AlertaService);
    spyOn(servicoAlerta, 'enviarAlerta');
    spyOn(window, 'confirm').and.returnValue(true);
    let botoesExcluir: HTMLAnchorElement[] = fixture.nativeElement.querySelectorAll('a.botao.excluir');
    botoesExcluir[0].click();
    expect(servicoAlerta.enviarAlerta).toHaveBeenCalled();
  });

  it('deve exibir o BarraComandosComponent', () => {
    let barraComandos = fixture.nativeElement.querySelector('app-barra-comandos');
    expect(barraComandos).toBeTruthy();
  });
});

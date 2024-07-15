import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Atendimento } from '../model/atendimento';
import { AtendimentoService } from './atendimento.service';
import { environment } from '../../environments/environment';

describe('AtendimentoService', () => {
  let service: AtendimentoService;
  let httpTestingController: HttpTestingController;
  let apiUrl = environment.API_URL;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(AtendimentoService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('deve chamar HttpClient ao executar o método get()', () => {
    service.get().subscribe();
    let url = apiUrl + '/atendimento/';
    const req = httpTestingController.expectOne(url);
    expect(req.request.method).toBe('GET');
  });

  it('deve chamar HttpClient ao executar o método get(termoBusca)', () => {
    service.get('teste').subscribe();
    let url = apiUrl + '/atendimento/busca/teste';
    const req = httpTestingController.expectOne(url);
    expect(req.request.method).toBe('GET');
  });

  it('deve chamar HttpClient ao executar o método getById()', () => {
    service.getById(1).subscribe();
    let url = apiUrl + '/atendimento/1';
    const req = httpTestingController.expectOne(url);
    expect(req.request.method).toBe('GET');
  });

  it('deve chamar HttpClient ao executar o método save() para um objeto sem id', () => {
    service.save(<Atendimento>{}).subscribe();
    let url = apiUrl + '/atendimento/';
    const req = httpTestingController.expectOne(url);
    expect(req.request.method).toBe('POST');    
  });

  it('deve chamar HttpClient ao executar o método save() para um objeto com id', () => {
    service.save(<Atendimento>{id: 1}).subscribe();
    let url = apiUrl + '/atendimento/';
    const req = httpTestingController.expectOne(url);
    expect(req.request.method).toBe('PUT');
  });

  it('deve chamar HttpClient ao executar o método delete()', () => {
    service.delete(1).subscribe();
    let url = apiUrl + '/atendimento/1';
    const req = httpTestingController.expectOne(url);
    expect(req.request.method).toBe('DELETE');
  });
});

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from '../../environments/environment';
import { Profissional } from '../model/profissional';
import { ProfissionalService } from './profissional.service';

describe('ProfissionalService', () => {
  let service: ProfissionalService;
  let httpTestingController: HttpTestingController;
  let apiUrl = environment.API_URL;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(ProfissionalService);
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
    let url = apiUrl + '/profissional/';
    const req = httpTestingController.expectOne(url);
    expect(req.request.method).toBe('GET');
  });

  it('deve chamar HttpClient ao executar o método get(termoBusca)', () => {
    service.get('teste').subscribe();
    let url = apiUrl + '/profissional/busca/teste';
    const req = httpTestingController.expectOne(url);
    expect(req.request.method).toBe('GET');
  });

  it('deve chamar HttpClient ao executar o método getById()', () => {
    service.getById(1).subscribe();
    let url = apiUrl + '/profissional/1';
    const req = httpTestingController.expectOne(url);
    expect(req.request.method).toBe('GET');
  });

  it('deve chamar HttpClient ao executar o método save() para um objeto sem id', () => {
    service.save(<Profissional>{}).subscribe();
    let url = apiUrl + '/profissional/';
    const req = httpTestingController.expectOne(url);
    expect(req.request.method).toBe('POST');    
  });

  it('deve chamar HttpClient ao executar o método save() para um objeto com id', () => {
    service.save(<Profissional>{id: 1}).subscribe();
    let url = apiUrl + '/profissional/';
    const req = httpTestingController.expectOne(url);
    expect(req.request.method).toBe('PUT');
  });

  it('deve chamar HttpClient ao executar o método delete()', () => {
    service.delete(1).subscribe();
    let url = apiUrl + '/profissional/1';
    const req = httpTestingController.expectOne(url);
    expect(req.request.method).toBe('DELETE');
  });
});

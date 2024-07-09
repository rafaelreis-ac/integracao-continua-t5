import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Especialidade } from '../model/especialidade';
import { EspecialidadeService } from './especialidade.service';

describe('EspecialidadeService', () => {
  let service: EspecialidadeService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(EspecialidadeService);
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
    const req = httpTestingController.expectOne('http://localhost:9000/config/especialidade/');
    expect(req.request.method).toBe('GET');
  });

  it('deve chamar HttpClient ao executar o método get(termoBusca)', () => {
    service.get('teste').subscribe();
    const req = httpTestingController.expectOne('http://localhost:9000/config/especialidade/busca/teste');
    expect(req.request.method).toBe('GET');
  });

  it('deve chamar HttpClient ao executar o método getById()', () => {
    service.getById(1).subscribe();
    const req = httpTestingController.expectOne('http://localhost:9000/config/especialidade/1');
    expect(req.request.method).toBe('GET');
  });

  it('deve chamar HttpClient ao executar o método save() para um objeto sem id', () => {
    service.save(<Especialidade>{}).subscribe();
    const req = httpTestingController.expectOne('http://localhost:9000/config/especialidade/');
    expect(req.request.method).toBe('POST');    
  });

  it('deve chamar HttpClient ao executar o método save() para um objeto com id', () => {
    service.save(<Especialidade>{id: 1}).subscribe();
    const req = httpTestingController.expectOne('http://localhost:9000/config/especialidade/');
    expect(req.request.method).toBe('PUT');
  });

  it('deve chamar HttpClient ao executar o método delete()', () => {
    service.delete(1).subscribe();
    const req = httpTestingController.expectOne('http://localhost:9000/config/especialidade/1');
    expect(req.request.method).toBe('DELETE');
  });
});

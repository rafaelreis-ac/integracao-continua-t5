import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AlertaService } from '../service/alerta.service';
import { catchError, throwError } from 'rxjs';
import { ETipoAlerta } from '../model/e-tipo-alerta';

const ERRO_HTTP: Record<number, string> = {
  404: "Recurso não encontrado.",
  500: "Erro interno do servidor."
}

export const erroInterceptor: HttpInterceptorFn = (req, next) => {
  const servicoAlerta = inject(AlertaService);
  return next(req).pipe(
    catchError(erro => {
      let mensagemErro = ERRO_HTTP[erro.status] || erro.error?.message || "Falha na requisição.";
      servicoAlerta.enviarAlerta({
        tipo: ETipoAlerta.ERRO,
        mensagem: mensagemErro
      });
      return throwError(() => erro);
    })
  );
};

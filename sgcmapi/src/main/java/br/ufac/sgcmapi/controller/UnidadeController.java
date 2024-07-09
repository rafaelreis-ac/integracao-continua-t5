package br.ufac.sgcmapi.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.ufac.sgcmapi.model.Unidade;
import br.ufac.sgcmapi.service.UnidadeService;

@RestController
@RequestMapping("/config/unidade")
public class UnidadeController implements IController<Unidade> {

    @Autowired
    private UnidadeService servico;

    @Override
    @GetMapping("/")
    public ResponseEntity<List<Unidade>> get() {
        List<Unidade> registros = servico.get();
        return ResponseEntity.ok(registros);
    }

    @Override
    @GetMapping("/{id}")
    public ResponseEntity<Unidade> get(@PathVariable("id") Long id) {
        Unidade registro = servico.get(id);
        if (registro == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        return ResponseEntity.ok(registro);
    }

    @Override
    @GetMapping("/busca/{termoBusca}")
    public ResponseEntity<List<Unidade>> get(@PathVariable("termoBusca") String termoBusca) {
        List<Unidade> registros = servico.get(termoBusca);
        return ResponseEntity.ok(registros);
    }

    @Override
    @PostMapping("/")
    public ResponseEntity<Unidade> insert(@RequestBody Unidade objeto) {
        Unidade registro = servico.save(objeto);
        return ResponseEntity.status(HttpStatus.CREATED).body(registro);
    }

    @Override
    @PutMapping("/")
    public ResponseEntity<Unidade> update(@RequestBody Unidade objeto) {
        Unidade registro = servico.save(objeto);
        return ResponseEntity.ok(registro);
    }

    @Override
    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable("id") Long id) {
        servico.delete(id);
        return ResponseEntity.status(HttpStatus.OK).body(null);
    }
    
}

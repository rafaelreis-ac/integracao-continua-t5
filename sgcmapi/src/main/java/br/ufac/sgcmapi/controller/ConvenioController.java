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

import br.ufac.sgcmapi.model.Convenio;
import br.ufac.sgcmapi.service.ConvenioService;

@RestController
@RequestMapping("/convenio")
public class ConvenioController implements IController<Convenio> {

    @Autowired
    private ConvenioService servico;

    @Override
    @GetMapping("/")
    public ResponseEntity<List<Convenio>> get() {
        List<Convenio> registros = servico.get();
        return ResponseEntity.ok(registros);
    }

    @Override
    @GetMapping("/{id}")
    public ResponseEntity<Convenio> get(@PathVariable("id") Long id) {
        Convenio registro = servico.get(id);
        if (registro == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        return ResponseEntity.ok(registro);
    }

    @Override
    @GetMapping("/busca/{termoBusca}")
    public ResponseEntity<List<Convenio>> get(@PathVariable("termoBusca") String termoBusca) {
        List<Convenio> registros = servico.get(termoBusca);
        return ResponseEntity.ok(registros);
    }

    @Override
    @PostMapping("/")
    public ResponseEntity<Convenio> insert(@RequestBody Convenio objeto) {
        Convenio registro = servico.save(objeto);
        return ResponseEntity.status(HttpStatus.CREATED).body(registro);
    }

    @Override
    @PutMapping("/")
    public ResponseEntity<Convenio> update(@RequestBody Convenio objeto) {
        Convenio registro = servico.save(objeto);
        return ResponseEntity.ok(registro);
    }

    @Override
    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable("id") Long id) {
        servico.delete(id);
        return ResponseEntity.status(HttpStatus.OK).body(null);
    }
    
}

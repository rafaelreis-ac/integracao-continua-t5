package br.ufac.sgcmapi.controller;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

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

import br.ufac.sgcmapi.model.Atendimento;
import br.ufac.sgcmapi.service.AtendimentoService;

@RestController
@RequestMapping("/atendimento")
public class AtendimentoController implements IController<Atendimento> {

    private final AtendimentoService servico;

    public AtendimentoController(AtendimentoService servico) {
        this.servico = servico;
    }

    @Override
    @GetMapping("/")
    public ResponseEntity<List<Atendimento>> get() {
        List<Atendimento> registros = servico.get();
        return ResponseEntity.ok(registros);
    }

    @Override
    @GetMapping("/{id}")
    public ResponseEntity<Atendimento> get(@PathVariable("id") Long id) {
        Atendimento registro = servico.get(id);
        if (registro == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        return ResponseEntity.ok(registro);
    }

    @Override
    @GetMapping("/busca/{termoBusca}")
    public ResponseEntity<List<Atendimento>> get(@PathVariable("termoBusca") String termoBusca) {
        List<Atendimento> registros = servico.get(termoBusca);
        return ResponseEntity.ok(registros);
    }

    @Override
    @PostMapping("/")
    public ResponseEntity<Atendimento> insert(@RequestBody Atendimento objeto) {
        Atendimento registro = servico.save(objeto);
        return ResponseEntity.status(HttpStatus.CREATED).body(registro);
    }

    @Override
    @PutMapping("/")
    public ResponseEntity<Atendimento> update(@RequestBody Atendimento objeto) {
        Atendimento registro = servico.save(objeto);
        return ResponseEntity.ok(registro);
    }

    @Override
    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable("id") Long id) {
        servico.delete(id);
        return ResponseEntity.status(HttpStatus.OK).body(null);
    }

    @PutMapping("/status/{id}")
    public ResponseEntity<Atendimento> updateStatus(@PathVariable("id") Long id) {
        Atendimento registro = servico.updateStatus(id);
        return ResponseEntity.ok(registro);
    }

    @GetMapping("/horarios-ocupados-profissional/{id}/{data}")
    public ResponseEntity<List<LocalTime>> getHorariosOcupadosProfissional(@PathVariable("id") Long id,
            @PathVariable("data") LocalDate data) {
        List<LocalTime> horarios = servico.getHorariosOcupadosProfissional(id, data);
        return ResponseEntity.ok(horarios);
    }

    @GetMapping("/horarios-ocupados-paciente/{id}/{data}")
    public ResponseEntity<List<LocalTime>> getHorariosOcupadosPaciente(@PathVariable("id") Long id,
            @PathVariable("data") LocalDate data) {
        List<LocalTime> horarios = servico.getHorariosOcupadosPaciente(id, data);
        return ResponseEntity.ok(horarios);
    }
    
}

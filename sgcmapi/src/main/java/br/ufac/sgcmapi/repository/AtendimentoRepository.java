package br.ufac.sgcmapi.repository;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import br.ufac.sgcmapi.model.Atendimento;

public interface AtendimentoRepository extends JpaRepository<Atendimento, Long> {

    @Query("SELECT a FROM Atendimento a" +
        " LEFT JOIN Profissional p ON p = a.profissional" +
        " LEFT JOIN Paciente pa ON pa = a.paciente" +
        " LEFT JOIN Convenio c ON c = a.convenio" +
        " LEFT JOIN Especialidade e ON e = p.especialidade" +
        " LEFT JOIN Unidade u ON u = p.unidade" +
        " WHERE p.nome LIKE %?1%" +
        " OR pa.nome LIKE %?1%" +
        " OR c.nome LIKE %?1%" +
        " OR e.nome LIKE %?1%" +
        " OR u.nome LIKE %?1%")
    List<Atendimento> busca(String termoBusca);

    @Query("SELECT a.hora FROM Atendimento a" +
        " WHERE a.profissional.id = :id" +
        " AND a.data = :data " +
        " AND a.status != 'CANCELADO'")
    List<LocalTime> horariosOcupadosProfissional(Long id, LocalDate data);

    @Query("SELECT a.hora FROM Atendimento a" +
        " WHERE a.paciente.id = :id" +
        " AND a.data = :data " +
        " AND a.status != 'CANCELADO'")
    List<LocalTime> horariosOcupadosPaciente(Long id, LocalDate data);
    
}

package br.ufac.sgcmapi;

import static org.hamcrest.Matchers.hasSize;
import static org.hamcrest.Matchers.is;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.io.File;
import java.nio.file.Files;

import org.junit.jupiter.api.MethodOrderer.OrderAnnotation;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.core.io.ClassPathResource;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

@SpringBootTest
@AutoConfigureTestDatabase
@AutoConfigureMockMvc
@TestMethodOrder(OrderAnnotation.class)
public class EspecialidadeTest {

	private final MockMvc mockMvc;

	@Autowired
	EspecialidadeTest(MockMvc mockMvc) {
		this.mockMvc = mockMvc;
	}

    @Test
    @Order(1)
    public void testEspecialidadeGetAll() throws Exception {
        mockMvc.perform(get("/config/especialidade/"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$", hasSize(7)))
            .andExpect(jsonPath("$[0].nome", is("Cardiologia")))
            .andExpect(jsonPath("$[1].nome", is("Dermatologia")))
            .andExpect(jsonPath("$[2].nome", is("Geriatria")))
            .andExpect(jsonPath("$[3].nome", is("Infectologia")))
            .andExpect(jsonPath("$[4].nome", is("Pediatria")))
            .andExpect(jsonPath("$[5].nome", is("Psiquiatria")))
            .andExpect(jsonPath("$[6].nome", is("Urologia")));
    }

    @Test
    @Order(2)
    public void testEspecialidadeGetById() throws Exception {
        mockMvc.perform(get("/config/especialidade/1"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.nome", is("Cardiologia")));
    }

    @Test
    @Order(3)
    public void testEspecialidadeGetByTermoBusca() throws Exception {
        mockMvc.perform(get("/config/especialidade/busca/gia"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$", hasSize(4)))
            .andExpect(jsonPath("$[0].nome", is("Cardiologia")));
    }

    @Test
    @Order(4)
    public void testEspecialidadeInsert() throws Exception {

        File jsonFile = new ClassPathResource("json/especialidadeInsert.json").getFile();
        String jsonContent = Files.readString(jsonFile.toPath());

        mockMvc.perform(post("/config/especialidade/")
            .contentType(MediaType.APPLICATION_JSON)
            .content(jsonContent))
            .andExpect(status().isCreated())
            .andExpect(jsonPath("$.nome", is("Neurologia")));

    }

    @Test
    @Order(5)
    public void testEspecialidadeUpdate() throws Exception {

        File jsonFile = new ClassPathResource("json/especialidadeUpdate.json").getFile();
        String jsonContent = Files.readString(jsonFile.toPath());

        mockMvc.perform(put("/config/especialidade/")
            .contentType(MediaType.APPLICATION_JSON)
            .content(jsonContent))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.nome", is("Ortopedia")));

    }

    @Test
    @Order(6)
    public void testEspecialidadeDelete() throws Exception {

        mockMvc.perform(delete("/config/especialidade/8"))
            .andExpect(status().isOk());

        mockMvc.perform(get("/config/especialidade/"))
            .andExpect(jsonPath("$", hasSize(7)));

    }
    
}

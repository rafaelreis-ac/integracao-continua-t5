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
public class ProfissionalTest {

	private final MockMvc mockMvc;

	@Autowired
	ProfissionalTest(MockMvc mockMvc) {
		this.mockMvc = mockMvc;
	}

    @Test
    @Order(1)
    public void testProfissionalGetAll() throws Exception {
        mockMvc.perform(get("/profissional/"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$", hasSize(5)))
            .andExpect(jsonPath("$[0].nome", is("Maria Adelia Serravalle Bezerra")))
            .andExpect(jsonPath("$[1].nome", is("Elielson Silveira Andrade")))
            .andExpect(jsonPath("$[2].nome", is("Davi Jesus Mendes")))
            .andExpect(jsonPath("$[3].nome", is("Carla da Paixão Valle")))
            .andExpect(jsonPath("$[4].nome", is("Neuza Biango Nobrega")));
    }

    @Test
    @Order(2)
    public void testProfissionalGetById() throws Exception {
        mockMvc.perform(get("/profissional/1"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.nome", is("Maria Adelia Serravalle Bezerra")));
    }

    @Test
    @Order(3)
    public void testProfissionalGetByTermoBusca() throws Exception {
        mockMvc.perform(get("/profissional/busca/alle"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$", hasSize(2)))
            .andExpect(jsonPath("$[0].nome", is("Maria Adelia Serravalle Bezerra")));
    }

    @Test
    @Order(4)
    public void testProfissionalInsert() throws Exception {

        File jsonFile = new ClassPathResource("json/profissionalInsert.json").getFile();
        String jsonContent = Files.readString(jsonFile.toPath());

        mockMvc.perform(post("/profissional/")
            .contentType(MediaType.APPLICATION_JSON)
            .content(jsonContent))
            .andExpect(status().isCreated())
            .andExpect(jsonPath("$.nome", is("Marlene Portugal Ferreira")));

    }

    @Test
    @Order(5)
    public void testProfissionalUpdate() throws Exception {

        File jsonFile = new ClassPathResource("json/profissionalUpdate.json").getFile();
        String jsonContent = Files.readString(jsonFile.toPath());

        mockMvc.perform(put("/profissional/")
            .contentType(MediaType.APPLICATION_JSON)
            .content(jsonContent))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.especialidade.id", is(2)));

    }

    @Test
    @Order(6)
    public void testProfissionalDelete() throws Exception {

        mockMvc.perform(delete("/profissional/6"))
            .andExpect(status().isOk());

        mockMvc.perform(get("/profissional/"))
            .andExpect(jsonPath("$", hasSize(5)));

    }
    
}

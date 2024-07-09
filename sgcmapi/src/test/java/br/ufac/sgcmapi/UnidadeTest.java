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
public class UnidadeTest {

	private final MockMvc mockMvc;

	@Autowired
	UnidadeTest(MockMvc mockMvc) {
		this.mockMvc = mockMvc;
	}

    @Test
    @Order(1)
    public void testUnidadeGetAll() throws Exception {
        mockMvc.perform(get("/config/unidade/"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$", hasSize(3)))
            .andExpect(jsonPath("$[0].nome", is("Bela Vista")))
            .andExpect(jsonPath("$[1].nome", is("Bosque")))
            .andExpect(jsonPath("$[2].nome", is("Cruzeiro do Sul")));
    }

    @Test
    @Order(2)
    public void testUnidadeGetById() throws Exception {
        mockMvc.perform(get("/config/unidade/1"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.nome", is("Bela Vista")));
    }

    @Test
    @Order(3)
    public void testUnidadeGetByTermoBusca() throws Exception {
        mockMvc.perform(get("/config/unidade/busca/Rua"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$", hasSize(3)))
            .andExpect(jsonPath("$[0].nome", is("Bela Vista")));
    }

    @Test
    @Order(4)
    public void testUnidadeInsert() throws Exception {

        File jsonFile = new ClassPathResource("json/unidadeInsert.json").getFile();
        String jsonContent = Files.readString(jsonFile.toPath());

        mockMvc.perform(post("/config/unidade/")
            .contentType(MediaType.APPLICATION_JSON)
            .content(jsonContent))
            .andExpect(status().isCreated())
            .andExpect(jsonPath("$.nome", is("Triângulo")));

    }

    @Test
    @Order(5)
    public void testUnidadeUpdate() throws Exception {

        File jsonFile = new ClassPathResource("json/unidadeUpdate.json").getFile();
        String jsonContent = Files.readString(jsonFile.toPath());

        mockMvc.perform(put("/config/unidade/")
            .contentType(MediaType.APPLICATION_JSON)
            .content(jsonContent))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.endereco", is("Via Chico Mendes, 1780 - Triângulo")));

    }

    @Test
    @Order(6)
    public void testUnidadeDelete() throws Exception {

        mockMvc.perform(delete("/config/unidade/4"))
            .andExpect(status().isOk());

        mockMvc.perform(get("/config/unidade/"))
            .andExpect(jsonPath("$", hasSize(3)));

    }
    
}

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
public class UsuarioTest {

	private final MockMvc mockMvc;

	@Autowired
	UsuarioTest(MockMvc mockMvc) {
		this.mockMvc = mockMvc;
	}

    @Test
    @Order(1)
    public void testUsuarioGetAll() throws Exception {
        mockMvc.perform(get("/config/usuario/"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$", hasSize(4)))
            .andExpect(jsonPath("$[0].nomeCompleto", is("Administrador")))
            .andExpect(jsonPath("$[1].nomeCompleto", is("Daniel")))
            .andExpect(jsonPath("$[2].nomeCompleto", is("Paulo")))
            .andExpect(jsonPath("$[3].nomeCompleto", is("Limeira")));
    }

    @Test
    @Order(2)
    public void testUsuarioGetById() throws Exception {
        mockMvc.perform(get("/config/usuario/1"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.nomeCompleto", is("Administrador")));
    }

    @Test
    @Order(3)
    public void testUsuarioGetByTermoBusca() throws Exception {
        mockMvc.perform(get("/config/usuario/busca/admin"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$", hasSize(1)))
            .andExpect(jsonPath("$[0].nomeCompleto", is("Administrador")));
    }

    @Test
    @Order(4)
    public void testUsuarioInsert() throws Exception {

        File jsonFile = new ClassPathResource("json/usuarioInsert.json").getFile();
        String jsonContent = Files.readString(jsonFile.toPath());

        mockMvc.perform(post("/config/usuario/")
            .contentType(MediaType.APPLICATION_JSON)
            .content(jsonContent))
            .andExpect(status().isCreated())
            .andExpect(jsonPath("$.nomeCompleto", is("Laura")));

    }

    @Test
    @Order(5)
    public void testUsuarioUpdate() throws Exception {

        File jsonFile = new ClassPathResource("json/usuarioUpdate.json").getFile();
        String jsonContent = Files.readString(jsonFile.toPath());

        mockMvc.perform(put("/config/usuario/")
            .contentType(MediaType.APPLICATION_JSON)
            .content(jsonContent))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.nomeCompleto", is("Laura Costa Sarkis")));

    }

    @Test
    @Order(6)
    public void testUsuarioDelete() throws Exception {

        mockMvc.perform(delete("/config/usuario/5"))
            .andExpect(status().isOk());

        mockMvc.perform(get("/config/usuario/"))
            .andExpect(jsonPath("$", hasSize(4)));

    }
    
}

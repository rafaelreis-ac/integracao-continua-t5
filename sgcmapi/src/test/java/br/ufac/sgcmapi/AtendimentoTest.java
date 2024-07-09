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
public class AtendimentoTest {

	private final MockMvc mockMvc;

	@Autowired
	AtendimentoTest(MockMvc mockMvc) {
		this.mockMvc = mockMvc;
	}
    
    @Test
	@Order(1)
	public void testAtendimentoGetAll() throws Exception {
        mockMvc.perform(get("/atendimento/"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$", hasSize(5)))
            .andExpect(jsonPath("$[0].hora", is("14:00:00")))
            .andExpect(jsonPath("$[1].hora", is("14:00:00")))
            .andExpect(jsonPath("$[2].hora", is("14:30:00")))
            .andExpect(jsonPath("$[3].hora", is("15:00:00")))
            .andExpect(jsonPath("$[4].hora", is("15:00:00")));
    }

	@Test
	@Order(2)
	public void testAtendimentoGetById() throws Exception {
        mockMvc.perform(get("/atendimento/1"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.hora", is("14:00:00")));
    }

	@Test
	@Order(3)
	public void testAtendimentoGetByTermoBusca() throws Exception {
        mockMvc.perform(get("/atendimento/busca/Cardiologia"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$", hasSize(2)))
            .andExpect(jsonPath("$[0].hora", is("14:00:00")))
            .andExpect(jsonPath("$[1].hora", is("15:00:00")));
    }

	@Test
	@Order(4)
	public void testAtendimentoInsert() throws Exception {

        File jsonFile = new ClassPathResource("json/atendimentoInsert.json").getFile();
        String jsonContent = Files.readString(jsonFile.toPath());

        mockMvc.perform(post("/atendimento/")
            .contentType(MediaType.APPLICATION_JSON)
            .content(jsonContent))
            .andExpect(status().isCreated())
            .andExpect(jsonPath("$.hora", is("16:00:00")));
        
    }

	@Test
	@Order(5)
	public void testAtendimentoUpdate() throws Exception {

        File jsonFile = new ClassPathResource("json/atendimentoUpdate.json").getFile();
        String jsonContent = Files.readString(jsonFile.toPath());
    
        mockMvc.perform(put("/atendimento/")
            .contentType(MediaType.APPLICATION_JSON)
            .content(jsonContent))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.hora", is("17:00:00")));
    
        mockMvc.perform(get("/atendimento/6"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.hora", is("17:00:00")));

    }

	@Test
	@Order(6)
	public void testAtendimentoDelete() throws Exception {
        mockMvc.perform(delete("/atendimento/1"))
            .andExpect(status().isOk());
    }

	@Test
	@Order(7)
	public void testAtendimentoUpdateStatus() throws Exception {
        mockMvc.perform(put("/atendimento/status/2"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.status", is("CONFIRMADO")));
    }
    
}

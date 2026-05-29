package com.aproveienem.aproveienem.controller;

import com.aproveienem.aproveienem.model.Evento;
import com.aproveienem.aproveienem.model.Usuario;
import com.aproveienem.aproveienem.service.EventoService;

import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/evento")
public class EventoController {

    @Autowired
    private EventoService service;

    // LISTAR EVENTOS
    @GetMapping
    public List<Evento> listar(HttpSession session) {

        Usuario usuario = (Usuario) session.getAttribute("usuarioLogado");

        if(usuario == null){
            throw new RuntimeException("Usuário não está logado");
        }

        return service.listarPorUsuario(usuario.getId());
    }
    // SALVAR EVENTO
    @PostMapping
    public Evento salvar(@RequestBody Evento evento,
                         HttpSession session) {

        Usuario usuario = (Usuario) session.getAttribute("usuarioLogado");

        if(usuario == null){
            throw new RuntimeException("Usuário não está logado");
        }

        evento.setUsuario(usuario);

        return service.salvar(evento);
    }
    // DELETAR EVENTO
    @DeleteMapping("/{id}")
    public void deletar(@PathVariable Long id) {

        service.deletar(id);

    }

    // EDITAR EVENTO
    @PutMapping("/{id}")
    public Evento atualizar(@PathVariable Long id,
                            @RequestBody Evento evento) {

        return service.atualizar(id, evento);
    }
}
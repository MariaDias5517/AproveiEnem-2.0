package com.aproveienem.aproveienem.controller;

import com.aproveienem.aproveienem.model.Evento;
import com.aproveienem.aproveienem.repository.EventoRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/evento")
public class EventoController {

    @Autowired
    private EventoRepository repository;

    @GetMapping
    public List<Evento> listar() {

        System.out.println("LISTANDO EVENTOS");

        return repository.findAll();
    }

    @PostMapping
    public Evento salvar(@RequestBody Evento evento) {

        System.out.println("SALVANDO EVENTO:");
        System.out.println(evento.getTitulo());

        return repository.save(evento);
    }

    @DeleteMapping("/{id}")
    public void deletar(@PathVariable Long id) {

        repository.deleteById(id);

    }
}
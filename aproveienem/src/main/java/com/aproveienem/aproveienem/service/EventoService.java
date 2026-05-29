package com.aproveienem.aproveienem.service;

import com.aproveienem.aproveienem.model.Evento;
import com.aproveienem.aproveienem.repository.EventoRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EventoService {

    @Autowired
    private EventoRepository repository;

    // LISTAR
    public List<Evento> listarPorUsuario(Long usuarioId) {
        return repository.findByUsuarioId(usuarioId);
    }
    // SALVAR
    public Evento salvar(Evento evento) {
        return repository.save(evento);
    }

    // DELETAR
    public void deletar(Long id) {
        repository.deleteById(id);
    }

    // BUSCAR POR ID
    public Optional<Evento> buscarPorId(Long id) {
        return repository.findById(id);
    }

    // EDITAR EVENTO
    public Evento atualizar(Long id, Evento novoEvento) {

        Evento evento = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Evento não encontrado"));

        evento.setTitulo(novoEvento.getTitulo());

        // adicione outros campos aqui
        // exemplo:
        // evento.setData(novoEvento.getData());

        return repository.save(evento);
    }
}
package com.aproveienem.aproveienem.controller;

import com.aproveienem.aproveienem.model.Usuario;
import com.aproveienem.aproveienem.repository.UsuarioRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;

@Controller
public class CadastroController {

    @Autowired
    private UsuarioRepository repository;

    @PostMapping("/cadastro")
    public String cadastrar(Usuario usuario){

        // verifica se o email já existe
        if(repository.existsByEmail(usuario.getEmail())){
            return "redirect:/telacadastro.html?erro=email";
        }

        // salva usuário
        repository.save(usuario);

        return "redirect:/";
    }
}
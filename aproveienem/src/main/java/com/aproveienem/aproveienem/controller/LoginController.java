package com.aproveienem.aproveienem.controller;

import com.aproveienem.aproveienem.model.Usuario;
import com.aproveienem.aproveienem.repository.UsuarioRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class LoginController {

    @Autowired
    private UsuarioRepository repository;

    @PostMapping("/login")
    public String login(
            @RequestParam String email,
            @RequestParam String senha){

        Usuario usuario = repository.findByEmail(email);

        // verifica se o usuário existe
        if(usuario == null){
            return "redirect:/telalogin.html?erro=naoexiste";
        }

        // verifica senha
        if(!usuario.getSenha().equals(senha)){
            return "redirect:/telalogin.html?erro=senha";
        }

        // login correto
        return "redirect:/telaprincipal.html";
    }
}
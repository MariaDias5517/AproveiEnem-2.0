package com.aproveienem.aproveienem.controller;
import com.fasterxml.jackson.annotation.JsonIgnore;

import com.aproveienem.aproveienem.model.Usuario;
import com.aproveienem.aproveienem.repository.UsuarioRepository;

import jakarta.servlet.http.HttpSession;

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
            @RequestParam String senha,
            HttpSession session){

        Usuario usuario = repository.findByEmail(email);

        // verifica se o usuário existe
        if(usuario == null){
            return "redirect:/telalogin.html?erro=naoexiste";
        }

        // verifica senha
        if(!usuario.getSenha().equals(senha)){
            return "redirect:/telalogin.html?erro=senha";
        }

        // SALVA USUARIO LOGADO
        session.setAttribute("usuarioLogado", usuario);
        // login correto
        return "redirect:/telaprincipal.html";
    }
}
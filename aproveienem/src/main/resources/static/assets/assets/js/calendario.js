addEventSubmit.addEventListener("click", async () => {

  console.log("BOTÃO FUNCIONOU");

  const dados = {
    titulo: "TESTE",
    horario: "08:00 AM - 09:00 AM",
    dia: 25,
    mes: 5,
    ano: 2026
  };

  try {

    const resposta = await fetch("http://localhost:8080/evento", {

      method: "POST",

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify(dados)

    });

    const resultado = await resposta.text();

    console.log("STATUS:", resposta.status);
    console.log("RESULTADO:", resultado);

  } catch (erro) {

    console.log("ERRO:", erro);

  }

});
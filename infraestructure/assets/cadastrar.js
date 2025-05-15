const apiBase = "http://localhost:8080/api/contatos";

document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const contatoId = params.get("id");

  if (contatoId) {
    document.getElementById("titulo-formulario").textContent = "Editar Contato";
    document.getElementById("contatoId").value = contatoId;
    carregarContato(contatoId);
  }

  const form = document.getElementById("formContato");
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const contato = {
      nome: document.getElementById("nome").value,
      telefone: document.getElementById("telefone").value,
      email: document.getElementById("email").value
    };

    const id = document.getElementById("contatoId").value;

    try {
      let response;
      if (id) {
        // Atualizar contato
        response = await fetch(`${apiBase}/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(contato)
        });
      } else {
        // Criar contato
        response = await fetch(apiBase, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(contato)
        });
      }

      if (!response.ok) {
        throw new Error("Erro ao salvar contato. Tente novamente.");
      }

      window.location.href = "contatos.html";
    } catch (error) {
      alert(error.message);
    }
  });
});

async function carregarContato(id) {
  try {
    const resposta = await fetch(`${apiBase}/${id}`);
    if (!resposta.ok) {
      throw new Error("Contato não encontrado.");
    }
    const contato = await resposta.json();
    document.getElementById("contatoId").value = contato.id;
    document.getElementById("nome").value = contato.nome;
    document.getElementById("telefone").value = contato.telefone;
    document.getElementById("email").value = contato.email;
  } catch (error) {
    alert(error.message);
    window.location.href = "contatos.html";
  }
}


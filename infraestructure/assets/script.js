const apiBase = "http://localhost:8080/api/contatos"; 

// Carrega todos os contatos
async function carregarContatos() {
  const resposta = await fetch(apiBase);
  const contatos = await resposta.json();
  renderizarTabela(contatos);
}

// Renderiza a tabela de contatos
function renderizarTabela(contatos) {
  const tbody = document.querySelector("#tabela-contatos tbody");
  tbody.innerHTML = "";

  contatos.forEach(contato => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${contato.nome}</td>
      <td>${contato.telefone}</td>
      <td>${contato.email}</td>
      <td>
        <button class="btn-editar" onclick="editarContato(${contato.id})">Editar</button>
        <button class="btn-excluir" onclick="excluirContato(${contato.id})">Excluir</button>
      </td>
    `;

    tbody.appendChild(tr);
  });
}

// Redireciona para a tela de edição
function editarContato(id) {
  window.location.href = `cadastro.html?id=${id}`;
}

// Exclui um contato
async function excluirContato(id) {
  if (confirm("Tem certeza que deseja excluir este contato?")) {
    await fetch(`${apiBase}/${id}`, { method: "DELETE" });
    carregarContatos();
  }
}

// Pesquisa conforme o usuário digita
document.addEventListener("DOMContentLoaded", () => {
  carregarContatos();

  const campoBusca = document.getElementById("busca");
  campoBusca.addEventListener("input", async () => {
    const termo = campoBusca.value.trim();
    if (termo === "") {
      carregarContatos();
    } else {
      const resposta = await fetch(`${apiBase}/pesquisar?termo=${encodeURIComponent(termo)}`);
      const contatos = await resposta.ok ? await resposta.json() : [];
      renderizarTabela(contatos);
    }
  });

  const btnNovo = document.getElementById("btn-novo");
  if (btnNovo) {
    btnNovo.addEventListener("click", () => {
      window.location.href = "cadastro.html";
    });
  }
});

const $ = s => document.querySelector(s);
const tabela = $('#tabelaAlunos');

const apiUrl = "https://68f6a8116b852b1d6f175aee.mockapi.io/api/v1/alunos/alunos";

// Listar alunos
async function listarAlunos() {
  try {
    const res = await fetch(apiUrl);
    const alunos = await res.json();
    tabela.innerHTML = '';
    alunos.forEach(aluno => {
      tabela.innerHTML += `
        <tr>
          <td>${aluno.id}</td>
          <td>${aluno.nome}</td>
          <td>${aluno.turma}</td>
          <td>${aluno.curso}</td>
          <td>${aluno.matricula}</td>
          <td>
            <button class="btn btn-warning btn-sm" onclick="editarAluno(${aluno.id})">Editar</button>
            <button class="btn btn-danger btn-sm" onclick="excluirAluno(${aluno.id})">Excluir</button>
          </td>
        </tr>
      `;
    });
  } catch (err) {
    alert("Erro ao listar alunos: " + err);
  }
}

// Editar aluno
function editarAluno(id) {
  window.location.href = `form.html?id=${id}`;
}

// Excluir aluno
async function excluirAluno(id) {
  if (confirm('Deseja realmente excluir este aluno?')) {
    try {
      await fetch(`${apiUrl}/${id}`, { method: 'DELETE' });
      listarAlunos();
    } catch (err) {
      alert("Erro ao excluir: " + err);
    }
  }
}

// Inicializa a listagem
listarAlunos();

const $ = s => document.querySelector(s);
const urlParams = new URLSearchParams(window.location.search);
const alunoId = urlParams.get("id");
const form = $('#formAluno');

const apiUrl = "https://68f6a8116b852b1d6f175aee.mockapi.io/api/v1/alunos/alunos";


// Carregar aluno para edição
if (alunoId) {
  fetch(`${apiUrl}/${alunoId}`)
    .then(res => res.json())
    .then(aluno => {
      $('#nome').value = aluno.nome;
      $('#turma').value = aluno.turma;
      $('#curso').value = aluno.curso;
      $('#matricula').value = aluno.matricula;
    })
    .catch(err => alert("Erro ao carregar aluno: " + err));
}

// Enviar formulário
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const aluno = {
    nome: $('#nome').value.trim(),
    turma: $('#turma').value.trim(),
    curso: $('#curso').value.trim(),
    matricula: $('#matricula').value.trim()
  };

  if (!aluno.nome || !aluno.turma || !aluno.curso || !aluno.matricula) {
    alert("Preencha todos os campos!");
    return;
  }

  try {
    if (alunoId) {
      // Atualizar
      await fetch(`${apiUrl}/${alunoId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(aluno)
      });
    } else {
      // Criar
      await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(aluno)
      });
    }

    // Voltar para a lista
    window.location.href = "index.html";
  } catch (err) {
    alert("Erro ao salvar: " + err);
  }
});

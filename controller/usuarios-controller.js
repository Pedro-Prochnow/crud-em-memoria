import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


let ultimoId = 1;

const usuario_admin = {
  id: ultimoId,
  nome: "admin",
  email: "admin@admin",
};

let usuarios = [usuario_admin];
//async diz que a funcao eh assincrona e pode demorar um pouco
async function listarTodosOsUsuarios(req, res) {
  console.log("CHEGUEI NO CONTROLLER");
  const usuarios_do_banco = await prisma.users.findMany();
  res.status(200).json(usuarios);
}

async function criarUsuario(req, res) {
  const { nome, email } = req.body;

  if (!nome || !email) {
    return res.status(400).json({ mensagem: "Nome e email são obrigatórios" });
  }

  const novoUsuario = {
    nome: nome,
    email: email,
    idade: idade,
  };

  const criarUser {
    
  }

  usuarios.push(novoUsuario);
  ultimoId += 1;

  res.status(201).json(novoUsuario.id);
}

function deletarUsuario(req, res) {
  const id = req.params.id;
  const idNumerico = parseInt(id);

  if (isNaN(idNumerico)) {
    return res
      .status(400)
      .json({ mensagem: "ID inválido, precisa ser um numero" });
  }

  let posicao_do_usuario = usuarios.findIndex(
    (usuario) => usuario.id === idNumerico
  );

  if (posicao_do_usuario === -1) {
    return res.status(404).json({ mensagem: "Usuario nao encontrado" });
  }

  usuarios.splice(posicao_do_usuario, 1);
  res.status(204).send();
}

function alterarUsuario(req, res) {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res
      .status(400)
      .json({ mensagem: "ID inválido, precisa ser um numero" });
  }

  const usuario = usuarios.find((usuario) => usuario.id === id);
  if (!usuario) {
    return res.status(404).json({ mensagem: "Usuario nao encontrado" });
  }

  const { nome, email } = req.body;

  if (!nome && !email) {
    return res.status(400).json({ mensagem: "manda pelo menos um dos dados" });
  }

  console.log(`antes de atualizar ${usuario}`);
  //atualiza o email do usuario
  if (email) {
    let email_existe = usuarios.findIndex((usuario) => usuario.email === email);

    if (email_existe !== -1) {
      return res.status(409).json({ mensagem: "Email ja cadastrado" });
    }

    usuario.email = email;
    console.log(`antes de atualizar EMAIL ${usuario}`);
  }

  //atualiza o nome do usuario
  if (nome) {
    usuario.nome = nome;
    console.log(`antes de atualizar NOME ${usuario}`);
  }

  res.status(200).json(usuario);
}

async function buscarPeloId(req, res) {
    const id = parseInt(req.params.id);
    const usuario = await prisma.users.findUnique({where: { id: id}});
    res.status(200).json(usuario);
}

export {
  listarTodosOsUsuarios,
  criarUsuario,
  deletarUsuario,
  alterarUsuario,
  buscarPeloId,
};

//npx prisma migrate dev aplica as mudanças no banco de dados
//npx prisma studio abre o banco de dados em uma interface grafica
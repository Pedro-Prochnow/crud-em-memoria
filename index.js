import express from "express";

const app = express();
app.use(express.json());

let ultimoId = 0;

// criar uma rota para pegar todos os usuarios
const usuario_admin = {
    id: ultimoId,
    nome: "admin",
    email: "@email.com"
};

let usuarios = [usuario_admin];

app.get("/usuarios", (req, res) => {
    res.status(200).json(usuarios);
});

// criar uma rota para cadastrar um ou vários usuários
app.post("/usuarios", (req, res) => {
    const dados = req.body;

    // Se for um array de usuários
    if (Array.isArray(dados)) {
        const novosUsuarios = [];

        for (const usuario of dados) {
            const { nome, email } = usuario;

            if (!nome || !email) {
                return res.status(400).json({ Mensagem: "Todos os usuários devem ter nome e email" });
            }

            ultimoId += 1;
            const novoUsuario = { id: ultimoId, nome, email };
            usuarios.push(novoUsuario);
            novosUsuarios.push(novoUsuario);
        }

        return res.status(201).json(novosUsuarios);
    }

    // Se for um único usuário
    const { nome, email } = dados;

    if (!nome || !email) {
        return res.status(400).json({ Mensagem: "Nome e email são obrigatórios" });
    }

    ultimoId += 1;
    const novoUsuario = { id: ultimoId, nome, email };
    usuarios.push(novoUsuario);

    res.status(201).json(novoUsuario);
});

// criar uma rota para deletar um usuario
// criar uma rota para atualizar um usuario

app.listen(3000);
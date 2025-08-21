import express from "express";

const app = express  ();
app.use(express.json());

let ultimoId = 0;

//criar uma rota para pegar todos os usuarios
const usuario_admin = {
    id:  ultimoId,
    nome: "admin",
    email: "@email.com"
};

let usuarios = [usuario_admin];

app.get("/usuarios", (req, res) => {
    res.json(usuarios).status(200);
});

//criar uma rota para cadastrar um usuario
app.post("/usuarios", (req, res) => {
    const { nome, email } = req.body;

    if  (!nome || !email) {
        return res.status(400).json({Mensagem: "Nome e email são obrigatórios"});
    }
    res.send(body);

});

app.listen(3000);

        //CRUD EM MEMORIA

//criar uma rota para cadastrar um usuario
//criar uma rota para deletar um usuario
//criar uma rota para atualizar um usuario

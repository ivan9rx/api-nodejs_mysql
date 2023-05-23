const express = require("express");
const User = require('./models/User');
const app = express();

app.use(express.json());

app.get("/users", async (req, res) => {

    await User.findAll({
        attributes: ['id', 'name', 'email'],
        order: [['id', 'DESC']]
    }).then((users) => {
        return res.json({
            erro: false,
            users
        });
    }).catch(() => {
        return res.status(400).json({
            erro: true,
            mensagem: "Erro: Nenhum usuario encontrado"
        });
    });


});

app.get("/user/:id", async (req, res) => {
    const { id } = req.params;


    await User.findByPk(id).then((user) => {
        return res.json({
            erro: false,
            user: user
        })
    }).catch(() => {
        return res.status(400).json({
            erro: true,
            mensagem: "Erro: Nenhum usuario encontrado"
        });
    });

});

app.post("/user", async (req, res) => {
    const { name, email } = req.body;

    await User.create(req.body).
        then(() => {
            return res.json({
                erro: false,
                mensagem: "Usuário cadastrado com sucesso!"
            });
        }).catch(() => {
            return res.status(400).json({
                erro: true,
                mensagem: "Erro: Usuário não cadastrado com sucesso!"
            });
        });
});

app.put("/user", async (req, res) => {
    const { id, name, email } = req.body;


    await User.update(req.body, { where: { id } })
        .then(() => {
            return res.json({
                erro: false,
                mensagem: "usuario editado com sucesso"
            })
        }).catch(() => {
            return res.status(400).json({
                erro: true,
                mensagem: "Erro: Usuário não editado com sucesso!"
            });
        });



});

app.delete("/user/:id", async (req, res) => {
    const { id } = req.params;
    const user = await User.findOne({
        attributes: ['id', 'name', 'email'],
        where: {
            id: req.params.id
        }
    })

    if (user === null) {
        return res.status(400).json({
            erro: true,
            mensagem: "Erro: Usuário não encontrado!"
        });
    } else {
        await User.destroy({ where: { id } })
            .then(() => {
                return res.status(200).json({
                    erro: false,
                    mensagem: "Usuário  apagado com sucesso!"
                });
            })
    };

});

// comentando aqui kkkk

app.listen(8080, () => {
    console.log("Servidor iniciado na porta 8080: http://localhost:8080");
});
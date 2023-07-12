const express = require('express') // aqui estou iniciando o express
const router = express.Router() // aqui estou configurando a primeira parte da rota
const cors = require('cors') // aqui estou trazendo o pacote cors que permite consumir essa api no front-end

const conectaBancoDeDados = require('./bancoDeDados') //aqui eu estou ligando ao arquivo bancoDeDados
conectaBancoDeDados() //estou chamando a função que conecta o banco de dados

const Livro = require('./livroModel.js')

const app = express() // aqui estou iniciando o app
app.use(express.json())
app.use(cors())

const porta = 3333 // aqui estou criando a porta

//GET
async function mostraLivros(request, response) {
    try {
        const livrosVindosDoBancoDeDados = await Livro.find()

        response.json(livrosVindosDoBancoDeDados)
    } catch(erro) {
        console.log(erro)
    }
}

//POST
async function criaLivro(request, response) {
    const novoLivro = new Livro({
        titulo: request.body.titulo,
        autor: request.body.autor,
        categoria: request.body.categoria,
        recomendador: request.body.recomendador
    })

    try {
        const livroCriado = await novoLivro.save()
        response.status(201).json(livroCriado)
    } catch(erro) {
        console.log(erro)
    }
}

//PATCH
async function corrigeLivro(request, response) {
    try {
        const livroEncontrado = await Livro.findById(request.params.id)

        if(request.body.titulo) {
            livroEncontrado.titulo = request.body.titulo
        }

        if(request.body.autor) {
            livroEncontrado.autor = request.body.autor
        }

        if(request.body.categoria) {
            livroEncontrado.categoria = request.body.categoria
        }

        if(request.body.recomendador) {
            livroEncontrado.recomendador = request.body.recomendador
        }

        const livroAtualizadoNoBancoDeDados = await mulherEncontrada.save()

        response.json(livroAtualizadoNoBancoDeDados)
    } catch(erro) {
        console.log(erro)
    }
}

//DELETE
async function deletaLivro(request, response) {
    try {
        await Livro.findByIdAndDelete(request.params.id)
        response.json({ menssagem: 'Livro deletado com sucesso!'})
    } catch(erro) {
        console.log(erro)
    }
}

//PORTA
function mostraPorta() {
    console.log(`Servidor criado e rodando na porta ${porta}`)
}

app.use(router.get('/livros', mostraLivros)) // configurei rota GET
app.use(router.post('/livros', criaLivro)) // configurei rota POST
app.use(router.patch('/livros/:id', corrigeLivro)) // configurei rota PATCH
app.use(router.delete('/livros/:id', deletaLivro)) // configurei rota DELETE
app.listen(porta, mostraPorta) // servidor ouvindo a porta
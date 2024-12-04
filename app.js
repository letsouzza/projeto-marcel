/*********************************************************************************************************************************************************************************
 *Objetivo: API para retornar dados de uma faculdade, com alunos e cursos 
 *Data: 04/12/2024
 *Autor: Letícia
 *Versão: 1.0
***********************************************************************************************************************************************************************************/

const express    = require('express')
const cors       = require('cors')
const bodyParser = require('body-parser')

//Inicializando a utilização do express através da variável app
const app = express()

//request -> significa a chegada de dados da API
//response -> significa a saída de dados da API

app.use((request, response, next)=>{
    //Permissão de acesso para quem irá chamar a API
    response.header('Access-Control-Allow-Origin', '*')

    //Permissão de acesso para quais métodos a API irá responder 
    response.header('Access-Control-Allow-Methods', 'GET')

    //Ativa as configurações do header para o cors
    app.use(cors())

    next()
})

//Import do arquivo de funções
const alunosCursos = require('./modulo/funcoes')
const { stat } = require('fs/promises')

//EndPoint para retornar todos os cursos
app.get('/v1/lion-school/cursos', cors(), async function(request, response){

    //Chama a função que retorna todos os estados 
    let dados = alunosCursos.getListadeCursos()

    //Resposta da API com o JSON e o status code 
    if(dados){
        response.status(200)
        response.json(dados)
    }else{
        response.status(404)
        response.json({'status': 404, 'message': 'Não foi encontrado cursos'})
    }
    
})

//EndPoint para retornar dados dos alunos com base no status especificado
app.get('/v1/lion-school/alunos/filtro', cors(), async function(request, response){

    //Recebe a variável sigla via Query String
    let statusDisciplina = request.query.statusD
    let statusCurso = request.query.statusC
    let curso = request.query.curso
    let ano = request.query.ano
    let dados 


    if(curso != '' && curso != undefined && ano != '' && ano != undefined){
        dados = alunosCursos.getCursoAnoConclusao(curso, ano) 

    }else if(statusDisciplina != '' && statusDisciplina != undefined && curso != '' && curso != undefined ){
        dados = alunosCursos.getCursoStatus(curso, statusDisciplina)

    }else if(statusCurso != '' && statusCurso != undefined){
        dados = alunosCursos.getAlunosStatus(statusCurso)

    }

    if(dados){
        response.status(200)
        response.json(dados)
    }else{
        response.status(404)
        response.json({'status': 404, 'message': 'Não foi encontrado'})
    }  
})

//EndPoint para retornar todos os alunos
app.get('/v1/lion-school/alunos', cors(), async function(request, response){

    //Chama a função que retorna todos os estados 
    let dados = alunosCursos.getListadeAlunos()

    //Resposta da API com o JSON e o status code 
    if(dados){
        response.status(200)
        response.json(dados)
    }else{
        response.status(404)
        response.json({'status': 404, 'message': 'Não foi encontrado alunos'})
    }
    
})

//EndPoint para retornar dados do aluno com base no número da matrícula
app.get('/v1/lion-school/alunos/:numero', cors(), async function(request, response){
    
    let matricula = request.params.numero

    let dados = alunosCursos.getDadosAlunoMatricula(matricula)

    if(dados){
        response.status(200)
        response.json(dados)
    }else{
        response.status(404)
        response.json({'status': 404, 'message': 'Não foi encontrado um aluno'})
    }    
})

//EndPoint para retornar dados do aluno com base no curso especificado
app.get('/v1/lion-school/alunos/cursos/:sigla', cors(), async function(request, response){
    
    let curso = request.params.sigla

    let dados = alunosCursos.getAlunosCurso(curso)

    if(dados){
        response.status(200)
        response.json(dados)
    }else{
        response.status(404)
        response.json({'status': 404, 'message': 'Não foi encontrado um curso'})
    }    
})

//Executa a API e faz com que fique aguardando novas requisições 
app.listen('8080', function(){
    console.log('API funcionando e aguardando requisições...')
})
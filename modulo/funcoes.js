/*********************************************************************************************************************************************************************************
 *Objetivo: Criar uma aplicação Back-End para monitorar dados dos seus alunos pela escola. 
 *Data: 13/11/2024
 *Autor: Letícia
 *Versão: 1.0
***********************************************************************************************************************************************************************************/

var listaA = require('./alunos')
var listaC = require('./cursos')

const getListadeCursos = function(){
    let listaCurso = listaC.cursos
    let Cursos = []
    let resultadoCursos = {}
    let status = false

    listaCurso.forEach(function(item){
        status = true
        Cursos.push(item)
    })

    resultadoCursos.cursos_oferecidos = Cursos

    if(status == true){
        return resultadoCursos
    }else{
        return status
    }
}

const getListadeAlunos = function(){
    let listaAlunos = listaA.alunos
    let resultadoAlunos = {}
    let Alunos = []
    let status = false

    listaAlunos.forEach(function(item){
        status = true
            let informacao = {}
            informacao.foto = item.foto
            informacao.nome = item.nome
            informacao.matricula = item.matricula
            informacao.sexo = item.sexo
            informacao.curso = item.curso
            informacao.status = item.status

            Alunos.push(informacao)
    })

    resultadoAlunos.alunos_matriculados = Alunos
    
    if(status == true){
        return resultadoAlunos
    }else{
        return status
    }
}

const getDadosAlunoMatricula = function(numMatricula){
    let matricula = Number(numMatricula)
    let listaAlunos = listaA.alunos
    let dadosAlunos = {}
    let status = false

    listaAlunos.forEach(function(item){
        if(Number(item.matricula) == matricula){
            status = true
            dadosAlunos.foto = item.foto
            dadosAlunos.nome = item.nome
            dadosAlunos.matricula = item.matricula
            dadosAlunos.sexo = item.sexo
            dadosAlunos.curso = item.curso
            dadosAlunos.status = item.status
        }
    })

    if(status == true){
        return dadosAlunos
    }else{
        return status
    }
}

const getAlunosCurso = function(sigla){
    let siglaCurso = String(sigla).toUpperCase()
    let listaAlunos = listaA.alunos
    let aluno = []
    let resultado = {}
    let status = false

    listaAlunos.forEach(function(item){
        listaAlunos = item.curso
        listaAlunos.forEach(function(itemCurso){
            if(String(itemCurso.sigla).toUpperCase() == siglaCurso){
                status = true
                let alunoDados = {}
                alunoDados.foto = item.foto
                alunoDados.nome = item.nome
                alunoDados.matricula = item.matricula
                alunoDados.sexo = item.sexo
                alunoDados.curso = item.curso
                alunoDados.status = item.status
                aluno.push(alunoDados)
            }
        })
    })

    resultado.curso = siglaCurso
    resultado.alunos = aluno

    if(status == true){
        return resultado
    }else{
        return status
    }
}

const getAlunosStatus = function(statusA){
    let statusAluno = String(statusA).toUpperCase()
    let listaAlunos = listaA.alunos
    let aluno = []
    let resultado = {}
    let status = false

    listaAlunos.forEach(function(item){
        if(String(item.status).toUpperCase() == statusAluno){
            status = true
            let alunoDados = {}
            alunoDados.foto = item.foto
            alunoDados.nome = item.nome
            alunoDados.matricula = item.matricula
            alunoDados.sexo = item.sexo
            alunoDados.curso = item.curso
            alunoDados.status = item.status
            aluno.push(alunoDados)
        }
    })

    resultado.status = statusAluno
    resultado.alunos = aluno

    if(status == true){
        return resultado
    }else{
        return status
    }
}

const getCursoStatus = function(sigla, statusC){
    let siglaCurso = String(sigla).toUpperCase()
    let statusCurso = String(statusC).toUpperCase()
    let listaAlunos = listaA.alunos
    let aluno = []
    let disciplina = []
    let resultado = {}
    let status = false

    listaAlunos.forEach(function(item){
        listaAlunos = item.curso
        item.curso.forEach(function(itemCurso){
            if(String(itemCurso.sigla).toUpperCase() == siglaCurso){
                itemCurso.disciplinas.forEach(function(itemDisciplina){
                    let alunoDados = {}
                    alunoDados.foto = item.foto
                    alunoDados.nome = item.nome
                    alunoDados.matricula = item.matricula
                    alunoDados.sexo = item.sexo
                    alunoDados.curso = item.curso
                    alunoDados.status = item.status
                    aluno.push(alunoDados)
                    if(String(itemDisciplina.status).toUpperCase() == statusCurso){
                        status = true
                        disciplina.push(itemDisciplina.disciplina)
                    }
                })
            }
        })
    })

    resultado.sigla = siglaCurso
    resultado.status = statusCurso
    resultado.alunos = aluno

    if(status == true){
        return resultado
    }else{
        return status
    }
}

const getCursoAnoConclusao = function(sigla, ano){
    let siglaCurso = String(sigla).toUpperCase()
    let anoConclusao = Number(ano)
    let listaAlunos = listaA.alunos
    let aluno = []
    let resultado = {}
    let status = false

    listaAlunos.forEach(function(item){
        listaAlunos = item.curso
        item.curso.forEach(function(itemCurso){
            if(String(itemCurso.sigla).toUpperCase() == siglaCurso){
                if(Number(itemCurso.conclusao) == anoConclusao){
                    status = true
                    let alunoDados = {}
                    alunoDados.foto = item.foto
                    alunoDados.nome = item.nome
                    alunoDados.matricula = item.matricula
                    alunoDados.sexo = item.sexo
                    alunoDados.curso = item.curso
                    alunoDados.status = item.status
                    aluno.push(alunoDados)
                }
            }
        })
    })

    resultado.ano_conclusao = anoConclusao
    resultado.alunos = aluno
    
    if(status == true){
        return resultado
    }else{
        return status
    }
}

module.exports = {
    getListadeCursos,
    getListadeAlunos,
    getDadosAlunoMatricula,
    getAlunosCurso,
    getAlunosStatus,
    getCursoStatus,
    getCursoAnoConclusao
}

// console.log(getCursoStatus('ds', 'aprovado'))

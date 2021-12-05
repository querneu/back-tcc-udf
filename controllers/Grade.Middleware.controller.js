
//Funções de controle
const mysql = require('mysql2');

const con = mysql.createConnection(
    {
        host: '127.0.0.1',
        user: 'root',
        password: 'root', //'root',
        database: 'database_tcc_development'
    }
);



/*  -----------------------Funcções Principais ---------------*/

pega_serie_em_turma = function (id_turma) {
    return new Promise(
        function (resolve, reject) {
            con.query(
                `select turmas.fk_serie, series.nome_serie from turmas 
                            inner join series on series.id_serie = turmas.fk_serie 
                            where id_turma = '${id_turma}'
                            `,
                function (err, rows) {
                    if (rows === undefined) {
                        reject(new Error("Error rows is undefined"));
                    } else {
                        resolve(rows[0]);
                    }
                }
            )
        }
    )
}


pega_turno_em_turma = function (id_turma) {
    return new Promise(
        function (resolve, reject) {
            con.query(`select turmas.fk_turno from turmas
            WHERE turmas.id_turma ='${id_turma}'`,
                function (err, rows) {
                    if (rows === undefined) {
                        reject(new Error("Error rows is undefined"));
                    } else {
                        resolve(rows[0]);
                    }
                }
            )
        }
    )
}


listar_horarios_do_turno = function (id_turno, id_turma) {
    return new Promise(
        function (resolve, reject) {
            con.query(`SELECT horarios.fk_dia, horarios.fk_turno,nome_horario,hora_inicio,hora_fim, dia.nome_dia
            FROM horarios
            INNER JOIN dia ON horarios.fk_dia = dia.id_dia
            INNER JOIN turmas ON turmas.fk_turno = horarios.fk_turno
            WHERE horarios.fk_turno = '${id_turno}' AND turmas.id_turma = '${id_turma}'
            ORDER BY  horarios.fk_dia, horarios.hora_inicio
             `,
                function (err, rows) {
                    if (rows === undefined) {
                        reject(new Error("Error rows is undefined"));
                    } else {
                        resolve(rows);
                    }
                }
            )
        }
    )
}

listar_materias_da_serie = function (fk_serie) {
    return new Promise(
        function (resolve, reject) {
            con.query(`SELECT id_materia, qtd_materia, nome_materia  from materia where fk_serie = '${fk_serie}'`,
                function (err, rows) {
                    if (rows === undefined) {
                        reject(new Error("Error rows is undefined"));
                    } else {
                        resolve(rows);
                    }
                }
            )
        }
    )
}

listar_aula_em_materia = function (fk_serie) {
    return new Promise(
        function (resolve, reject) {
            con.query(`
            SELECT 
                aulas.id_aula, 
                aulas.fk_professor, 
                aulas.fk_materia, 
                professors.nome_professor,
                professors.qtd_horas_trabalho,
                materia.nome_materia
            from aulas 
            INNER JOIN professors ON professors.id_professor = aulas.fk_professor
            INNER JOIN materia ON materia.id_materia = aulas.fk_materia
            where materia.fk_serie =  '${fk_serie}'
            `,
                function (err, rows) {
                    if (rows === undefined) {
                        reject(new Error("Error rows is undefined"));
                    } else {
                        resolve(rows);
                    }
                }
            )
        }
    )
}


algoritmo = function (horarios_do_turno, materias_da_serie, aulas_em_serie) {
    return new Promise(
        function (resolve, reject) {
            if (!horarios_do_turno || !materias_da_serie || !aulas_em_serie) {
                reject(new Error("Valores não inseridos"));
            } else {
                //Arrays de controle
                var arrayFiltroDia = [];
                var arrayvazio = [];
                let grade = [];
                //roda isso fora do laço de iteração nas listas, pois precisa preservar o total original de aulas, 30, por exemplo...
                for (var i = 0, soma = 0, max = materias_da_serie.length; i < max; i++) {
                    soma = soma + materias_da_serie[i][1];
                    qtdAulasAInserir = soma;
                }
                aulas_em_serieDia = aulas_em_serie.slice();
                maxHorarios = horarios_do_turno.length;
                while (qtdAulasAInserir > 0) {
                    if (aulas_em_serieDia.length == 0) {
                        aulas_em_serieDia = aulas_em_serie;
                    } else {
                        if (ih == maxHorarios) {
                            break
                        };
                        id_dia = horarios_do_turno[ih][1];
                        maxQtdIndiceRandomico = aulas_em_serieDia.length;
                        numRdnPosicaoAula = getRandomIndiceAula(0, maxQtdIndiceRandomico);
                        id_aula_atual = aulas_em_serie[numRdnPosicaoAula][0];
                        arrayFiltroDia.forEach((ideaula) => {
                            if (ideaula == id_aula_atual) {
                                naoinserirnagrade = true;
                            }
                        })
                        maxAulasJuntasCopy = maxAulasJuntas; //armazena uma cópia do valor 2 do maxAulasJuntas para decrementar dentro do while.
                        while ((maxAulasJuntasCopy) > 0 && (ih < maxHorarios)) {
                            var index;
                            naoinserirnagrade = false;
                            if (arrayFiltroDia.indexOf(id_aula_atual) == -1) {
                                naoinserirnagrade = true;
                                arrayFiltroDia.push(id_aula_atual);
                            }
                            if (naoinserirnagrade) {
                                aulas_em_serieDia.forEach(function (item) {
                                    if (item[0] == id_aula_atual) {
                                        index = aulas_em_serieDia.indexOf(item);
                                        aulas_em_serieDia.splice(index, 1);
                                    }
                                })
                                maxQtdIndiceRandomico = aulas_em_serieDia.length;
                                numRdnPosicaoAula = getRandomIndiceAula(0, maxQtdIndiceRandomico);
                            } else {
                                if ((ih % 6) == 0) {
                                    aulas_em_serieDia = aulas_em_serie;
                                    maxQtdIndiceRandomico = aulas_em_serieDia.length;
                                }
                                id_horario = horarios_do_turno[ih][0];
                                itemgrade = { ideHorario, ideTurma, ideAulaAtual, ideDia };//, ideprofessor}; //preenche um objeto para a grade
                                grade.push(itemgrade); //insere no array grade //listaQtdAulasNoDia.push({ideaula : ideAulaAtual, qtdaulasnodia: 2});
                                qtdAulasAInserir = qtdAulasAInserir - 1; //decrementa a lista de aulas a inserir, pois uma já foi inserida
                                arrayFiltroDia.push(ideAulaAtual);
                                ih++;
                                maxAulasJuntasCopy = maxAulasJuntasCopy - 1;
                                if ((ih % 6) == 0) {
                                    while (arrayFiltroDia.length) {
                                        arrayFiltroDia.pop();
                                    }
                                    arrayFiltroDia = arrayvazio;
                                }
                            }
                            qtdAulasAInserir = qtdAulasAInserir - 1;
                        }
                    }
                }
                for (var i = 0, x = grade.length; i < x; i++) {
                    //itemGrade = { id_horario: 1, id_aula: 1, id_turma: id_turma, id_grade: 1 }
                    grade[i].idegrade = i + 1;
                    console.log("   id_grade: " + grade[i].idegrade +
                        " - dia: " + grade[i].idedia +
                        " - horario: " + grade[i].idehorario +
                        " - turma:  " + grade[i].ideturma +
                        " - aula: " + grade[i].ideaula);
                }
            }
        }
    )

}



function Counter() {
    this.count = 0;
    let self = this;
    return {
        increase: function () { self.count++; },
        current: function () { return self.count; },
        reset: function () { self.count = 0; }
    }
};

function getRandomIndiceAula(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}


module.exports = {
    pega_serie_em_turma,
    pega_turno_em_turma,
    listar_horarios_do_turno,
    listar_materias_da_serie,
    listar_aula_em_materia,
    algoritmo
}
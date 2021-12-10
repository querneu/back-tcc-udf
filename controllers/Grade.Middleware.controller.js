//Funções de controle
const mysql = require("mysql2");

const con = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "root", //'root',
  database: "database_tcc_development",
});

/*  -----------------------Funções Principais ---------------*/

pega_serie_em_turma = function (id_turma) {
  return new Promise(function (resolve, reject) {
    con.query(
      `select turmas.fk_serie, series.nome_serie from turmas 
            inner join series on series.id_serie = turmas.fk_serie 
            where id_turma = '${id_turma}'
                AND turmas.is_active= 'Sim'
                AND series.is_active= 'Sim'
                            `,
      function (err, rows) {
        if (rows === undefined) {
          reject(new Error("Error rows is undefined"));
        } else {
          resolve(rows[0]);
        }
      }
    );
  });
};

listar_turmas = function () {
  return new Promise(function (resolve, reject) {
    con.query(
      `select turmas.id_turma, turmas.nome_turma from turmas WHERE turmas.is_active= 'Sim'`,
      function (err, rows) {
        if (rows === undefined) {
          reject(new Error("Error rows is undefined"));
        } else {
          resolve(rows[0]);
        }
      }
    );
  });
};

pega_turno_em_turma = function (id_turma) {
  return new Promise(function (resolve, reject) {
    con.query(
      `select turmas.fk_turno from turmas
            WHERE turmas.id_turma ='${id_turma}' 
                AND turmas.is_active= 'Sim'`,
      function (err, rows) {
        if (rows === undefined) {
          reject(new Error("Error rows is undefined"));
        } else {
          resolve(rows[0]);
        }
      }
    );
  });
};

listar_horarios_do_turno = function (id_turno, id_turma) {
  return new Promise(function (resolve, reject) {
    con.query(
      `SELECT 
            horarios.id_horario,
            horarios.fk_dia,
            horarios.fk_turno,
            nome_horario,
            hora_inicio,
            hora_fim, 
            dia.nome_dia,
            turmas.nome_turma
        FROM horarios
        INNER JOIN dia ON horarios.fk_dia = dia.id_dia
        INNER JOIN turmas ON turmas.fk_turno = horarios.fk_turno
        WHERE horarios.fk_turno = '${id_turno}' AND turmas.id_turma = '${id_turma}'
            AND dia.is_active= 'Sim' 
            AND horarios.is_active ='Sim'
            AND turmas.is_active = 'Sim'
        ORDER BY  horarios.fk_dia, horarios.hora_inicio`,
      function (err, rows) {
        if (rows === undefined) {
          reject(new Error("Error rows is undefined"));
        } else {
          resolve(rows);
        }
      }
    );
  });
};

listar_materias_da_serie = function (fk_serie) {
  return new Promise(function (resolve, reject) {
    con.query(
      `SELECT id_materia, qtd_materia, nome_materia  from materia where fk_serie = '${fk_serie}' 
            AND materia.is_active = 'Sim'`,
      function (err, rows) {
        if (rows === undefined) {
          reject(new Error("Error rows is undefined"));
        } else {
          resolve(rows);
        }
      }
    );
  });
};

listar_aula_em_materia = function (fk_serie) {
  return new Promise(function (resolve, reject) {
    con.query(
      `
            SELECT 
                aulas.id_aula, 
                aulas.fk_professor, 
                aulas.fk_materia, 
                professors.nome_professor,
                professors.qtd_horas_trabalho,
                materia.nome_materia,
                materia.qtd_materia
            from aulas 
            INNER JOIN professors ON professors.id_professor = aulas.fk_professor
            INNER JOIN materia ON materia.id_materia = aulas.fk_materia
            where materia.fk_serie =  '${fk_serie}'
            AND professors.is_active = 'Sim'
            AND aulas.is_active = 'Sim'
            AND materia.is_active = 'Sim'
            `,
      function (err, rows) {
        if (rows === undefined) {
          reject(new Error("Error rows is undefined"));
        } else {
          resolve(rows);
        }
      }
    );
  });
};

var grade_completa = [];
listar_turmas.forEach(() => {
  algoritmo = function (
    id_turma,
    horarios_do_turno,
    materias_da_serie,
    aulas_em_serie,
    listar_turmas
  ) {
    return new Promise(function (resolve, reject) {
      //Arrays de controle
      var arrayFiltroDia = [];
      var grade = [];
      //Variáveis de controle
      var id_horario;
      var naoinserirnagrade = false; //Controlar se insere ou não na grade (evitar repetição de aulas no mesmo dia)
      var maxHorarios; // Sera preenchido pela Lista de horarios do turno
      var ih = 0; //(iterador de horario) Fixo, pega tamanho das horas do turno!
      var maxAulasJuntas = 2; //busca de Config via select qtd_max_aulas from configs where id_config = 1 //esse 1 é fixo mesmo
      var maxAulasJuntasCopy;
      var qtdAulasAInserir = 10; //inicializa com zero, mas preenche a soma com a qtd_aulas da materia.
      var maxQtdIndiceRandomico; // deve ser atualizado dentro dos laços quando remover um aula da lista de aulas a inserir.
      var numRdnPosicaoAula; //variável que vai receber um indice randomico para selecionar uma materia
      var itemgrade; //montar um registro em memoria para preencher o vetor de grade
      var nome_materia;

      if (!horarios_do_turno || !materias_da_serie || !aulas_em_serie) {
        reject(new Error("Valores não inseridos"));
      } else {
        //roda isso fora do laço de iteração nas listas, pois precisa preservar o total original de aulas, 30, por exemplo...

        for (
          var i = 0, soma = 0, max = materias_da_serie.length;
          i < max;
          i++
        ) {
          soma = soma + materias_da_serie[i].qtd_materia;
          qtdAulasAInserir = soma;
        }

        aulas_em_serieDia = aulas_em_serie.slice();
        maxHorarios = horarios_do_turno.length;

        while (qtdAulasAInserir > 0) {
          //roda isso fora do laço de iteração nas listas, pois precisa preservar o total original de aulas, 30, por exemplo...
          //console.log(qtdAulasAInserir);
          naoinserirnagrade = false;

          maxQtdIndiceRandomico = aulas_em_serie.length;
          numRdnPosicaoAula = getRandomIndiceAula(0, maxQtdIndiceRandomico);
          nome_materia = aulas_em_serie[numRdnPosicaoAula].nome_materia;
          id_aula_atual = aulas_em_serie[numRdnPosicaoAula].id_aula;
          qtd_aula_materia = aulas_em_serie[numRdnPosicaoAula].qtd_materia;
          nome_professor = aulas_em_serie[numRdnPosicaoAula].nome_professor;
          qtd_horas_trabalho =
            aulas_em_serie[numRdnPosicaoAula].qtd_horas_trabalho;

          arrayFiltroDia.forEach((ideaula) => {
            if (ideaula == id_aula_atual) {
              naoinserirnagrade = true;
            }
          });

          if (naoinserirnagrade) {
            continue;
          } else {
            maxAulasJuntasCopy = maxAulasJuntas; //armazena uma cópia do valor 2 do maxAulasJuntas para decrementar dentro do while.
            while (maxAulasJuntasCopy > 0 && ih < maxHorarios) {
              if (arrayFiltroDia.length == aulas_em_serie.length) {
                break;
              }

              id_horario = horarios_do_turno[ih].id_horario;

              //--------------------------INSERE
              if (checkInsertAulaColide(nome_professor, id_horario, id_turma)) {
                continue;
              }
              if (
                !checkInsert(
                  grade,
                  id_aula_atual,
                  qtd_aula_materia,
                  nome_professor,
                  qtd_horas_trabalho
                )
              ) {
                //arrayFiltroDia.push(id_aula_atual);
                //numRdnPosicaoAula = getRandomIndiceAula(0, maxQtdIndiceRandomico);
                //id_aula_atual = aulas_em_serie[numRdnPosicaoAula].id_aula;
                break;
              }

              //console.log(checkInsert(grade, id_aula_atual, qtd_aula_materia));
              id_horario = horarios_do_turno[ih].id_horario;
              nome_dia = horarios_do_turno[ih].nome_dia;
              nome_turma = horarios_do_turno[ih].nome_turma;

              itemgrade = {
                id_horario,
                id_turma,
                id_aula_atual,
                nome_dia,
                nome_turma,
                nome_materia,
                qtd_aula_materia,
                nome_professor,
                qtd_horas_trabalho,
              }; //, ideprofessor}; //preenche um objeto para a grade

              grade.push(itemgrade);

              maxAulasJuntasCopy = maxAulasJuntasCopy - 1;

              qtdAulasAInserir = qtdAulasAInserir - 1; //decreme
              ih++;

              //--------------------------INSERE

              //Removido pois não queremos que a aula que termina um dia começe o outro
              /* if (ih % 6 == 0 && ih != 0) {  
              maxAulasJuntasCopy = maxAulasJuntas;
            } */

              console.log("Max dia: " + maxAulasJuntasCopy + " - IH: " + ih);
            }
            arrayFiltroDia.push(id_aula_atual);
            if (ih % 6 == 0 && ih != 0) {
              console.log(arrayFiltroDia);
              arrayFiltroDia = [];
            }
          }

          if (ih == maxHorarios) {
            break;
          }
          if (arrayFiltroDia.length == aulas_em_serie.length) {
            break;
          }
        }

        //console.log(grade);
        console.log(
          "----------------------------------------------------------------------------------------"
        );
        grade.forEach((qtd) => {
          console.log(
            "ID HORA: " +
              qtd.id_horario +
              " - " +
              qtd.nome_materia +
              " - qtd_aulas: " +
              qtd.qtd_aula_materia +
              " - Dia: " +
              qtd.nome_dia
          );
        });
        //resolve(grade);
      } /*AQUI TERMINA O ELSE*/
    });
  };
  grade_completa.push(grade);
}); //Fim do FOREACH

function Counter() {
  this.count = 0;
  let self = this;
  return {
    increase: function () {
      self.count++;
    },
    current: function () {
      return self.count;
    },
    reset: function () {
      self.count = 0;
    },
  };
}

function checkInsert(
  grade,
  id_aula,
  qtdMaxima,
  nome_professor,
  qtdHorasTrabalho
) {
  let arry = grade;

  let soma = 0;
  let somaProf = 0;

  for (let i = 0; i < arry.length; i++) {
    // nested for loop
    // check if elements' values are equal
    if (arry[i].id_aula_atual === id_aula) {
      // duplicate element present
      soma++;
    }
    if (arry[i].nome_professor === nome_professor) {
      // duplicate element present

      somaProf++;
    }
  }

  if (soma < qtdMaxima && somaProf < qtdHorasTrabalho) {
    if (qtdMaxima - soma == 1) {
      maxAulasJuntasCopy = 1;
    }
    return true;
  } else {
    return false;
  }
}

function checkInsertAulaColide(nome_professor, id_horario, id_turma) {
  let retorno = true;

  if (grade_completa) {
    grade_completa.forEach((grade_interna) => {
      if (
        nome_professor === grade_interna.nome_professor &&
        id_horario === grade_interna.id_horario &&
        id_turma !== grade_interna.id_turma
      ) {
        retorno = false;
      }
    });
  }
  return retorno;
}

function getRandomIndiceAula(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

module.exports = {
  pega_serie_em_turma,
  pega_turno_em_turma,
  listar_horarios_do_turno,
  listar_materias_da_serie,
  listar_aula_em_materia,
  listar_turmas,
  algoritmo,
};

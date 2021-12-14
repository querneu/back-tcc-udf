//Funções de controle
const mysql = require("mysql2");
const Config = require("./Config.controller");

//Config conexão da base
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

turma_existe_na_grade = function (id_turma) {
  return new Promise(function (resolve, reject) {
    con.query(
      `SELECT grades.fk_turma
          from grades
          INNER JOIN aulas ON aulas.id_aula = grades.fk_aula
          WHERE grades.fk_turma = ${id_turma}
          GROUP BY grades.fk_turma`,
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

pegar_configs = function () {
  return new Promise(function (resolve, reject) {
    con.query(`select * from configs`, function (err, rows) {
      if (rows === undefined) {
        reject(new Error("Error rows is undefined"));
      } else {
        resolve(rows[0]);
      }
    });
  });
};

pegar_grade_completa = function () {
  return new Promise(function (resolve, reject) {
    con.query(
      `SELECT grades.id_grade, grades.fk_horario, grades.fk_turma, aulas.fk_professor, aulas.id_aula
      from grades
      INNER JOIN aulas ON aulas.id_aula = grades.fk_aula
      ORDER BY grades.fk_horario ASC`,
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

algoritmo = function (
  id_turma,
  horarios_do_turno,
  materias_da_serie,
  aulas_em_serie,
  existe_turma_na_grade,
  configs,
  pegar_grade
) {
  return new Promise(function (resolve, reject) {
    //Arrays de controle
    var arrayFiltroDia = [];
    var grade = [];
    var grade_completa = pegar_grade;
    //Variáveis de controle
    var id_horario;
    var naoinserirnagrade = false; //Controlar se insere ou não na grade (evitar repetição de aulas no mesmo dia)
    var maxHorarios; // Sera preenchido pela Lista de horarios do turno
    var ih = 0; //(iterador de horario) Fixo, pega tamanho das horas do turno!
    //console.log(configs); configs.qtd_max_aulas
    var maxAulasJuntas = 2; //busca de Config via select qtd_max_aulas from configs where id_config = 1 //esse 1 é fixo mesmo
    var maxAulasJuntasCopy;
    var qtdAulasAInserir = 0; //inicializa com zero, mas preenche a soma com a qtd_aulas da materia.
    var maxQtdIndiceRandomico; // deve ser atualizado dentro dos laços quando remover um aula da lista de aulas a inserir.
    var numRdnPosicaoAula; //variável que vai receber um indice randomico para selecionar uma materia
    var itemgrade; //montar um registro em memoria para preencher o vetor de grade
    var nome_materia;

    if (!horarios_do_turno || !materias_da_serie || !aulas_em_serie) {
      reject(new Error("Valores não inseridos"));
    } else if (existe_turma_na_grade.length > 0) {
      console.log("turma já existe na grade");
      reject(existe_turma_na_grade);
    } else {
      for (var i = 0, soma = 0, max = materias_da_serie.length; i < max; i++) {
        soma = soma + materias_da_serie[i].qtd_materia;
        qtdAulasAInserir = soma;
      }
      aulas_em_serieDia = aulas_em_serie.slice();
      maxHorarios = horarios_do_turno.length;
      console.log("COMECEI");
      while (qtdAulasAInserir > 0) {
        naoinserirnagrade = false;
        maxQtdIndiceRandomico = aulas_em_serie.length;
        numRdnPosicaoAula = getRandomIndiceAula(0, maxQtdIndiceRandomico);

        nome_materia = aulas_em_serie[numRdnPosicaoAula].nome_materia;
        id_professor = aulas_em_serie[numRdnPosicaoAula].fk_professor;
        id_aula_atual = aulas_em_serie[numRdnPosicaoAula].id_aula;
        qtd_aula_materia = aulas_em_serie[numRdnPosicaoAula].qtd_materia;

        var loki = aulas_em_serie[numRdnPosicaoAula];
        console.log(loki);

        /*  console.log(
          "Id professor da aula: " + id_professor + " - Aula: " + nome_materia
        ); */
        qtd_horas_trabalho =
          aulas_em_serie[numRdnPosicaoAula].qtd_horas_trabalho;
        arrayFiltroDia.forEach((ideaula) => {
          if (ideaula === id_aula_atual) {
            naoinserirnagrade = true;
          }
        });
        if (naoinserirnagrade) {
          continue;
        } else {
          maxAulasJuntasCopy = maxAulasJuntas; //armazena uma cópia do valor 2 do maxAulasJuntas para decrementar dentro do while.
          while (maxAulasJuntasCopy > 0 && ih < maxHorarios) {
            /* if (arrayFiltroDia.length == aulas_em_serie.length) {
              console.log("NUNCA ACONTEÇO");
              break;
            } */
            id_horario = horarios_do_turno[ih].id_horario;
            console.log(id_horario);
            id_professorTeste = id_professor;
            //--------------------------INSERE
            console.log(
              loki.fk_professor +
                " Z " +
                id_horario +
                " Z " +
                id_turma +
                "-----------"
            );
            if (
              !checkInsertAulaColide(
                loki.fk_professor,
                id_horario,
                loki.id_aula,
                grade_completa
              )
            ) {
              console.log("estou aqui");

              break;
            }
            if (
              !checkInsert(
                grade,
                id_aula_atual,
                qtd_aula_materia,
                id_professor,
                id_turma,
                qtd_horas_trabalho
              )
            ) {
              break;
            }

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
              id_professor,
              qtd_horas_trabalho,
            };
            grade.push(itemgrade);
            maxAulasJuntasCopy = maxAulasJuntasCopy - 1;
            qtdAulasAInserir = qtdAulasAInserir - 1; //decreme
            ih++;
            if (maxAulasJuntasCopy === 0) {
              arrayFiltroDia.push(id_aula_atual);
            }
          }
        }

        //console.log(arrayFiltroDia);

        if (ih % 6 == 0 && ih != 0) {
          arrayFiltroDia = [];
        }
        if (ih == maxHorarios) {
          break;
        }
        if (arrayFiltroDia.length == aulas_em_serie.length) {
          break;
        }
      }
      //console.log(grade[ih].id_aula_atual);

      resolve(grade);
    }
  });
};

function checkInsert(
  grade,
  id_aula,
  qtdMaxima,
  id_professor,
  id_turma,
  qtdHorasTrabalho
) {
  let arry = grade;
  let soma = 0;
  let somaProf = 0;

  if (!arry) {
    for (let i = 0; i < arry.length; i++) {
      if (arry[i].id_aula_atual === id_aula) {
        soma++;
      }
      if (
        //Checa o máximo do professor.
        arry[i].id_professor === id_professor &&
        arry[i].fk_turma !== id_turma
      ) {
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
  } else {
    return true;
  }
}

function checkInsertAulaColide(
  fk_professor1,
  fk_horario1,
  id_aula1,
  grade_completa
) {
  var retorno = true;

  console.log("aqui");

  grade_completa.forEach((internalValues) => {
    if (
      fk_professor1 === internalValues.fk_professor &&
      fk_horario1 === internalValues.fk_horario &&
      id_aula1 === internalValues.id_aula
    ) {
      console.log("2257");
      retorno = false;
    }
    console.log(
      internalValues.fk_professor +
        " - " +
        internalValues.fk_horario +
        " - " +
        internalValues.id_aula
    );
    //console.log(fk_professor1 + " - " + fk_horario1 + " - " + id_aula1);
  });
  //console.log(grade_completa);

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
  turma_existe_na_grade,
  algoritmo,
  pegar_configs,
  pegar_grade_completa,
};

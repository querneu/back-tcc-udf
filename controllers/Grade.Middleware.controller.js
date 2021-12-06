//Funções de controle
const mysql = require("mysql2");

const con = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "root", //'root',
  database: "database_tcc_development",
});

/*  -----------------------Funcções Principais ---------------*/

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

algoritmo = function (
  id_turma,
  horarios_do_turno,
  materias_da_serie,
  aulas_em_serie
) {
  return new Promise(function (resolve, reject) {
    //Arrays de controle
    var arrayFiltroDia = [];
    var arrayvazio = [];
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
      for (var i = 0, soma = 0, max = materias_da_serie.length; i < max; i++) {
        soma = soma + materias_da_serie[i].qtd_materia;
        qtdAulasAInserir = soma;
      }

      aulas_em_serieDia = aulas_em_serie.slice();
      maxHorarios = horarios_do_turno.length;

      while (qtdAulasAInserir > 0) {
        //roda isso fora do laço de iteração nas listas, pois precisa preservar o total original de aulas, 30, por exemplo...
        //console.log(qtdAulasAInserir);
        maxQtdIndiceRandomico = aulas_em_serie.length;
        numRdnPosicaoAula = getRandomIndiceAula(0, maxQtdIndiceRandomico);
        nome_materia = aulas_em_serie[numRdnPosicaoAula].nome_materia;
        id_aula_atual = aulas_em_serie[numRdnPosicaoAula].id_aula;
        qtd_aula_materia = aulas_em_serie[numRdnPosicaoAula].qtd_materia;

        arrayFiltroDia.forEach((ideaula) => {
          if (ideaula == id_aula_atual) {
            naoinserirnagrade = true;
          }
        });

        maxAulasJuntasCopy = maxAulasJuntas; //armazena uma cópia do valor 2 do maxAulasJuntas para decrementar dentro do while.
        while (maxAulasJuntasCopy > 0 && ih < maxHorarios) {
          if (arrayFiltroDia.length == aulas_em_serie.length) {
            break;
          } else {
            if (arrayFiltroDia.indexOf(id_aula_atual) != -1) {
              //está presente na lista de rejeicao
              //Troca de aula
              //console.log(arrayFiltroDia);
              numRdnPosicaoAula = getRandomIndiceAula(0, maxQtdIndiceRandomico);
              id_aula_atual = aulas_em_serie[numRdnPosicaoAula].id_aula;
              nome_materia = aulas_em_serie[numRdnPosicaoAula].nome_materia;
              qtd_aula_materia = aulas_em_serie[numRdnPosicaoAula].qtd_materia;
              naoinserirnagrade = true;
            }
          }

          id_horario = horarios_do_turno[ih].id_horario;

          if (naoinserirnagrade) {
            naoinserirnagrade = false;
          } else {
            //--------------------------INSERE

            if (qtd_aula_materia / 2 == 0 && qtd_aula_materia % 2 == 1) {
              maxAulasJuntasCopy = 1;
            }
            if (!checkInsert(grade, id_aula_atual, qtd_aula_materia)) {
              arrayFiltroDia.push(id_aula_atual);
              numRdnPosicaoAula = getRandomIndiceAula(0, maxQtdIndiceRandomico);
              id_aula_atual = aulas_em_serie[numRdnPosicaoAula].id_aula;
              continue;
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
            }; //, ideprofessor}; //preenche um objeto para a grade

            grade.push(itemgrade);

            maxAulasJuntasCopy = maxAulasJuntasCopy - 1;
            if (maxAulasJuntasCopy == 0) {
              arrayFiltroDia.push(id_aula_atual);
            }
            qtdAulasAInserir = qtdAulasAInserir - 1; //decreme
            ih++;

            //--------------------------INSERE

            if (ih % 6 == 0 && ih != 0) {
              arrayFiltroDia = arrayvazio;
            }
          }
        }
        //console.log(ih);
        if (ih == maxHorarios) {
          break;
        }
        if (arrayFiltroDia.length == aulas_em_serie.length) {
          break;
        }
      }
      console.log(grade);
      //resolve(grade);
    }
  });
};

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

function checkInsert(grade, id_aula, qtdMaxima) {
  let arry = grade;

  let soma = 0;
  for (let i = 0; i < arry.length; i++) {
    // nested for loop
    // check if elements' values are equal
    if (arry[i].id_aula_atual === id_aula) {
      // duplicate element present
      soma++;
    }
  }
  if (soma < qtdMaxima) {
    return true;
  } else {
    return false;
  }
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
  algoritmo,
};

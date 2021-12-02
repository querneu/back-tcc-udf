
// console.log("testes");
// get the client
const mysql = require('mysql2');

let fk_serie = 1; // informado pelo usuário
pega_serie_em_turma(fk_serie);
let ideTurno = 1; //Matutino, informado pelo usuário
let grade = [];
function pega_serie_em_turma(id_turma) {
    const con = mysql.createConnection(
        {
            host: '127.0.0.1',
            user: 'root',
            password: 'root',
            database: 'database_tcc_development'
        }
    );
    con.query({
        sql: `select turmas.fk_serie, series.nome_serie from turmas 
        inner join series on series.id_serie = turmas.fk_serie 
        where id_turma = '${id_turma}'
        `,
        rowsAsArray: true
    }, function (err, results, fields) {
        results.map((fk_serie) => {
            console.log("Serie: " + fk_serie);
            pegar_materias(fk_serie[0])
        })

    })
}


function pegar_materias(fk_serie) {
    const con = mysql.createConnection(
        {
            host: '127.0.0.1',
            user: 'root',
            password: 'root',
            database: 'database_tcc_development'
        }
    );
    let teste = con.query({ sql: ` SELECT id_materia, nome_materia from Materia where fk_serie = '${fk_serie}'`, rowsAsArray: true },
        function (err, results, fields) {
            results.map((results) => {
                console.log("Materia: " + results[1]);
                //pegar_materias(results[0])
            })
        })
}
//Id serie entra aqui
// console.log("ideSerieDaTurma: " + ideSerieDaTurma);

//(select ide_serie from turma where turma_fk = req.body.id_turma)


var itemGrade;
// itemGrade = { id_horario: 1, id_aula: 1, id_turma: id_turma, id_grade: 1 }
// grade.push(itemGrade);
// console.log(`Horario: ${grade[0].id_horario}`);

var listaMateriasDaSerie = [[1, 12, 'Português'], [2, 12, 'Matematica'], [3, 6, 'Ciências']];
// console.log("listaMateriasDaSerie: " + listaMateriasDaSerie.slice(','));
/*     Select ide_materia, qtd_materia, nom_materia from Materia where serie_fk = ideSerieDaTurma)
*/


var somaHorasMaterias = 15; //o máximo que o teste dá é 21 horas alocadas, tenho que por menos no total aqui.
//12+12+6
/*     (Select Sum(qtd_materia) from Materia where serie_fk = @idSerieDaTurma)     
*/

//obter a listagem das aulas da materia
var listaAulasDasMaterias = [[5, 2], [9, 9], [10, 10], [11, 11], [12, 12], [13, 13], [14, 14], [15, 15], [16, 16], [17, 17]];
// console.log("listaAulasDasMaterias: " + listaAulasDasMaterias);

/*
// Select só com ide's
    (Select Aula.ide_aula, Aula.professor_fk from Aula where Aula.materia_fk in (
     Select ide_materia from materia where serie_fk = ideSerieDaTurma
    )

  //ou com nomes também:
    Select Aula.ide_aula, Aula.professor_fk, Aula.nom_aula, professor.nom_professor
    from Aula 
    inner join professor on professor.ide_professor = aula.professor_fk
    where Aula.materia_fk in (
            Select ide_materia from materia where serie_fk = ideSerieDaTurma
    )

    ide_aula    professor_fk    nom_aula    nom_professor
    5           2               Matemática  Soron
    9           9               Matemática  Naociuoth
    10          10              Português   Alion
    11          11              Matemática  Morki
    12          12              História    Hunbra
    13          13              Artes       Xuela
    14          14              Matemática  Nabere
    15          15              Português   Veamalump
    16          16              PD 1 Libras Zumaival
    17          17              História    Arloyias
*/
var contadorAula = new Counter();


var ideAulaAtual = listaAulasDasMaterias[contadorAula.current()][0];
//o primeiro [0] identifica o par (5,2), o segundo [] identifica qual valor quer obter
var ideProfessor = listaAulasDasMaterias[contadorAula.current()][1];
var ideAulaProx = listaAulasDasMaterias[1][0]; //exemplo para iterar entre os ide's de aula

// console.log('ideAulaAtual: ' + ideAulaAtual + '; ideAulaProx = ' + ideAulaProx);

//com o turno, dá pra saber quais horários serão preenchidos na grade.
var listaHorariosDoTurno = [[1, 1], [2, 1], [3, 1], [4, 1], [5, 1], [6, 1], [7, 2], [8, 2], [9, 2], [10, 2], [11, 2], [12, 2]];
/*      select ide_horario, dia_fk from Horario where turno_fk = ideTurno      */

var gradevazia = 0;

var somaHorasGrade = 0; //contar no banco. Cada registro na tabela é uma hora-aula inserida
/* "select count(aula_fk) as qtd_aula_grade from grade;" */
var somaAulasDoProfessorNaGrade = 0;
var totalCargaAulasDoProfessor = 10; //vamos supor que o professor tinha 10 aulas disponíveis para dar...
var qtdAulasAInserir = 20;

// console.log("somaHorasMaterias: " + somaHorasMaterias);

var ideGrade = 1; //identificador PK começa em 1.
ideTurma = listaHorariosDoTurno[0][0] //ide_horario, dia_fk
var ideDia = 1; //começa no banco em 1 - segunda, 2 terça, 3 quarta, 4 quinta 5 sexta-feira
var ideHorario = listaHorariosDoTurno[0][0]; //ide_horario, dia_fk

/* Exemplo de resultado do select de turma em listaHorariosDoTurno
    select ide_horario, nom_horario, hor_inicio,  hor_fim, turno_fk, dia_fk from Horario where turno_fk = 1
    
    ide_horario nom_horario hor_inicio  hor_fim turno_fk    dia_fk
    1           Primeiro    07:30       08:05   1           1
    2           Segundo     08:05       08:45   1           1
    3           Terceiro    08:45       09:25   1           1
    4           Quarto      09:25       10:05   1           1
    5           Quinto      10:25       10:55   1           1
    6           Sexto       10:55       11:25   1           1

    7           Primeiro    07:30       08:05   1           2
    8           Segundo     08:05       08:45   1           2
    9           Terceiro    08:45       09:25   1           2
    10          Quarto      09:25       10:05   1           2
    11          Quinto      10:25       10:55   1           2
    12          Sexto       10:55       11:25   1           2
    (... vai até o 30, são 6 horários para cada um dos 5 dias...)
*/

/*
    Grade	na planilha
    Id_Grade	Id_Turma	Id_Horario	Id_Aula
    1	        2	        1	        1
	
    Grade	no banco
    Id_Grade	turma_fk	horario_fk	aula_fk
    1	        2	        1	        1
*/

//while (somaHorasGrade <= somaHorasMaterias) {

//tem os parâmetros já?
//ideGrade    //gerado na grade automaticamente ou vai começar de 1.
//ideTurma  //k, já no início da lógica.
//ideHorario
//ideProfessor

//ideAulaAtual = listaAulasDasMaterias[contadorAula.current()][0];

//aula: pode variar
//dias 5
//horarios 6 por dia, mas incrementa de 1 a 30 e não até 6..

// iteradores para percorrer as lista de dia (2ª a 6ª), 
// os horarios (7:05, 8:00, etc), que são 6 por dia - numerado de 1 a 30 para o matutino), 
// e as aulas (que vão variar de acordo com o select do banco)
var iteradorDia = new Counter();      //ver função no fim do código, increase, reset, current
var iteradorHorario = new Counter(); //iterador começa em 0, basta dar um console.log(iteradorHorario.current());
var iteradorAula = new Counter();
var totalRegistrosAula = 0;

//esse deve vir antes dos horários... por questões lógicas... tenho 30 aulas e 6 horários... encheu os 6, passa para o próximo dia...
//acho que aulas virão então antes de todos, pois vai ser um while
// e aí navega entre os dias e horários para por as aulas... acho que é o melhor caminho...

//aqui não vai ser por iterador vai ser por quantidade de aula ainda não alocada > 0
//decrementa isso durante o while que vai substituir o for(iteradorAula)	
//for (iteradorAula.reset(); iteradorAula.current() < totalRegistrosAula ; iteradorAula.increase()){ //1 pular pra 2
while (qtdAulasAInserir > 0) {

    ideAulaAtual = listaAulasDasMaterias[contadorAula.current()][0];
    //----------------------------------------
    if (somaHorasGrade == 0) { //grade vazia
        // console.log("pode gravar na grade logo, sem testar nada antes. " + somaHorasGrade);

        /*if (verifica se passou da cota do professor){ iteradorAula.increse();     break; }
         else { continue; } */
        //insert into grade (ide_grade, turma_fk, horario_fk, aula_fk) 
        //  values 			  
        (ideGrade, ideTurma, ideHorario, ideAulaAtual)

        // monta um objeto itemGrade com os valores e depois dá um listagrade.push(itemGrade)


        // ao inserir já    

        /*console.log("Dia " + iteradorDia.current() + "; Horario " + iteradorHorario.current() + "; Aula " + iteradorAula.current() + ".");*/

        somaHorasGrade = somaHorasGrade + 1;
        //removendo aqui no código a aula inserida. 
        //Mas teria que ser na quantidade de aulas
        qtdAulasAInserir = qtdAulasAInserir - 1;
        ideGrade = ideGrade + 1;
        contadorAula.increase();


    } else {

        if (somaAulasDoProfessorNaGrade < totalCargaAulasDoProfessor) {
            //se o horario estiver vago e o parâmetro Config.PermiDoisPros = false, não tenta, passa para outra Aula...
            somaAulasDoProfessorNaGrade = somaAulasDoProfessorNaGrade + 1;
            // console.log("linha 176. a cota do professor ainda não completou. " + somaAulasDoProfessorNaGrade + " - " + totalCargaAulasDoProfessor);

        } else {

            for (iteradorDia.reset(); iteradorDia.current() < 5; iteradorDia.increase()) { //2 a sexta 5 dias

                // pegar a lista de horarios para o dia em questão, para o turno escolhido.
                //com o turno, dá pra saber quais horários serão preenchidos na grade.

                listaHorariosDoTurno = [[1, 1], [2, 1], [3, 1], [4, 1], [5, 1], [6, 1]];
                //ide_horario, dia_fk
                //atualizar a lista de horarios para cada dia do loop for.
                //por exemplo, do dia 2 seria isso:  
                //[ [7,2] , [8,2] , [9,2] , [10,2] , [11,2] , [12,2] ];

                /*	select ide_horario, dia_fk from Horario where turno_fk = ideTurno  and dia_fk = ideDia  order by hor_inicio */
                //ao trocar o dia, o iterador de Horario tem que voltar para o primeiro horario do dia, que é o [0][0]

                for (iteradorHorario.reset(); iteradorHorario.current() < 6; iteradorHorario.increase()) {
                    //iteradorHorario vai de 0 a 5 (6 horarios no dia)

                    //ideHorario = listaHorariosDoTurno[0][0];
                    ideHorario = listaHorariosDoTurno[iteradorHorario.current()][0];
                    // console.log("iterador de Dia e Horario: " + iteradorDia.current() + " -> " + iteradorHorario.current()
                    //     + " - somaHorasGrade: " + somaHorasGrade
                    //     + " - qtdAulasAInserir: " + qtdAulasAInserir);

                    //para parar o laco:
                    //break; -- para o for e sai definitivamente dele, usar se acabar a aula
                    //continue; -- interrompe a execução atual e passa para a próxima iteração do laço

                    totalRegistrosAula = listaAulasDasMaterias.length;


                    //professor já está saturado de aula
                    // se o parâmetro permitir outro professor da mesma disciplina, beleza
                    //console.log("linha 198. A cota do professor está completa.")
                    // se não permitir, outro professor, o break abaixo para de 
                    continue;
                }

                /* console.log("Dia " + iteradorDia.current() 
                + "; Horario " + iteradorHorario.current() 
                + "; Aula " + iteradorAula.current() + ".");
                */

                //percorrer horario 
                ideHorario = listaHorariosDoTurno[0][0];  //30x
                //for (i = 0 ; i < listaHorariosDoTurno.length(); i++) {


                //}

                /*console.log ("Não pode gravar na grade logo, testar algumas coisas, " +
                                "como total de horas do professor, se já está na lista. " + somaHorasGrade);
                */
                somaHorasGrade = somaHorasGrade + 1;

                ideGrade = ideGrade + 1;
                //ideGrade = maior PK da grade + 1;
                //buscar no banco o maior ide e somar mais 1.
                /*   select 1 + max(ide_grade) from grade   */

                //----------------------------------------
                qtdAulasAInserir = qtdAulasAInserir - 1; //removendo aqui no código a aula inserida.
            }
        }


    }

    ideHorario = iteradorHorario.current();

}


// console.log("Final: iterador de Dia e Horario: " + iteradorDia.current() + " -> " + iteradorHorario.current()
//     + " - somaHorasGrade: " + somaHorasGrade
//     + " - qtdAulasAInserir: " + qtdAulasAInserir);

//rodar essa atualização sempre no fim do While
//somaHorasGrade = select count(aula_fk) as qtd_aula_grade from grade 

//}





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
        }
    }
}



const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const app = express();
const PORT = 3006;
const db = require('./models');
const CustomAuthMiddleware = require('./middleware/CustomAuth.middleware');
const AnoRoutes = require('./routes/Ano.routes');
const GradeRoutes = require('./routes/Grade.routes');
const TurmaRoutes = require('./routes/Turma.routes');
const DiaRoutes = require('./routes/Dia.routes');
const AulaRoutes = require('./routes/Aula.routes');
const FaseRoutes = require('./routes/Fase.routes');
const TurnoRoutes = require('./routes/Turno.routes');
const ProfessorRoutes = require('./routes/Professor.routes');
const UsuarioRoutes = require('./routes/Usuario.routes');
const SerieRoutes = require('./routes/Serie.routes');
const MateriaRoutes = require('./routes/Materia.routes');
const HorarioRoutes = require('./routes/Horario.routes');
const ConfigRoutes = require('./routes/Config.routes');
const AlunoRoutes = require('./routes/Aluno.routes');
const AlunoTurmaRoutes = require('./routes/Aluno_Turma.routes');

const DisciplinaRoutes = require('./routes/Disciplina.routes');

app.use(express.json());
app.use(cookieParser());
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(CustomAuthMiddleware);
app.use(express.urlencoded({
    extended: false
}));

//Inicialização de base e rotas
db.sequelize.sync()
    .then((result) => {
        app.use('/', UsuarioRoutes);
        app.use('/api/ano', AnoRoutes);
        app.use('/api/aluno',AlunoRoutes);
        app.use('/api/aluno_turma',AlunoTurmaRoutes);
        app.use('/api/turma', TurmaRoutes);
        app.use('/api/dia', DiaRoutes);
        app.use('/api/aula', AulaRoutes);
        app.use('/api/fase', FaseRoutes);
        app.use('/api/turno', TurnoRoutes);
        app.use('/api/serie', SerieRoutes);
        app.use('/api/horario', HorarioRoutes);
        app.use('/api/materia', MateriaRoutes);
        app.use('/api/professor', ProfessorRoutes);
        app.use('/api/config', ConfigRoutes);
        app.use('/api/grade', GradeRoutes);
        app.use('/api/disciplina', DisciplinaRoutes);
        app.listen(PORT, () => {
            console.log(`Server started on port ${PORT}`);
        })
    })
    .catch((err) => {
        console.log(err);
    })


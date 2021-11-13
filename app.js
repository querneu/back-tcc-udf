const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const app = express();
const PORT = 3006;
const db = require('./models');
const CustomAuthMiddleware = require('./middleware/CustomAuth.middleware');
const TipoEnsinoRoutes = require('./routes/TipoEnsino.routes');
const AlunoRoutes = require('./routes/Aluno.routes');
const DisciplinaRoutes = require('./routes/Disciplina.routes');
const UsuarioRoutes = require('./routes/Usuario.routes');
const ProfessorRoutes = require('./routes/Professor.routes');
const TurmaRoutes = require('./routes/Turma.routes');
const TurnoRoutes = require('./routes/Turma.routes');
//Following lines are to make sure our app can parse the json data
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
        //Rotas de usuario
        app.use('/', UsuarioRoutes);
        //Rotas tipo ensino
        app.use('/api/tipo_ensino', TipoEnsinoRoutes);
        //Rotas aluno
        app.use('/api/aluno', AlunoRoutes);
        //Rotas professor
        app.use('/api/professor', ProfessorRoutes);
        //Rotas disciplina
        app.use('/api/disciplina', DisciplinaRoutes);
        //Rotas turma
        app.use('/api/turma', TurmaRoutes);
        //Rotas turno
        app.use('/api/turno', TurnoRoutes);
        app.listen(PORT, () => {
            console.log(`Server started on port ${PORT}`);
        })
    })
    .catch((err) => {
        console.log(err);
    })


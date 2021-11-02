const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const app = express();
const PORT = 3000;
const db = require('./models');
const CustomAuthMiddleware = require('./middleware/CustomAuth.middleware');
const TipoEnsinoRoutes = require('./routes/TipoEnsino.routes');
const AlunoRoutes = require('./routes/Aluno.routes');
const DisciplinaRoutes = require('./routes/Disciplina.routes');
const UsuarioRoutes = require('./routes/Usuario.routes');
//Following lines are to make sure our app can parse the json data
app.use(express.json());
app.use(cookieParser());
app.use(cors({ credentials: true, origin: true, allowedHeaders: 'X-Custom-Header' , methods: 'GET,PUT,POST,DELETE' }));
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
        app.use('/api/tipo_ensino', TipoEnsinoRoutes)
        //Rotas aluno
        app.use('/api/aluno', AlunoRoutes)
        //Rotas disciplina
        app.use('/api/disciplina', DisciplinaRoutes)
        app.listen(PORT, () => {
            console.log('Server started');
        })
    })
    .catch((err) => {
        console.log(err);
    })


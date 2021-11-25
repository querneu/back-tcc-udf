const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const app = express();
const PORT = 3006;
const db = require('./models');
const CustomAuthMiddleware = require('./middleware/CustomAuth.middleware');
const AnoController = require('./routes/Ano.routes');
const UsuarioRoutes = require('./routes/Usuario.routes');

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
        app.use('/api/ano', AnoController);
        app.listen(PORT, () => {
            console.log(`Server started on port ${PORT}`);
        })
    })
    .catch((err) => {
        console.log(err);
    })


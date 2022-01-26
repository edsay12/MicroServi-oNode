import express from 'express';
import statusRout from './routes/status';
import userRoute from './routes/userRout';
import db from './db'
import errorhandle from './middlewares/errorHandleMiddleware';
const app = express();
const port = 8081



// Configurações para as rotas 
app.use(express.json())
app.use(express.urlencoded({extended:true}));

//Rotas 

app.use(userRoute)
app.use(statusRout)

// Configuração dos Handles de erros 
app.use(errorhandle)

//Server
app.listen(port,()=>{
    console.log(`server iniciado na porta:${port}`);
});

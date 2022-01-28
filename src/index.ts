import express from 'express';
import statusRout from './routes/status';
import userRoute from './routes/userRout';
import errorhandle from './middlewares/errorHandleMiddleware';
import autoriza from './routes/autorizaRout';
import AuthenticationMiddleware from './middlewares/BeaderAuthenticationMiddleware';
const app = express();
const port = 8081



// Configurações para as rotas 
app.use(express.json())
app.use(express.urlencoded({extended:true}));

//Rotas 

app.use(AuthenticationMiddleware,userRoute)
app.use(statusRout)
app.use(autoriza)

// Configuração dos Handles de erros 
app.use(errorhandle)

//Server
app.listen(port,()=>{
    console.log(`server iniciado na porta:${port}`);
});

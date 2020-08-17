import Server from './server/server';
import router from './router/router';
import MySQL from './mysql/mysql';


const server = Server.init(3000);
// const mySQL= MySQL.instance;
server.app.use(router)
server.start(()=>{
    console.log('Servidor corriendo en el puerto 3000');
})
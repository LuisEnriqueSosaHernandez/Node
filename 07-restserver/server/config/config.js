process.env.PORT =  process.env.PORT || 3000;


    //Entorno

    process.env.NODE_ENV = process.env.NODE_ENV || 'dev';


    //Vencimiento token
    process.env.CADUCIDAD_TOKEN= 60*60*24*30; //60 SEGUNDOS 60 MINUTOS 24 HORAS 30 DIAS

    //SEED de autentication
    process.env.SEED = process.env.SEED || 'este-es-el-seed-desarrollo';
    //Base de datos

    let urlDB;

    if(process.env.NODE_ENV === 'dev'){
        urlDB = 'mongodb://localhost:27017/cafe'
    }else{
                urlDB=  process.env.MONGO_URI
    }


    process.env.urlDB =urlDB;
    //google client-id

    process.env.CLIENT_ID = process.env.CLIENT_ID || '952026135015-3r8i5hktidqstsuidi79jo3gn7qsc371.apps.googleusercontent.com' 


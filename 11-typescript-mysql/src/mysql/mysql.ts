import mysql = require('mysql')
export default class MySQL {
    private static _instance: MySQL;
    cnn: mysql.Connection;
    conectado: boolean = false;

    constructor() {
        console.log('Clase inicializada');
        this.cnn = mysql.createConnection({
            host: 'localhost',
            user: 'node_user',
            password: '12345',
            database: 'node_db'
        })
        this.conectarDB();
    }

    public static get instance(){
        return this._instance || (this._instance=new this())
    }

    static ejecutarQuery(query:string,callback:Function){
        this.instance.cnn.query(query,(err,res:Object[],fields)=>{
            if(err){
                console.log(err.message);
                return callback(err)
            }
            if(res.length===0){
                callback('El registro solicitado no existe');
            }else{
                callback(null,res);
            }   
        })
    }


    private conectarDB() {
        this.cnn.connect((err: mysql.MysqlError) => {
            if (err) {
                console.log(err.message);
                return;
            } else {
                this.conectado = true;
                console.log('Base de datos online');
            }
        })
    }
}
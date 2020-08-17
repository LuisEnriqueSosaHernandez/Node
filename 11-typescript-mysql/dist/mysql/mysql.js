"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mysql = require("mysql");
var MySQL = /** @class */ (function () {
    function MySQL() {
        this.conectado = false;
        console.log('Clase inicializada');
        this.cnn = mysql.createConnection({
            host: 'localhost',
            user: 'node_user',
            password: '12345',
            database: 'node_db'
        });
        this.conectarDB();
    }
    Object.defineProperty(MySQL, "instance", {
        get: function () {
            return this._instance || (this._instance = new this());
        },
        enumerable: false,
        configurable: true
    });
    MySQL.ejecutarQuery = function (query, callback) {
        this.instance.cnn.query(query, function (err, res, fields) {
            if (err) {
                console.log(err.message);
                return callback(err);
            }
            if (res.length === 0) {
                callback('El registro solicitado no existe');
            }
            else {
                callback(null, res);
            }
        });
    };
    MySQL.prototype.conectarDB = function () {
        var _this = this;
        this.cnn.connect(function (err) {
            if (err) {
                console.log(err.message);
                return;
            }
            else {
                _this.conectado = true;
                console.log('Base de datos online');
            }
        });
    };
    return MySQL;
}());
exports.default = MySQL;

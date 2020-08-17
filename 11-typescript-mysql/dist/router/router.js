"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var mysql_1 = __importDefault(require("../mysql/mysql"));
var router = express_1.Router();
router.get('/heroes', function (req, res) {
    var query = 'SELECT * FROM heroes';
    mysql_1.default.ejecutarQuery(query, function (err, heroes) {
        if (err) {
            res.status(500).json({
                ok: false,
                err: err
            });
        }
        else {
            res.json({
                ok: true,
                heroes: heroes
            });
        }
    });
});
router.get('/heroes/:id', function (req, res) {
    var id = req.params.id;
    var escapeId = mysql_1.default.instance.cnn.escape(id);
    var query = "SELECT * FROM heroes WHERE id=" + escapeId;
    mysql_1.default.ejecutarQuery(query, function (err, heroe) {
        if (err) {
            res.status(500).json({
                ok: false,
                err: err
            });
        }
        else {
            res.json({
                ok: true,
                heroe: heroe[0]
            });
        }
    });
});
exports.default = router;

const express = require('express');
const { verificaToken } = require('../middlewares/autenticacion');
let app = express();
let Producto = require('../models/producto');
const _ = require('underscore');

//Obtener todos los productos
app.get('/producto', verificaToken, (req, res) => {
    let desde = Number(req.query.desde) || 0;
    let hasta = Number(req.query.hasta) || 5;
    Producto.find({ disponible: true }).populate(['categoria', 'usuario']).sort('nombre').skip(desde).limit(hasta)
        .exec((err, productos) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                })
            }
            Producto.countDocuments({ disponible: true }, (err, conteo) => {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        err
                    })
                }
                res.json({
                    ok: true,
                    productos,
                    conteo
                })
            })
        })
})
//recuperar un solo producto
app.get('/producto/:id', verificaToken, (req, res) => {
    let id = req.params.id
    Producto.findById(id).populate(['categoria', 'usuario']).exec((err, productoDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            })
        }
        if (!productoDB) {
            return res.json({
                ok: false,
                err: {
                    message: 'El id no existe'
                }
            })
        }
        res.json({
            ok: true,
            producto: productoDB
        })
    })
})
//Buscar productos
app.get('/producto/buscar/:termino',verificaToken,(req,res)=>{
    let termino = req.params.termino;
    let regex=new RegExp(termino,'i');
Producto.find({nombre:regex}).populate('categoria','descripcion').
exec((err,productos)=>{
    if (err) {
        return res.status(500).json({
            ok: false,
            err
        })
    }
    res.json({
        ok:true,
        productos
    })
})
})

//Crear un producto
app.post('/producto', verificaToken, (req, res) => {
    let body = req.body;
    const producto = new Producto({
        nombre: body.nombre,
        precioUni: body.precioUni,
        descripcion: body.descripcion || 'Pendiente',
        categoria: body.categoria,
        usuario: req.usuario._id
    })
    producto.save((err, productoDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            })
        }
        if (!productoDB) {
            return res.status(400).json({
                ok: false,
                err
            })
        }
        res.status(201).json({
            ok: true,
            producto: productoDB
        })
    })
})

//Actualizar un producto
app.put('/producto/:id', verificaToken, (req, res) => {
    let id = req.params.id
    let body = _.pick(req.body, ['nombre', 'precioUni', 'descripcion', 'categoria'])
    Producto.findOneAndUpdate(id, body, { new: true, runValidators: true }, (err, productoDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            })
        }
        if (!productoDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'El id no existe'
                }
            })
        }
        res.json({
            ok: true,
            producto: productoDB
        })
    })
})

//Borrar un producto
app.delete('/producto/:id', verificaToken, (req, res) => {
    //Actualizar el estado a falso
    let id = req.params.id;
    let desactiva = {
        disponible: false
    }
    Producto.findOneAndUpdate(id, desactiva, { new: true }, (err, productoDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            })
        }
        if (!productoDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Id no existe'
                }
            })
        }
        res.json({
            ok: true,
            productoDB
        })
    })
})

module.exports = app;

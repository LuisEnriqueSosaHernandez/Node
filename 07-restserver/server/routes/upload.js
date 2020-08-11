const express = require('express');
const fileUpload = require('express-fileupload')
const { verificaToken } = require('../middlewares/autenticacion');
const app = express();
const Usuario=require('../models/usuario');
const Producto = require('../models/producto')
const fs= require('fs')
const path = require('path')
app.use(fileUpload({ useTempFiles: true }));

app.put('/upload/:tipo/:id', verificaToken, (req, res) => {
    let tipo= req.params.tipo;
    let id = req.params.id;
    if (!req.files) {
        return res.status(400).json({
            ok: false,
            err: {
                message: 'No se ha seleccionado archivo'
            }
        })
    }

    //Validar tipo
    let tiposValidos= ['productos','usuarios'];
    if(tiposValidos.indexOf(tipo)<0){
        return res.status(400).json({
            ok:false,
            err:{
                message:`Los tipos permitidos son ${tiposValidos.join(', ')}`,
                tipo
            }
        })
    }

    let archivo = req.files.archivo;
    //Extensiones permitidas
    let extensionesValidas = ['png','jpg','gif','jpeg'];
    let nombreCortado=archivo.name.split('.');
    let extension=nombreCortado[nombreCortado.length-1];
    
    if(extensionesValidas.indexOf(extension)<0){
        return res.status(400).json({
            ok:false,
            err:{
                message:`Las extensiones permitidas son ${extensionesValidas.join(', ')}`,
                ext:extension
            }
        })
    }
    //Cambiar nombre al archivo
    let nombreArchivo = `${id}-${new Date().getMilliseconds()}.${extension}`;
    archivo.mv(`uploads/${tipo}/${nombreArchivo}`,(err) => {
        if (err) {
                return res.status(500).json({
                    ok:false,
                    err
                })
        }
       if(tipo=='usuarios'){
       imagenUsuario(id,res,nombreArchivo);
       }else{
           imagenProducto(id,res,nombreArchivo);
       }
    })
})

imagenUsuario=(id,res,nombreArchivo)=>{
    let actualizaImgUsuario= {
        img:nombreArchivo
    }
Usuario.findOneAndUpdate(id,actualizaImgUsuario,{runValidators: true },(err,usuarioDB)=>{
    if(err){    
        borrarArchivo(nombreArchivo,'usuarios')
            return res.status(400).json({
                ok: false,
                err
            })
           
        }
       if(!usuarioDB){
        borrarArchivo(nombreArchivo,'usuarios')
        return res.status(400).json({
            ok: false,
            err:{
                message:'El id no existe'
            }
        })
       }
       borrarArchivo(usuarioDB.img,'usuarios')
       res.json({
           ok:true,
         usuario:usuarioDB,
         img:nombreArchivo
       })
})
}
imagenProducto=(id,res,nombreArchivo)=>{
    let actualizaImgProducto= {
        img:nombreArchivo
    }
Producto.findOneAndUpdate(id,actualizaImgProducto,{runValidators: true },(err,productoDB)=>{
    if(err){    
        borrarArchivo(productoDB,'productos')
            return res.status(400).json({
                ok: false,
                err
            })
           
        }
       if(!productoDB){
        borrarArchivo(nombreArchivo,'productos')
        return res.status(400).json({
            ok: false,
            err:{
                message:'El id no existe'
            }
        })
       }
       borrarArchivo(productoDB.img,'productos')
       res.json({
           ok:true,
         producto:productoDB,
         img:nombreArchivo
       })
})
}

borrarArchivo=(nombreImagen,tipo)=>{
    let pathImagen=path.resolve(__dirname,`../../uploads/${tipo}/${nombreImagen}`)
    if(fs.existsSync(pathImagen)){
        fs.unlinkSync(pathImagen);
    }
}

module.exports= app;
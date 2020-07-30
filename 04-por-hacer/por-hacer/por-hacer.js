
const fs = require('fs');
let listadoPorHacer= [];


const guardarDB = () => {
    let data = JSON.stringify(listadoPorHacer);
    return new Promise((resolve,reject)=>{
        if(data.length===0){
            reject(`No hay datos en el arreglo ${data}`);
            return
        }
        fs.writeFile(`db/data.json`,data,(err)=>{
            if(err){
                reject(err);
            }else{
                resolve(`Se guardo la tarea ${data}`);
            }
        })
    })
}

const cargarDB= ()=>{
    try {
        listadoPorHacer = require('../db/data.json');
    } catch (error) {
        listadoPorHacer=[];
    }
}

const getListado = ()=>{
    cargarDB();
    return listadoPorHacer;
}

const actualizar = (descripcion,completado=true)=>{
    cargarDB();
    let index= listadoPorHacer.findIndex(tarea=>tarea.descripcion===descripcion);

    if(index>=0){
        listadoPorHacer[index].completado=completado;
        guardarDB();
        return true;
    }else{
        return false;
    }

}

const borrar = (descripcion)=>{
    cargarDB();
    // let index= listadoPorHacer.findIndex(tarea=>tarea.descripcion===descripcion);
    // if(index>=0){
    //         listadoPorHacer.splice(index,1);
    //         guardarDB();
    //         return `Se elimino la tarea ${descripcion}`;
    // }else{
    //     return `No se encontro la tarea ${descripcion}`;
    // }

    let nuevoListado = listadoPorHacer.filter(tarea=>{
        return tarea.descripcion!=descripcion
    });

    if(listadoPorHacer.length===nuevoListado.length){
        return false;
    } else{
        listadoPorHacer=nuevoListado;
        guardarDB();
        return true;
    }
}


const crear =(descripcion) => {

    cargarDB();

    let porHacer = {
        descripcion,
        completado:false
    };

    listadoPorHacer.push(porHacer);
    guardarDB();
    return porHacer;
}

module.exports = {
    crear,
    getListado,
    actualizar,
    borrar
}
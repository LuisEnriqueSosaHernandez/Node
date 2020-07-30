const descripcion= {
    demand:true,
    alias: 'd',
    desc:'Describe la tarea por hacer'
};

const completado = {
    default:true,
    alias: 'c',
    desc: 'Marca como completado o pendiente la tarea'
    };

const argv = require('yargs').command('crear','Crea un elemento por hacer',{
    descripcion:descripcion
}).command('actualizar','Actualiza una tarea a completado',{
descripcion:descripcion,
completado:completado

}).command('listar','Lista las tareas')
.command('borrar','Borra la tarea',{
    descripcion:descripcion
})
.help().argv;

module.exports = {
    argv
}
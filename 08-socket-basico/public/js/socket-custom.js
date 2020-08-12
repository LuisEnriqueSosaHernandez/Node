var socket = io()
socket.on('connect',function(){
    console.log('Conectado al servidor');
})
//Escuchar
socket.on('disconnect',function(){
    console.log('Se perdio la conexion');
})
//Enviar informacion
socket.emit('enviarMensaje',{
     usuario:'Kike',
    mensaje:'Hola mundo'
},function(respuesta){
    console.log('se disparo el callback');
    console.log('Servidor: ',respuesta);
})
//Escuchar
socket.on('enviarMensaje',function(mensaje){
        console.log('Servidor: ',mensaje);
})
//Comando para establecer la conexion
var socket=io();
var label= $('#lblNuevoTicket')
socket.on('connect',function(){
    console.log('Conectado al servidor');
})
socket.on('disconnect',function(){
    console.log('Desconectado al servidor');
})
socket.on('estadoActual',(ultimoTicket)=>{
    label.text(ultimoTicket.actual);
})
$('button').on('click',()=>{
    socket.emit('siguienteTicket',null,(siguienteTicket)=>{
       label.text(siguienteTicket);
    });
})
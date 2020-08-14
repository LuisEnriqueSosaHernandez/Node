
var socket= io();
var searchParams = new URLSearchParams(window.location.search);
if(!searchParams.has('escritorio')){
    window.location= 'index.html'
    throw new Error('El escitorio es necesario')
}
var escritorio = searchParams.get('escritorio');
var label=$('small');
console.log(escritorio);
$('h1').text('Escritorio '+escritorio)

$('button').on('click',()=>{
socket.emit('atenderTicket',{escritorio},(res)=>{
    if(res==='No hay tickets'){
        alert(res)
        return
    }
label.text(res.numero);
})
})
var socket = io();
var lblTicket1 = $('#lblTicket1')
var lblTicket2 = $('#lblTicket2')
var lblTicke3 = $('#lblTicket3')
var lblTicket4 = $('#lblTicket4')

var lblEscritorio1 = $('#lblEscritorio1')
var lblEscritorio2 = $('#lblEscritorio2')
var lblEscritorio3 = $('#lblEscritorio3')
var lblEscritorio4 = $('#lblEscritorio4')


var lblTickets = [lblTicket1,lblTicket2,lblTicke3,lblTicket4]
var lblEcritorios = [lblEscritorio1,lblEscritorio2,lblEscritorio3,lblEscritorio4]



socket.on('estadoActual', (data) => {
    console.log(data);
    actualizaHTML(data.ultimos4)
})
socket.on('ultimos4',(data)=>{
    console.log('ultimos4 ',data);
    var audio = new Audio("../audio/new-ticket.mp3");
 
    var playPromise = audio.play();
 
    if (playPromise !== undefined) {
        playPromise
            .then(_ => {
                // Automatic playback started!
                // Show playing UI.
            })
            .catch(error => {
                // Auto-play was prevented
                // Show paused UI.
                console.log('Error con la reproducción.');
            });
    }
    actualizaHTML(data);
})

function actualizaHTML(ultimos4){
    for(var i=0;i<ultimos4.length;i++){
        console.log('entre');
        lblTickets[i].text(`Ticket ${ultimos4[i].numero}`)
        lblEcritorios[i].text(`Escritorio ${ultimos4[i].escritorio}`)
    }
}
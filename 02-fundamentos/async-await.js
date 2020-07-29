// let getNombre=async()=>{
//    throw new Error('No existe un nombre para el usuario')
//     return 'kike'
// };


let getNombre=()=>{
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
        resolve('kike');
        },3000)
    });
}

let getSaludo=async()=>{
    let nombre=await getNombre();
    return `Hola ${nombre}`
}

getSaludo().then(mensaje=>{
        console.log(mensaje);
});

// getNombre().then(nombre=>{
//     console.log(nombre);
// }).catch(err=>{
//     console.log(err);
// })
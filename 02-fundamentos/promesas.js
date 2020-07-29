let empleados = [{
    id:1,
    nombre: 'kike'},
    {
        id: 2,
        nombre: 'Karina'
    },
    {
        id: 3,
        nombre: 'Jacqueline'
    }
];

let salarios =[
    {
        id:1,
        salario: 1000
    },
    {
        id:2,
        salario:
        2000
    }
];


let getEmpleado= (id)=>{
    return new Promise((resolve,reject)=>{
        let empleadoDB = empleados.find(empleado=>empleado.id===id);
        if(!empleadoDB){
            reject(`No existe un empleado con el ID ${id}`)
        }else{
            resolve(empleadoDB);
        }
    });
   
 }

 let getSalario=(empleado)=>{
    let salarioDB = salarios.find(salario => salario .id===empleado.id);
    return new Promise((resolve,reject)=>{
        if(!salarioDB){
            reject(`No se encontro un salario para el usuario ${empleado.nombre}`)
        }else{
            resolve({
                nombre: empleado.nombre,
                salario: salarioDB.salario,
                id: empleado.id
            })
        }
    });
}

//  getEmpleado(1).then(empleado=>{
//      getSalario(empleado).then((resp)=>{
//  console.log(`El salario de ${resp.nombre} es de ${resp.salario}`);
//      },(error)=>console.log(error));
//  },(error)=> console.log(error));

getEmpleado(10).then(empleado=>{
return getSalario(empleado);
}).then(resp=>{
    console.log(`El salario de ${resp.nombre} es de ${resp.salario}`);
}).catch(err=>{
    console.log(err);
})
 
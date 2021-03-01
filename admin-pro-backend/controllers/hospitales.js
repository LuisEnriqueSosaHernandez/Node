const {response}=require('express')
const Hospital=require('../models/hospital')
const hospital = require('../models/hospital')


const getHospitales=async(req,res=response)=>{
    const hospitales=await Hospital.find().populate('usuario','nombre img')
    res.json({
        ok:true,
        hospitales
    })
}

const crearHospital=async (req,res=response)=>{
    const uid=req.uid;
    const hospital = new Hospital({
        usuario:uid,
        ...req.body
    });

    try {
       const hospitalDB= await hospital.save();
        res.json({
            ok:true,
           hospital:hospitalDB
        })
    } catch (error) {
        res.status(500).json({
            ok:false,
            msg:"Error inesperado"
        })
    }
   
}

const actualizarHospital=async(req,res=response)=>{
    const hospitalId=req.params.id;
    const uid=req.uid;
    try {
        const hospitalDB= await Hospital.findById(hospitalId);
        if(!hospital){
            res.status(404).json({
                ok:false,
                msg:'Hospital no encontrado'
            })
        }

        const cambiosHospital={
            ...req.body,
            usuario:uid
        }
        const hospitalActualizado=await Hospital.findByIdAndUpdate(hospitalId,cambiosHospital,{new:true});

        res.json({
            ok:true,
            hospital:hospitalActualizado
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Error inesperado'
        })
    }

    }


const borrarHospital=async(req,res=response)=>{
    const hospitalId=req.params.id;
    try {
        const hospitalDB= await Hospital.findById(hospitalId);
        if(!hospital){
            res.status(404).json({
                ok:false,
                msg:'Hospital no encontrado'
            })
        }

       await Hospital.findByIdAndDelete(hospitalId);
        
        res.json({
            ok:true,
            msg:'Hospital eliminado'
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Error inesperado'
        })
    }
}

module.exports={
    getHospitales,
    crearHospital,
    actualizarHospital,
    borrarHospital
}
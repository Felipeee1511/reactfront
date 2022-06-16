import axios from 'axios';
import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';


const endpoint_device = 'http://localhost:8000/api/device'
const endpoint = 'http://localhost:8000/api'

const CreateDevice = () => {
    
    //INPUTS
    const [device_name , setDeviceName] = useState('')
    const [device_brand, setIdBrand] = useState(0)
    const [device_models, setIdModel] = useState(0)
    const [device_warehouse, setIDDeviceWarehouse] = useState(0)

    //SELECT OPTIONS
    const [devices_models , setDevices_models] = useState([])
    const [devices_model, setDevices_model] = useState([])
    const [device_brands , setDevice_brands] = useState([])
    const [device_warehouses, setDeviceWarehouse] = useState([])
   
    
    const navigate = useNavigate()

    useEffect(()=>{
        getBrandModels()
        getDeviceBrands()
        getDeviceWarehouses()
    }, [])

        const getDeviceBrands=async()=>{
        const response = await axios.get(`${endpoint}/brands`) 
        

        .then(response=>{
        
            setDevice_brands(response.data);
            
        }).catch(error=>{
            console.log(error);
        })
    }

    const getBrandModels=async()=>{
      const response = await axios.get(`${endpoint}/deviceModels`)
     
      
        .then(response=>{
            
            setDevices_models(response.data);
            
        }).catch(error=>{
            console.log(error);
        })
       
        
    }

  
     const getDeviceWarehouses=async()=>{
       
        const response = await axios.get(`${endpoint}/Warehouses`)
     
       
        .then(response=>{
            
            setDeviceWarehouse(response.data);
            
        }).catch(error=>{
            console.log(error);
        })
       
        
       
     }
     const handleDeviceModelBrand=(event)=>{
       
        const device_model = []
        setIdBrand(event)
        devices_models.forEach(devices_model=>
            
            {
                
                const brand_id =parseInt(devices_model.brand_id) ;
                const eve = parseInt(event); 
                
                if(brand_id === eve)
                {
                    device_model.push({"id": devices_model.id, "name":devices_model.name})
                } });
           
           setDevices_model(device_model)
        
       
     }


   
    const store = async(e) => {
        e.preventDefault();
       await axios.post(endpoint_device, {name:device_name,device_model_id:device_models, device_brand_id:device_brand, device_warehouse_id:device_warehouse})
       navigate('/showDevices')

    }

    return (
        <div className="container col-auto text-center bg-light">
        <div className="mb-3" ><h3 className="mb-6">Registrar un nuevo dispositivo</h3> </div>
        
        <form onSubmit={store} className="form-group">
            <div className="container col-md-6">
                <select name="device_brand" defaultValue="" className="form-select form-select-lg mb-3" onClick={event=>handleDeviceModelBrand(event.target.value)} required >
                
                    <option value="" id="disabledInput" disabled>Seleccione la marca</option>
                        {device_brands.map((device_brand)=>(
                    
                    <option key={device_brand.id} 
                        value={device_brand.id}>
                       
                        {device_brand.name}

                    </option>
                    ))}
                </select>
            </div>
           <div className="mb-3 col-md-6 container"> 
                <select name="device_models" defaultValue="" className="form-select form-select-lg mb-3" onChange={ (e)=> setIdModel(e.target.value)} required>
                <option value="" disabled id="disabledInput" >Modelo 

                </option>

           {devices_model.map((device_models)=>(
           
            <option key={device_models.id}
                    value={device_models.id}>
                    {device_models.name}    

           </option>
           ))}
      

           
           </select>
           </div>
           <div className="mb-3 col-md-6 container"> 
                <select name="device_warehouse" defaultValue="" className="form-select form-select-lg mb-3" onChange={ (e)=> setIDDeviceWarehouse(e.target.value)} required>
                <option value="" disabled id="disabledInput" >Bodega 

                </option>

           {device_warehouses.map((device_warehouse)=>(
           
            <option key={device_warehouse.id}
                    value={device_warehouse.id}>
                    {device_warehouse.name}    

           </option>
           ))}
      

           
           </select>
           </div>
          
            <div className="mb-3 input-group input-group-lg container">
                
            <input name="device_name"  placeholder="Nombre dispositivo"  className="form-label col-md-6 form-control-lg container"    onChange={ (e)=> setDeviceName(e.target.value)} ></input>
            </div>
            <div className="mb-3 d-grid gap-2 col-6 mx-auto container">
            <button className="btn btn-success btn-lg " type="submit">Create device</button>
            <a className="btn btn-primary btn-lg" href={('/showDevices')}>Atrás</a>
            
            
            </div>
            <div className="mb-3">
            
            
            </div>
        </form>
        
        </div>
    )
}

export default CreateDevice
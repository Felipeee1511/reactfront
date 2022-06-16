import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'

const endpoint = 'http://localhost:8000/api'

const ShowDevices = () => 
{
    

    //DEVICES
    const[ devices, setDevices ] = useState([])
    const[ filterDevices, setFilterDevices ] = useState([])

    //SELECT OPTIONS 
    const [warehouses, setWarehouses] = useState([])
    const [devices_models , setDevices_models] = useState([])
    const [device_brands , setDevice_brands] = useState([])
    const [isFiltered, setFiltered] = useState(false)
    
    useEffect( () => 
    {
        getAllDevices()
        getAllBrands()
        getAllModels()
        getAllWarehouses()

    }, [])
    
    //API CONSULTS
    const getAllDevices = async () =>
    {
        const response = await axios.get(`${endpoint}/devices`)
        setDevices(response.data)
        
    }

   
    const getAllBrands = async ()=>{
        const response = await axios.get(`${endpoint}/brands`)   
        setDevice_brands(response.data)
    }
    const getAllModels = async ()=>{
        const response = await axios.get(`${endpoint}/deviceModels`)
        setDevices_models(response.data)
    }
    const getAllWarehouses = async ()=>{
        const response = await axios.get(`${endpoint}/Warehouses`)
        setWarehouses(response.data)
    }
     const deleteDevice = async(id) => 
    {
       await axios.delete(`${endpoint}/device/${id}`)
       getAllDevices()
    }
    //HANDLE FUNCTIONS (FILTER)

    const handleBrandFilter = (event)=>
    {   
    
        
       
        const device_brandFilter = []
        const eve = parseInt(event);
       
        devices.forEach(device=>
            {
                const brandFilter_id =parseInt(device.brand_id) ;
                
                if(brandFilter_id === eve)
                {
                    device_brandFilter.push({"id": device.id, "name":device.name, "device_model_name":device.device_model_name, "brand_device":device.brand_device, "warehouse_name":device.warehouse_name })
                } 
            })
            
            setFilterDevices(device_brandFilter) 

            setFiltered(true) 

    }

    const handleModelFilter = (event)=>
    {   
        const device_modelFilter = []
        const eve = parseInt(event);
        
        devices.forEach(device=>
            {
                const modelFilter_id =parseInt(device.device_model_id) ;
                
                if(modelFilter_id === eve)
                {
                    device_modelFilter.push({"id": device.id, "name":device.name, "device_model_name":device.device_model_name, "brand_device":device.brand_device, "warehouse_name":device.warehouse_name })
                } 
            })
            
            setFilterDevices(device_modelFilter) 
            

            setFiltered(true) 

    }

    const handleWarehouseFilter = (event)=>
    {   
        const device_warehouseFilter = []
        const eve = parseInt(event);
        console.log(devices)
        devices.forEach(device=>
            {
                const warehouseFilter_id =parseInt(device.device_warehouse_id) ;
                
                if(warehouseFilter_id === eve)
                {
                    device_warehouseFilter.push({"id": device.id, "name":device.name, "device_model_name":device.device_model_name, "brand_device":device.brand_device,"warehouse_name":device.warehouse_name })
                } 
            })
            
            setFilterDevices(device_warehouseFilter) 
            

            setFiltered(true) 

    }


    const clearFilter = () =>
    {
        window.location.reload(true);
        
    }
    

  return (
    <div className="container">
        
        <h3 className="mb-3 container">Filtros </h3> 
          <select name="device_brand" defaultValue="" className="form-select form-select-lg mb-3 col-auto text-center bg-light"   onChange={event=>handleBrandFilter(event.target.value)} >
        
        <option value="" id="disabledInput" disabled>Filtrar por marca</option>
        
        {device_brands.map((device_brand)=>(
              <option key={device_brand.id} 
              value={device_brand.id}>
             
              {device_brand.name} 

          </option>
        ))}
        
        </select> 
        
        <div className="dropdown show">
        <select name="device_brand" defaultValue="" className="form-select form-select-lg mb-3 col-auto text-center bg-light"   onChange={event=>handleModelFilter(event.target.value)} >
        <option value="" id="disabledInput" disabled>Filtro por modelo</option>
        {devices_models.map((devices_model)=>(
        <option key={devices_model.id} 
        value={devices_model.id}>
             
              {devices_model.name}

          </option>
        ))}
        </select>  
       
        
       
          
        </div>

        <div className="dropdown show">
        <select name="device_brand" defaultValue="" className="form-select form-select-lg mb-3 col-auto text-center bg-light"   onChange={event=>handleWarehouseFilter(event.target.value)} >
        <option value="" id="disabledInput" disabled>Filtro por bodega</option>
        {warehouses.map((warehouse)=>(
        <option key={warehouse.id} 
        value={warehouse.id}>
             
              {warehouse.name}

          </option>
        ))}
        </select>  
       
        
       
          
        </div>
        {isFiltered ? <button className="btn btn-secondary mb-3" onClick={()=>clearFilter() }> Limpiar filtro </button> : <div></div>}
        <table className='table table-striped'>
            <thead className='bg-primary text-white'>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Model</th>
                    <th>Brand</th>
                    <th>Warehouse</th>
                    <th>Action</th>
                </tr>
                    
            </thead>
        {isFiltered? <tbody>
                { filterDevices.map ( (filterDevice)=> (
                    <tr key={filterDevice.id}>
                        <td>{filterDevice.id}</td>
                        <td>{filterDevice.name}</td>
                        <td>{filterDevice.device_model_name}</td>
                        <td>{filterDevice.brand_device}</td>
                        <td>{filterDevice.warehouse_name}</td>
                        
                        <td>
                            <Link to={`/edit/${filterDevice.id}`}className="btn btn-warning"> Edit </Link>
                            
                            <button onClick={()=>deleteDevice(filterDevice.id)} className="btn btn-danger">Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>     :  <tbody>
                { devices.map ( (device)=> (
                    <tr key={device.id}>
                        <td>{device.id}</td>
                        <td>{device.name}</td>
                        <td>{device.device_model_name}</td>
                        <td>{device.brand_device}</td>
                        <td>{device.warehouse_name}</td>
                        
                        <td>
                            <Link to={`/edit/${device.id}`}className="btn btn-warning"> Edit name </Link>
                            
                            <button onClick={()=>deleteDevice(device.id)} className="btn btn-danger">Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>    }
        
        
           
        </table>
        <div className='d-grid gap-2'>
            <Link to="/create" className='btn btn-success btn-lg mt-2 mb-2 text-white'>New Device</Link>
        </div>   
    </div>
  )
}

export default ShowDevices
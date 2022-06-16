import axios from "axios";
import React, {useState, useEffect} from "react";
import { useNavigate, useParams } from "react-router-dom";

const endpoint = 'http://localhost:8000/api/device/'

const EditDevice = () =>{

    const [device_name , setDeviceName] = useState('')
    const navigate= useNavigate()
    const {id} = useParams()


    const update = async(e) =>
    {
        e.preventDefault()
        await axios.put(`${endpoint}${id}`,{name:device_name})
        navigate('/showDevices')
    }
    useEffect( () =>{
        const getProductById = async () => {
            const response = await axios.get(`${endpoint}${id}`)
            setDeviceName(response.data.name)
            
        }
        getProductById()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [] )

    return (
        <div>
             <h3>Edit Product</h3>
        <form onSubmit={update}>
            <div className='mb-3'>
                <label className='form-label'>Nombre dispositivo</label>
                <input 
                    value={device_name}
                    onChange={ (e)=> setDeviceName(e.target.value)}
                    type='text'
                    className='form-control'
                />
            </div>
            <button type='submit' className='btn btn-primary'>Update</button>
        </form>    
        </div>
    )

}
export default EditDevice
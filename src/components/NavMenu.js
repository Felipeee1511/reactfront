import React from 'react'
import {NavLink} from 'react-router-dom'


export default function NavMenu(){

 return (
    
         
        <div className=" bg-light" >
           <nav className="navbar navbar-expand-lg bg-light align-content">
                <div className="container-fluid">
                        <NavLink to="/" className="btn"> Inicio</NavLink>   
                        <NavLink to="/showDevices" className="btn" >Mostrar dispositivos</NavLink> 
                        {/* <NavLink to="/" className="btn"> Mostrar Bodegas </NavLink> */}
                </div>    
          
            </nav>     
              
        
       
        </div>
            
         
        

        

     
        
   
)
   
}

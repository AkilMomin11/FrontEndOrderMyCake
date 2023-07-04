import { useEffect, useReducer, useState } from "react";
import "../LoginComp.css";

export default function AddShape(){
    const init={
        shape:""
      }
    
      const reducer =(state,action)=>{
        switch(action.type){
          case 'update':
            return {...state, [action.fld]: action.val}
          case 'reset':
            return init;
        }
    
      }
      const [info,dispatch]= useReducer(reducer,init);
      const [allshapes, getallshapes]= useState([]);
    
    
      const senddata=(e)=>{
        e.preventDefault();
         const reqOptions = {
        method : 'POST',
        headers : {'content-type':'application/json'},
        body: JSON.stringify(info)
      }
    
      fetch("http://localhost:8080/addShape",reqOptions)
      .then(resp => resp.json())
    
      .then(obj=> console.log(JSON.stringify(obj)))
       }
      
    
       useEffect(() => {
           
        fetch("http://localhost:8080/getAllShapes")
        .then((resp) => resp.json())
        .then((s) => getallshapes(s));
    
       },[allshapes])


    return(
      <div >
        <h2 style={{textAlign:"left"}}> List of Shapes </h2>
      <div className="Auth-form-container">    
            <table className="table" border={1} class="table table-striped">
               <tbody className="Auth-form-title">
                      <tr>
                      <th><h4> Sr no.</h4></th>
                      <th> <h4>Shape</h4> </th>
                     </tr>
                     {
                   allshapes.map(s => {
                    return(
                    <tr>
                    <td><h5>{s.shapeid}</h5></td>
                   <td ><h5>{s.shape}</h5></td>
                   </tr>)
                
                })
                   }
                   </tbody>
            </table>
    
            
            <div className="Auth-form-container" >
              
          <form className="bg-success" >  
          <div className="form-group" style={{width:400}} >
           <label htmlFor="shape" ><h3>Add Shapes Here</h3></label>
           <input type="text" className="form-control" id="shape" placeholder="shape" name="shape" value={info.shape.value} 
          onChange={(e)=>{dispatch({type:'update' , fld:'shape', val:e.target.value})}} />
           </div>
    
    <br/>
         <button type="submit" className="btn btn-primary mb-3" onClick={(e)=>{senddata(e)}}>Add Shape</button>
         <button type="reset" className="btn btn-primary mb-3" onClick={()=>{dispatch({type:'reset'})}}>clear</button>
    
    
         </form>  
         </div>
         </div>
       
         </div> 
    
    
    
    )
    
}
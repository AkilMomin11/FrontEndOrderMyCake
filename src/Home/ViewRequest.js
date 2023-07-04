import { useEffect, useState } from "react"
import { Outlet, useNavigate } from "react-router-dom";


export default function ViewRequest(){

  const [request, viewrequest]= useState([]);
  const [price,setPrice] = useState(0);
  const navigate = useNavigate();


  useEffect(() => {
       
    fetch("http://localhost:8080/getAllRequest")
    .then((resp) => resp.json())
    .then((r) => viewrequest(r));

  },[]);


  const Response=((rid,cid)=>{

    console.log(rid);
    localStorage.setItem("reqid",rid);
    navigate("Home/sendresponse");


  })

    return(

  <div>
       <table className="table" border={1} tableclass="table table-striped">
        <tbody>
        <tr>
         <td>   <h4> Number of Cakes</h4></td> 
         <td>  <h4> weight</h4> </td>  
         <td>  <h4> maxprice</h4>   </td> 
         <td>  <h4> Company Name</h4>   </td> 

        </tr>
    {

      request.map((r)=>{

          return(

     
      <tr>
      <td>  <h1>  {r.noofcakes}</h1>  </td>
      <td>  <h1>  {r.weight} </h1>  </td>
      <td>  <h1>  {r.maxprice}</h1>    </td>
      <td>  <h1>  {r.rcorporateid.companyname}</h1>    </td>
      <td> <input type="number" value={price} onChange={e=> setPrice(e.target.value)} /> </td>
   <td>  <input type={"button"} value={"Send response"}  onClick={()=>{Response(r.reqid,r.rcorporateid.corporateid,)}}/> </td>
            
          </tr> 
          )


      })
    }
    </tbody>

</table>
    <Outlet></Outlet>
  </div>

    )
}
import React, {useState, useEffect} from 'react'

import { getDocs, collection } from "@firebase/firestore"
import { firestore } from '../firebase';

export default function AdminDashboard() {


    const [forms, setForms] = useState([])

    // let numberOfForms=0;

    // Employment status
    let employed = 0;
    let unemployed = 0;
  
    // Debtor Category
    let businessRes = 0;
    let residentialRes = 0;
  
    // Electricity meter info
    let electricityPrepaid = 0;
    let electricityConventional = 0;
    let electricityMeterGoodCondition = 0;
    let electricityMeterBadCondition = 0;
  
    // Water meter information
    let waterMeterGoodCondidtion = 0;
    let waterMeterBadCondidtion = 0;

    const fetchPost = async () => {
       
        await getDocs(collection(firestore, "Users")).then((querySnapshot)=>{               
                const newData = querySnapshot.docs.map((doc) => ({
                    ...doc.data(), 
                    id:doc.id 
                }));
  
                setForms(newData);   
                 
            } 
            

            // getDocs()
        )
    }

    useEffect(()=>{

        fetchPost()

    },[]);

    forms.forEach((form) =>{

        if(form.employeeStatus === "Employed"){
          //  counting emplyed people
            employed = employed +1;
            
        }else if(form.employeeStatus === "Unemployed"){
            // Counting unemplyed people
            unemployed = unemployed + 1;
        }
  
        if(form.debtorCategory === "Business"){
          // Counting business res
            businessRes = businessRes + 1;
        }else if(form.debtorCategory === "Residential"){
          // Counting resdidential 
            residentialRes = residentialRes + 1 
        }
  
        if(form.meterType === "Prepaid"){
          //Conting prepaid
          electricityPrepaid = electricityPrepaid + 1;
  
        }else if(form.meterType === "Conventional"){
          // Counting Conventional
          electricityConventional = electricityConventional +1;
        }
  
        if(form.electricityMeterCondition === "Good"){
            // Conting good condition
            electricityMeterGoodCondition = electricityMeterGoodCondition + 1;
        }else if(form.electricityMeterCondition === "Bad"){
            // Counting bad condition
            electricityMeterBadCondition = electricityMeterBadCondition + 1;
        }
  
        if(form.waterMeterCondition === "Good"){
          waterMeterGoodCondidtion = waterMeterGoodCondidtion + 1;
        }else if(form.waterMeterCondition === "Bad"){
          waterMeterBadCondidtion = waterMeterBadCondidtion +1;
        }
  
      })

      forms.forEach((form)=>{

        

      })



  return (        <div className='row'>

  <div className='col-md-2 mt-4'>
   <div className="card">
   <div className="card-body">
     <h5 className="card-title">Export to Excel</h5>
     <button className='btn btn-outline-primary'> Export </button>
   </div>
 </div>
</div>

   <div className='col-md-8'>
{/* Account Details */}
<section className="section mt-4">
<div className="row">
<div className="col-md-3">

 <div className="card">
   <div className="card-body">
     <h5 className="card-title">Unemployed</h5>
     <p>{unemployed}</p>
   </div>
 </div>

</div>

<div className="col-md-3">

 <div className="card">
   <div className="card-body">
     <h5 className="card-title">Employed</h5>
     <p>{employed}</p>
   </div>
 </div>

</div>

<div className="col-md-3">

<div className="card">
<div className="card-body">
<h5 className="card-title">Business</h5>
<p>{businessRes}</p>
</div>
</div>

</div>

<div className="col-md-3">

<div className="card">
<div className="card-body">
<h5 className="card-title">Residential</h5>
<p>{residentialRes}</p>
</div>
</div>

</div>
</div>
</section>

{/* Water and Electricity */}
<div className='row'>

   {/* Electricity Informatio */}
   <div className='col-lg-12'>

       <div className='card'> 
           <div className='card-body'>
               <div className='card-title'> Electricity Meter Information </div>

               <table className="table table-hover">
                   <thead>
                       <tr>
                       <th scope="col">Prepaid</th>
                       <th scope="col">Conventional</th>
                       <th scope="col">Good Condition</th>
                       <th scope="col">Bad Condition</th>
                       </tr>
                   </thead>


                   <tbody>
                       <tr>
                       <td>{electricityPrepaid}</td>
                       <td>{electricityConventional}</td>
                       <td>{electricityMeterGoodCondition}</td>
                       <td>{electricityMeterBadCondition}</td>
                       </tr>
                   </tbody>
               </table>
           </div>

       </div>
       
   </div>
   

   {/* Water Meter Infomation */}
   <div  className='col-lg-12'>
   <div className='card'> 
           <div className='card-body'>
               <div className='card-title'> Water Meter Information </div>

               <table className="table table-hover">
                   <thead>
                       <tr>
                       
                       <th scope="col">Good Condition</th>
                       <th scope="col">Bad Condition</th>
                       </tr>
                   </thead>


                   <tbody>
                       <tr>
                       
                       <td>{waterMeterGoodCondidtion}</td>
                       <td>{waterMeterBadCondidtion}</td>
                       </tr>
                   </tbody>
               </table>
           </div>

       </div>
       
   </div>

</div>
<div className='row'>
    <div className='col-lg-12'>
    <div className='card'> 
           <div className='card-body'>
               <div className='card-title'>Individual User Performance</div>

               <table className="table table-hover">
                   <thead>
                       <tr>
                       <th scope="col">User Email</th>
                       <th scope="col">Number of forms submitted</th>
                       </tr>
                   </thead>


                   <tbody>
                       
                       {
                            forms.map( (form, i) =>(
                                <tr>
                                <td key={i}>{form.currentUser}</td>
                                </tr>
                            ))
                       }
                       {
                           
                       }
                       
                       
                   </tbody>
               </table>
           </div>

       </div>
    </div>
</div>   
</div>

   <div className='col-md-2'>

   </div>

</div>
  )
}

import "./Form.css";
import { useState } from "react";
import { UploadFile } from "../Utils/Storage";

export default function Form({formDetails,setFormDetails,Buttons}){
    const [uploadStatus,setUploadStatus]=useState(null);
    const [imageUpload,setImageUpload]=useState(null)
    const [disabled,setDisabled]=useState(true);
    const updateFormDetails = (updatedDetails) => {
        setFormDetails(updatedDetails);
        let condition = updatedDetails.Title!=="" && updatedDetails.Content!=="" && updatedDetails.Category !=="" && updatedDetails.FileLink!=="";
        if(condition)
            setDisabled(false);
        else
            setDisabled(true);
    }
    return(
        <form className="Form" onSubmit={event=>event.preventDefault()}>
                <label className="label">Title</label>
                <input className="input" value={formDetails.Title} maxLength={35} onChange={(e)=>updateFormDetails({...formDetails,Title:e.target.value})} id="Title"/>
                <label className="label">Content</label>
                <textarea className="input textArea" value={formDetails.Content} maxLength={600} onChange={(e)=>updateFormDetails({...formDetails,Content:e.target.value})} id="Content"/>
                <label className="label">Category</label>
                <input className="input" value={formDetails.Category} onChange={(e)=>updateFormDetails({...formDetails,Category:e.target.value})} id="Category"/>
                <label className="label">Image/Video</label>
                <div className="input" > 
                    <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                        <input type="file" id="Image" accept="image/jpeg,image/png,video/mp4,video/webm" onChange={(event)=>{setImageUpload(event.target.files[0])}}/>
                        <button className="button" onClick={(e)=>UploadFile(setUploadStatus,setFormDetails,imageUpload,formDetails,setDisabled)} style={{backgroundColor:'red',margin:'0px',fontSize:"15px"}}>Upload</button>
                    </div>
                    <div style={{textAlign:"left",fontSize:"15px",margin:"10px 0px 0px 0px"}}>{uploadStatus}</div>
                </div>
                <Buttons disabled={disabled}/>
            </form>
    )
}
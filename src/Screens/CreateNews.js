import "./CreateNews.css";
import { IoIosCloseCircle } from "react-icons/io";
import Phone from "../Components/Phone";
import Form from "../Components/Form";
import { useState } from "react";
import { addOne } from "../Utils/Firestore";
import { currentTime } from "../Components/Global";
import { useNavigate } from "react-router-dom";
export default function CreateNews({user}){
    const navigate = useNavigate();
    const handleSubmit = async () => addOne("Articles",{...formDetails,Time:currentTime()}).then(id=>navigate(`/NewsPreview/${id}`));
    const buttons = ({disabled}) => {
        return(
            <div className="buttonContainer">
                <button className="button classicBlue" type="submit" disabled={disabled} onClick={handleSubmit}>Publish</button>
                <button className="preview button" type="submit" disabled={disabled} onClick={()=>{
                        setDisplayPreview(true);
                }}>Preview</button>
            </div>
        )
    }
    const [displayPreview,setDisplayPreview]=useState(false)
    const [formDetails,setFormDetails]=useState({Title:"",Content:"",Category:"",FileLink:"",FileType:"",CommentCount:0,Likes:0,Views:0,Shares:0,Comments:[],Author:user.id});
    return(
        <div className="CreateNews">
            <div className="heading">Create Article</div>
            <div className="mainContainer">
            <Form formDetails={formDetails} setFormDetails={setFormDetails} setDisplayPreview={setDisplayPreview} Buttons={buttons}/>
            {displayPreview?
                <div className="mobileViewContainer">
                    <div className="separator"/>
                    <IoIosCloseCircle size={20} onClick={()=>setDisplayPreview(false)} className="closeIcon"/>
                    <Phone Article={formDetails} user={user}/>
                </div>
                :null}
            </div>
        </div>
    )
}
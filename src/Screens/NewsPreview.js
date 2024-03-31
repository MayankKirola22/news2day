import { useNavigate, useParams } from "react-router-dom";
import "./NewsPreview.css";
import { useEffect, useState } from "react";
import { deleteOne, getOne, updateOne } from "../Utils/Firestore";
import loading from "../Resources/loading.gif";
import Phone from "../Components/Phone";
import { IoEye } from "react-icons/io5";
import { FaHeart } from "react-icons/fa";
import { FaComment } from "react-icons/fa";
import { VscSend } from "react-icons/vsc";
import { FaClock } from "react-icons/fa";
import { time } from "../Components/Global";
import { FaUserCircle } from "react-icons/fa";
import Form from "../Components/Form";

export default function NewsPreview({user}){
    let { id } = useParams();
    let [formVisible,setFormVisible]=useState(false);
    const [Article,setArticle]=useState(null);
    const navigate=useNavigate();
    const handleSubmit = () =>{
        updateOne("Articles",Article,Article.id,setFormVisible)
    }
    const Buttons = ({disabled}) => {
        return(
            <div className="buttonContainer">
                <button className="button classicBlue" disabled={disabled} onClick={handleSubmit}>Update</button>
            </div>
        )
    }
    useEffect(()=>{
        getOne("Articles",id).then((res)=>setArticle(res));
    },[id]);

    return(
        <div className="NewsPreview">
            {Article!==null?Article.Title===undefined?"no data":
            <div className="mainContainer">
                <div className="articleContainer">
                {formVisible?<div><Form formDetails={Article} setFormDetails={setArticle} Buttons={Buttons}/></div>
                    :<div>
                        <div className="title">{Article.Title}</div>
                        <div className="body">{Article.Content}</div>
                        <div className="metaContainer">
                            <div className="stats">
                                <div className="info"><IoEye className="icon" size={20}/>{Article.Views}</div>
                                <div className="info"><FaHeart className="icon"/>{Article.Likes}</div>
                                <div className="info"><FaComment className="icon" />{Article.CommentCount}</div>
                                <div className="info"><VscSend className="icon specialIcon" />{Article.Shares}</div>
                            </div>
                            <div className="timeContainer"><FaClock style={{margin:"0px 5px"}} /> {time(Article.Time)}</div>
                        </div>
                        <div className="buttonContainer">
                            <div className="button delete" onClick={() => deleteOne("Articles",Article.id).then(navigate("/NewsList"))}>Delete</div>
                            <div className="button classicBlue" onClick={()=>setFormVisible(true)}>Modify</div>
                        </div>
                        <div className="commentsContainer">
                            <div className="commentsHeading">Comments</div>
                            {Article.CommentCount!==0?Article.Comments.map(Comment=>(
                                <div key={Comment.Time} className="commentContainer">
                                    <div className="comment">{Comment.Body}</div>
                                    <div className="metaContainer">
                                        <div className="user"><FaUserCircle className="userLogo" size={15}/>{Comment.User}</div>
                                        <div>{time(Comment.Time)}</div>
                                    </div>
                                    <div className="separator horizontal" style={{backgroundColor:'#cccccc'}}/>
                                </div>
                        )):<div style={{textAlign:'center',fontSize:"12px",marginTop:"40px"}}>No Comments to show.</div>}
                        </div>
                    </div>
                }
                </div>
                <div className="mobileContainer">
                    <div className="separator"/>
                    <Phone Article={Article} user={user}/>
                </div>
            </div>
            :<img src={loading} style={{height:"100vh",width:"150px"}} className="loading" alt="loading"/>}
        </div>
    )
}
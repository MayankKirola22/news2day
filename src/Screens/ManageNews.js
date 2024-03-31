import { useEffect, useState } from "react";
import { getAll } from "../Utils/Firestore";
import loading from "../Resources/loading.gif";
import { IoEye } from "react-icons/io5";
import { FaHeart } from "react-icons/fa";
import { FaComment } from "react-icons/fa";
import { VscSend } from "react-icons/vsc";
import { FaClock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./ManageNews.css";
import { time } from "../Components/Global";

export default function ManageNews({user}){
    let navigate=useNavigate();
    const [Articles,setArticles]=useState(null);
    useEffect(()=>{
        getAll("Articles",user.id,"Time","desc").then(res=>setArticles(res))
    },[user.id])
    return(
        <div className="ManageNews">
            {Articles!==null? Articles.length===0?"No Data":
            <div className="newsScreenContainer">
                <div className="heading">Manage News</div>
                <div className="newsContainer">
                    {Articles.map(Article=>(
                        <div key={Article.id} onClick={()=>navigate(`/NewsPreview/${Article.id}`)} className="news">
                            <div className="title">{Article.Title}</div>
                            <div className="separator"/>
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
                        </div>
                    ))}
                </div>
            </div>
            :<img src={loading} style={{height:"100vh",width:"150px"}} className="loading" alt="loading"/>}
        </div>
    )
}
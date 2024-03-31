import "./Dashboard.css";
import { IoMdAddCircle } from "react-icons/io";
import { MdEdit } from "react-icons/md";
import { GrDocumentPerformance } from "react-icons/gr";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import loading from "../Resources/loading.gif";
import { getMax } from "../Utils/Firestore";

export default function Dashboard({user}){
    const [topPerformedNews,setTopPerformedNews]=useState(null);
    const [topCommentedNews,setTopCommentedNews]=useState(null);
    const [topSharedNews,setTopSharedNews]=useState(null);
    const navigate=useNavigate();
    useEffect(()=>{
        getMax("Articles",user.id,"Likes").then((res)=>setTopPerformedNews(res));
        getMax("Articles",user.id,"Shares").then((res)=>setTopSharedNews(res));
        getMax("Articles",user.id,"CommentCount").then((res)=>setTopCommentedNews(res));
    },[user]);
    return(
        <div className="Dashboard">
            <div className="heading">Welcome, {user.Name}</div>
            <div className="DashboardContainer">
                <div className="smallCards">
                    <div className="card smallCard" onClick={()=>navigate(`/NewsPreview/${topPerformedNews.id}`)}>
                        <div className="title">Top performed News</div>
                        <div className="separator"/>
                        <div className="body">{topPerformedNews!==null?topPerformedNews===undefined?"no data":topPerformedNews.Title:<img src={loading} height={50} className="loading" alt="loading"/>}</div>
                    </div>
                    <div className="card smallCard" onClick={()=>navigate(`/NewsPreview/${topSharedNews.id}`)}>
                        <div className="title">Top shared News</div>
                        <div color="#cccccc" className="separator"/>
                        <div className="body">{topSharedNews!==null?topSharedNews===undefined?"no data":topSharedNews.Title:<img src={loading} height={50} className="loading" alt="loading"/>}</div>
                    </div>
                    <div className="card smallCard" onClick={()=>navigate(`/NewsPreview/${topCommentedNews.id}`)}>
                        <div className="title">Top commented News</div>
                        <div color="#cccccc" className="separator"/>
                        <div className="body">{topCommentedNews!==null?topSharedNews===undefined?"no data":topCommentedNews.Title:<img src={loading} height={50} className="loading" alt="loading"/>}</div>
                    </div>
                </div>
                <div className="cards">
                    <div className="card" onClick={()=>navigate("/CreateNews")}>
                        <IoMdAddCircle className="icon" size={30}/>
                        <div className="title">Create News</div>
                        <div className="body">Create new articles</div>
                    </div>
                    <div className="card" onClick={()=>navigate("/NewsList")}>
                        <MdEdit className="icon" size={30} />
                        <div className="title">Modify News</div>
                        <div className="body">Modify Existing articles</div>
                    </div>
                    <div className="card" onClick={()=>navigate("/PerformanceInsights")}>
                        <GrDocumentPerformance className="icon" size={30} />
                        <div className="title">Performance Insights</div>
                        <div className="body">Check the Engagement</div>
                    </div>
                </div>
            </div>
        </div>
    )
}
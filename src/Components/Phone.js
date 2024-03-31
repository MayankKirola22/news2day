import "./Phone.css";
import PhoneFrame from "../Resources/PhoneView.png"
import { CiClock2 } from "react-icons/ci";
import { MdOutlineThumbUp } from "react-icons/md";
import { VscSend } from "react-icons/vsc";
import { IoLogoWhatsapp } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";

export default function Phone({Article,user}){
    return(
        <figure className="mobileView">
                    <div style={{width:'min-content',position:'relative'}}>
                        <figcaption className="previewContent">
                            <div className="statusBar"></div>
                            <div className="mediaContainer">{Article.FileType==="Image"?<div className="photo"><img src={Article.FileLink} alt="preview" className="previewBackground"/><img src={Article.FileLink} alt="preview" className="previewImage"/></div>:<div className="video" ><video src={Article.FileLink} className="previewBackground"/><div style={{position:"absolute",backdropFilter:"blur(10px)",height:"100%",width:"100%"}}></div><video muted src={Article.FileLink} controlsList="nodownload noplaybackrate" disablePictureInPicture controls className="previewVideo"/></div>}</div>
                            <div className="content">
                                <div>
                                    <p className="title">{Article.Title}</p>
                                    <p className="body">{Article.Content}</p>
                                </div>
                                <div className="footer">
                                    <div className="separator horizontal"/>
                                    <div style={{display:'flex',justifyContent:'space-between'}}>
                                        <div style={{display:'flex'}}>
                                            <FaUserCircle size={18} className="userIcon"/>
                                            <div className="publishDetails">
                                                <div>{user.Name}</div>
                                                <div style={{display:"flex",fontSize:'70%',alignItems:"center"}}><CiClock2 style={{marginRight:"3px"}}/> 5 min. ago</div>
                                            </div>
                                        </div>
                                        <div style={{display:'flex'}}>
                                            <MdOutlineThumbUp size={20} className="previewFooterIcon"/>
                                            <VscSend size={20} style = {{transform: 'rotate(-45deg)',position:'relative',bottom:'3px',left:'3px'}}className="previewFooterIcon"/>
                                            <IoLogoWhatsapp color="	#25D366" size={20} className="previewFooterIcon"/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </figcaption>
                        <img src={PhoneFrame} alt="phone" className="phone"/>
                    </div>
                </figure>
    )
}
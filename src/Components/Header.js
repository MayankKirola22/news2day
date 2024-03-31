import "./Header.css";
import Logo from "../Resources/Logo.png";
import { FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Header({user}){
    const navigate = useNavigate();
    return(
        <div className="Header">
            <img onClick={()=>navigate("")} src={Logo} className="logo" alt="Logo"/>
            <div className="user">{user.Name} <FaUser style={{margin:"0px 10px"}} size={20} /></div>
        </div>
    )
}
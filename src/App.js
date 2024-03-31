import './App.css';
import "./Components/Global.css";
import Header from './Components/Header';
import Dashboard from './Screens/Dashboard';
import NewsPreview from './Screens/NewsPreview';
import CreateNews from './Screens/CreateNews';
import ManageNews from './Screens/ManageNews';
import PerformanceInsights from './Screens/PerformanceInsights';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getOne } from './Utils/Firestore';
import loading from "./Resources/loading.gif";

function App() {
  const [userId]=useState("KNhmX1D5U6MqU3TdOvdb");
  const [user,setUser]=useState(null);
  useEffect(()=>{
      getOne("Editors",userId).then((res)=>setUser(res));
  },[userId]);
  return (
    <div className="App">
      {user!==null?
      <div>
        <Header user={user}/>
        <div className='mainContent'>
          <Routes>
            <Route path="" element={<Dashboard user={user}/>}/>
            <Route path="CreateNews" element={<CreateNews user={user}/>}/>
            <Route path="NewsList" element={<ManageNews user={user}/>}/>
            <Route path="NewsPreview">
              <Route path=':id' element={<NewsPreview user={user}/>}/>
            </Route>
            <Route path="PerformanceInsights" element={<PerformanceInsights user={user}/>}/>
            <Route path='*' element={<Navigate to="/" />}/>
          </Routes>
        </div>
      </div>
      :<img src={loading} className='loading' style={{height:"100vh",width:"150px"}} alt="loading"/>}
    </div>
  );
}

export default App;

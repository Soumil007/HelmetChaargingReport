import React from "react";
import "./App.css"
import {Switch,Route} from "react-router-dom";
import Home from "../Home/Home";
import Navbar from "../Navbar/Navbar";
import RiderHelmetReport from "../RiderHelmetHome/RiderHelmetHome";

function App(){
    return (        
        <>
            <Navbar />
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/HelmetReport" component={RiderHelmetReport} />
                <Route component="Error" />
            </Switch> 
        </>
    );

}



export default App;
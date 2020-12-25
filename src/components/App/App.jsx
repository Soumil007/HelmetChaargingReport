import React from "react";
import "./App.css"
import HelmetChargeReport from "../HelmetChargeReport/HelmetChargeReport";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

function App(){
    return<>
        <div className="App">
            <Header />
            <HelmetChargeReport />
            <Footer />
        </div>
    </>
}

export default App;
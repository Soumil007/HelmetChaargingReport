import React from "react";
import "./HelmetChargeReport.css";
import data from "../data.json";
import helmetlogo from "./HelmetLogo.png"

function HelmetChargeReport(){
    const helmetChargeData = data;

    

    return<>
        <div className="helmetReport">
            {
                helmetChargeData.map(helmet=>{
                    return<div className="singleReport"> 
                        <img className="HelmetLogo" src={helmetlogo} alt="HelmetLogo"></img>
                        <span className="helmetId">{helmet.id}</span>
                        <span className="helmetAttri">
                            <span className="helmetAttriVal">{helmet.LastChargedOn}</span><br />
                            <span className="helmetAttriTitle">Last Charged On</span>
                        </span>
                        <span className="helmetAttri">
                            <span className="helmetAttriVal">{helmet.ChargeDuration}</span><br />
                            <span className="helmetAttriTitle">Charge Duration</span>
                        </span>
                        <span className="helmetAttri">
                            <span className="helmetAttriVal">{helmet.LastCharge}</span><br />
                            <span className="helmetAttriTitle">Last Charge</span>
                        </span>
                    </div>
                })
            }
        </div>
    </>

}

export default HelmetChargeReport;
import React from "react";
import "./HelmetChargeReport.css";
import data from "../data.json";

function HelmetChargeReport(){
    const helmetChargeData = data;

    

    return<>
        <div className="helmetReport">
            {
                helmetChargeData.map(helmet=>{
                    return<div className="singleReport"> 
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
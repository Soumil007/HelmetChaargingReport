import React, { useEffect, useState } from "react";
import "./HelmetChargeReport.css";
import data from "../data.json";
import helmetlogo from "./HelmetLogo.png"
import Modal from "react-modal";
import SettingsLogo from "../images/settingsLogo.png";
import tickLogo from "../images/tick.png";
Modal.setAppElement('#root')

function HelmetChargeReport(props){
    console.log(props.HelmetReport);

    // console.log("reportArray");
    // console.log(props.HelmetReport);
    
    const helmetChargeData = data;
    // console.log(helmetChargeData);

    //fetched data
    const helmetData = props.HelmetReport;

    helmetData.map((rider)=>console.log(rider))
    // console.log("props");
    // console.log(helmetData);


    const [tickets,setTickets] = useState([]);
    const [modalIsOpen,setModalIsOpen] = useState(false);
    const [RTModalIsOpen,SetRTModalIsOpen] = useState(false);
    const [lastChargeModal,setLastChargeModal] = useState(false);
    const [ticketCreatedModalIsOpen,setTicketCreatedModalIsOpen] = useState(false);
    const [ticketDesc,setTicketDesc] = useState("");
    const [helmetId,setHelmetId] = useState(null);
    
    const makeTicketsArray = () =>{

        
        let tempArray = [];
        helmetChargeData.map((helmet)=>{
            console.log(helmet);
            
            // for(var i=0;i<helmet.tickets.length;i++){
            //     // console.log(helmet.tickets[i]);
            //     // tickets.push(helmet.tickets[i])
            //     setTickets((prev)=>[...prev,helmet.tickets[i]]);
            // }
            // setTickets((prev)=>[...prev,helmet.tickets.map(ticket=>ticket)]);
            
            // helmet.tickets.map(ticket=>{setTickets(prev=>[...prev,ticket])});
            
            // tempArray.push(helmet.tickets.map(ticket=>ticket));
            
            helmet.tickets.map(ticket=>{tempArray.push(ticket)});
            setTickets(tempArray);
            return 0;
        })

        return 0;
    }

    

    useEffect(()=>{
        const vari = makeTicketsArray();        

    },[helmetChargeData])

    

    console.log(tickets);  

    function getTicketDate(){
        const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
        ];
        let newDate = new Date();
        let hour = newDate.getHours()>12?newDate.getHours()==="00"?0:newDate.getHours()-12:newDate.getHours();
        let AMPM = newDate.getHours()>=12?"PM":"AM"
        
        let ticketDate = newDate.getDate()+" "+monthNames[newDate.getMonth()]+", "+hour+":"+newDate.getMinutes()+AMPM;
        return ticketDate;
    }
    
    
    function makeNewTicket(helmetID,ticketDesc){
        if(helmetID===null){
            alert("helmet id not selected");
            return false
        }else{
            let newTicket = {
                "helmetId":helmetID,
                "ticketDate":getTicketDate(),
                "ticketID":"CLOO100",
                "ticketText":ticketDesc,
                "isTicketActive":true,
                "ticketResolutionDate": "NA",
                "ticketResolutionText": "NA"
            }
            return newTicket;
        }
        
    }
    
    // Function to set new ticketDescription
    function handleTicketDescChange(event){
        setTicketDesc(event.target.value);
    }

    // Function to set new ticketDescription corresponding helmetId

    function handleHelmetIdSelection(event){
        setHelmetId(event.target.value);
    }

    function handleSubmit(event){
        event.preventDefault();
        let newTicket = makeNewTicket(helmetId,ticketDesc);
        console.log(newTicket);
        if(newTicket!==false){
            tickets.push(newTicket);
            setTicketCreatedModalIsOpen(true);
            SetRTModalIsOpen(false);
        }   
    }

    function handleRaiseTicket(){
        setModalIsOpen(false);
        SetRTModalIsOpen(true);
    }

    // function handleCreateTicket(){
    //     setTicketCreatedModalIsOpen(true);
    //     SetRTModalIsOpen(false)

    // }

    function getChargeDuration(milsecs){
        let secs = milsecs/1000;
        let mins = Math.round(secs/60);
        let hrs = Math.floor(mins/60);
        mins = mins%60;
        return (hrs+"hr "+mins+"min");
    }

    const [chargelogs,setLastChargeLogs]=useState([]);
        console.log("chargeLogs");
        console.log(chargelogs);
    
    
    function handleChargeList(chargeLogs){
        setLastChargeModal(true);
        // setLastChargeLogs(prev=>[...prev,chargeLogs])
        setLastChargeLogs(chargeLogs);
    }
    
    return<>
        <div className="helmetReport">
            {
                helmetData.map(helmet=>{
                    return<div className="singleReport" key={helmet.device_id}> 
                        <span className="HelmetAttriLogo">
                        <img className="HelmetLogo" src={helmetlogo} alt="HelmetLogo"></img>
                        <span className="helmetId">{helmet.id}</span>
                        </span>
                        <span className="helmetAttri">
                            <span className="helmetAttriVal">{helmet.chargeLogs.length!==0?helmet.chargeLogs[0].start:"null"}</span><br />
                            <span className="helmetAttriTitle">Last Charged On</span>
                        </span>
                        <span className="helmetAttri">
                            <span className="helmetAttriVal">{helmet.chargeLogs.length!==0?helmet.chargeLogs[0].end!==null?getChargeDuration(new Date(helmet.chargeLogs[0].end)-new Date(helmet.chargeLogs[0].start)):"Charging":"null"}</span><br />
                            <span className="helmetAttriTitle">Charge Duration</span>
                        </span>
                        <span className="helmetAttri">
                            <span className="helmetAttriVal">{helmet.chargeLogs.length!==0?helmet.chargeLogs[0].end_battery!==null?helmet.chargeLogs[0].start_battery+","+helmet.chargeLogs[0].end_battery:"null":"null"}</span><br />
                            <span className="helmetAttriTitle">Last Charge</span>
                        </span>
                        <button onClick={()=>handleChargeList(helmet.chargeLogs)} className="moreOption">...</button>
                    </div>
                })
            }
            {/* Modal for Last 5 Charges */}
            <Modal 
                isOpen={lastChargeModal}
                onRequestClose={()=>setLastChargeModal(false)}
                className="viewLastChargeModalStyles"
                style={{
                    content:{
                        boxShadow:"3px 3px 8px 4px rgba(0,0,0,0.4)",
                        borderRadius:"20px",
                        outline:"none"
                    }
                }}
            >
                <h2 className="LastChargeModalHeading">Last Charge List</h2>
                <div>
                    {  
                        chargelogs.map((log,index)=>{
                            while(index<5){
                                return <div className="singleReportChargeList">
                                    <span className="helmetAttriChargeList">
                                        <span className="logVal">{log.start}</span><br />
                                        <span className="logTitle">Last Charged On</span>
                                    </span>
                                    <span className="helmetAttriChargeList">
                                        <span className="logVal">{log.end!==null?getChargeDuration(new Date(log.end)-new Date(log.start)):"Charging"}</span><br />
                                        <span className="logTitle">Charge Duration</span>
                                    </span>
                                    <span className="helmetAttriChargeList">
                                        <span className="logVal">{log.end_battery!==null?log.start_battery+","+log.end_battery:"null"}</span><br />
                                        <span className="logTitle">Last Charge</span>
                                    </span> 
                                </div>
                            }
                        }
                        
                    )}
                    
                </div>


                <button onClick={()=>setLastChargeModal(false)} className="closeModal"></button>
            </Modal>

            {/* Modal for ViewTickets */}
            <button onClick={()=>setModalIsOpen(true)} className="openModal"><img className="SettingsLogo" src={SettingsLogo} alt="SettingsLogo" style={{width:"100px", height:"100px",borderRadius:"100%",outline:"none",boxShadow:"2px 2px 6px 4px rgba(0,0,0,0.4)",padding:"5px"}}></img></button> */}

            <Modal 
                isOpen={modalIsOpen}
                onRequestClose={()=>setModalIsOpen(false)}
                className="viewTicketsModalStyles"
                style={{
                    content:{
                        boxShadow:"3px 3px 8px 4px rgba(0,0,0,0.4)",
                        borderRadius:"20px",
                        outline:"none"
                    }
                }}
            >
                
                <h2 className="viewTicketHeading">View Tickets</h2>
                <hr className="headingRuleBar" style={{marginBottom:"50px"}}></hr>
                <div className="viewTickets">{
                    tickets.map(ticket=>{
                        return<>
                            <div className="singleTicket">
                                <div>{ticket.ticketDate}</div>
                                <span style={{borderRight:"1px solid black", paddingRight:"10px",fontSize:"24px",fontWeight:"600"}}>
                                    {ticket.helmetId}
                                </span>
                                <span style={{paddingLeft:"10px",fontSize:"24px",fontWeight:"600",color:"#ff4500"}}>
                                    {ticket.ticketText}
                                </span>
                                <div style={{marginTop:"20px",
                                backgroundColor:"#33bb80",
                                width:"152px",
                                borderRadius:"15px",
                                padding:"8px",
                                color:"white",
                                fontWeight:"400"}}>
                                    {ticket.ticketResolutionDate!=="NA"?"Resolved, "+ticket.ticketResolutionDate:"Resolving"}
                                </div>
                                <div style={{color:"#33bb80",marginTop:"10px"}}>        
                                {ticket.ticketResolutionText!=="NA"?ticket.ticketResolutionText:"Work In Progess"}
                                </div>        
                            </div>
                            <hr></hr>
                        </>
                    })
                }</div>
                <button onClick={()=>setModalIsOpen(false)} className="closeModal"></button>

                <button className="raiseTicketModalBtn" onClick={handleRaiseTicket}>Raise Ticket</button>
                
            </Modal>
            
            
            {/* Modal For Raise Tickets */}
            <Modal
                isOpen={RTModalIsOpen}
                onRequestClose={()=>SetRTModalIsOpen(false)}
                className="viewTicketsModalStyles"
                style={{
                    content:{
                        boxShadow:"3px 3px 8px 4px rgba(0,0,0,0.4)",
                        borderRadius:"20px",
                        outline:"none"
                    }
                }}
            >
                <h2 className="viewTicketHeading" style={{color:"#666666"}}>Create New Ticket</h2>
                <hr className="headingRuleBar" style={{marginBottom:"30px", border:"2px solid gray"}}></hr>

                <form id="newTicket" method="POST" onSubmit={handleSubmit} name="createTicketForm">
                    <div className="helmetSelection">
                        <h3 style={{fontSize:"24px",color:"#ff6666",marginTop:"1%"}}>Select Helmet</h3>
                        <select name="helmetid" 
                            id="helmetIDSelected" 
                            className="helmetSelectOption" 
                            value={helmetId}
                            onChange={handleHelmetIdSelection}
                        >
                            <option selected disabled>Select HelmetID</option>
                            {helmetChargeData.map(helmet=><option value={helmet.id}>{helmet.id}</option>)}
                        </select>
                    </div>

                    <div className="ticketDrescription">
                        <h3 style={{fontSize:"24px",color:"#ff6666",marginTop:"1%"}}>Describe the problem in few words:</h3>
                        <textarea 
                            id="descBox"
                            rows="8"
                            value={ticketDesc}
                            className="ticketDescBox"
                            maxLength="72"
                            onChange={handleTicketDescChange}>
                        </textarea>
                        <button className="createBtn" type="submit" >Create</button>
                    </div>
                </form>

                <button onClick={()=>SetRTModalIsOpen(false)} className="closeModal"></button>

            </Modal>
            
            <Modal
                isOpen={ticketCreatedModalIsOpen}
                onRequestClose={()=>setTicketCreatedModalIsOpen(false)}
                className="ticketCreatedModalStyles"
                style={{
                    content:{
                        boxShadow:"3px 3px 8px 4px rgba(0,0,0,0.4)",
                        borderRadius:"20px",
                        outline:"none",
                        height:"300px"
                    }
                }}
            >
                <div className="ticketCreated">
                    <img src={tickLogo} alt="tick" className="ticketCreatedImg"></img>
                    <h2 className="ticketCreatedHeading">Ticket Created</h2>
                    <h3 className="ticketCreatedMsg">We'll be in touch.</h3>
                </div>

            </Modal>

        </div> 
    </>

}

export default HelmetChargeReport;
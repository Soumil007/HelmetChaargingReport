import React, { useEffect, useState } from "react";
import "./HelmetChargeReport.css";
import data from "../data.json";
import helmetlogo from "./HelmetLogo.png"
import Modal from "react-modal";
import SettingsLogo from "../images/settingsLogo.png";

Modal.setAppElement('#root')

function HelmetChargeReport(){
    
    const helmetChargeData = data;
    const [tickets,setTickets] = useState([]);
    const [modalIsOpen,setModalIsOpen] = useState(false);
    const [RTModalIsOpen,SetRTModalIsOpen] = useState(false);
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
    let newDate = new Date();
    console.log(newDate);
    let hour = newDate.getHours()>12?newDate.getHours()==="00"?0:newDate.getHours()-12:newDate.getHours();
    
   
    
    console.log(hour);
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
    
    //Function to set new ticketDescription
    function handleTicketDescChange(event){
        setTicketDesc(event.target.value);
    }

    //Function to set new ticketDescription corresponding helmetId

    function handleHelmetIdSelection(event){
        setHelmetId(event.target.value);
    }

    console.log(helmetId+"=>"+ticketDesc);

    function handleSubmit(event){
        event.preventDefault();
        let newTicket = makeNewTicket(helmetId,ticketDesc);
        tickets.push(newTicket);
    }

    function handleRaiseTicket(){
        setModalIsOpen(false);
        SetRTModalIsOpen(true);
    }

    

    return<>
        <div className="helmetReport">
            {
                helmetChargeData.map(helmet=>{
                    return<div className="singleReport" key={helmet.id}> 
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

            {/* Modal for ViewTickets */}
            <button onClick={()=>setModalIsOpen(true)} className="openModal"><img className="SettingsLogo" src={SettingsLogo} alt="SettingsLogo" style={{width:"100px", height:"100px",borderRadius:"100%",outline:"none",boxShadow:"2px 2px 6px 4px rgba(0,0,0,0.4)",padding:"5px"}}></img></button>

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

                <form id="newTicket" method="POST" onSubmit={handleSubmit}>
                    <div className="helmetSelection">
                        <h3 style={{fontSize:"24px",color:"#ff6666"}}>Select Helmet</h3>
                        <select name="helmet" 
                            id="helmetIDSelected" 
                            className="helmetSelectOption" 
                            value={helmetId}
                            onChange={handleHelmetIdSelection}
                        >
                            {helmetChargeData.map(helmet=><option value={helmet.id}>{helmet.id}</option>)}
                        </select>
                    </div>

                    <div className="ticketDrescription">
                        <h3 style={{fontSize:"24px",color:"#ff6666"}}>Describe the problem in few words:</h3>
                        <textarea 
                            id="descBox"
                            rows="8" 
                            style={{borderRadius:"20px", backgroundColor:"lightgrey",minWidth:"72%", border:"2px solid gray"}}
                            value={ticketDesc}
                            onChange={handleTicketDescChange}>
                        </textarea>
                        <button className="createBtn" type="submit">Create</button>
                        {/* <input className="createBtn" type="submit" value="Submit" /> */}
                    </div>
                </form>

                <button onClick={()=>SetRTModalIsOpen(false)} className="closeModal"></button>

            </Modal>

        </div> 
    </>

}

export default HelmetChargeReport;
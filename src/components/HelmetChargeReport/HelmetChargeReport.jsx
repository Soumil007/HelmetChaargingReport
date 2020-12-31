import React, { useEffect, useState } from "react";
import "./HelmetChargeReport.css";
import data from "../data.json";
import helmetlogo from "./HelmetLogo.png"
import Popup from 'reactjs-popup';
import ViewTickets from "../ViewTickets/ViewTickets";
import Modal from "react-modal";

Modal.setAppElement('#root')

function HelmetChargeReport(){
    
    const helmetChargeData = data;
    const [tickets,setTickets] = useState([]);
    const [modalIsOpen,setModalIsOpen] = useState(false);
    const [RTModalIsOpen,SetRTModalIsOpen] = useState(false);

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
        // tickets=[];

        const vari = makeTicketsArray();
        
        console.log("useEffect firing");
        

    },[helmetChargeData])

    

    console.log(tickets);    

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
            <button onClick={()=>setModalIsOpen(true)} className="openModal">Open</button>

            <Modal 
                isOpen={modalIsOpen}
                onRequestClose={()=>setModalIsOpen(false)}
                className="viewTicketsModalStyles"
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
                                fontWeight:"200"}}>
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
            >
                <h2>Raise Ticket</h2>
                <button onClick={()=>SetRTModalIsOpen(false)}>Close</button>

            </Modal>

        </div> 
    </>

}

export default HelmetChargeReport;
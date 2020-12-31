import React from "react";
import "./ViewTickets.css";
// import Popup from "reactjs-popup";

function viewTickets(props){

    console.log(props.ticketList);
    
    let ticketList=props.ticketList;
    
    return <>
        <div className="viewTicketsPopup">
            {ticketList.map((ticket)=>{
                return(
                    <div className="singleTicket">
                        <div className="ticketAttri">{ticket.ticketID}</div>
                        <div className="ticketAttri">{ticket.ticketText}</div>
                        <br />
                    </div>
                    
                )
            })}
        </div>
    </>
}

export default viewTickets;
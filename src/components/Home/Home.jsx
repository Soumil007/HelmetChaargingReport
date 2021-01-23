import React from "react";
// import Header from "./Heading";
// import Footer from "./Footer";
import Cookie from "js-cookie";

function Home(){

    Cookie.set("report_res",{
        user_id:"4EulioOrxqQLhj2n1XDOFlBv7fQ2",
        client_id:"example1",
        org_uuid:"example11594152600"
    });

    return( 
        <>
            <h1>Welcome to Altor Technologies</h1>
        </>
    );

}

export default Home;
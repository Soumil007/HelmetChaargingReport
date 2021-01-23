import React,{useState,useEffect} from "react";
import HelmetChargeReport from "../HelmetChargeReport/HelmetChargeReport";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Loading from "../Loading/Loading";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import Cookie from "js-cookie"
import axios from "../Axios";
import "./RiderHelmetHome.css";

function App(){


    const [helmetReport,setHelmetReport] = useState(null);
    const [timer,setTimer] =  useState(false);
    const [processedHelmetData,setHelmetData] = useState([]);

    //fertching data from api
    async function fetchData(){

        const cookie_content=Cookie.getJSON("report_res");
        const res = await axios.post("/helmet/battery/",cookie_content);
        setHelmetReport(res.data.result);
        // console.log("response");
        // console.log(res);
    }

    // console.log(helmetReport);

    useEffect(()=>{
        fetchData();           
    },[])

    const convertMmToPx=(mm)=>{
    
        return (mm/0.144583);
    }
    
    const convertDomToPDF=()=>{
       
        
        const input = document.getElementById('divToPrint');
        console.log(input.offsetWidth+" IS INPUT WIDTH")
    
       
    
        var pdf=new jsPDF({
            orientation: 'p', 
            unit: 'mm', 
            format: [275,297]
        });
    
        
    
        html2canvas(input).then((canvas) => {   
        
    
        var ratio=canvas.height/canvas.width;

    
        var returnableValue=breakIntoChunks(canvas,ratio,pdf);
        var imgArray=returnableValue.imgArray;
    
        imgArray.map((elem,i)=>{
    
            pdf.addPage().addImage(elem,'PNG',0,0,pdf.internal.pageSize.getWidth(),(pdf.internal.pageSize.getHeight()));
            
            return 0;
        })
    
        pdf.save("download.pdf");
      
      });
    
    }
    
    
    const breakIntoChunks=(canvas,ratio,pdf)=>{
    
        var height=canvas.height;
    
        var numOfPages=Math.ceil(height / convertMmToPx(pdf.internal.pageSize.getHeight()) );
    
    
    
        var imgArray=[];
    
        console.log("PDF dimensions are",convertMmToPx(pdf.internal.pageSize.getWidth()),convertMmToPx(pdf.internal.pageSize.getHeight()));
        console.log("Canvas dimensions are ", canvas.width, canvas.height);
    
        for(var i=0;i<numOfPages;i++){
    
            var newCanvas=document.createElement('canvas');
            newCanvas.width=convertMmToPx(pdf.internal.pageSize.getWidth());
            newCanvas.height=convertMmToPx(pdf.internal.pageSize.getHeight());
    
    
            var newContext=newCanvas.getContext('2d');
            newContext.drawImage(canvas, 0, ((convertMmToPx(pdf.internal.pageSize.getHeight()))*i), (canvas.width), convertMmToPx(pdf.internal.pageSize.getHeight()), 0, 0,convertMmToPx(pdf.internal.pageSize.getWidth()),convertMmToPx(pdf.internal.pageSize.getHeight()));
    
            var newImage = document.createElement('img');
            newImage.src = newCanvas.toDataURL();
    
            console.log("IMAGE IS AT"+(( convertMmToPx(pdf.internal.pageSize.getHeight())/numOfPages)*i));
    
            imgArray.push(newImage);
        }
    
        const returnableValue={
            pageSize:(canvas.height/numOfPages),
            imgArray:imgArray
        }
        return returnableValue;   
    }
    

    function getSortedChargeLogs(logs){
        let sortedArr = [];
        let logsArr = [];
        for( let date in logs){
            let singleChargeData = logs[date];
            singleChargeData.map((uni)=>logsArr.push(uni))
        }
        if(logsArr.length>0){
            sortedArr = logsArr.sort((a,b)=>(new Date(b.start)-new Date(a.start)));
        }
        // if(sortedArr.length>0){
        //     return sortedArr;
        // }
        return sortedArr
    }
    function makeHelmetData(data){
        data.map((helmet)=>{
            let newHelmetData = {
                "id":helmet.device_id,
                "inCharge":helmet.in_charge,
                "chargeLogs":getSortedChargeLogs(helmet.logs)
            }
            setHelmetData((prev)=>[...prev,newHelmetData])
            return 0;
        })
    }
    // console.log(processedHelmetData);

    useEffect(()=>{
        if(helmetReport!=null){
            makeHelmetData(helmetReport);
        }
        // makeHelmetData(helmetReport)
        
    },[helmetReport]);
    if(processedHelmetData.length!==0){
        return<>

            <button className="downloadButton" onClick={convertDomToPDF}>Print</button>
            <div id="divToPrint" className="App" >
                <Header />
                <HelmetChargeReport 
                    HelmetReport = {processedHelmetData}
                />
                <Footer />
            </div>
        </>
    }else{
        function start(){
            setTimer(prevValue=>!prevValue);
            window.clearTimeout(ErrorTimer);
        }
        
        // ErrorTimer();
        if(!timer){
            var ErrorTimer = setTimeout(start,7000);
            return <Loading />
        }else{
            return<div style={{backgroundColor:"rgb(240, 247, 249)",display:"flex",justifyContent:"center",alignContent:"center",alignItems:"center",
            textAlign:"center",paddingTop:"307px"}}>
                <h1 style={{display:"flex", color:"#e84545",backgroundColor:"rgb(240, 247, 249)",minWidth:"30vw",
                fontSize:"43px",maxWidth:"35vw"}}>Error!! Problem loading page. Please try again after sometime.</h1>
            </div>
        }
    }
    
}

export default App;
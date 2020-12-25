import React from "react";
import "./App.css"
import HelmetChargeReport from "../HelmetChargeReport/HelmetChargeReport";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

function App(){
    const convertMmToPx=(mm)=>{
    
        // let width = window.screen.width;
        // let height = window.screen.height;
    
        // console.log("widht=>"+width+"height=>"+height);
        // if(width>=1900 ){
        //     return (mm/0.104583);
        // }
        // else if(width>=1300 && width<=1900){
        //     return (mm/0.104583);
        // }
        // else{
        //     return (mm/0.104583);
        // }
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
    
        
    
    
        // var numOfPages=Math.ceil(canvas.height/ convertMmToPx(pdf.internal.pageSize.getHeight()) );
       
        
    
        var ratio=canvas.height/canvas.width;
    
        // createResizedCanvas(canvas,ratio);
        
    
        var returnableValue=breakIntoChunks(canvas,ratio,pdf);
        var imgArray=returnableValue.imgArray;
    
        imgArray.map((elem,i)=>{
    
            pdf.addPage().addImage(elem,'PNG',0,0,pdf.internal.pageSize.getWidth(),(pdf.internal.pageSize.getHeight()));
            // pdf.addImage(elem,'PNG',0,0,pdfWidth,(pdfWidth*ratio));
            
    
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

    // function convertDomToPDF(){

    //         const doc = document.getElementById("divToPrint");
    //         var element_width=document.getElementById("divToPrint").getBoundingClientRect().width;
    //         var page_width=window.screen.width;
    //         var left_offset=(page_width-element_width)/2;
    //         console.log(element_width+" and "+page_width)
    //         // console.log(doc.offsetHeight);
    //         // console.log(doc.offsetWidth);
    //         // console.log(doc.getAttribute("height"));
    //         var pdf = new jsPDF('l', 'pt', [1900,1980]);
    //             pdf.html(doc, {
    //                 callback: function (pdf) {
    //                     pdf.save('AltorRiderReport.pdf');
                        
    //                 },
    //                 image:HTMLOptionsCollection,
    //                 x:(left_offset*3),
    //                 y:10,
    //         });
    //     }

    
    return<>
        <button className="downloadButton" onClick={convertDomToPDF}>Print</button>
        <div id="divToPrint" className="App" >
            <Header />
            <HelmetChargeReport />
            <Footer />
        </div>
    </>
}

export default App;
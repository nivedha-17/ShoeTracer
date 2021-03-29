import React,{ Component } from 'react';
const QRCode = require('qrcode.react');

class DisplayShoe extends Component {
    constructor(props) {
        super(props)
        this.state = {
            buttonClick:false
        }
    }    

    renderShoeDetails(shoeDetails) {   
        const shoe = Object.values(shoeDetails)
        return(  
            <div id="shoeDetails">
                <div className="row"><div className="col-sm-4"><label className="labels" htmlFor="modelNo">Model Number:</label></div>
                <div className="col-sm-4"><span id="modelNo" className="data" style={{marginTop:"10px"}}>{shoe[0].toUpperCase()}</span></div></div>
                <div className="row"><div className="col-sm-4"><label className="labels" htmlFor="modelName">Model Name:</label></div>
                <div className="col-sm-4"><span id="modelName" className="data">{shoe[1].charAt(0).toUpperCase()+shoe[1].slice(1)}</span></div></div>
                <div className="row"><div className="col-sm-4"><label className="labels" htmlFor="quantity">Quantity Produced: </label></div>
                <div className="col-sm-4"><span id="quantity" className="data">{shoe[2]}</span></div></div>
                <div className="row"><div className="col-sm-4"><label className="labels" htmlFor="color">Color: </label></div>
                <div className="col-sm-4"><span id="color" className="data">{shoe[3].charAt(0).toUpperCase()+shoe[3].slice(1)}</span></div></div>
                <div className="row"><div className="col-sm-4"><label className="labels" htmlFor="price">Price: </label></div>
                <div className="col-sm-4"><span id="price" className="data">{shoe[4]}</span></div></div>
                <div className="row"><div className="col-sm-4"><label className="labels" htmlFor="manCompany">Manufactured Company: </label></div>
                <div className="col-sm-4"><span id="manCompany" className="data">{shoe[5].charAt(0).toUpperCase()+shoe[5].slice(1)}</span></div></div>
                <div className="row"><div className="col-sm-4"><label className="labels" htmlFor="travelHistory">Travel History: </label></div></div>
                {
                    Object.entries(shoe[6]).map(travel => {
                        let date = new Date(Number(travel[1][1]))
                        console.log(date,typeof(date))
                        return(
                            <div>
                                <div className="row"><div className="col-sm-4"><span id="location" className="data">{travel[1][0].charAt(0).toUpperCase()+travel[1][0].slice(1).replace(/,\s*([a-z])/g, function(d,e) { return ", "+e.toUpperCase() })}</span></div>
                                <div className="col-sm-4"><span id="dateTime" className="data">{date.getDate()+'/'+(date.getMonth()+1)+'/'+date.getFullYear()+' '+date.getHours()+':'+date.getMinutes()+':'+date.getSeconds()}</span></div></div>
                            </div>
                        );
                    })
                }
            </div>  
        )         
    }

    render() {
        console.log(this.props.qrcode)
        console.log(this.props.shoeDetails)
        return(            
           <div id="content">
               <h2 style={{paddingTop:"12px"}}>Display Shoe</h2>
               <form onSubmit={(event) => {
                   event.preventDefault()
                   this.props.displayShoe(this.props.qrcode)
                   this.setState({buttonClick:true})
               }}>
                   {this.props.qrcode ?
                        <div className="form-group">
                            <div className="col-sm-4"><QRCode value={this.props.qrcode}/></div>   
                            <div className="col-sm-4" style={{marginTop:"10px"}}><button type="submit" className="btn btn-dark" >Scan</button></div>
                        </div>
                        : <p>No shoes to display</p>
                   }                   
               </form>
               {this.state.buttonClick ? this.renderShoeDetails(this.props.shoeDetails) : null }
            </div>
        );
    }   
}
export default DisplayShoe;
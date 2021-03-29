import React,{ Component } from 'react';
const QRCode = require('qrcode.react');
const axios = require('axios');

class AddTravel extends Component {    
    getLocation() {
        document.getElementById('location').value = 'loading...'
        document.getElementById('dateTime').value = 'loading...'
        let latitude,longitude;
        var today = new Date();
        navigator.geolocation.getCurrentPosition((position) => {            
            latitude = position.coords.latitude,
            longitude = position.coords.longitude            
            axios.get('http://api.weatherstack.com/current?access_key=bab1e5038fcfd116e11bd3a16b2af66c&query='+latitude+','+longitude+'&units=f')
            .then((response) => {
                const apiResponse = response.data.location;
                document.getElementById('location').value = apiResponse.name+','+apiResponse.region+','+apiResponse.country;
                document.getElementById('dateTime').value = today.getDate()+'/'+(today.getMonth()+1)+'/'+today.getFullYear()+' '+today.getHours()+':'+today.getMinutes()+':'+today.getSeconds();
            }).catch(error => {
                console.log(error)
            })
        })        
    }    
    
    render() {
        return(            
            <div id="content">
                <h2 style={{paddingTop:"12px"}}>Add Travel</h2> 
                <form onSubmit={(event) => {
                    event.preventDefault() 
                    const location = this.location.value.toLowerCase()
                    const dateTime = Date.now()
                    this.props.addTravel(location,dateTime,this.props.qrcode)
                }}>
                    <div className="form-group row">
                        <div className="col-sm-8"> 
                            <div className="row">
                                <div className="col-sm-4"><label className="labels" htmlFor="location">Enter the Manufacturing Location:</label></div>
                                <div className="col-sm-5"><input id="location" type="text" ref={(input) => {this.location = input}}
                                        className="form-control" placeholder="Location" required /></div>
                                <div className="col-sm-1"><a href="#" onClick={this.getLocation}><img src="../../public/img/locationIcon.png" alt="location"/></a></div>
                            </div>
                            <div className="row">    
                                <div className="col-sm-4"><label className="labels" htmlFor="dateTime">Enter the Date and Time:</label></div>
                                <div className="col-sm-5"><input id="dateTime" type="text" ref={(input) => {this.dateTime = input}}
                                        className="form-control" placeholder="Date and Time" required /></div>
                            </div>
                            <button type="submit" className="btn btn-dark" >Add Travel</button>
                        </div>
                        {this.props.qrcode ?
                            <div className="col-sm-4 ">                             
                                <QRCode value={this.props.qrcode} />                
                            </div>
                            : <p>No shoes available</p> }
                    </div>         
               </form>
            </div>
        );
    }   
}
export default AddTravel;
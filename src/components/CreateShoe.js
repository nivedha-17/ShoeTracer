const axios = require('axios');
const QRCode = require('qrcode.react');
import React,{ Component } from 'react';

class CreateShoe extends Component {
    constructor(props) {
        super(props);
        this.state = {
            buttonClick:false,
            text:''
        }
    }
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
               <h2 style={{paddingTop:"12px"}}>Add Shoe</h2>
               <form onSubmit={(event) => {
                   event.preventDefault() 
                   const modelNo = this.modelNo.value.toLowerCase()
                   const modelName = this.modelName.value.toLowerCase()
                   const quantity = this.quantity.value
                   const color = this.color.value.toLowerCase()
                   const price = this.price.value
                   const manCompany = this.manCompany.value.toLowerCase()
                   const location = this.location.value.toLowerCase()
                   const dateTime = Date.now()
                   this.setState({
                       text:modelNo+modelName+quantity+color+price+manCompany+location+dateTime,
                       buttonClick:true 
                    },() => {
                        this.props.createShoe(modelNo,modelName,quantity,color,price,manCompany,location,dateTime,this.state.text)
                    })                   
               }}>
                   <div className="form-group row d-flex flex-row">
                        <div className="col-sm-4"><label className="labels" htmlFor="modelNo">Enter the Model Number:</label></div>
                        <div className="col-sm-5"><input id="modelNo" type="text" ref={(input) => {this.modelNo = input}}
                                                   className="form-control" placeholder="Model Number"
                                                   required />
                        </div>
                        <div className="col-sm-4"><label className="labels" htmlFor="modelName">Enter the Model Name:</label></div>
                        <div className="col-sm-5"><input id="modelName" type="text" ref={(input) => {this.modelName = input}}
                                                   className="form-control" placeholder="Model name"
                                                   required />
                        </div>                        
                        <div className="col-sm-4"><label className="labels" htmlFor="quantity">Enter the Number of Shoes Manufactured:</label></div>
                        <div className="col-sm-5"><input id="quantity" type="text" ref={(input) => {this.quantity = input}}
                                                   className="form-control" placeholder="Quantity Manufactured"
                                                   required />
                        </div>
                        <div className="col-sm-4"><label className="labels" htmlFor="color">Enter the Color of Manufactured Shoe:</label></div>
                        <div className="col-sm-5"><input id="color" type="text" ref={(input) => {this.color = input}}
                                                   className="form-control" placeholder="Color Manufactured"
                                                   required />
                        </div>
                        <div className="col-sm-4"><label className="labels" htmlFor="price">Enter the Retail Price:</label></div>
                        <div className="col-sm-5"><input id="price" type="text" ref={(input) => {this.price = input}}
                                                   className="form-control" placeholder="Retail Price"
                                                   required />
                        </div>
                        <div className="col-sm-4"><label className="labels" htmlFor="manCompany">Enter the Manufacturing Company:</label></div>
                        <div className="col-sm-5"><input id="manCompany" type="text" ref={(input) => {this.manCompany = input}}
                                                   className="form-control" placeholder="Manufacturing Company"
                                                   required />
                        </div>
                        <div className="col-sm-4"><label className="labels" htmlFor="location">Enter the Manufacturing Location:</label></div>
                        <div className="col-sm-5"><input id="location" type="text" ref={(input) => {this.location = input}}
                                                   className="form-control" placeholder="Location"
                                                   required /></div>
                        <div className="col-sm-1"><a href="#" onClick={this.getLocation}><img src="../../public/img/locationIcon.png" alt="location"/></a>
                        </div>
                        <div className="col-sm-4"><label className="labels" htmlFor="dateTime">Enter the Date and Time:</label></div>
                        <div className="col-sm-5"><input id="dateTime" type="text" ref={(input) => {this.dateTime = input}}
                                                   className="form-control" placeholder="Date and Time"
                                                   required />
                        </div>
                    </div>
                    <button type="submit" className="btn btn-dark" >Add Shoe</button>               
               </form>
               {this.state.buttonClick 
                 ? <div id="qr" style={{paddingBottom:"12px"}}><QRCode value={this.state.text} /></div> 
                 : null
               }
            </div>
        );
    }   
}
export default CreateShoe;
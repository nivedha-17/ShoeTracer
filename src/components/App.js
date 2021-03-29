import React,{Component} from 'react';
import Web3 from 'web3';
import {BrowserRouter as Route,Switch,BrowserRouter} from 'react-router-dom';
import ShoeTracer from '../build/contracts/ShoeTracer.json';
import CreateShoe from './CreateShoe';
import AddTravel from './AddTravel';
import DisplayShoe from './DisplayShoe';

class App extends Component {
    async componentWillMount() {
        await this.loadWeb3()
        await this.loadBlockchainData()
    }
    async loadWeb3() {
        if(window.ethereum) {
            window.web3 = new Web3(ethereum);
            await window.ethereum.enable();
        } else if(window.web3) {
            window.web3 = new Web3(web3.currentProvider);
        } else {
            console.log("Non-ethereum browser detected....");
        }
    }
    async loadBlockchainData() {
        const web3 = window.web3;
        const accounts = await web3.eth.getAccounts()
        this.setState({account:accounts[0]})
        const networkID = await web3.eth.net.getId()
        const networkData = ShoeTracer.networks[networkID]
        if(networkData) {
            const shoeTracer = new web3.eth.Contract(ShoeTracer.abi,networkData.address)
            this.setState({shoeTracer})         
            let QRCodeCount = await shoeTracer.methods.qrcodesCount().call()
            if(QRCodeCount > 0) {
                let randomQRCode = Math.floor(Math.random()*(parseInt(QRCodeCount)))
                console.log(randomQRCode)
                let selectedQRCode = await shoeTracer.methods.qrcodes(randomQRCode).call()
                this.setState({selectedQRCode:selectedQRCode})  
                let shoeDetails = await shoeTracer.methods.listShoe(selectedQRCode).call()
                this.setState({shoeDetails:shoeDetails})       
            }               
        } else {
            window.alert('Contract not deployed')
        }
    }
    constructor(props) {
        super(props)
        this.state = {
            account:'',
            selectedQRCode:'',
            shoeDetails:{}
        }
        this.createShoe = this.createShoe.bind(this)
        this.addTravel = this.addTravel.bind(this)
        this.displayShoe = this.displayShoe.bind(this)
    }
    createShoe(modelNo,modelName,quantity,color,price,manCompany,location,timestamp,qrcode) {        
        console.log(modelNo,modelName,quantity,color,price,manCompany,location,timestamp,qrcode)
        this.state.shoeTracer.methods.createShoe(modelNo,modelName,quantity,color,price,manCompany,location,timestamp,qrcode)
            .send({from:this.state.account}) 
    }
    addTravel(location,timestamp,qrcode) {
        console.log(location,timestamp,qrcode)
        this.state.shoeTracer.methods.addTravel(location,timestamp,qrcode)
            .send({from:this.state.account})          
    }
    async displayShoe(qrcode) {
        const shoeDetails = await this.state.shoeTracer.methods.listShoe(qrcode).call()
        this.setState({shoeDetails:shoeDetails})
    }
    render() {
        return(
            <div className="container">
                <h1 style={{paddingTop:"20px",paddingBottom:"20px"}} className="text-center">Shoe Tracer</h1>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <div className="container-fluid">
                        <ul className="nav navbar-nav">
                            <li className="nav-item">
                                <a href="/" className="nav-link">Add Shoe</a>
                            </li>
                            <li className="nav-item">
                                <a href="/addTravel" className="nav-link">Add Travel</a>
                            </li>
                            <li className="nav-item">
                                <a href="/displayShoe" className="nav-link">Display Shoe</a>
                            </li>
                        </ul>
                    </div>
                </nav>
            <BrowserRouter>
                <Switch>
                    <Route exact path="/">
                        <CreateShoe createShoe={this.createShoe} />
                    </Route>
                    <Route path="/addTravel">
                        <AddTravel qrcode={this.state.selectedQRCode} shoeDetails={this.state.shoeDetails} addTravel={this.addTravel} />
                    </Route>
                    <Route path="/displayShoe">
                        <DisplayShoe qrcode={this.state.selectedQRCode} shoeDetails={this.state.shoeDetails} displayShoe={this.displayShoe}></DisplayShoe>
                    </Route>
                </Switch>
            </BrowserRouter>
            </div>
        );
    }
}
export default App;
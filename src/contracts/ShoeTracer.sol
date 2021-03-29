//SPDX-License-Identifier:none
pragma solidity >=0.5.16;
pragma experimental ABIEncoderV2;
contract ShoeTracer {
    struct travel {
        string location;
        uint timestamp;
    }
    struct shoe {
        string modelNo;
        string modelName;        
        uint quantity;
        string color;
        uint price;   
        string manufactuedBy;     
        travel[] travelHistory;
    }

    string[] public qrcodes;
    uint public qrcodesCount;
        
    event createdShoe();
    event addedTravel();

    mapping(string => shoe) selectedShoe;    

    function createShoe(string memory _modelNo,string memory _modelName,uint _quantity,string memory _color,uint _price,string memory _manufacturedBy,string memory _location,uint _timestamp,string memory _qrCode) public {
        selectedShoe[_qrCode].modelNo = _modelNo;
        selectedShoe[_qrCode].modelName = _modelName;        
        selectedShoe[_qrCode].quantity = _quantity; 
        selectedShoe[_qrCode].color = _color;
        selectedShoe[_qrCode].price = _price;
        selectedShoe[_qrCode].manufactuedBy = _manufacturedBy;
        selectedShoe[_qrCode].travelHistory.push(travel(_location,_timestamp));  
        qrcodes.push(_qrCode);
        qrcodesCount++;
    }
    function addTravel(string memory _location,uint _timestamp,string memory _qrCode) public { 
        require(selectedShoe[_qrCode].quantity != 0);       
        selectedShoe[_qrCode].travelHistory.push(travel(_location,_timestamp));
    }
    function listShoe(string memory _qrCode) public view returns(shoe memory){
        return selectedShoe[_qrCode];
    }    
}

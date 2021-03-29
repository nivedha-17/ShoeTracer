const _deploy_contracts = require("../migrations/2_deploy_contracts");
const ShoeTracer = artifacts.require("ShoeTracer");
contract('ShoeTracer',(accounts) => {
    let [U,V,W] = (accounts);
    let shoeTracerInstance;
    before(async() => {
        shoeTracerInstance = await ShoeTracer.deployed()
    }) 
    describe('deployment',async() => {
        it('deployed successfully',async() => {
            const address = await shoeTracerInstance.address
            assert.notEqual(address,0x0)
            assert.notEqual(address,'')
            assert.notEqual(address,null)
            assert.notEqual(address,undefined)
        })
    })
    it('should be able to create shoe for a qrCode',async() => {
        const result = await shoeTracerInstance.createShoe(
            "123ABC",
            "Nike SuperV",
            "Nike",
             200,
            "yellow",
            "London",
            "20/03/2021",
            "Q2W3E4R",
            {from:U}
        );
        assert.equal(result.receipt.status,true);
    })
    it('should be able to add travel for a qrCode',async() => {
        await shoeTracerInstance.createShoe(
            "123ABC",
            "Nike SuperV",
            "Nike",
             200,
            "yellow",
            "London",
            "20/03/2021",
            "Q2W3E4R",
            {from:U}
        );
        const result = await shoeTracerInstance.createTravel(
            "India",
            "23/03/2021",
            "Q2W3E4R",
            {from:U}
        );
        assert.equal(result.receipt.status,true);
    })
}) 
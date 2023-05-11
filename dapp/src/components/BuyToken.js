import ContractAbi from "../erc20abi.json";
import Web3 from "web3";
import { useState } from "react";
const BuyToken = () => {

    let myContract;
    let provider = window.ethereum;
    let ContractAddress = '0xcF14dcc303Be52bae02bD3303618a56FeEd5Cb4f';
    const web3 = new Web3(provider);
    const networkId = web3.eth.net.getId();
    myContract = new web3.eth.Contract(ContractAbi, ContractAddress);
    console.log(myContract);
    console.log(networkId)


    const [amount, setAmount] = useState();
    const [tokens, setTokens] = useState();
    const HandleBuyToken = async () => {
        let bought = await myContract.methods.buyTokens(amount).send({ from: window.ethereum.selectedAddress, value: web3.utils.toWei('0.00001', 'ether') });
        setTokens(bought);
    }

    return (
        <div className="Buy Token">
            <div className="accordion accordion-flush" id="accordionFlushExample">
                <div className="accordion-item">
                    <h2 className="accordion-header" id="flush-headingOne">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                            Buy Token
                        </button>
                    </h2>
                    <div id="flush-collapseOne" className="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                        <div className="accordion-body">
                            <div className="newFeeParameters">
                                <h5 className="card-header">buyToken</h5>
                                <div className="card-body">
                                    <p className="card-text">{tokens}</p>
                                    <br /><input type="text" placeholder="_amount" onChange={e => setAmount(e.target.value)} />
                                    <br /><button style={{ marginTop: "5px" }} onClick={HandleBuyToken}>Query</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BuyToken;
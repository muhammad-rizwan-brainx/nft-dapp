import Web3 from "web3";
import { useState } from "react";
import ContractAbi from "../abi.json";

const MinNft = () => {

	let myContract;
	let provider = window.ethereum;
	let ContractAddress = '0x2AaF10bC0Fe5F89f53B955bbACE9F58f4B7361Db';
	const web3 = new Web3(provider);
	const networkId = web3.eth.net.getId();
	myContract = new web3.eth.Contract(ContractAbi, ContractAddress);
	console.log(myContract);
	console.log(networkId)


	const [mintAddress, setmintAddress] = useState();
	const [mintNFT, setMintNFT] = useState();

	const HandleHammerMint = async () => {
		let _mintToken = await myContract.methods.mintHammer(mintAddress).send({ from: window.ethereum.selectedAddress });
		setMintNFT(_mintToken.transactionHash);
		console.log(_mintToken);
	}


	const HandleOpenApesMint = async () => {
		let _mintToken = await myContract.methods.mintOpenApes(mintAddress).send({ from: window.ethereum.selectedAddress });
		setMintNFT(_mintToken.transactionHash);
		console.log(_mintToken);
	}

	return (
		<div className="Mint NFT">
			<div className="accordion accordion-flush" id="accordionFlushExample">
				<div className="accordion-item">
					<h2 className="accordion-header" id="flush-headingOne">
						<button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
							Mint Hammer
						</button>
					</h2>
					<div id="flush-collapseOne" className="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
						<div className="accordion-body">
							<div className="newFeeParameters">
								<h5 className="card-header">mintHammer</h5>
								<div className="card-body">
									<p className="card-text">{mintNFT}</p>
									<br /><input type="text" placeholder="_amount" onChange={e => setmintAddress(e.target.value)} />
									<br /><button style={{ marginTop: "5px" }} onClick={HandleHammerMint}>Query</button>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="accordion-item">
					<h2 className="accordion-header" id="flush-headingTwo">
						<button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
							Mint Open Apes
						</button>
					</h2>
					<div id="flush-collapseTwo" className="accordion-collapse collapse" aria-labelledby="flush-headingTwo" data-bs-parent="#accordionFlushExample">
						<div className="accordion-body">
							<div className="newFeeParameters">
								<h5 className="card-header">mintOpenApes</h5>
								<div className="card-body">
									<p className="card-text">{mintNFT}</p>
									<br /><input type="text" placeholder="_amount" onChange={e => setmintAddress(e.target.value)} />
									<br /><button style={{ marginTop: "5px" }} onClick={HandleOpenApesMint}>Query</button>
								</div>
							</div>
						</div>
					</div>
				</div>

			</div>
		</div>
	);
}

export default MinNft;
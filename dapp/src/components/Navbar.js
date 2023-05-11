import React, { useState, useEffect } from 'react';
import {
    Link
} from "react-router-dom";
const Navbar = () => {

    const [address, setAddress] = useState('');

    const Handlewallet = () => {

        let provider = window.ethereum;
        if (typeof provider !== 'undefined') {
            provider
                .request({ method: 'eth_requestAccounts' })
                .then(accounts => {
                    setAddress(window.ethereum.selectedAddress)
                    console.log(`Selected account is ${address}`);
                })
                .catch((err) => {
                    console.log(err);
                    return;
                });

            window.ethereum.on('accountsChanged', function (accounts) {
                setAddress(window.ethereum.selectedAddress)
                console.log(`Selected account changed to ${address}`);
            });
        }
    }

    useEffect(() => {
        Handlewallet();
    });

    return (
        <div className="Navbar">
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid" style={{ color: "White" }} >
                    <h3 className="navbar-brand" >DAAP </h3>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className="nav-link active" style={{ marginTop: "15px" }} to="/" aria-current="page" >Buy Token </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/mint" style={{ color: "White", marginTop: "15px" }}>Mint NFT</Link>
                            </li>
                            <li className="nav-item">
                                <p className="nav-link" style={{ color: "White", marginTop: "15px" }} >{address}</p>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default Navbar;
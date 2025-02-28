import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";

function App() {
  const cryptos = [
    {
      name: "Bitcoin(BTC)",
      img: `${process.env.PUBLIC_URL}/images/bitcoin.png`,
      qr: `${process.env.PUBLIC_URL}/images/btc-qr.png`,
      address: "bc1qg3dmsr3j4smmc03v9h9m442n6wzmm72zgggdd0",
    },
    {
      name: "Ethereum(ETH)",
      img: `${process.env.PUBLIC_URL}/images/ethereum.png`,
      qr: `${process.env.PUBLIC_URL}/images/eth-qr.png`,
      address: "0x6582399Fd1D1e7C6a1E51c04665281Bdb0686DFb",
    },
    {
      name: "USDT(TRX)",
      img: `${process.env.PUBLIC_URL}/images/usdt.png`,
      qr: `${process.env.PUBLIC_URL}/images/usdt-qr.png`,
      address: "TCCzVDqMJoqmgdbX71F1KBDPLKj4WC8e3y",
    },
    {
      name: "Litecoin(LTC)",
      img: `${process.env.PUBLIC_URL}/images/ltc.png`,
      qr: `${process.env.PUBLIC_URL}/images/ltc-qr.png`,
      address: "ltc1qtpwtu5ww2yz2plv2ecczqz2cnx5ds6z27mq84l",
    },
  ];

  const [selectedCrypto, setSelectedCrypto] = useState(cryptos[0]);
  const [activeTab, setActiveTab] = useState("scan");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [copyAlert, setCopyAlert] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30 * 60); // 30 dakika (saniye cinsinden)
  const [expired, setExpired] = useState(false);

  // Geri sayım fonksiyonu
  useEffect(() => {
    if (timeLeft <= 0) {
      setExpired(true);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const handleCryptoChange = (crypto) => {
    setSelectedCrypto(crypto);
    setIsDropdownOpen(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(selectedCrypto.address).then(() => {
      setCopyAlert(true);
      setTimeout(() => setCopyAlert(false), 2000);
    });
  };

  return (
    <div className="page-ctr">
      <div className="card">
        <div className="card-header p-0 d-flex justify-content-center align-items-center flex-column">
          <a href="#" className="p-2">
            <img
              src={`${process.env.PUBLIC_URL}/images/logo.png`}
              alt="Logo"
              className="ch-logo"
            />
          </a>
          <div className="ch-sc w-100 p-2 d-flex flex-row justify-content-between align-items-center">
            <p className="m-0 pwith">Pay With</p>
            <div className={`dropdown ${isDropdownOpen ? "open" : ""}`}>
              <div className="caption" onClick={toggleDropdown}>
                <img src={selectedCrypto.img} alt={selectedCrypto.name} />
                <span>{selectedCrypto.name}</span>
              </div>
              <div className="list">
                {cryptos.map((crypto) => (
                  <div
                    key={crypto.name}
                    className={`item ${
                      selectedCrypto.name === crypto.name ? "selected" : ""
                    }`}
                    onClick={() => handleCryptoChange(crypto)}
                  >
                    <img src={crypto.img} alt={crypto.name} />
                    <span>{crypto.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="card-ftr">
          <ul className="nav nav-tabs" id="areaTab" role="tablist">
            <li className="nav-item" role="presentation">
              <button
                className={`nav-link ${activeTab === "scan" ? "active" : ""}`}
                onClick={() => setActiveTab("scan")}
              >
                Scan
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className={`nav-link ${activeTab === "copy" ? "active" : ""}`}
                onClick={() => setActiveTab("copy")}
              >
                Copy
              </button>
            </li>
          </ul>

          <div className="tab-content">
            {activeTab === "scan" && (
              <div className="tab-pane active" id="scan" role="tabpanel">
                <div className="scan-img act">
                  <img src={selectedCrypto.qr} alt="QR Code" />
                </div>
              </div>
            )}
            {activeTab === "copy" && (
              <div className="tab-pane active" id="copy" role="tabpanel">
                <div className="d-flex p-5 w-100 h-100 flex-column justify-content-center text-center align-items-center">
                  {copyAlert && (
                    <div className="alert alert-success copy-alert">
                      Address copied to clipboard!
                    </div>
                  )}
                  <p className="mb-5 tp-sc">
                    Click below to copy the wallet address.
                  </p>
                  <div className="tab-pane-address">
                    <div className="tpa-item">
                      <span className="tpa-title">ADDRESS</span>
                      <div className="tpa-in shadow p-3">
                        <input
                          type="text"
                          value={selectedCrypto.address}
                          readOnly
                          className="key-txt"
                        />
                        <span className="copy-icon" onClick={handleCopy}>
                          <img src={`${process.env.PUBLIC_URL}/images/icon.png`} alt="Copy Icon" />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        {/* Geri Sayım */}
        <div className="timer">
          {expired ? (
            <p className="expired-message">
              Payment time expired. Please refresh the page and try again.
            </p>
          ) : (
            <p className="timer-text">{formatTime(timeLeft)}</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;

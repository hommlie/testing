import React, { useState } from 'react';

const PaymentModal = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('UPI');
  const [selectedBank, setSelectedBank] = useState('State Bank of India');
  const [upiId, setUpiId] = useState('');
  const [showQR, setShowQR] = useState(false);
  const [creditCardInfo, setCreditCardInfo] = useState({
    number: '',
    name: '',
    expMonth: '',
    expYear: '',
    cvv: ''
  });

  const paymentMethods = [
    'UPI', 'Credit Card', 'Debit Card', 'Net Banking',
  ];

  const banks = [
    { name: 'State Bank of India', logo: 'sbi-logo.png' },
    { name: 'ICICI Bank', logo: 'icici-logo.png' },
    { name: 'HDFC Bank', logo: 'hdfc-logo.png' },
    { name: 'Axis Bank', logo: 'axis-logo.png' },
    { name: 'Kotak', logo: 'kotak-logo.png' },
    { name: 'Punjab National Bank', logo: 'pnb-logo.png' },
    { name: 'IDBI Bank', logo: 'idbi-logo.png' },
  ];

  if (!isOpen) return null;

  const renderTabContent = () => {
    switch (activeTab) {
      case 'UPI':
        return (
          <div>
            <h3 className="text-xl font-semibold mb-2">Pay with UPI</h3>
            {!showQR ? (
              <>
                <p className="mb-2">Virtual Payment Address <span className="text-blue-500 cursor-pointer">ⓘ</span></p>
                <input
                  type="text"
                  placeholder="Enter your Mobile Number or UPI ID"
                  className="w-full p-2 border border-gray-300 rounded-md mb-4"
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                />
                <div className="flex items-center justify-between mb-4">
                  <span>OR</span>
                  <button 
                    className="px-4 py-2 border rounded-md"
                    style={{borderColor: "#249370", color: "#249370"}}
                    onClick={() => setShowQR(true)}
                  >
                    Show QR Code
                  </button>
                </div>
              </>
            ) : (
              <div className="text-center">
                <img src="https://example.com/qr-code.png" alt="QR Code" className="mx-auto mb-4" />
                <button 
                  className="px-4 py-2 border rounded-md"
                  style={{borderColor: "#249370", color: "#249370"}}
                  onClick={() => setShowQR(false)}
                >
                  Enter UPI ID
                </button>
              </div>
            )}
          </div>
        );
      case 'Credit Card':
        return (
          <div>
            <h3 className="text-xl font-semibold mb-2">Pay with Credit Card</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-1">Credit Card Number</label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={creditCardInfo.number}
                  onChange={(e) => setCreditCardInfo({...creditCardInfo, number: e.target.value})}
                />
              </div>
              <div>
                <label className="block mb-1">Name On Card</label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={creditCardInfo.name}
                  onChange={(e) => setCreditCardInfo({...creditCardInfo, name: e.target.value})}
                />
              </div>
              <div>
                <label className="block mb-1">Expiry Date</label>
                <div className="flex gap-2">
                  <select
                    className="w-1/2 p-2 border border-gray-300 rounded-md"
                    value={creditCardInfo.expMonth}
                    onChange={(e) => setCreditCardInfo({...creditCardInfo, expMonth: e.target.value})}
                  >
                    <option value="">Month</option>
                    {[...Array(12)].map((_, i) => (
                      <option key={i} value={i + 1}>{i + 1}</option>
                    ))}
                  </select>
                  <select
                    className="w-1/2 p-2 border border-gray-300 rounded-md"
                    value={creditCardInfo.expYear}
                    onChange={(e) => setCreditCardInfo({...creditCardInfo, expYear: e.target.value})}
                  >
                    <option value="">Year</option>
                    {[...Array(10)].map((_, i) => (
                      <option key={i} value={new Date().getFullYear() + i}>{new Date().getFullYear() + i}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="block mb-1">CVV <span className="text-blue-500 cursor-pointer">ⓘ</span></label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={creditCardInfo.cvv}
                  onChange={(e) => setCreditCardInfo({...creditCardInfo, cvv: e.target.value})}
                />
              </div>
            </div>
          </div>
        );
      case 'Debit Card':
        return (
            <div>
              <h3 className="text-xl font-semibold mb-2">Pay with Debit Card</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1">Debit Card Number</label>
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    value={creditCardInfo.number}
                    onChange={(e) => setCreditCardInfo({...creditCardInfo, number: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block mb-1">Name On Card</label>
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    value={creditCardInfo.name}
                    onChange={(e) => setCreditCardInfo({...creditCardInfo, name: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block mb-1">Expiry Date</label>
                  <div className="flex gap-2">
                    <select
                      className="w-1/2 p-2 border border-gray-300 rounded-md"
                      value={creditCardInfo.expMonth}
                      onChange={(e) => setCreditCardInfo({...creditCardInfo, expMonth: e.target.value})}
                    >
                      <option value="">Month</option>
                      {[...Array(12)].map((_, i) => (
                        <option key={i} value={i + 1}>{i + 1}</option>
                      ))}
                    </select>
                    <select
                      className="w-1/2 p-2 border border-gray-300 rounded-md"
                      value={creditCardInfo.expYear}
                      onChange={(e) => setCreditCardInfo({...creditCardInfo, expYear: e.target.value})}
                    >
                      <option value="">Year</option>
                      {[...Array(10)].map((_, i) => (
                        <option key={i} value={new Date().getFullYear() + i}>{new Date().getFullYear() + i}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block mb-1">CVV <span className="text-blue-500 cursor-pointer">ⓘ</span></label>
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    value={creditCardInfo.cvv}
                    onChange={(e) => setCreditCardInfo({...creditCardInfo, cvv: e.target.value})}
                  />
                </div>
              </div>
            </div>
          );  
      case 'Net Banking':
        return (
          <div>
            <h3 className="text-xl font-semibold mb-2">Pay with Net Banking</h3>
            <p className="text-green-600 mb-4">Avail Easy EMI using HDFC Netbanking Option</p>
            <div className="grid grid-cols-3 gap-4 mb-6">
              {banks.map((bank, index) => (
                <label 
                  key={index}
                  className={`p-2 border rounded-md flex items-center cursor-pointer ${selectedBank === bank.name ? 'border-blue-500' : 'border-gray-300'}`}
                >
                  <input
                    type="radio"
                    name="bank"
                    value={bank.name}
                    checked={selectedBank === bank.name}
                    onChange={() => setSelectedBank(bank.name)}
                    className="mr-2"
                  />
                  <img src={bank.logo} alt={bank.name} className="w-full h-auto" />
                </label>
              ))}
            </div>
            <div className="mb-6">
              <select className="w-full p-2 border border-gray-300 rounded-md">
                <option>Select Your Bank</option>
                {banks.map((bank, index) => (
                  <option key={index} value={bank.name}>{bank.name}</option>
                ))}
              </select>
            </div>
          </div>
        );
      default:
        return <div>Content for {activeTab}</div>;
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50">
      <div className="fixed inset-0 opacity-60" style={{ backgroundColor: "black" }} onClick={onClose}></div>
      <div className="flex flex-row bg-white rounded-xl shadow-lg max-w-5xl mx-auto relative overflow-hidden">
        {/* Left sidebar */}
        <div className="w-1/4 p-4" style={{backgroundColor: "#F8FAFC"}}>
          <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
          <ul>
            {paymentMethods.map((method, index) => (
              <li 
                key={index} 
                className={`py-2 px-4 cursor-pointer ${method === activeTab ? 'bg-white' : ''}`}
                style={{borderLeft: `${method === activeTab ? '4px solid #249370' : ''}`}}
                onClick={() => setActiveTab(method)}
              >
                {method}
              </li>
            ))}
          </ul>
        </div>

        {/* Main content */}
        <div className="w-3/4 p-6">
          {renderTabContent()}
          
          <button className="w-full text-white py-3 rounded-md font-semibold mt-6" style={{backgroundColor: "#249370"}}>
            Pay Now ₹5,608
          </button>
          
          <p className="text-xs mt-4 text-gray-600">
            By clicking on Pay Now, you are agreeing to our Terms & Conditions, Privacy policy, User Agreement and Covid-19 Guidelines.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;
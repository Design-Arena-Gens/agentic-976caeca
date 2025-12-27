'use client';

import { useState } from 'react';
import { Phone, Copy, CheckCircle } from 'lucide-react';
import { translations, indianLanguages, type LanguageCode } from '@/lib/translations';

export default function Home() {
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageCode>('english');
  const [customerName, setCustomerName] = useState('');
  const [orderNumber, setOrderNumber] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [orderItems, setOrderItems] = useState('');
  const [totalAmount, setTotalAmount] = useState('');
  const [callScript, setCallScript] = useState('');
  const [copied, setCopied] = useState(false);

  const t = translations[selectedLanguage];
  const companyName = 'E-Commerce Store';

  const generateCallScript = () => {
    const script = `
${t.greeting.replace('{name}', customerName).replace('{company}', companyName)}

${t.orderConfirmation.replace('{orderNumber}', orderNumber)}

${t.orderItems}: ${orderItems}

${t.deliveryConfirmation.replace('{address}', deliveryAddress)}

${t.paymentConfirmation.replace('{amount}', totalAmount)}

${t.thankYou}
    `.trim();

    setCallScript(script);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(callScript);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 md:p-8 text-white">
            <div className="flex items-center gap-3 mb-2">
              <Phone className="w-8 h-8" />
              <h1 className="text-2xl md:text-4xl font-bold">{t.title}</h1>
            </div>
            <p className="text-blue-100 text-sm md:text-base">{t.subtitle}</p>
          </div>

          <div className="p-6 md:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Column - Form */}
              <div className="space-y-6">
                {/* Language Selector */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {t.selectLanguage}
                  </label>
                  <select
                    value={selectedLanguage}
                    onChange={(e) => setSelectedLanguage(e.target.value as LanguageCode)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:outline-none transition-colors bg-white"
                  >
                    {Object.entries(indianLanguages).map(([code, { name, nativeName }]) => (
                      <option key={code} value={code}>
                        {name} ({nativeName})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Order Details */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h2 className="text-lg font-semibold text-gray-800 mb-4">{t.orderDetails}</h2>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {t.customerName}
                      </label>
                      <input
                        type="text"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        placeholder={t.namePlaceholder}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {t.orderNumber}
                      </label>
                      <input
                        type="text"
                        value={orderNumber}
                        onChange={(e) => setOrderNumber(e.target.value)}
                        placeholder={t.orderNumberPlaceholder}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {t.phoneNumber}
                      </label>
                      <input
                        type="tel"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder={t.phonePlaceholder}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {t.deliveryAddress}
                      </label>
                      <textarea
                        value={deliveryAddress}
                        onChange={(e) => setDeliveryAddress(e.target.value)}
                        placeholder={t.addressPlaceholder}
                        rows={2}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none resize-none"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {t.orderItems}
                      </label>
                      <input
                        type="text"
                        value={orderItems}
                        onChange={(e) => setOrderItems(e.target.value)}
                        placeholder={t.itemsPlaceholder}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {t.totalAmount}
                      </label>
                      <input
                        type="text"
                        value={totalAmount}
                        onChange={(e) => setTotalAmount(e.target.value)}
                        placeholder="1299"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                <button
                  onClick={generateCallScript}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                >
                  <Phone className="w-5 h-5" />
                  {t.generateScript}
                </button>
              </div>

              {/* Right Column - Call Script */}
              <div className="space-y-4">
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-lg border-2 border-gray-200 min-h-[400px] relative">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-gray-800">{t.callScript}</h2>
                    {callScript && (
                      <button
                        onClick={copyToClipboard}
                        className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                        title="Copy to clipboard"
                      >
                        {copied ? (
                          <>
                            <CheckCircle className="w-4 h-4 text-green-600" />
                            <span className="text-sm text-green-600">Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-4 h-4 text-gray-600" />
                            <span className="text-sm text-gray-600">Copy</span>
                          </>
                        )}
                      </button>
                    )}
                  </div>

                  {callScript ? (
                    <div className="bg-white p-4 rounded-lg border border-gray-300 whitespace-pre-wrap text-gray-800 font-medium leading-relaxed">
                      {callScript}
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-400 text-center">
                      <div>
                        <Phone className="w-12 h-12 mx-auto mb-2 opacity-50" />
                        <p>Fill in the order details and click generate to create your call script</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Language Info */}
                <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-200">
                  <h3 className="font-semibold text-indigo-900 mb-2">Supported Languages</h3>
                  <div className="grid grid-cols-2 gap-2 text-sm text-indigo-700">
                    {Object.entries(indianLanguages).map(([code, { name, nativeName }]) => (
                      <div key={code} className="flex items-center gap-1">
                        <span className="text-indigo-400">•</span>
                        <span>{nativeName}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-600 text-sm">
          <p>Supporting 13 major Indian languages across all states</p>
        </div>
      </div>
    </main>
  );
}

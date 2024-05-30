//@ts-nocheck
"use client";
import React, { useState, useEffect } from "react";

const MortgageCalculator = () => {
  const [formValues, setFormValues] = useState({
    askingPrice: "",
    downpayment: "",
    downpaymentPercentage: "",
    interestRate: "",
    mortgageTerm: "",
    amortizationTerm: "",
    firstTimeHomeBuyer: "yes",
    frequency: "Weekly",
  });

  const [results, setResults] = useState(null);

  const updateDownpaymentPercentage = () => {
    const askingPrice = parseFloat(formValues.askingPrice);
    const downpayment = parseFloat(formValues.downpayment);
    const downpaymentPercentage = (downpayment / askingPrice) * 100;

    setFormValues((previousState) => {
      return { ...previousState, downpaymentPercentage };
    });
  };

  const updateDownpaymentAmount = () => {
    const askingPrice = parseFloat(formValues.askingPrice);
    const downpaymentPercentage = parseFloat(formValues.downpaymentPercentage);
    const downpayment = (downpaymentPercentage / 100) * askingPrice;
    setFormValues((previousState) => {
      return { ...previousState, downpayment };
    });
  };

  useEffect(() => {
    if (formValues.downpayment) {
      updateDownpaymentPercentage();
    } else if (formValues.downpaymentPercentage) {
      updateDownpaymentAmount();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formValues.downpayment, formValues.downpaymentPercentage]);

  const handleChange = (e) => {
    setFormValues(
      Object.assign({}, formValues, { [e.target.id]: e.target.value })
    );
  };

  const calculateCMHCInsurancePremium = (
    mortgageAmount,
    purchasePrice,
    amortizationPeriod
  ) => {
    const ltvRatio = (mortgageAmount / purchasePrice) * 100;
    let premiumRate;

    if (amortizationPeriod <= 25) {
      if (ltvRatio <= 80) {
        return 0;
      } else if (ltvRatio <= 85) {
        premiumRate = 0.01;
      } else if (ltvRatio <= 90) {
        premiumRate = 0.0175;
      } else {
        premiumRate = 0.02;
      }
    } else {
      if (ltvRatio <= 80) {
        return 0;
      } else if (ltvRatio <= 85) {
        premiumRate = 0.0125;
      } else if (ltvRatio <= 90) {
        premiumRate = 0.02;
      } else {
        premiumRate = 0.0225;
      }
    }

    return mortgageAmount * premiumRate;
  };

  const calculateMortgage = () => {
    const askingPrice = parseFloat(formValues.askingPrice);
    let downpayment = parseFloat(formValues.downpayment);
    let downpaymentPercentage = parseFloat(formValues.downpaymentPercentage);
    const annualRate = parseFloat(formValues.interestRate) / 100;
    const mortgageTerm = parseInt(formValues.mortgageTerm);
    const amortizationTerm = parseInt(formValues.amortizationTerm);
    const firstTimeHomeBuyer = formValues.firstTimeHomeBuyer;
    const frequency = formValues.frequency;

    if (
      !isNaN(downpayment) &&
      downpayment > 0 &&
      isNaN(downpaymentPercentage)
    ) {
      downpaymentPercentage = (downpayment / askingPrice) * 100;
      setFormValues({
        ...formValues,
        downpaymentPercentage: downpaymentPercentage.toFixed(2),
      });
    } else if (
      !isNaN(downpaymentPercentage) &&
      downpaymentPercentage > 0 &&
      isNaN(downpayment)
    ) {
      downpayment = (downpaymentPercentage / 100) * askingPrice;
      setFormValues({
        ...formValues,
        downpayment: downpayment.toFixed(2),
      });
    }

    const cmhcPremium = calculateCMHCInsurancePremium(
      askingPrice - downpayment,
      askingPrice,
      amortizationTerm
    );
    const amountFinanced = askingPrice - downpayment + cmhcPremium;
    const periodsPerYear = {
      Weekly: 52,
      "Bi-weekly": 26,
      Monthly: 12,
      "Accelerated Weekly": 52,
      "Accelerated Bi-weekly": 26,
    };
    const totalPayments = periodsPerYear[frequency] * amortizationTerm;
    const ratePerPeriod = annualRate / periodsPerYear[frequency];

    const payment =
      (amountFinanced * ratePerPeriod) /
      (1 - Math.pow(1 + ratePerPeriod, -totalPayments));

    let schedule = [];
    let balance = amountFinanced;
    let totalInterestPaid = 0;

    for (let i = 1; i <= totalPayments; i++) {
      const interestPayment = balance * ratePerPeriod;
      const principalPayment = payment - interestPayment;
      balance -= principalPayment;
      totalInterestPaid += interestPayment;
      schedule.push({
        paymentNumber: i,
        totalPayment: payment,
        principalPaid: principalPayment,
        interestPaid: interestPayment,
        remainingBalance: balance,
      });
    }

    const principalPaidAtTerm = schedule
      .filter(
        (payment) =>
          payment.paymentNumber <= periodsPerYear[frequency] * mortgageTerm
      )
      .reduce((sum, payment) => sum + payment.principalPaid, 0);

    const balanceAtTerm =
      schedule.find(
        (payment) =>
          payment.paymentNumber === periodsPerYear[frequency] * mortgageTerm
      )?.remainingBalance || 0;

    setResults({
      downpayment,
      downpaymentPercentage,
      cmhcPremium,
      amountFinanced,
      payment,
      principalPaidAtTerm,
      balanceAtTerm,
      totalInterestPaid,
      schedule,
    });
  };

  return (
    <div className="!max-w-[44rem] bg-white shadow-lg mx-auto p-4 my-10">
      <h1 className="text-2xl font-bold mb-4">
        Mortgage Amortization Calculator
      </h1>
      <form className="space-y-4">
        <div>
          <label htmlFor="askingPrice" className="block mb-2 font-semibold">
            Asking Price:
          </label>
          <input
            type="number"
            id="askingPrice"
            value={formValues.askingPrice}
            onChange={handleChange}
            className="border border-gray-300 p-2 w-full rounded"
            required
          />
        </div>
        <div>
          <label htmlFor="downpayment" className="block mb-2 font-semibold">
            Downpayment:
          </label>
          <input
            type="number"
            id="downpayment"
            value={formValues.downpayment}
            onChange={handleChange}
            className="border border-gray-300 p-2 w-full rounded"
          />
        </div>
        <div>
          <label
            htmlFor="downpaymentPercentage"
            className="block mb-2 font-semibold"
          >
            Downpayment Percentage:
          </label>
          <input
            type="number"
            id="downpaymentPercentage"
            value={formValues.downpaymentPercentage}
            onChange={handleChange}
            className="border border-gray-300 p-2 w-full rounded"
            required
          />
        </div>
        <div>
          <label htmlFor="interestRate" className="block mb-2 font-semibold">
            Interest Rate (Annual %):
          </label>
          <input
            type="number"
            id="interestRate"
            value={formValues.interestRate}
            onChange={handleChange}
            className="border border-gray-300 p-2 w-full rounded"
            required
          />
        </div>
        <div>
          <label htmlFor="mortgageTerm" className="block mb-2 font-semibold">
            Mortgage Term (years):
          </label>
          <input
            type="number"
            id="mortgageTerm"
            value={formValues.mortgageTerm}
            onChange={handleChange}
            className="border border-gray-300 p-2 w-full rounded"
            required
          />
        </div>
        <div>
          <label
            htmlFor="amortizationTerm"
            className="block mb-2 font-semibold"
          >
            Amortization Term (years):
          </label>
          <input
            type="number"
            id="amortizationTerm"
            value={formValues.amortizationTerm}
            onChange={handleChange}
            className="border border-gray-300 p-2 w-full rounded"
            required
          />
        </div>
        <div>
          <label
            htmlFor="firstTimeHomeBuyer"
            className="block mb-2 font-semibold"
          >
            First Time Home Buyer:
          </label>
          <select
            id="firstTimeHomeBuyer"
            value={formValues.firstTimeHomeBuyer}
            onChange={handleChange}
            className="border border-gray-300 p-2 w-full rounded"
          >
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
        <div>
          <label htmlFor="frequency" className="block mb-2 font-semibold">
            Payment Frequency:
          </label>
          <select
            id="frequency"
            value={formValues.frequency}
            onChange={handleChange}
            className="border border-gray-300 p-2 w-full rounded"
          >
            <option value="Weekly">Weekly (52 payments/year)</option>
            <option value="Bi-weekly">Bi-weekly (26 payments/year)</option>
            <option value="Monthly">Monthly (12 payments/year)</option>
            <option value="Accelerated Weekly">
              Accelerated Weekly (52 payments/year)
            </option>
            <option value="Accelerated Bi-weekly">
              Accelerated Bi-weekly (26 payments/year)
            </option>
          </select>
        </div>
        <button
          type="button"
          onClick={calculateMortgage}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Calculate
        </button>
      </form>

      <h2 className="text-xl font-bold mt-8">Results</h2>
      <div id="results" className="mt-4">
        {results && (
          <div>
            <p>Downpayment: ${results.downpayment.toFixed(2)}</p>
            <p>
              Financed Amount (including CMHC): $
              {results.amountFinanced.toFixed(2)}
            </p>
            <p>Each Payment: ${results.payment.toFixed(2)}</p>
            <p>
              Principal Paid at Term: ${results.principalPaidAtTerm.toFixed(2)}
            </p>
            <p>Balance at Term: ${results.balanceAtTerm.toFixed(2)}</p>
            <p>
              Interest Paid at Amortization Period: $
              {results.totalInterestPaid.toFixed(2)}
            </p>
            <h3 className="text-lg font-semibold mt-4">
              Amortization Payment Schedule:
            </h3>
            <table className="border-collapse border border-gray-500 w-full mt-2">
              <thead>
                <tr>
                  <th className="border border-gray-500 px-2 py-1">
                    Payment Number
                  </th>
                  <th className="border border-gray-500 px-2 py-1">
                    Total Payment
                  </th>
                  <th className="border border-gray-500 px-2 py-1">
                    Principal Paid
                  </th>
                  <th className="border border-gray-500 px-2 py-1">
                    Interest Paid
                  </th>
                  <th className="border border-gray-500 px-2 py-1">
                    Remaining Balance
                  </th>
                </tr>
              </thead>
              <tbody>
                {results.schedule.map((payment) => (
                  <tr key={payment.paymentNumber}>
                    <td className="border border-gray-500 px-2 py-1 text-center">
                      {payment.paymentNumber}
                    </td>
                    <td className="border border-gray-500 px-2 py-1 text-right">
                      {payment.totalPayment.toFixed(2)}
                    </td>
                    <td className="border border-gray-500 px-2 py-1 text-right">
                      {payment.principalPaid.toFixed(2)}
                    </td>
                    <td className="border border-gray-500 px-2 py-1 text-right">
                      {payment.interestPaid.toFixed(2)}
                    </td>
                    <td className="border border-gray-500 px-2 py-1 text-right">
                      {payment.remainingBalance.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default MortgageCalculator;

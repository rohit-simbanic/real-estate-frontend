//@ts-nocheck
"use client";
import React, { useState } from "react";

const MortgagePaymentCalculator = () => {
  const [formValues, setFormValues] = useState({
    mortgageAmount: "",
    interestRate: "",
    amortizationTerm: "",
    frequency: "weekly",
  });

  const [results, setResults] = useState({
    mortgagePayment: null,
    totalInterest: null,
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormValues({
      ...formValues,
      [id]: value,
    });
  };

  const mortgagePaymentCalculator = (
    mortgageAmount: number,
    interestRate: number,
    amortizationTerm: number,
    frequency: string
  ) => {
    let annualInterestRate = interestRate / 100;
    let paymentsPerYear;

    switch (frequency) {
      case "weekly":
        paymentsPerYear = 52;
        break;
      case "bi-weekly":
        paymentsPerYear = 26;
        break;
      case "monthly":
        paymentsPerYear = 12;
        break;
      case "accelerated weekly":
        paymentsPerYear = 52;
        break;
      case "accelerated bi-weekly":
        paymentsPerYear = 26;
        break;
      default:
        throw new Error("Invalid payment frequency.");
    }

    let totalPayments = amortizationTerm * paymentsPerYear;
    let periodicInterestRate = annualInterestRate / paymentsPerYear;
    let mortgagePayment;

    if (periodicInterestRate > 0) {
      mortgagePayment =
        (mortgageAmount *
          (periodicInterestRate *
            Math.pow(1 + periodicInterestRate, totalPayments))) /
        (Math.pow(1 + periodicInterestRate, totalPayments) - 1);
    } else {
      mortgagePayment = mortgageAmount / totalPayments;
    }

    let totalPaid = mortgagePayment * totalPayments;
    let totalInterest = totalPaid - mortgageAmount;

    return { mortgagePayment, totalInterest };
  };

  const calculateMortgage = () => {
    let mortgageAmount = parseFloat(formValues.mortgageAmount);
    let interestRate = parseFloat(formValues.interestRate);
    let amortizationTerm = parseInt(formValues.amortizationTerm);
    let frequency = formValues.frequency;

    let result = mortgagePaymentCalculator(
      mortgageAmount,
      interestRate,
      amortizationTerm,
      frequency
    );

    setResults({
      mortgagePayment: result.mortgagePayment,
      totalInterest: result.totalInterest,
    });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Mortgage Payment Calculator</h1>
      <form className="space-y-4">
        <div>
          <label htmlFor="mortgageAmount" className="block">
            Mortgage Amount ($):
          </label>
          <input
            type="number"
            id="mortgageAmount"
            value={formValues.mortgageAmount}
            onChange={handleChange}
            className="border p-2 w-full"
            required
          />
        </div>
        <div>
          <label htmlFor="interestRate" className="block">
            Interest Rate (%):
          </label>
          <input
            type="number"
            step="0.01"
            id="interestRate"
            value={formValues.interestRate}
            onChange={handleChange}
            className="border p-2 w-full"
            required
          />
        </div>
        <div>
          <label htmlFor="amortizationTerm" className="block">
            Amortization Term (years):
          </label>
          <input
            type="number"
            id="amortizationTerm"
            value={formValues.amortizationTerm}
            onChange={handleChange}
            className="border p-2 w-full"
            required
          />
        </div>
        <div>
          <label htmlFor="frequency" className="block">
            Payment Frequency:
          </label>
          <select
            id="frequency"
            value={formValues.frequency}
            onChange={handleChange}
            className="border p-2 w-full"
            required
          >
            <option value="weekly">Weekly (52 payments/year)</option>
            <option value="bi-weekly">Bi-weekly (26 payments/year)</option>
            <option value="monthly">Monthly (12 payments/year)</option>
            <option value="accelerated weekly">
              Accelerated Weekly (52 payments/year)
            </option>
            <option value="accelerated bi-weekly">
              Accelerated Bi-weekly (26 payments/year)
            </option>
          </select>
        </div>
        <button
          type="button"
          onClick={calculateMortgage}
          className="bg-blue-500 text-white py-2 px-4 rounded"
        >
          Calculate
        </button>
      </form>

      <h2 className="text-xl font-bold mt-8">Results:</h2>
      <p id="payment-result">
        Your payment:{" "}
        {results.mortgagePayment !== null &&
          `$${results.mortgagePayment.toFixed(2)}`}
      </p>
      <p id="interest-result">
        Total interest:{" "}
        {results.totalInterest !== null &&
          `$${results.totalInterest.toFixed(2)}`}
      </p>
    </div>
  );
};

export default MortgagePaymentCalculator;

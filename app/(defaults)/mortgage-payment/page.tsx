//@ts-nocheck
"use client";
import React, { useState } from "react";

const MortgagePaymentCalculator = () => {
  const [formValues, setFormValues] = useState({
    mortgageAmount: "500000",
    interestRate: "6",
    amortizationTerm: "20",
    frequency: "weekly",
  });

  const [results, setResults] = useState({
    mortgagePayment: null,
    totalInterest: null,
  });

  const [errors, setErrors] = useState([]);

  const handleChange = (e) => {
    const { id, value } = e.target;

    let newErrors = { ...errors };
    if (value < 0 || value === "") {
      newErrors[id] = "Value must be at least 0.";
    } else if (id === "downpaymentPercentage" && value > 100) {
      newErrors[id] = "Downpayment percentage cannot exceed 100%.";
    } else if (
      id === "downpayment" &&
      parseFloat(value) > parseFloat(formValues.askingPrice)
    ) {
      newErrors[id] = "Downpayment amount cannot be greater than asking price";
    } else {
      delete newErrors[id];
    }
    setErrors(newErrors);

    setFormValues({
      ...formValues,
      [id]: value,
    });
  };

  const mortgagePaymentCalculator = (
    mortgageAmount,
    interestRate,
    amortizationTerm,
    frequency
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
    <div className="max-w-lg mx-auto p-8 bg-white shadow-lg rounded-lg my-10">
      <h1 className="text-3xl font-bold text-center mb-6">
        Mortgage Payment Calculator
      </h1>
      <form className="space-y-6">
        <div>
          <label
            htmlFor="mortgageAmount"
            className="block text-sm font-medium text-gray-700"
          >
            Mortgage Amount ($)
          </label>
          <input
            type="number"
            id="mortgageAmount"
            value={formValues.mortgageAmount}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
          {errors.mortgageAmount && (
            <p className="text-red-500">{errors.mortgageAmount}</p>
          )}
        </div>
        <div>
          <label
            htmlFor="interestRate"
            className="block text-sm font-medium text-gray-700"
          >
            Interest Rate (%)
          </label>
          <input
            type="number"
            step="0.01"
            id="interestRate"
            value={formValues.interestRate}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
          {errors.interestRate && (
            <p className="text-red-500">{errors.interestRate}</p>
          )}
        </div>
        <div>
          <label
            htmlFor="amortizationTerm"
            className="block text-sm font-medium text-gray-700"
          >
            Amortization Term (years)
          </label>
          <input
            type="number"
            id="amortizationTerm"
            value={formValues.amortizationTerm}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
          {errors.amortizationTerm && (
            <p className="text-red-500">{errors.amortizationTerm}</p>
          )}
        </div>
        <div>
          <label
            htmlFor="frequency"
            className="block text-sm font-medium text-gray-700"
          >
            Payment Frequency
          </label>
          <select
            id="frequency"
            value={formValues.frequency}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
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
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          disabled={Object.keys(errors).length > 0}
        >
          Calculate
        </button>
      </form>

      <h2 className="text-xl font-bold mt-8">Results:</h2>
      <p id="payment-result" className="mt-4">
        Your payment:{" "}
        {results.mortgagePayment !== null &&
          `$${results.mortgagePayment.toFixed(2)}`}
      </p>
      <p id="interest-result" className="mt-2">
        Total interest:{" "}
        {results.totalInterest !== null &&
          `$${results.totalInterest.toFixed(2)}`}
      </p>
    </div>
  );
};

export default MortgagePaymentCalculator;

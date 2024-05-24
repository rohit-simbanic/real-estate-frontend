//@ts-nocheck
"use client";
import React, { useState } from "react";

const LandTransferTaxCalculator = () => {
  const [formValues, setFormValues] = useState({
    askingPrice: "",
    firstTimeBuyer: false,
    location: "",
  });

  const [results, setResults] = useState(null);

  const handleChange = (e: {
    target: { name: any; value: any; type: any; checked: any };
  }) => {
    const { name, value, type, checked } = e.target;
    setFormValues({
      ...formValues,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const calculateOntarioTax = (askingPrice: number) => {
    let tax = 0;
    if (askingPrice > 2000000) {
      tax += (askingPrice - 2000000) * 0.025;
      askingPrice = 2000000;
    }
    if (askingPrice > 400000) {
      tax += (askingPrice - 400000) * 0.02;
      askingPrice = 400000;
    }
    if (askingPrice > 250000) {
      tax += (askingPrice - 250000) * 0.015;
      askingPrice = 250000;
    }
    if (askingPrice > 55000) {
      tax += (askingPrice - 55000) * 0.01;
      askingPrice = 55000;
    }
    if (askingPrice > 0) {
      tax += askingPrice * 0.005;
    }
    return tax;
  };

  const calculateBCTax = (askingPrice: number) => {
    if (askingPrice <= 200000) {
      return askingPrice * 0.01;
    } else if (askingPrice <= 2000000) {
      return askingPrice * 0.02;
    } else if (askingPrice <= 3000000) {
      return askingPrice * 0.03;
    } else {
      return askingPrice * 0.02;
    }
  };

  const calculateManitobaTax = (askingPrice: number) => {
    let tax = 0;
    if (askingPrice > 200000) {
      tax += (askingPrice - 200000) * 0.02;
      askingPrice = 200000;
    }
    if (askingPrice > 150000) {
      tax += (askingPrice - 150000) * 0.015;
      askingPrice = 150000;
    }
    if (askingPrice > 90000) {
      tax += (askingPrice - 90000) * 0.01;
      askingPrice = 90000;
    }
    if (askingPrice > 30000) {
      tax += (askingPrice - 30000) * 0.005;
    }
    tax += 70;
    return tax;
  };

  const calculateMontrealTax = (askingPrice: number) => {
    let tax = 0;
    if (askingPrice > 1034200) {
      tax += (askingPrice - 1034200) * 0.025;
      askingPrice = 1034200;
    }
    if (askingPrice > 517100) {
      tax += (askingPrice - 517100) * 0.02;
      askingPrice = 517100;
    }
    if (askingPrice > 258600) {
      tax += (askingPrice - 258600) * 0.015;
      askingPrice = 258600;
    }
    if (askingPrice > 51700) {
      tax += (askingPrice - 51700) * 0.01;
      askingPrice = 51700;
    }
    if (askingPrice > 0) {
      tax += askingPrice * 0.005;
    }
    return tax;
  };

  const calculateQuebecTax = (askingPrice: number) => {
    let tax = 0;
    if (askingPrice > 258600) {
      tax += (askingPrice - 258600) * 0.015;
      askingPrice = 258600;
    }
    if (askingPrice > 51700) {
      tax += (askingPrice - 51700) * 0.01;
      askingPrice = 51700;
    }
    if (askingPrice > 0) {
      tax += askingPrice * 0.005;
    }
    return tax;
  };

  const calculateNewBrunswickTax = (askingPrice: number) => askingPrice * 0.01;
  const calculatePEITax = (askingPrice: number) => askingPrice * 0.01;
  const calculateNFLLTax = (askingPrice: number) =>
    (askingPrice - 500) * 0.004 + 100;
  const calculateNorthwestTerritoriesTax = (askingPrice: number) => {
    if (askingPrice <= 1000000) {
      return Math.max(100, 1.5 * (askingPrice / 1000));
    } else {
      return 1500 + (askingPrice - 1000000) / 1000;
    }
  };
  const calculateNovaScotiaTax = (askingPrice: number) => askingPrice * 0.015;
  const calculateSaskatchewanTax = (askingPrice: number) =>
    "You may be required to pay title transfer fees.";

  const calculateRebate = (
    location: string,
    askingPrice: number,
    provincialTax: number,
    municipalTax: number
  ) => {
    let rebateReturn = 0;
    switch (location) {
      case "Ontario":
        if (askingPrice <= 368000) {
          rebateReturn = provincialTax + municipalTax;
        } else {
          rebateReturn = 4000;
        }
        break;
      case "British Columbia":
        if (askingPrice <= 500000) {
          rebateReturn = provincialTax + municipalTax;
        } else if (askingPrice <= 835000) {
          rebateReturn = 8000;
        } else if (askingPrice <= 860000) {
          rebateReturn = 8000 - (askingPrice - 835000) * 0.32;
        }
        break;
      case "Prince Edward Island":
        rebateReturn = provincialTax + municipalTax;
        break;
      default:
        return rebateReturn;
    }
    return rebateReturn;
  };

  const calculateTax = () => {
    const askingPrice = parseFloat(formValues.askingPrice);
    const firstTimeBuyer = formValues.firstTimeBuyer;
    const location = formValues.location;

    let provincialTax = 0;
    let municipalTax = 0;
    let notice = "";

    switch (location) {
      case "Ontario":
        provincialTax = calculateOntarioTax(askingPrice);
        break;
      case "Toronto":
        provincialTax = calculateOntarioTax(askingPrice);
        municipalTax = provincialTax;
        break;
      case "British Columbia":
        provincialTax = calculateBCTax(askingPrice);
        break;
      case "Manitoba":
        provincialTax = calculateManitobaTax(askingPrice);
        break;
      case "Montreal":
        municipalTax = calculateMontrealTax(askingPrice);
        break;
      case "Québec":
        municipalTax = calculateQuebecTax(askingPrice);
        break;
      case "New Brunswick":
        provincialTax = calculateNewBrunswickTax(askingPrice);
        break;
      case "Prince Edward Island":
        provincialTax = calculatePEITax(askingPrice);
        break;
      case "Newfoundland and Labrador":
        provincialTax = calculateNFLLTax(askingPrice);
        break;
      case "Northwest Territories":
        provincialTax = calculateNorthwestTerritoriesTax(askingPrice);
        break;
      case "Nova Scotia":
        municipalTax = calculateNovaScotiaTax(askingPrice);
        break;
      case "Nunavut":
        provincialTax = 0;
        break;
      case "Saskatchewan":
        notice = calculateSaskatchewanTax(askingPrice);
        break;
      case "Yukon":
        provincialTax = 0;
        break;
      default:
        alert("Please select a valid location.");
        return;
    }

    let rebateReturn = 0;
    if (firstTimeBuyer) {
      rebateReturn = calculateRebate(
        location,
        askingPrice,
        provincialTax,
        municipalTax
      );
    }

    const totalTransferTax = provincialTax + municipalTax - rebateReturn;

    setResults({
      totalTransferTax,
      provincialTax,
      municipalTax,
      rebateReturn,
      notice,
    });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Land Transfer Tax Calculator</h1>
      <form className="space-y-4">
        <div>
          <label htmlFor="askingPrice" className="block">
            Asking Price:
          </label>
          <input
            type="number"
            id="askingPrice"
            name="askingPrice"
            value={formValues.askingPrice}
            onChange={handleChange}
            className="border p-2 w-full"
            required
          />
        </div>
        <div>
          <label htmlFor="firstTimeBuyer" className="block">
            First-Time Buyer:
          </label>
          <input
            type="checkbox"
            id="firstTimeBuyer"
            name="firstTimeBuyer"
            checked={formValues.firstTimeBuyer}
            onChange={handleChange}
            className="border p-2"
          />
        </div>
        <div>
          <label htmlFor="location" className="block">
            Location:
          </label>
          <select
            id="location"
            name="location"
            value={formValues.location}
            onChange={handleChange}
            className="border p-2 w-full"
            required
          >
            <option value="" disabled>
              Select Location
            </option>
            <option value="Ontario">Ontario</option>
            <option value="Toronto">Toronto</option>
            <option value="British Columbia">British Columbia</option>
            <option value="Manitoba">Manitoba</option>
            <option value="Montreal">Montreal,Québec</option>
            <option value="Québec">Québec</option>
            <option value="New Brunswick">New Brunswick</option>
            <option value="Newfoundland and Labrador">
              Newfoundland and Labrador
            </option>
            <option value="Nova Scotia">Nova Scotia</option>
            <option value="Saskatchewan">Saskatchewan</option>
            <option value="Yukon">Yukon</option>
            <option value="Prince Edward Island">Prince Edward Island</option>
            <option value="Nunavut">Nunavut</option>
            <option value="Northwest Territories">Northwest Territories</option>
          </select>
        </div>
        <button
          type="button"
          onClick={calculateTax}
          className="bg-blue-500 text-white py-2 px-4 rounded"
        >
          Calculate
        </button>
      </form>

      {results && (
        <div id="results" className="mt-8">
          <h2 className="text-xl font-bold">Results</h2>
          <p>Total Transfer Tax: ${results.totalTransferTax.toFixed(2)}</p>
          <p>Provincial Tax: ${results.provincialTax.toFixed(2)}</p>
          <p>Municipal Tax: ${results.municipalTax.toFixed(2)}</p>
          <p>Rebate: ${results.rebateReturn.toFixed(2)}</p>
          {results.notice && <p>{results.notice}</p>}
        </div>
      )}
    </div>
  );
};

export default LandTransferTaxCalculator;

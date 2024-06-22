'use client';

import React, { useState, useEffect } from 'react';
import { useCompany } from '@/context/CompanyContext';

const SelectCompanyPopup = () => {
  const { selectedCompany, setSelectedCompany } = useCompany();
  const [companies, setCompanies] = useState<any[]>([]);
  const [selectedRfc, setSelectedRfc] = useState('');

  useEffect(() => {
    const fetchCompanies = async () => {
      const res = await fetch('/api/companies'); // Assuming you have an endpoint to get all companies
      const data = await res.json();
      setCompanies(data);
    };

    fetchCompanies();
  }, []);

  const handleSelect = () => {
    setSelectedCompany(selectedRfc);
  };

  if (selectedCompany) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
      <div className="bg-white p-4 rounded shadow-md">
        <h2 className="text-xl font-bold mb-4">Select a Company</h2>
        <select
          value={selectedRfc}
          onChange={(e) => setSelectedRfc(e.target.value)}
          className="mb-4 p-2 border rounded"
        >
          <option value="" disabled>Select a company</option>
          {companies.map((company) => (
            <option key={company.rfc} value={company.rfc}>
              {company.name}
            </option>
          ))}
        </select>
        <button
          onClick={handleSelect}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        >
          Select
        </button>
      </div>
    </div>
  );
};

export default SelectCompanyPopup;

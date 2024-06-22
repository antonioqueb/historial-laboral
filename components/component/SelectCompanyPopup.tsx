'use client';

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useCompany } from '@/context/CompanyContext';
import { cn } from "@/lib/utils";

export function SelectCompanyPopup() {
  const { selectedCompany, setSelectedCompany } = useCompany();
  const [companies, setCompanies] = React.useState<any[]>([]);
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const fetchCompanies = async () => {
      try {
        console.log('Fetching companies...');
        const res = await fetch('/api/listCompanies');
        console.log('Response status:', res.status);
        if (!res.ok) {
          throw new Error(`Failed to fetch companies, status: ${res.status}`);
        }
        const data = await res.json();
        console.log('Fetched data:', data);
        if (!data.companies || !Array.isArray(data.companies)) {
          throw new Error('Data is not an array');
        }
        console.log('Setting companies:', data.companies);
        setCompanies(data.companies);
      } catch (err) {
        if (err instanceof Error) {
          console.error('Error fetching companies:', err.message);
          setError(err.message);
        } else {
          console.error('Unknown error:', err);
          setError('An unknown error occurred');
        }
      }
    };

    fetchCompanies();
  }, []);

  const handleSelect = (currentValue: string) => {
    console.log('Company selected:', currentValue);
    setValue(currentValue);
    setSelectedCompany(currentValue);
    setOpen(false);
  };

  if (selectedCompany) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
      <div className="bg-white p-4 rounded shadow-md">
        <h2 className="text-xl font-bold mb-4">Select a Company</h2>
        {error && <p className="text-red-500">{error}</p>}
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline" role="combobox" aria-expanded={open} className="w-[200px] justify-between">
              {value
                ? companies.find((company) => company.rfc === value)?.name
                : "Select a company..."}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command>
              <CommandInput placeholder="Search company..." />
              <CommandEmpty>No company found.</CommandEmpty>
              <CommandGroup>
                {companies && companies.length > 0 ? (
                  companies.map((company) => (
                    <CommandItem
                      key={company.rfc}
                      value={company.rfc}
                      onSelect={(currentValue: string) => handleSelect(currentValue)}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          value === company.rfc ? "opacity-100" : "opacity-0"
                        )}
                      />
                      {company.name}
                    </CommandItem>
                  ))
                ) : (
                  <CommandEmpty>No companies available</CommandEmpty>
                )}
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}

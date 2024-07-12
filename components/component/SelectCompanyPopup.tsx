'use client';

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useCompany } from '@/context/CompanyContext';
import { cn } from "@/lib/utils";

// Define the types for the company RFC data
interface CompanyRFC {
  rfc: string;
}

export function SelectCompanyPopup() {
  const { selectedCompany, setSelectedCompany } = useCompany();
  const [companyRFCs, setCompanyRFCs] = React.useState<CompanyRFC[]>([]);
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const fetchCompanyRFCs = async () => {
      try {
        const res = await fetch('https://historiallaboral.com/api/getCompanyRFC');
        console.log('Response:', res);
        if (!res.ok) {
          throw new Error(`Failed to fetch company RFCs, status: ${res.status}`);
        }
        const data = await res.json();
        console.log('Data:', data);
        if (!data || !data.rfcs || !Array.isArray(data.rfcs)) {
          throw new Error('Data is not in the expected format');
        }
        const formattedData = data.rfcs.map((rfc: string) => ({ rfc }));
        console.log('Formatted Data:', formattedData);
        setCompanyRFCs(formattedData);
      } catch (err) {
        console.log('Error:', err);
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred');
        }
      }
    };

    fetchCompanyRFCs();
  }, []);

  const handleSelect = (currentValue: string) => {
    console.log('Selected Value:', currentValue);
    setValue(currentValue);
    setSelectedCompany(currentValue);
    setOpen(false);
  };

  // Log companyRFCs to verify data
  console.log('Company RFCs before rendering:', companyRFCs);

  // Ensure the component always returns a valid ReactNode
  if (selectedCompany) return null;

  return (
    <div className="fixed inset-0 bg-zinc-500 bg-opacity-75 flex justify-center items-center z-50">
      <div className="bg-white p-4 rounded shadow-md">
        <h2 className="text-xl font-bold mb-4">Select a Company</h2>
        {error && <p className="text-red-500">{error}</p>}
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline" role="combobox" aria-expanded={open} className="w-[200px] justify-between">
              {value
                ? companyRFCs.find((company) => company.rfc === value)?.rfc || "Select a company..."
                : "Select a company..."}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command>
              <CommandInput placeholder="Search company..." />
              <CommandEmpty>No company found.</CommandEmpty>
              <CommandGroup>
                {companyRFCs.length > 0 ? (
                  companyRFCs.map((company) => (
                    <CommandItem
                      key={company.rfc}
                      value={company.rfc}
                      onSelect={() => handleSelect(company.rfc)}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          value === company.rfc ? "opacity-100" : "opacity-0"
                        )}
                      />
                      {company.rfc}
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

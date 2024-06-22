'use client';

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useCompany } from '@/context/CompanyContext';
import { cn } from "@/lib/utils";

export default function SelectCompanyPopup() {
  const { selectedCompany, setSelectedCompany } = useCompany();
  const [companies, setCompanies] = React.useState<any[]>([]);
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  React.useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const res = await fetch('/api/listCompanies');
        if (!res.ok) {
          throw new Error('Failed to fetch companies');
        }
        const data = await res.json();
        if (!Array.isArray(data)) {
          throw new Error('Data is not an array');
        }
        setCompanies(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchCompanies();
  }, []);

  const handleSelect = (currentValue: string) => {
    setValue(currentValue);
    setSelectedCompany(currentValue);
    setOpen(false);
  };

  if (selectedCompany) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
      <div className="bg-white p-4 rounded shadow-md">
        <h2 className="text-xl font-bold mb-4">Select a Company</h2>
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
                {companies.map((company) => (
                  <CommandItem
                    key={company.rfc}
                    value={company.rfc}
                    onSelect={(currentValue) => handleSelect(currentValue)}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === company.rfc ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {company.name}
                  </CommandItem>
                ))}
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}

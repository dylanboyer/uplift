"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const repRanges = [
  { value: "1", label: "1-5 reps" },
  { value: "2", label: "6-10 reps" },
  { value: "3", label: "11+ reps" },
];

export function RepRangeDropdown({ value, onChange }: RepRangeDropdownProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {value
            ? repRanges.find((range) => range.value === value)?.label
            : "Select rep range..."}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="bg-black text-white p-0">
        <Command>
          <CommandList>
            <CommandGroup>
              {repRanges.map((range) => (
                <CommandItem
                  className="hover:bg-zinc-600"
                  key={range.value}
                  value={range.value}
                  onSelect={(currentValue) => {
                    onChange(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  {range.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === range.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

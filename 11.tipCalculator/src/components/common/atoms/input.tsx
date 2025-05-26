import * as React from "react"
import { cn } from "@/lib/utils"
import { useState } from "react"

interface InputProps extends React.ComponentProps<"input"> {
    icon?: string;
    value?: string | undefined;
    validMin?: number;
    allowDecimal?: boolean; 
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function Input({ className, type, icon, value, onChange, allowDecimal, validMin, ...props }: InputProps) {
    const [ isActive, setIsActive ] = useState(false);
    return (
      <div className={cn("flex bg-gray-50 gap-2 p-2 rounded-sm",
        isActive ? "outline-2 outline-green-400" : "",
        value && validMin && parseInt(value) < validMin ? "outline-2 outline-red-400" : ""
      )}>
        { icon && <div className="grid w-5 place-items-center">
          <img className="" src={icon} alt=""/>
        </div> }
        <input
          type={type}
          value={value}
          onChange={(e) => {
              const sanitizedValue = allowDecimal
                ? e.target.value.replace(/[^0-9.]/g, "").replace(/(\..*)\./g, "$1") 
                : e.target.value.replace(/[^0-9]/g, "");
              onChange?.({ ...e, target: { ...e.target, value: sanitizedValue } });
          }}
          data-slot="input"
          className={cn(
            "w-full focus:outline-0 text-green-900 font-bold pr-2",
            className
          )}
          {...props}
          onFocus={() => {setIsActive(true)}}
          onBlur={() => {setIsActive(false)}}
        dir="rtl" />
      </div>
    )
}

export { Input }

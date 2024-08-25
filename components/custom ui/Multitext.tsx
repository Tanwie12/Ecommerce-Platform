'use client'
import{useState} from 'react'
import { Badge,Button,Input } from '@nextui-org/react';
import {X} from 'lucide-react'

type Props = {
    placeholder:string,
    value:string[],
    onChange:(value:string)=>void,
    onRemove:(value:string)=>void


}

const MultiText:React.FC<Props>=({placeholder,value, onChange,onRemove })=> {
    const [inputValue, setInputValue] = useState("");

    const addValue = (item: string) => {
      onChange(item);
      setInputValue("");
    };
  
    return (
      <>
        <Input
          placeholder={placeholder}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              addValue(inputValue);
            }
          }}
        />
  
        <div className="flex gap-1 flex-wrap mt-4">
          {value.map((item, index) => (
            <Badge key={index} content={
               
                  <X onClick={() => onRemove(item)} className="h-3 w-3" />
               
            } className="bg-red-1 text-white">
             <div className='rounded-full bg-grey-1 text-white p-2'>
             {item}
             </div>
             
            </Badge>
          ))}
        </div>
      </>
    );
  };

export default MultiText
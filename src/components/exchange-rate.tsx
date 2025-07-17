import * as React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Interchange from '@/assets/images/icons/interchange.svg';

export function ExchangeRate() {
  const [fromCurrency, setFromCurrency] = React.useState('NIO');
  const [toCurrency, setToCurrency] = React.useState('USD');

  return (
      <>
      <h3 className={'font-semibold'}>Tasa de cambio</h3>
        {/* Currency Selection */}
        <div className="grid grid-cols-2 gap-2 w-full mb-4">
          <Select value={fromCurrency} onValueChange={setFromCurrency}>
            <SelectTrigger className="w-full bg-white">
              <SelectValue>
                <div className="flex items-center gap-2">
                  <span>Córdoba</span>
                </div>
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="NIO">
                <div className="flex items-center gap-2">
                  <span>Córdoba</span>
                </div>
              </SelectItem>
            </SelectContent>
          </Select>

          <Select value={toCurrency} onValueChange={setToCurrency}>
            <SelectTrigger className="w-full bg-white">
              <SelectValue>
                <div className="flex items-center gap-2">
                  <span>USD</span>
                </div>
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="USD">
                <div className="flex items-center gap-2">
                  <span>USD</span>
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Exchange Rate Display */}
        <div className="flex items-center justify-between">
          <div className="text-sm font-medium">
            NIO: 35.1
          </div>

            <img src={Interchange} className="w-8 h-8 cursor-pointer"  alt='Intercambio'/>

          <div className="text-sm font-medium">
            USD: 35.95
          </div>
        </div>
    </>
  );
} 

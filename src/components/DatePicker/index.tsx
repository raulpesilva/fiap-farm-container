'use client';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ChevronDownIcon } from 'lucide-react';
import * as React from 'react';

interface DatePickerProps {
  date: Date | undefined;
  setDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
  error: string;
}

export const DatePicker = ({ date, setDate, error }: DatePickerProps) => {
  const [open, setOpen] = React.useState(false);

  return (
    <div className='grid gap-2 w-full'>
      <Label htmlFor='date'>Selecione uma data</Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant='outline' id='date' className='w-full justify-between'>
            {date ? date.toLocaleDateString() : 'Select date'}
            <ChevronDownIcon className='text-muted-foreground opacity-50'  />
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-auto overflow-hidden p-0' align='start'>
          <Calendar
            mode='single'
            selected={date}
            captionLayout='dropdown'
            onSelect={(date) => {
              setDate(date);
              setOpen(false);
            }}
          />
        </PopoverContent>
      </Popover>
      {error && <p className='text-sm text-error'>{error}</p>}
    </div>
  );
};

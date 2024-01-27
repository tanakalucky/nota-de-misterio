'use client';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import clsx from 'clsx';

type TimeTableProps = {
  times: string[];
  playerNames: string[];
};

export default function TimeTable({ times, playerNames }: TimeTableProps) {
  const tableHeads = playerNames;
  const tableDatas = ['メモ'].concat(times);

  return (
    <Table className='table-fixed border-0'>
      <TableHeader>
        <TableRow>
          <TableHead className='border bg-blue-gray-100 p-4 w-[100px] sticky top-0 left-0 z-20 h-1 bg-slate-800 text-white'>
            時間
          </TableHead>
          {tableHeads.map((head) => (
            <TableHead
              key={head}
              className='border bg-blue-gray-100 p-4 w-[300px] sticky top-0 z-10 h-1 bg-slate-800 text-white'
              contentEditable
              suppressContentEditableWarning={true}
            >
              {head}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {tableDatas.map((time) => {
          const classes = 'p-4 border border-blue-gray-50';

          return (
            <TableRow key={time}>
              <TableCell className={clsx(classes, 'w-[100px] sticky left-0 z-10 bg-slate-100')}>{time}</TableCell>
              {playerNames.map((_, index) => (
                <TableCell
                  className={clsx(classes, 'text-wrap w-[300px]')}
                  key={`${time}-${index}`}
                  contentEditable
                  suppressContentEditableWarning={true}
                />
              ))}
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}

import React from 'react';
import {
  Card,
  Typography,
  CardBody
} from "@material-tailwind/react";

export function Table({ tableHead, tableRows, renderRow }) {
  return (
    <Card className="h-full w-full my-4">
      <CardBody className="overflow-scroll px-0">
        <table className="w-full min-w-max table-auto text-left my-6">
          <thead>
            <tr>
              {tableHead.map((head) => (
                <th key={head} className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                  <Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70">
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableRows.map((row, index) => renderRow(row, index))}
          </tbody>
        </table>
      </CardBody>
    </Card>
  );
}

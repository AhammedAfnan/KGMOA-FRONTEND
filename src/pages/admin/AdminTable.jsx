import React, { useEffect, useState } from "react";
import { useReactTable, getCoreRowModel } from "@tanstack/react-table";
import { flexRender } from "@tanstack/react-table";
import {API_BASE_URL} from '../../services/config'

const AdminTable = () => {
  const [data, setData] = useState([])

  useEffect(()=>{
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/table-data`)
        const tableData = await response.json()
        setData(tableData)
      } catch (error) {
        console.error('Error fetching table data:',error)
      }
    }
    fetchData();
  },[])

  const columns = [
    { accessorKey: "id", header: "User ID" },
    { accessorKey: "name", header: "Name" },
    { accessorKey: "place", header: "Place" },
    { accessorKey: "kmcNo", header: "KMC No." },
    { accessorKey: "phone", header: "Phone No." },
    { accessorKey: "regTarrif", header: "Reg Tarrif" },
    { accessorKey: "amount", header: "Amount" },
    { accessorKey: "paymentId", header: "Payment ID" },
    {
       accessorKey: "qrCode",
      header: "QR Code",
      cell:({getValue}) => {
        <img 
        src={getValue() || "default-qr.png"} 
        alt="QR Code"
        className="w-16 h-16"
         />
      }
     },
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(), // Correct plugin usage
  });

  return (
    <div className="overflow-x-auto">
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className="bg-gray-200">
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="border border-gray-300 px-12 py-4 text-left font-bold"
                >
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className="border border-gray-300 px-4 py-2 text-center"
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminTable;

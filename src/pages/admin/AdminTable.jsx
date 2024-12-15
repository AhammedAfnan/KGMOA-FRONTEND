import React from "react";
import { useReactTable, getCoreRowModel } from "@tanstack/react-table";
import { flexRender } from "@tanstack/react-table";

const AdminTable = () => {
  const data = [
    { userId: 1, name: "John", place: "NY", kmcNo: "123", phone: "1234567890", regTarrif:"RC Couple", amount: "$200", paymentId: "PAY123" , qrCode:"" },
    { userId: 2, name: "Doe", place: "LA", kmcNo: "456", phone: "0987654321", regTarrif:"RC Single", amount: "$300", paymentId: "PAY456", qrCode:"" },
    { userId: 3, name: "Bilal", place: "NY", kmcNo: "123", phone: "1234567890", regTarrif:"Delegate Couple", amount: "$200", paymentId: "PAY123", qrCode:"" },
    { userId: 4, name: "Raj", place: "LA", kmcNo: "456", phone: "0987654321", regTarrif:"Delegate Single", amount: "$300", paymentId: "PAY456", qrCode:"" },
  ];

  const columns = [
    { accessorKey: "userId", header: "User ID" },
    { accessorKey: "name", header: "Name" },
    { accessorKey: "place", header: "Place" },
    { accessorKey: "kmcNo", header: "KMC No." },
    { accessorKey: "phone", header: "Phone No." },
    { accessorKey: "regTarrif", header: "Reg Tarrif" },
    { accessorKey: "amount", header: "Amount" },
    { accessorKey: "paymentId", header: "Payment ID" },
    { accessorKey: "qrCode", header: "QR Code" },
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

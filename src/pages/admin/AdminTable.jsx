  import React, { useEffect, useState } from "react";
  import { useReactTable, getCoreRowModel } from "@tanstack/react-table";
  import { flexRender } from "@tanstack/react-table";
  import { API_BASE_URL } from '../../services/config';

  const AdminTable = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch(`${API_BASE_URL}/table-data`);
          const tableData = await response.json();
          setData(tableData);
        } catch (error) {
          console.error('Error fetching table data:', error);
        }
      };
      fetchData();
    }, []);

    const columns = [
      { accessorKey: "id", header: "s no." },
      { accessorKey: "name", header: "Name" },
      { accessorKey: "place", header: "Place" },
      { accessorKey: "kmcNo", header: "KMC No." },
      { accessorKey: "phone", header: "Phone No." },
      { accessorKey: "regTarrif", header: "Reg Tarrif" },
      { accessorKey: "amount", header: "Amount" },
      { accessorKey: "paymentMode", header: "Payment Mode" },
      { 
        accessorKey: "paymentDate", 
        header: "Payment Date",
        cell: ({ getValue }) => {
          const dateValue = getValue();
          return new Date(dateValue).toLocaleDateString();
        },
      },
      { 
        accessorKey: "utrNumberOrCashReceipt", 
        header: "UTR/Cash Receipt" 
      },
      {
        accessorKey: "qrCode",
        header: "QR Code",
        cell: ({ getValue }) => {
          const qrCodeUrl = getValue();
          return (
            <img
              src={qrCodeUrl}
              alt="QR Code"
              className="w-16 h-16 mx-auto"
            />
          );
        },
      },
    ];
    

    const table = useReactTable({
      data,
      columns,
      getCoreRowModel: getCoreRowModel(), // Correct plugin usage
    });

    return (
      <div className="overflow-x-auto px-4 mb-10">
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="bg-gray-200">
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="border border-gray-300 px-4 sm:px-8 py-2 sm:py-4 text-left font-bold text-sm sm:text-base"
                  >
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="even:bg-gray-100">
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="border border-gray-300 px-2 sm:px-4 py-1 sm:py-2 text-center text-sm sm:text-base"
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

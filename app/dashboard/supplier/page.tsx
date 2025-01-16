"use client";
import React, { useState, useEffect } from "react";
import SupplierForm from "@/components/inventoryComponent/SupplierForm";
import SupplierUpdateForm from "@/components/inventoryComponent/SupplierUpdateForm";
import SupplierTable from "@/components/inventoryComponent/SupplierTable";
import { getAllSuppliers, updateSupplier } from "@/action/supplier";
const Supplier = () => {
  const [showForm, setShowForm] = useState<boolean>(false);
  const [updateMode, setUpdateMode] = useState<boolean>(false);
  const [supplier, setSupplier] = useState<any[]>([]);
  const [currentSupplier, setCurrentSupplier] = useState<any | null>(null);
  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const response = await getAllSuppliers();
        if (response.success && response.data) {
          console.log("Supplier:", response.data);
          setSupplier(response.data);
        } else {
          console.error("Failed to fetch suppliers");
        }
      } catch (error) {
        console.error("failed to fetch suppliers");
      }
    };
    fetchSuppliers();
  }, []);

  // const handleSupplierAdded = (newSupplier: any) => {
  //   setSupplier((prev) => [...prev, newSupplier]);
  // };

  const updateSupplierState = (updatedSupplier: any) => {
    setSupplier((prevSuppliers) =>
      prevSuppliers.map((supplier) =>
        supplier.id === updatedSupplier.id ? updatedSupplier : supplier
      )
    );
  };

  useEffect(() => {
    if (showForm || updateMode) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [showForm, updateMode]);

  const viewForm = (): void => {
    setShowForm((prev) => !prev);
  };

  const handleEditClick = (supplier: any) => {
    setCurrentSupplier(supplier);
    setUpdateMode(true);
  };

  const hideForm = (): void => {
    setShowForm(false);
    setUpdateMode(false);
    setCurrentSupplier(null);
  };

  return (
    <div className="min-h-screen">
      {/* <header className="bg-gray-800 text-white p-4 shadow-md">
        <h2 className="text-3xl font-semibold text-center">Supplier</h2>
      </header> */}

      <main className="flex-1 p-2 mt-2">
        <section className="grid grid-cols-4 gap-4 mb-4">
          <div className="bg-gray-300 dark:text-gray-700 p-4 rounded shadow">
            Total Supplier:{supplier.length}
          </div>
          {/* <div className="bg-white p-4 rounded shadow">Recent:Ram Bdr</div>
          <div className="bg-white p-4 rounded shadow">Most Active (Month):Bidur</div>
          <div className="bg-white p-4 rounded shadow">Least Active (Month):Mahesh</div> */}
        </section>
      </main>
      <SupplierTable
        onAddClick={viewForm}
        onEditClick={handleEditClick}
        updatedValue={supplier}
      />

      {(showForm || updateMode) && (
        <div className="fixed inset-0 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="rounded-lg shadow-lg relative w-full max-w-lg">
            {showForm && <SupplierForm onCancel={hideForm} />}
            {updateMode && (
              <SupplierUpdateForm
                onCancel={hideForm}
                supplier={currentSupplier}
                supplierId={currentSupplier.id}
                onSupplierUpdate={updateSupplierState}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Supplier;

"use client";
import React, { useState,useEffect } from "react";
import SupplierForm from "@/components/inventoryComponent/SupplierForm";
import SupplierTable from "@/components/inventoryComponent/SupplierTable";
import { getAllSuppliers } from "@/action/supplier";
const Supplier = () => {
  const [showForm, setShowForm] = useState<boolean>(false);
  const[supplier,setSupplier]=useState<any[]>([])
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
 
  const handleSupplierAdded = (newSupplier: any) => {
    setSupplier((prev) => [...prev, newSupplier]);
  };

  useEffect(() => {
    if (showForm) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [showForm]);
  

  const viewForm = (): void => {
    setShowForm((prev) => !prev);
  };

  const hideForm = (): void => {
    setShowForm(false);
  };

  return (
    <div className="bg-gray-100 relative min-h-screen">
      <header className="bg-gray-800 text-white p-4 shadow-md">
        <h2 className="text-3xl font-semibold text-center">Supplier</h2>
      </header>

      <main className="flex-1 p-2 mt-2">
        <section className="grid grid-cols-4 gap-4 mb-4">
          <div className="bg-white p-4 rounded shadow">Total Supplier:{supplier.length}</div>
          <div className="bg-white p-4 rounded shadow">Recent:Ram Bdr</div>
          <div className="bg-white p-4 rounded shadow">Most Active (Month):Bidur</div>
          <div className="bg-white p-4 rounded shadow">Least Active (Month):Mahesh</div>
        </section>
      </main>
      <SupplierTable onAddClick={viewForm} suppliers={supplier} />
      {/* <footer className="bg-gray-800 text-white p-4 text-center">
    
        <p>© 2024 GG_POS | <a href="#" className="text-blue-400">Help/Support</a></p>

      </footer> */}

      
      {showForm && (
        <div className="fixed inset-0 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="rounded-lg shadow-lg relative w-full max-w-lg">
            <SupplierForm onCancel={hideForm}  onSupplierAdded={handleSupplierAdded}/>
          </div>
        </div>
      )}
    </div>
  );
};

export default Supplier;

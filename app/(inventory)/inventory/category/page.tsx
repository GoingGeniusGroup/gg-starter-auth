"use client";
import React, { useState,useEffect } from "react";
 import CategoryForm from "@/components/inventoryComponent/CategoryForm";
import CategoryTable from "@/components/inventoryComponent/CategoryTable";
// import CategoryForm from "@/app/_components/inventoryComponent/CategoryForm";
const Category = () => {
  const [showForm, setShowForm] = useState<boolean>(false);
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
    <div className="bg-gray-100  relative min-h-screen">
      <header className="bg-gray-800 text-white p-4 shadow-md">
        <h2 className="text-3xl font-semibold text-center">Category</h2>
      </header>

      <main className="flex-1 p-2 mt-2">
        <section className="grid grid-cols-4 gap-4 mb-4">
          <div className="bg-white p-4 rounded shadow">Total Category:2</div>
          <div className="bg-white p-4 rounded shadow">Max Product:Physical(98)</div>
          <div className="bg-white p-4 rounded shadow">Least Product:virtual(20)</div>
        </section>
      </main>
      <CategoryTable onAddClick={viewForm} />
      {showForm && (
        <div className="fixed inset-0 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="rounded-lg shadow-lg relative w-full max-w-lg">
            <CategoryForm onCancel={hideForm} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Category;

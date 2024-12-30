"use client";
import React, { useState,useEffect } from "react";
 import CategoryForm from "@/components/inventoryComponent/CategoryForm";
 import CategoryUpdateForm from "@/components/inventoryComponent/CategoryUpdateForm";
import CategoryTable from "@/components/inventoryComponent/CategoryTable";
import { deleteCategory, getAllCategories ,updateCategory} from "@/action/category";
import { categorySchema, categoryData } from "@/inventorySchema";
import { toast } from "sonner";
const Category = () => {
  const [showForm, setShowForm] = useState<boolean>(false);
  const [updateMode, setUpdateMode] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<any>(null);
const[category,setCategory]=useState<any[]>([])
  useEffect(() => {
    if (showForm || updateMode) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [showForm, updateMode]);
  
useEffect(()=>{
  async function fetchCategory(){
    try{
      const response=await getAllCategories()
      if (response.success) {
        const categories = response.data.map((cat: any) => ({
          CategoryId: cat.id, 
          categoryName: cat.categoryName,
          categoryDescription: cat.categoryDescription || "", // Handle possible null
          categoryType: "PHYSICAL",
          productQuantity: cat.products ? cat.products.length : 0, // Assuming products are related to the category
        }));
        setCategory(categories);
      } else {
        console.error("Failed to fetch categories");
      }
    }
    catch(error){
      console.error("failed to fetch categories")
    }
  }
fetchCategory();
},[])

  const viewForm = (): void => {
    setShowForm((prev) => !prev);
  };

  const hideForm = (): void => {
    setShowForm(false);
    setUpdateMode(false);
    setSelectedCategory(null);
  };
  const editCategory = (category: any): void => {
    setSelectedCategory(category);
    setUpdateMode(true);
  };
  const removeCategory=async(categoryId:any):Promise<void>=>{
    const confirmed = window.confirm('Are you sure you want to delete this category?');
    if(!confirmed) return;
    try{
      const response=await deleteCategory(categoryId);
      if(response.success){
       toast.success("category deleted successfully")
      }
      else{
        toast.error("Failed to delete category")
        console.error("Failed to delete category")
      }
    }
    catch (error) {
      console.error('Error deleting category:', error);
      toast.error('An unexpected error occurred while deleting the category');
    }
  }

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
      <CategoryTable categories={category} onAddClick={viewForm} onEditClick={editCategory} onDeleteClick={removeCategory} />
      {(showForm || updateMode) && (
        <div className="fixed inset-0 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="rounded-lg shadow-lg relative w-full max-w-lg">
          {showForm && <CategoryForm onCancel={hideForm} />}
            {updateMode && (
              <CategoryUpdateForm
                onCancel={hideForm}
                category={selectedCategory}
                CategoryId={selectedCategory.CategoryId}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Category;

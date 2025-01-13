import React,{useState,useEffect} from 'react'
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Toaster, toast } from 'sonner'
import { saveSupplier } from '@/action/supplier'
import { supplierSchema } from '@/inventorySchema'
interface SupplierFormProps {
  onCancel: () => void;
}
interface SupplierData {
  supplierName: string;
  phone: string;
  email: string;
  address: string;
}
const SupplierForm = ({ onCancel}: SupplierFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SupplierData>({
    resolver: zodResolver(supplierSchema),
  });
  const onSubmit = async (data: SupplierData) => {
    const formData=new FormData();
    formData.append("supplierName",data.supplierName);
    formData.append("phone",data.phone);
    formData.append("email",data.email);
    formData.append("address",data.address);
    try{
      const result=await saveSupplier(formData);
      if(result.success && result.data){
        toast.success('Supplier has saved successfully!')
        console.log("Saved supplier:", result.data);
       
        reset();
        onCancel();
      }
      else{
        console.error("Validation errors:", result.errors);
        toast.warning('Validation errors occurred. Check console for details.')
      }
    }
    catch(error){
      console.error("Error:", error);
      toast.error('Failed to save supplier')
    }
  }
  const[suppliers,setSuppliers]=useState<SupplierData[]>([])
  return (
    <div className='flex justify-center items-center'>
        <form  onSubmit={handleSubmit(onSubmit)} className='w-full max-w-lg bg-white shadow-lg rounded-lg p-6 space-y-6 '>
        <fieldset className="my-1 border border-blue-500 rounded-lg p-4">
            <legend className="text-xl font-semibold text-blue-500 px-2">
                Supplier
            </legend>
            <div className='grid grid-cols-1 gap-3'></div>
            <div className="mb-3">
              <label htmlFor="supplierName" className="block text-sm font-semibold text-gray-700">Name:</label>
              <input
                type="text"
                id="supplierName"
                {...register("supplierName")}
                name="supplierName"
                required
                className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.supplierName && (<p className="text-sm text-red-500 mt-1">{errors.supplierName.message}</p>)}
            </div>
            <div className="mb-3">
              <label htmlFor="phone" className="block text-sm font-semibold text-gray-700">Phone:</label>
              <input
                type="text"
                {...register("phone")}
                id="phone"
                name="phone"
                required
                className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.phone && (<p className="text-sm text-red-500 mt-1">{errors.phone.message}</p>)} 
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700">Email:</label>
              <input
                type="text"
                {...register("email")}
                id="email"
                name="email"
                required
                className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.email && (<p className="text-sm text-red-500 mt-1">{errors.email.message}</p>)}
            </div>
            <div className="mb-3">
              <label htmlFor="address" className="block text-sm font-semibold text-gray-700">Address:</label>
              <input
                type="text"
                id="address"
                {...register("address")}
                name="address"
                required
                className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.address && (<p className="text-sm text-red-500 mt-1">{errors.address.message}</p>)}
            </div>
            {/* <div className="mb-3">
              <label htmlFor="suppliedProduct" className="block text-sm font-semibold text-gray-700">Product:</label>
              <input
                type="text"
                id="suppliedProduct"
                name="suppliedProduct"
                required
                className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div> */}
            <div className="grid grid-cols-2 gap-4">
 
  <button
    type="button"
    onClick={onCancel}
    className="w-full px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
  >
    Cancel
  </button>
  <button
    type="submit"
    className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
  >
    Submit
  </button>
</div>

        
            </fieldset>
        </form>

    </div>
  )
}

export default SupplierForm
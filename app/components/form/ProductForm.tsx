// "use client";

// import { productSchema } from "@/schemas";
// import { useRouter } from "next/router";
// import { useTransition } from "react";
// import { Controller, useForm } from "react-hook-form";
// import { z } from "zod";

// import { zodResolver } from "@hookform/resolvers/zod";
// import { Form } from "@/components/ui/form";
// import { Button } from "@/components/ui/button/button";
// import Link from "next/link";

// import {
//   Select,
//   SelectTrigger,
//   SelectValue,
//   SelectContent,
//   SelectItem,
//   SelectLabel,
// } from "@radix-ui/react-select";
// import FormInput from "./FormInput";
// import Modal from "@/components/ui/model";
// import { Spinner } from "@/components/ui/Spinner";

// const suppliersList = [
//   { id: "supplier1", name: "Supplier 1" },
//   { id: "supplier2", name: "Supplier 2" },
//   { id: "supplier3", name: "Supplier 3" },
// ];
// const categories = [
//   { id: "category1", name: "Category 1" },
//   { id: "category2", name: "Category 2" },
// ];

// const ProductForm: React.FC = () => {
//   // const router = useRouter();

//   const [isPending, startTransition] = useTransition();

//   const form = useForm<z.infer<typeof productSchema>>({
//     resolver: zodResolver(productSchema),
//     mode: "onChange",
//     defaultValues: {
//       name: "",
//       description: "",
//       image: undefined,
//       costPrice: 0,
//       quantityInStock: 0,
//       validity: "",
//       discount: "",
//       salePrice: 0,
//       margin: "",
//       status: "AVAILABLE",
//       category: "",
//       //suppliers: [],
//     },
//   });
//   const {
//     control,
//     handleSubmit,
//     formState: { errors },
//   } = form;
//   return (
//     <Form {...form}>
//       <form className="space-y-6">
//         <div className="space-y-4">
//           <FormInput
//             control={form.control}
//             name="name"
//             label="Product Name"
//             type="text"
//             placeholder="Enter product name"
//             isPending={isPending}
//           />
//           <FormInput
//             control={form.control}
//             name="description"
//             label="Description"
//             type="text"
//             placeholder="Enter product description"
//             isPending={isPending}
//           />
//           <FormInput
//             control={form.control}
//             name="costPrice"
//             label="Cost Price"
//             type="number"
//             placeholder="Enter cost price"
//             isPending={isPending}
//           />

//           <FormInput
//             control={form.control}
//             name="quantityInStock"
//             label="Quantity in Stock"
//             type="number"
//             placeholder="Enter quantity in stock"
//             isPending={isPending}
//           />
//           <FormInput
//             control={form.control}
//             name="validity"
//             label="Validity"
//             type="text"
//             placeholder="Enter validity period"
//             isPending={isPending}
//           />
//           <FormInput
//             control={form.control}
//             name="discount"
//             label="Discount"
//             type="text"
//             placeholder="Enter discount"
//             isPending={isPending}
//           />
//           <FormInput
//             control={form.control}
//             name="salePrice"
//             label="Sale Price"
//             type="number"
//             placeholder="Enter sale price"
//             isPending={isPending}
//           />

//           <FormInput
//             control={form.control}
//             name="margin"
//             label="Margin"
//             type="text"
//             placeholder="Enter margin"
//             isPending={isPending}
//           />
//           {/* Status Select */}
//           <Controller
//             control={control}
//             name="status"
//             render={({ field }) => (
//               <Select onValueChange={field.onChange} value={field.value}>
//                 <SelectTrigger>
//                   <SelectValue placeholder="Select status" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="AVAILABLE">Available</SelectItem>
//                   <SelectItem value="NOTAVAILABLE">Not Available</SelectItem>
//                 </SelectContent>
//               </Select>
//             )}
//           />
//           {errors.status && <p>{errors.status.message}</p>}

//           {/* Category Select */}
//           <Controller
//             control={control}
//             name="category"
//             render={({ field }) => (
//               <Select onValueChange={field.onChange} value={field.value}>
//                 <SelectTrigger>
//                   <SelectValue placeholder="Select category" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   {categories.map((category) => (
//                     <SelectItem key={category.id} value={category.id}>
//                       {category.name}
//                     </SelectItem>
//                   ))}
//                 </SelectContent>
//               </Select>
//             )}
//           />
//           {errors.category && <p>{errors.category.message}</p>}

//           {/* Suppliers Select (Multi-select logic will need to be handled manually) */}
//           {/* <Controller
//         control={control}
//         name="suppliers"
//         render={({ field }) => (
//           <Select
//             onValueChange={(val) => field.onChange([...field.value, val])}
//             value={field.value}
//           >
//             <SelectTrigger>
//               <SelectValue placeholder="Select suppliers" />
//             </SelectTrigger>
//             <SelectContent>
//               {suppliersList.map((supplier) => (
//                 <SelectItem key={supplier.id} value={supplier.id}>
//                   {supplier.name}
//                 </SelectItem>
//               ))}
//             </SelectContent>
//           </Select>
//         )}
//       />
//       {errors.suppliers && <p>{errors.suppliers.message}</p>} */}
//         </div>

//         <div className="mt-8 space-x-6 text-right">
//           <Modal.Close className="rounded px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-600">
//             Cancel
//           </Modal.Close>
//           <Button className="inline-flex items-center justify-center rounded bg-green-500 px-4 py-2 text-sm font-medium text-white hover:bg-green-600 group-disabled:pointer-events-none">
//             <Spinner className="absolute h-4 group-enabled:opacity-0" />
//             <span className="group-disabled:opacity-0">Save</span>
//           </Button>
//         </div>
//       </form>
//     </Form>
//   );
// };

// export default ProductForm;

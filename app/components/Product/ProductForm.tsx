// 'use client'

// import { addProduct } from "@/actions/product"
// import { Button } from "@/components/ui/button"
// import { Form } from "@/components/ui/form"
// import { SelectModel } from "@/components/ui/select"
// import { useFetchValues } from "@/hooks/useFetchValues"
// import { productSchema } from "@/schemas"
// import { zodResolver } from "@hookform/resolvers/zod"
// import { Minus, Plus } from "lucide-react"
// import { useRouter } from "next/navigation"
// import { useTransition } from "react"
// import { useFieldArray, useForm } from "react-hook-form"
// import { toast } from "react-toastify"
// import { z } from "zod"
// import { FormInput } from "../auth/form-input"
// import ImageInput from "../form/ImageInput"
// import { Spinner } from "../ui/Spinner"

// const productstatus = [
//   { label: "Available", value: "AVAILABLE" },
//   { label: "Not Available", value: "NOTAVAILABLE" },
// ]

// const ProductForm: React.FC = () => {
//   const router = useRouter()
//   const { categories, suppliers, getValues } = useFetchValues()

//   const [isPending, startTransition] = useTransition()
//   type productType = z.infer<typeof productSchema>

//   const form = useForm<productType>({
//     resolver: zodResolver(productSchema),
//     mode: "onChange",
//     defaultValues: {
//       name: "",
//       description: "",
//       image: undefined,
//       costPrice: undefined,
//       quantityInStock: undefined,
//       validity: "",
//       discount: "",
//       salePrice: undefined,
//       margin: "",
//       status: undefined,
//       category: "",
//       suppliers: [{ id: "", supplier: "" }],
//     },
//   })

//   const { control, setValue } = form
//   const { fields, append, remove } = useFieldArray({
//     name: "suppliers",
//     control,
//   })

//   const selectedSuppliers = form.watch("suppliers") || []

//   const getAvailableSuppliers = (index: number) => {
//     const selectedSupplierIds = selectedSuppliers
//       .filter((_, i) => i !== index)
//       .map((supplier) => supplier?.supplier)

//     return suppliers.filter(
//       (option) => !selectedSupplierIds.includes(option.value)
//     )
//   }

//   const handleSelectChange = (idx: number, value: string) => {
//     const selectedSupplier = suppliers.find(
//       (supplier) => supplier.value === value
//     )
//     if (selectedSupplier) {
//       setValue(`suppliers.${idx}.id`, selectedSupplier.id)
//       setValue(`suppliers.${idx}.supplier`, value)
//     }
//   }

//   const onSubmit = async (values: productType) => {
//     const formData = new FormData()
//     if (values.image) {
//       formData.append("image", values.image)
//     }

//     for (const [key, value] of Object.entries(values)) {
//       if (key !== "image" && !Array.isArray(value)) {
//         formData.append(key, value as string)
//       } else if (Array.isArray(value)) {
//         formData.append(key, JSON.stringify(value))
//       }
//     }

//     startTransition(async () => {
//       try {
//         const result = await addProduct(formData)
//         if (result.success) {
//           toast.success(result.message, {
//             autoClose: 2000,
//           })
//           router.push("/admin/products")
//         } else {
//           toast.error(result.error?.message || "An error occurred", {
//             autoClose: 2000,
//           })
//         }
//       } catch (error) {
//         console.error(error)
//         toast.error("Something went wrong.", {
//           autoClose: 2000,
//         })
//       }
//     })
//   }

//   return (
//     <div className="container mx-auto flex items-center justify-center">
//       <Form {...form}>
//         <form onSubmit={form.handleSubmit(onSubmit)}>
//           <fieldset disabled={isPending} className="group">
//             <ImageInput
//               control={form.control}
//               name="image"
//               label="Image"
//               isPending={isPending}
//             />

//             <div className="flex flex-col md:flex-row space-y-6 gap-4">
//               <div className="space-y-4 ">
//                 <FormInput
//                   control={form.control}
//                   name="name"
//                   label="Product Name"
//                   type="text"
//                   placeholder="Enter product name"
//                   isPending={isPending}
//                 />
//                 <FormInput
//                   control={form.control}
//                   name="description"
//                   label="Description"
//                   type="text"
//                   placeholder="Enter product description"
//                   isPending={isPending}
//                 />
//                 <FormInput
//                   control={form.control}
//                   name="costPrice"
//                   label="Cost Price"
//                   type="number"
//                   placeholder="Enter cost price"
//                   isPending={isPending}
//                 />
//                 <FormInput
//                   control={form.control}
//                   name="quantityInStock"
//                   label="Quantity in Stock"
//                   type="number"
//                   placeholder="Enter quantity in stock"
//                   isPending={isPending}
//                 />
//                 <FormInput
//                   control={form.control}
//                   name="validity"
//                   label="Validity"
//                   type="text"
//                   placeholder="Enter validity period"
//                   isPending={isPending}
//                 />
//               </div>
//               <div className="space-y-4">
//                 <FormInput
//                   control={form.control}
//                   name="discount"
//                   label="Discount"
//                   type="text"
//                   placeholder="Enter discount"
//                   isPending={isPending}
//                 />
//                 <FormInput
//                   control={form.control}
//                   name="salePrice"
//                   label="Sale Price"
//                   type="number"
//                   placeholder="Enter sale price"
//                   isPending={isPending}
//                 />
//                 <FormInput
//                   control={form.control}
//                   name="margin"
//                   label="Margin"
//                   type="text"
//                   placeholder="Enter margin"
//                   isPending={isPending}
//                 />
//               </div>
//               <div className="space-y-4">
//                 <SelectModel
//                   control={form.control}
//                   name="status"
//                   options={productstatus}
//                   isPending={isPending}
//                   label="Status"
//                   defaultValue="Select a status"
//                 />
//                 <SelectModel
//                   control={form.control}
//                   name="category"
//                   options={categories}
//                   isPending={isPending}
//                   label="Category"
//                   defaultValue="Select a category"
//                 />
//                 <div className="gap-2">
//                   {fields.map((field, index) => (
//                     <div
//                       className="form-control flex flex-col gap-2"
//                       key={field.id}
//                     >
//                       <SelectModel
//                         control={form.control}
//                         name={`suppliers.${index}.supplier` as const}
//                         options={getAvailableSuppliers(index)}
//                         isPending={isPending}
//                         label={`Supplier ${index + 1}` as const}
//                         idx={index}
//                         onValueChange={handleSelectChange}
//                         id={true}
//                         defaultValue="Select a supplier"
//                       />
//                       {index > 0 && (
//                         <Button
//                           type="button"
//                           variant="outline"
//                           onClick={() => remove(index)}
//                           className="text-red-500 hover:text-red-700"
//                         >
//                           <Minus className="h-6 w-6" />
//                         </Button>
//                       )}
//                     </div>
//                   ))}
//                   {selectedSuppliers.length === suppliers.length ? (
//                     <div className="rounded-md p-2 cursor-pointer text-indigo-500 hover:text-indigo-700">
//                       No more suppliers
//                     </div>
//                   ) : (
//                     <Button
//                       type="button"
//                       variant="outline"
//                       onClick={() => append({ id: "", supplier: "" })}
//                       className="mt-4 flex cursor-pointer text-indigo-500 hover:text-indigo-700"
//                     >
//                       <Plus className="mr-2 h-4 w-4" />
//                       Add new supplier
//                     </Button>
//                   )}
//                 </div>
//               </div>
//             </div>

//             <div className="mt-8 space-x-6 text-center mb-5">
//               <Button
//                 type="submit"
//                 className="inline-flex items-center justify-center rounded bg-indigo-500 px-12 py-4 text-sm font-medium text-white hover:bg-indigo-600 group-disabled:pointer-events-none"
//               >
//                 <Spinner className="absolute h-4 group-enabled:opacity-0" />
//                 <span className="group-disabled:opacity-0">Save</span>
//               </Button>
//             </div>
//           </fieldset>
//         </form>
//       </Form>
//     </div>
//   )
// }

// export default ProductForm
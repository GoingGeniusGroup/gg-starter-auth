// import { create } from "zustand";

// interface Option {
//   id: string;
//   label: string;
//   value: string;
// }

// import { Product } from "@prisma/client";
// import { getProducts } from "../services/product";

// interface ListOptions {
//   categories: Option[];
//   suppliers: Option[];
//   products: Product[];
//   getValues: () => void;
//   fetchProducts: () => void;
//   isLoading: boolean;
// }

// //https://chatgpt.com/c/66e7ad37-9600-8003-a4e9-09f30ee60bde ( for optimization)
// export const useFetchValues = create<ListOptions>((set) => ({
//   categories: [],
//   suppliers: [],
//   products: [],
//   isLoading: false,

//   fetchProducts: async () => {
//     set({ isLoading: true });
//     try {
//       const productData = await getProducts();

//       // Handle the case where productData might be null and ensure it's an array
//       set({
//         products: productData ? productData.map((product: any) => ({
//           id: product.id,
//           name: product.name,
//           description: product.description,
//           image: product.image || null,  // Assuming your product object may have image as null
//           costPrice: product.costPrice,
//           quantityInStock: product.quantityInStock,
//           validity: product.validity || null,  // Add other fields with fallback
//           discount: product.discount || null,
//           salePrice: product.salePrice,
//           margin: product.margin || null,
//           status: product.status,  // Assuming 'status' is of type ProductStatus
//           categoryId: product.categoryId || product.category.id, // Adjust category assignment
//         })) : [],  // Fallback to empty array if productData is null

//         isLoading: false
//       });
//     } catch (error) {
//       console.error("Failed to fetch products:", error);
//       set({ isLoading: false });
//     }
//   },

//   getValues: async () => {
//     // ... similar implementation for categories and suppliers
//   },
// }));

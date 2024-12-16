import { PhysicalProduct } from "../interface/physicalProduct.interface";

// Mock data for products with multiple images
const physicalProducts: PhysicalProduct[] = [
  {
    id: 1,
    name: "Classic T-Shirt",
    price: 19.99,
    images: [
      "https://purepng.com/public/uploads/large/white-tshirt-n0j.png",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIVucqpahoTxy07vRpCjW-q7yFOl6x7aPKTA&s",
      "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSgZfQJ7Gdl8faPRPDa22VZe3trWauW-3r_KC2mkQfvrcqWjUaA",
    ],
    category: "Clothing",
    description:
      "A comfortable and versatile classic t-shirt, perfect for everyday wear.",
  },
  {
    id: 2,
    name: "Denim Jeans",
    price: 49.99,
    images: [
      "https://static.vecteezy.com/system/resources/thumbnails/021/938/733/small_2x/blue-jeans-isolated-on-a-transparent-background-png.png",
    ],
    category: "Clothing",
    description:
      "High-quality denim jeans that offer both style and durability.",
  },
  {
    id: 3,
    name: "Sneakers",
    price: 79.99,
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSByAWaWoInX4M5P9luXYgAU-Y9W7FisXvTbQ&s",
    ],
    category: "Shoes",
    description:
      "Comfortable and stylish sneakers suitable for various activities.",
  },
  {
    id: 4,
    name: "Hoodie",
    price: 39.99,
    images: [
      "https://png.pngtree.com/png-vector/20240402/ourmid/pngtree-blank-black-male-hoodie-sweatshirt-long-sleeve-with-clipping-path-mens-png-image_12258589.png",
    ],
    category: "Clothing",
    description: "A cozy hoodie that's perfect for layering or lounging.",
  },
  {
    id: 5,
    name: "Sunglasses",
    price: 29.99,
    images: [
      "https://img.drz.lazcdn.com/static/pk/p/b6326aee217bb925d7bc39cd65fead89.jpg_720x720q80.jpg",
    ],
    category: "Accessories",
    description:
      "Stylish sunglasses that provide both UV protection and a fashionable look.",
  },
];

export default physicalProducts;

// import { useState, useEffect } from "react";
// import { db } from "../../firebase/firebase";
// import {
//   addDoc,
//   collection,
//   getDocs,
//   doc,
//   deleteDoc,
// } from "firebase/firestore";
// import axios from "axios";

// const CLOUDINARY_UPLOAD_URL = import.meta.env.VITE_CLOUD_URL;
// const UPLOAD_PRESET = import.meta.env.VITE_UPLOAD_PRESET;

// const ManageProducts = () => {
//   // Form states
//   const [product, setProduct] = useState({
//     name: "",
//     price: "",
//     description: "",
//     category: "sunglasses",
//     gender: "unisex",
//     discount: 0,
//   });
//   const [image, setImage] = useState(null);
//   const [uploading, setUploading] = useState(false);
//   const [message, setMessage] = useState(null);
//   const [activeTab, setActiveTab] = useState("upload");

//   // Products list state
//   const [products, setProducts] = useState([]);
//   const [loadingProducts, setLoadingProducts] = useState(true);

//   // Categories and genders
//   const categories = ["sunglasses", "watches", "shoes", "hoodies"];
//   const genders = ["male", "female", "unisex"];

//   // Handle form input changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setProduct({
//       ...product,
//       [name]: name === "price" || name === "discount" ? Number(value) : value,
//     });
//   };

//   // Upload image to Cloudinary
//   const handleImageUpload = async () => {
//     if (!image) return null;

//     const formData = new FormData();
//     formData.append("file", image);
//     formData.append("upload_preset", UPLOAD_PRESET);

//     const res = await axios.post(CLOUDINARY_UPLOAD_URL, formData);
//     return res.data.secure_url;
//   };

//   // Submit product to Firestore
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setUploading(true);
//     setMessage(null);

//     try {
//       const imageUrl = await handleImageUpload();

//       const newProduct = {
//         ...product,
//         price: parseFloat(product.price),
//         imageUrl,
//         createdAt: new Date().toISOString(),
//       };

//       await addDoc(collection(db, "Product"), newProduct);
//       setMessage({
//         type: "success",
//         text: "✅ Product uploaded successfully!",
//       });
//       // Reset form
//       setProduct({
//         name: "",
//         price: "",
//         description: "",
//         category: "sunglasses",
//         gender: "unisex",
//         discount: 0,
//       });
//       setImage(null);
//       // Refresh products list
//       fetchProducts();
//     } catch (error) {
//       console.error("Upload error:", error);
//       setMessage({ type: "error", text: "❌ Upload failed. Try again." });
//     } finally {
//       setUploading(false);
//     }
//   };

//   // Fetch products from Firestore
//   const fetchProducts = async () => {
//     try {
//       setLoadingProducts(true);
//       const querySnapshot = await getDocs(collection(db, "Product"));
//       const productsData = querySnapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//       }));
//       setProducts(productsData);
//     } catch (error) {
//       console.error("Error fetching products:", error);
//       setMessage({ type: "error", text: "Failed to load products" });
//     } finally {
//       setLoadingProducts(false);
//     }
//   };

//   // Delete product
//   const handleDelete = async (id) => {
//     if (window.confirm("Are you sure you want to delete this product?")) {
//       try {
//         await deleteDoc(doc(db, "Product", id));
//         setMessage({ type: "success", text: "Product deleted successfully" });
//         fetchProducts();
//       } catch (error) {
//         console.error("Error deleting product:", error);
//         setMessage({ type: "error", text: "Failed to delete product" });
//       }
//     }
//   };

//   // Fetch products on component mount
//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   return (
//     <div className="max-w-6xl mx-auto p-6">
//       <h1 className="text-2xl font-bold mb-6">Product Management</h1>

//       {/* Tabs */}
//       <div className="flex border-b mb-6">
//         <button
//           className={`py-2 px-4 font-medium ${
//             activeTab === "upload"
//               ? "border-b-2 border-blue-500 text-blue-600"
//               : "text-gray-500"
//           }`}
//           onClick={() => setActiveTab("upload")}
//         >
//           Upload Product
//         </button>
//         <button
//           className={`py-2 px-4 font-medium ${
//             activeTab === "manage"
//               ? "border-b-2 border-blue-500 text-blue-600"
//               : "text-gray-500"
//           }`}
//           onClick={() => setActiveTab("manage")}
//         >
//           Manage Products ({products.length})
//         </button>
//       </div>

//       {/* Message display */}
//       {message && (
//         <div
//           className={`p-3 mb-6 rounded ${
//             message.type === "success"
//               ? "bg-green-100 text-green-700"
//               : "bg-red-100 text-red-700"
//           }`}
//         >
//           {message.text}
//         </div>
//       )}

//       {/* Upload Product Tab */}
//       {activeTab === "upload" && (
//         <div className="bg-white p-6 rounded-lg shadow">
//           <h2 className="text-xl font-bold mb-4">Upload New Product</h2>
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Product Name
//                 </label>
//                 <input
//                   type="text"
//                   name="name"
//                   value={product.name}
//                   onChange={handleChange}
//                   className="w-full border p-2 rounded"
//                   required
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Price ($)
//                 </label>
//                 <input
//                   type="number"
//                   name="price"
//                   value={product.price}
//                   onChange={handleChange}
//                   className="w-full border p-2 rounded"
//                   min="0"
//                   step="0.01"
//                   required
//                 />
//               </div>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Category
//                 </label>
//                 <select
//                   name="category"
//                   value={product.category}
//                   onChange={handleChange}
//                   className="w-full border p-2 rounded"
//                 >
//                   {categories.map((cat) => (
//                     <option key={cat} value={cat}>
//                       {cat.charAt(0).toUpperCase() + cat.slice(1)}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Gender
//                 </label>
//                 <select
//                   name="gender"
//                   value={product.gender}
//                   onChange={handleChange}
//                   className="w-full border p-2 rounded"
//                 >
//                   {genders.map((gender) => (
//                     <option key={gender} value={gender}>
//                       {gender.charAt(0).toUpperCase() + gender.slice(1)}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Discount (%)
//               </label>
//               <input
//                 type="number"
//                 name="discount"
//                 value={product.discount}
//                 onChange={handleChange}
//                 className="w-full border p-2 rounded"
//                 min="0"
//                 max="100"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Description
//               </label>
//               <textarea
//                 name="description"
//                 value={product.description}
//                 onChange={handleChange}
//                 className="w-full border p-2 rounded"
//                 rows={3}
//                 required
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Product Image
//               </label>
//               <input
//                 type="file"
//                 accept="image/*"
//                 onChange={(e) => setImage(e.target.files[0])}
//                 className="w-full"
//                 required
//               />
//             </div>

//             <button
//               type="submit"
//               className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:opacity-50"
//               disabled={uploading}
//             >
//               {uploading ? "Uploading..." : "Upload Product"}
//             </button>
//           </form>
//         </div>
//       )}

//       {/* Manage Products Tab */}
//       {activeTab === "manage" && (
//         <div className="bg-white p-6 rounded-lg shadow">
//           <h2 className="text-xl font-bold mb-4">Manage Products</h2>

//           {loadingProducts ? (
//             <p>Loading products...</p>
//           ) : products.length === 0 ? (
//             <p>No products found.</p>
//           ) : (
//             <div className="overflow-x-auto">
//               <table className="min-w-full divide-y divide-gray-200">
//                 <thead className="bg-gray-50">
//                   <tr>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Image
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Name
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Category
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Price
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Actions
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody className="bg-white divide-y divide-gray-200">
//                   {products.map((product) => (
//                     <tr key={product.id}>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         {product.imageUrl && (
//                           <img
//                             src={product.imageUrl}
//                             alt={product.name}
//                             className="h-12 w-12 object-cover rounded"
//                           />
//                         )}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <div className="font-medium">{product.name}</div>
//                         <div className="text-sm text-gray-500">
//                           {product.gender}
//                         </div>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">
//                         {product.category}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <div className="font-medium">
//                           ${product.price.toFixed(2)}
//                         </div>
//                         {product.discount > 0 && (
//                           <div className="text-sm text-red-500">
//                             {product.discount}% off
//                           </div>
//                         )}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
//                         <button
//                           onClick={() => handleDelete(product.id)}
//                           className="text-red-600 hover:text-red-900"
//                         >
//                           Delete
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default ManageProducts;

import { useState, useEffect } from "react";
import { db } from "../../firebase/firebase";
import {
  addDoc,
  collection,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import axios from "axios";

const CLOUDINARY_UPLOAD_URL = import.meta.env.VITE_CLOUD_URL;
const UPLOAD_PRESET = import.meta.env.VITE_UPLOAD_PRESET;

const ManageProducts = () => {
  // Form states
  const [product, setProduct] = useState({
    name: "",
    price: "",
    description: "",
    category: "sunglasses",
    gender: "unisex",
    discount: 0,
  });
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState(null);
  const [activeTab, setActiveTab] = useState("upload");
  const [editingId, setEditingId] = useState(null);

  // Products list state
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);

  // Categories and genders
  const categories = ["sunglasses", "watches", "shoes", "hoodies"];
  const genders = ["male", "female", "unisex"];

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: name === "price" || name === "discount" ? Number(value) : value,
    });
  };

  // Upload image to Cloudinary
  const handleImageUpload = async () => {
    if (!image) return null;

    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", UPLOAD_PRESET);

    const res = await axios.post(CLOUDINARY_UPLOAD_URL, formData);
    return res.data.secure_url;
  };

  // Reset form
  const resetForm = () => {
    setProduct({
      name: "",
      price: "",
      description: "",
      category: "sunglasses",
      gender: "unisex",
      discount: 0,
    });
    setImage(null);
    setEditingId(null);
  };

  // Submit product to Firestore
  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);
    setMessage(null);

    try {
      const imageUrl = image ? await handleImageUpload() : product.imageUrl;

      const productData = {
        ...product,
        price: parseFloat(product.price),
        ...(imageUrl && { imageUrl }),
        updatedAt: new Date().toISOString(),
      };

      if (editingId) {
        // Update existing product
        await updateDoc(doc(db, "Product", editingId), productData);
        setMessage({
          type: "success",
          text: "✅ Product updated successfully!",
        });
      } else {
        // Add new product
        productData.createdAt = new Date().toISOString();
        await addDoc(collection(db, "Product"), productData);
        setMessage({
          type: "success",
          text: "✅ Product uploaded successfully!",
        });
      }

      resetForm();
      fetchProducts();
    } catch (error) {
      console.error("Error:", error);
      setMessage({
        type: "error",
        text: editingId
          ? "❌ Update failed. Try again."
          : "❌ Upload failed. Try again.",
      });
    } finally {
      setUploading(false);
    }
  };

  // Fetch products from Firestore
  const fetchProducts = async () => {
    try {
      setLoadingProducts(true);
      const querySnapshot = await getDocs(collection(db, "Product"));
      const productsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(productsData);
    } catch (error) {
      console.error("Error fetching products:", error);
      setMessage({ type: "error", text: "Failed to load products" });
    } finally {
      setLoadingProducts(false);
    }
  };

  // Delete product
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await deleteDoc(doc(db, "Product", id));
        setMessage({ type: "success", text: "Product deleted successfully" });
        fetchProducts();
      } catch (error) {
        console.error("Error deleting product:", error);
        setMessage({ type: "error", text: "Failed to delete product" });
      }
    }
  };

  // Edit product
  const handleEdit = (product) => {
    setEditingId(product.id);
    setProduct({
      name: product.name,
      price: product.price.toString(),
      description: product.description,
      category: product.category,
      gender: product.gender,
      discount: product.discount || 0,
      imageUrl: product.imageUrl,
    });
    setActiveTab("upload");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Fetch products on component mount
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Product Management</h1>

      {/* Tabs */}
      <div className="flex border-b mb-6">
        <button
          className={`py-2 px-4 font-medium ${
            activeTab === "upload"
              ? "border-b-2 border-blue-500 text-blue-600"
              : "text-gray-500"
          }`}
          onClick={() => {
            resetForm();
            setActiveTab("upload");
          }}
        >
          {editingId ? "Edit Product" : "Upload Product"}
        </button>
        <button
          className={`py-2 px-4 font-medium ${
            activeTab === "manage"
              ? "border-b-2 border-blue-500 text-blue-600"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("manage")}
        >
          Manage Products ({products.length})
        </button>
      </div>

      {/* Message display */}
      {message && (
        <div
          className={`p-3 mb-6 rounded ${
            message.type === "success"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {message.text}
        </div>
      )}

      {/* Upload/Edit Product Tab */}
      {activeTab === "upload" && (
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4">
            {editingId ? "Edit Product" : "Upload New Product"}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Product Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={product.name}
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Price ($)
                </label>
                <input
                  type="number"
                  name="price"
                  value={product.price}
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                  min="0"
                  step="0.01"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  name="category"
                  value={product.category}
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Gender
                </label>
                <select
                  name="gender"
                  value={product.gender}
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                >
                  {genders.map((gender) => (
                    <option key={gender} value={gender}>
                      {gender.charAt(0).toUpperCase() + gender.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Discount (%)
              </label>
              <input
                type="number"
                name="discount"
                value={product.discount}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                min="0"
                max="100"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                name="description"
                value={product.description}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                rows={3}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Product Image
              </label>
              {product.imageUrl && !image && (
                <div className="mb-2">
                  <img
                    src={product.imageUrl}
                    alt="Current product"
                    className="h-20 w-20 object-cover rounded"
                  />
                  <p className="text-sm text-gray-500 mt-1">Current image</p>
                </div>
              )}
              <label className="flex flex-col items-center px-4 py-6 bg-white rounded-lg border border-gray-300 cursor-pointer hover:bg-gray-50">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg
                    className="w-8 h-8 mb-4 text-gray-500"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 16"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                    />
                  </svg>
                  <p className="mb-2 text-sm text-gray-500">
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </p>
                  <p className="text-xs text-gray-500">
                    {image ? image.name : "PNG, JPG or JPEG (MAX. 5MB)"}
                  </p>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImage(e.target.files[0])}
                  className="hidden"
                />
              </label>
            </div>

            <div className="flex space-x-4">
              <button
                type="submit"
                className="bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700 disabled:opacity-50"
                disabled={uploading}
              >
                {uploading
                  ? "Processing..."
                  : editingId
                  ? "Update Product"
                  : "Upload Product"}
              </button>
              {editingId && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="bg-gray-200 text-gray-800 py-2 px-6 rounded hover:bg-gray-300"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>
      )}

      {/* Manage Products Tab */}
      {activeTab === "manage" && (
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4">Manage Products</h2>

          {loadingProducts ? (
            <p>Loading products...</p>
          ) : products.length === 0 ? (
            <p>No products found.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Image
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Price
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {products.map((product) => (
                    <tr key={product.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {product.imageUrl && (
                          <img
                            src={product.imageUrl}
                            alt={product.name}
                            className="h-12 w-12 object-cover rounded"
                          />
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium">{product.name}</div>
                        <div className="text-sm text-gray-500">
                          {product.gender}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">
                        {product.category}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium">
                          ${product.price.toFixed(2)}
                        </div>
                        {product.discount > 0 && (
                          <div className="text-sm text-red-500">
                            {product.discount}% off
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                        <button
                          onClick={() => handleEdit(product)}
                          className="text-blue-600 hover:text-blue-900 bg-blue-50 hover:bg-blue-100 px-3 py-1 rounded"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="text-red-600 hover:text-red-900 bg-red-50 hover:bg-red-100 px-3 py-1 rounded"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ManageProducts;

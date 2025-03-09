// import { useState } from 'react';
// import {
//   Container,
//   Typography,
//   Button,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   IconButton,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   TextField,
//   MenuItem,
//   Select,
//   FormControl,
//   InputLabel,
//   Snackbar,
//   Alert,
//   AlertColor,
// } from '@mui/material';
// import { Add, Edit, Delete } from '@mui/icons-material';
// import ProductForm from '@/components/AdminComponents/ProductForm';

// // Mock data for products
// const mockData = [
//   {
//     productID: 1,
//     productCode: 'CIN001',
//     productName: 'Cinnamon Sticks',
//     productDescription: 'High-quality cinnamon sticks from Kandy',
//     sellingPrice: 10.99,
//     measuringUnitType: 'GRAM',
//     productImageURLs: ['https://example.com/cinnamon-sticks.jpg'],
//     createdDate: '2024-01-01',
//     updatedDate: '2024-01-01',
//     productActiveState: true,
//     productRatingValue: 4.5,
//     categoryType: 'FOOD_AND_BEVERAGE',
//     productOriginID: 1,
//   },
//   {
//     productID: 2,
//     productCode: 'CIN002',
//     productName: 'Cinnamon Powder',
//     productDescription: 'Organic cinnamon powder from Galle',
//     sellingPrice: 8.99,
//     measuringUnitType: 'KILO_GRAM',
//     productImageURLs: ['https://example.com/cinnamon-powder.jpg'],
//     createdDate: '2024-01-01',
//     updatedDate: '2024-01-01',
//     productActiveState: true,
//     productRatingValue: 4.7,
//     categoryType: 'FOOD_AND_BEVERAGE',
//     productOriginID: 2,
//   },
// ];

// // Enums for category and measuring unit types
// const CategoryType: { [key: string]: string } = {
//   FOOD_AND_BEVERAGE: 'Food & Beverage',
//   HEALTH_AND_WELLNESS: 'Health & Wellness',
//   PERSONAL_CARE: 'Personal Care',
//   AYURVEDIC: 'Ayurvedic',
//   HOME_AND_LIFE_STYLE: 'Home & Lifestyle',
//   INDUSTRIAL: 'Industrial',
// };

// const MeasuringUnitType = {
//   GRAM: 'Gram',
//   KILO_GRAM: 'Kilogram',
//   LITER: 'Liter',
//   MILLI_LITER: 'Milliliter',
//   NUMBER: 'Number',
// };

// const ProductManagement = () => {
//   const [products, setProducts] = useState(mockData);
//   const [openDialog, setOpenDialog] = useState(false);
//   const [editMode, setEditMode] = useState(false);
//   const [currentProduct, setCurrentProduct] = useState<typeof mockData[0] | null>(null);
//   const [snackbarOpen, setSnackbarOpen] = useState(false);
//   const [snackbarMessage, setSnackbarMessage] = useState('');
//   const [snackbarSeverity, setSnackbarSeverity] = useState<AlertColor>('success');

//   // Handle add product
//   const handleAddClick = () => {
//     setEditMode(false);
//     setCurrentProduct(null);
//     setOpenDialog(true);
//   };

//   // Handle edit product
//   const handleEditClick = (product: typeof mockData[0]) => {
//     setEditMode(true);
//     setCurrentProduct(product);
//     setOpenDialog(true);
//   };

//   // Handle delete product
//   const handleDeleteClick = (id: number) => {
//     setProducts(products.filter((product) => product.productID !== id));
//     setSnackbarMessage('Product deleted successfully!');
//     setSnackbarSeverity('success');
//     setSnackbarOpen(true);
//   };

//   // Handle save/update product
//   const handleSave = (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     const formData = new FormData(event.target as HTMLFormElement);

//     const newProduct = {
//       productID: currentProduct ? currentProduct.productID : products.length + 1,
//       productCode: formData.get('productCode') as string,
//       productName: formData.get('productName') as string,
//       productDescription: formData.get('productDescription') as string,
//       sellingPrice: parseFloat(formData.get('sellingPrice') as string),
//       measuringUnitType: formData.get('measuringUnitType') as string,
//       productImageURLs: (formData.get('productImageURLs') as string)?.split(',') || [],
//       createdDate: new Date().toISOString().split('T')[0],
//       updatedDate: new Date().toISOString().split('T')[0],
//       productActiveState: true,
//       productRatingValue: 0,
//       categoryType: formData.get('categoryType') as string,
//       productOriginID: parseInt(formData.get('productOriginID') as string),
//     };

//     if (currentProduct) {
//       // Update existing product
//       setProducts(
//         products.map((product) =>
//           product.productID === currentProduct.productID ? newProduct : product
//         )
//       );
//       setSnackbarMessage('Product updated successfully!');
//     } else {
//       // Add new product
//       setProducts([...products, newProduct]);
//       setSnackbarMessage('Product added successfully!');
//     }

//     setSnackbarSeverity('success');
//     setSnackbarOpen(true);
//     setOpenDialog(false);
//   };

//   // Handle snackbar close
//   const handleSnackbarClose = () => {
//     setSnackbarOpen(false);
//   };

//   return (
//     <Container maxWidth="lg" style={{ marginTop: '2rem' }}>
//       <Typography variant="h4" gutterBottom style={{ fontFamily: 'Poppins, sans-serif', color: '#1E293B' }}>
//         Product Management
//       </Typography>
//       <Button
//         variant="contained"
//         color="primary"
//         startIcon={<Add />}
//         onClick={handleAddClick}
//         style={{ backgroundColor: '#3B82F6', color: '#FFFFFF' }}
//       >
//         Add Product
//       </Button>

//       {/* Products Table */}
//       <TableContainer component={Paper} style={{ marginTop: '1.5rem', boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)' }}>
//         <Table>
//           <TableHead>
//             <TableRow style={{ backgroundColor: '#F8FAFC' }}>
//               <TableCell style={{ fontWeight: 'bold', color: '#1E293B' }}>Product Code</TableCell>
//               <TableCell style={{ fontWeight: 'bold', color: '#1E293B' }}>Product Name</TableCell>
//               <TableCell style={{ fontWeight: 'bold', color: '#1E293B' }}>Category</TableCell>
//               <TableCell style={{ fontWeight: 'bold', color: '#1E293B' }}>Selling Price</TableCell>
//               <TableCell style={{ fontWeight: 'bold', color: '#1E293B' }}>Unit</TableCell>
//               <TableCell style={{ fontWeight: 'bold', color: '#1E293B' }}>Actions</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {products.map((product) => (
//               <TableRow key={product.productID}>
//                 <TableCell>{product.productCode}</TableCell>
//                 <TableCell>{product.productName}</TableCell>
//                 <TableCell>{CategoryType[product.categoryType as keyof typeof CategoryType]}</TableCell>
//                 <TableCell>${product.sellingPrice.toFixed(2)}</TableCell>
//                 <TableCell>{MeasuringUnitType[product.measuringUnitType as keyof typeof MeasuringUnitType]}</TableCell>
//                 <TableCell>
//                   <IconButton color="primary" onClick={() => handleEditClick(product)}>
//                     <Edit style={{ color: '#3B82F6' }} />
//                   </IconButton>
//                   <IconButton color="secondary" onClick={() => handleDeleteClick(product.productID)}>
//                     <Delete style={{ color: '#EF4444' }} />
//                   </IconButton>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>

//       {/* Add/Edit Product Dialog */}
//       <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
//         <DialogTitle style={{ fontFamily: 'Poppins, sans-serif', color: '#1E293B' }}>
//           {editMode ? 'Edit Product' : 'Add Product'}
//         </DialogTitle>
//         <DialogContent>
//           <form id="product-form" onSubmit={handleSave}>
//             <TextField
//               label="Product Code"
//               name="productCode"
//               fullWidth
//               margin="normal"
//               defaultValue={currentProduct?.productCode}
//               required
//             />
//             <TextField
//               label="Product Name"
//               name="productName"
//               fullWidth
//               margin="normal"
//               defaultValue={currentProduct?.productName}
//               required
//             />
//             <TextField
//               label="Product Description"
//               name="productDescription"
//               fullWidth
//               margin="normal"
//               defaultValue={currentProduct?.productDescription}
//               required
//             />
//             <TextField
//               label="Selling Price"
//               name="sellingPrice"
//               type="number"
//               fullWidth
//               margin="normal"
//               defaultValue={currentProduct?.sellingPrice}
//               required
//             />
//             <FormControl fullWidth margin="normal">
//               <InputLabel>Category</InputLabel>
//               <Select
//                 name="categoryType"
//                 defaultValue={currentProduct?.categoryType || ''}
//                 required
//               >
//                 {Object.keys(CategoryType).map((key) => (
//                   <MenuItem key={key} value={key}>
//                     {CategoryType[key]}
//                   </MenuItem>
//                 ))}
//               </Select>
//             </FormControl>
//             <FormControl fullWidth margin="normal">
//               <InputLabel>Measuring Unit</InputLabel>
//               <Select
//                 name="measuringUnitType"
//                 defaultValue={currentProduct?.measuringUnitType || ''}
//                 required
//               >
//                 {Object.keys(MeasuringUnitType).map((key) => (
//                   <MenuItem key={key} value={key}>
//                     {MeasuringUnitType[key as keyof typeof MeasuringUnitType]}
//                   </MenuItem>
//                 ))}
//               </Select>
//             </FormControl>
//             <TextField
//               label="Product Image URLs (comma-separated)"
//               name="productImageURLs"
//               fullWidth
//               margin="normal"
//               defaultValue={currentProduct?.productImageURLs.join(',')}
//               required
//             />
//             <TextField
//               label="Product Origin ID"
//               name="productOriginID"
//               type="number"
//               fullWidth
//               margin="normal"
//               defaultValue={currentProduct?.productOriginID}
//               required
//             />
//           </form>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setOpenDialog(false)} style={{ color: '#64748B' }}>
//             Cancel
//           </Button>
//           <Button type="submit" form="product-form" variant="contained" style={{ backgroundColor: '#3B82F6', color: '#FFFFFF' }}>
//             {editMode ? 'Update' : 'Save'}
//           </Button>
//         </DialogActions>
//       </Dialog>

//       {/* Snackbar for notifications */}
//       <Snackbar open={snackbarOpen} autoHideDuration={3000} onClose={handleSnackbarClose}>
//         <Alert onClose={handleSnackbarClose} severity={snackbarSeverity}>
//           {snackbarMessage}
//         </Alert>
//       </Snackbar>
//     </Container>
//   );
// };

// export default ProductManagement;

import { useState } from "react";
import {
  Container,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Snackbar,
  Alert,
  AlertColor,
} from "@mui/material";
import { Add, Edit, Delete } from "@mui/icons-material";
import {ProductForm} from "@/components/AdminComponents/ProductForm";

// Define the Product type with productID as required.
export interface Product {
  productID: number;
  productCode: string;
  productName: string;
  productDescription: string;
  sellingPrice: number;
  measuringUnitType: string;
  productImageURLs: string[];
  createdDate?: string;
  updatedDate?: string;
  productActiveState?: boolean;
  productRatingValue?: number;
  categoryType: string;
  productOriginID: number;
}

// Mock data for products
const mockData: Product[] = [
  {
    productID: 1,
    productCode: "CIN001",
    productName: "Cinnamon Sticks",
    productDescription: "High-quality cinnamon sticks from Kandy",
    sellingPrice: 10.99,
    measuringUnitType: "GRAM",
    productImageURLs: ["https://example.com/cinnamon-sticks.jpg"],
    createdDate: "2024-01-01",
    updatedDate: "2024-01-01",
    productActiveState: true,
    productRatingValue: 4.5,
    categoryType: "FOOD_AND_BEVERAGE",
    productOriginID: 1,
  },
  {
    productID: 2,
    productCode: "CIN002",
    productName: "Cinnamon Powder",
    productDescription: "Organic cinnamon powder from Galle",
    sellingPrice: 8.99,
    measuringUnitType: "KILO_GRAM",
    productImageURLs: ["https://example.com/cinnamon-powder.jpg"],
    createdDate: "2024-01-01",
    updatedDate: "2024-01-01",
    productActiveState: true,
    productRatingValue: 4.7,
    categoryType: "FOOD_AND_BEVERAGE",
    productOriginID: 2,
  },
];

// Define a type for form input data (for new products, productID is optional)
type ProductInput = Omit<Product, "productID" | "createdDate" | "updatedDate"> & {
  productID?: number;
  createdDate?: string;
  updatedDate?: string;
};

const ProductManagement = () => {
  const [products, setProducts] = useState<Product[]>(mockData);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<AlertColor>("success");
  const [showProductForm, setShowProductForm] = useState<boolean>(false);

  // Handle add product button click
  const handleAddClick = () => {
    setEditMode(false);
    setCurrentProduct(null);
    setShowProductForm(true); // Show ProductForm instead of table
  };

  // Handle edit product button click
  const handleEditClick = (product: Product) => {
    setEditMode(true);
    setCurrentProduct(product);
    setShowProductForm(true);
  };

  // Handle delete product
  const handleDeleteClick = (id: number) => {
    setProducts(products.filter((product) => product.productID !== id));
    setSnackbarMessage("Product deleted successfully!");
    setSnackbarSeverity("success");
    setSnackbarOpen(true);
  };

  // Handle form submission: Ensure that the new product has a valid productID, createdDate, and updatedDate.
  const handleSave = (productData: ProductInput) => {
    const newProduct: Product = {
      ...productData,
      productID:
        productData.productID !== undefined
          ? productData.productID
          : products.length > 0
          ? Math.max(...products.map((p) => p.productID)) + 1
          : 1,
      createdDate: productData.createdDate || new Date().toISOString().split("T")[0],
      updatedDate: new Date().toISOString().split("T")[0],
    };

    if (editMode && currentProduct) {
      // Update existing product
      setProducts(
        products.map((product) =>
          product.productID === currentProduct.productID ? newProduct : product
        )
      );
      setSnackbarMessage("Product updated successfully!");
    } else {
      // Add new product
      setProducts([...products, newProduct]);
      setSnackbarMessage("Product added successfully!");
    }

    setSnackbarSeverity("success");
    setSnackbarOpen(true);
    setShowProductForm(false); // Return to product table after saving
  };

  // Handle cancel action (return to table)
  const handleCancel = () => {
    setShowProductForm(false);
  };

  // Handle snackbar close
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Container maxWidth="lg" style={{ marginTop: "2rem" }}>
      <Typography
        variant="h4"
        gutterBottom
        style={{ fontFamily: "Poppins, sans-serif", color: "#1E293B" }}
      >
        Product Management
      </Typography>

      {showProductForm ? (
        // Render ProductForm instead of table
        <ProductForm product={currentProduct} onSave={handleSave} onCancel={handleCancel} />
      ) : (
        <>
          <Button
            variant="contained"
            color="primary"
            startIcon={<Add />}
            onClick={handleAddClick}
            style={{ backgroundColor: "#3B82F6", color: "#FFFFFF" }}
          >
            Add Product
          </Button>

          {/* Products Table */}
          <TableContainer
            component={Paper}
            style={{ marginTop: "1.5rem", boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)" }}
          >
            <Table>
              <TableHead>
                <TableRow style={{ backgroundColor: "#F8FAFC" }}>
                  <TableCell style={{ fontWeight: "bold", color: "#1E293B" }}>Product Code</TableCell>
                  <TableCell style={{ fontWeight: "bold", color: "#1E293B" }}>Product Name</TableCell>
                  <TableCell style={{ fontWeight: "bold", color: "#1E293B" }}>Category</TableCell>
                  <TableCell style={{ fontWeight: "bold", color: "#1E293B" }}>Selling Price</TableCell>
                  <TableCell style={{ fontWeight: "bold", color: "#1E293B" }}>Unit</TableCell>
                  <TableCell style={{ fontWeight: "bold", color: "#1E293B" }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {products.map((product) => (
                  <TableRow key={product.productID}>
                    <TableCell>{product.productCode}</TableCell>
                    <TableCell>{product.productName}</TableCell>
                    <TableCell>{product.categoryType}</TableCell>
                    <TableCell>${product.sellingPrice.toFixed(2)}</TableCell>
                    <TableCell>{product.measuringUnitType}</TableCell>
                    <TableCell>
                      <IconButton color="primary" onClick={() => handleEditClick(product)}>
                        <Edit style={{ color: "#3B82F6" }} />
                      </IconButton>
                      <IconButton color="secondary" onClick={() => handleDeleteClick(product.productID)}>
                        <Delete style={{ color: "#EF4444" }} />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}

      {/* Snackbar for notifications */}
      <Snackbar open={snackbarOpen} autoHideDuration={3000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default ProductManagement;

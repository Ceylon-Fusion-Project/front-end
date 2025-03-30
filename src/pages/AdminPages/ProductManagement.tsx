// import { useState, useEffect, SyntheticEvent } from "react";
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
//   Snackbar,
//   Alert,
//   AlertColor,
//   Box,
//   Drawer,
//   SnackbarCloseReason,
// } from "@mui/material";
// import { Add, Edit, Delete, FilterAlt } from "@mui/icons-material";
// import ProductForm from "@/components/AdminComponents/ProductForm";
// import AutoCompleteSearchBar from "@/components/AutoCompletedSearchBar";
// import FilterSideBar from "@/components/FilterSideBar";
// import React from "react";

// export interface Product {
//   productID: number;
//   productCode: string;
//   productName: string;
//   productDescription: string;
//   sellingPrice: number;
//   measuringUnitType: string;
//   productImageURLs: string[];
//       createdDate?: string;
//   updatedDate?: string;
//   productActiveState?: boolean;
//   productRatingValue?: number;
//   categoryType: string;
//   productOrigin: number;
// }

// const mockData: Product[] = [
//   {
//     productID: 1,
//     productCode: "CIN001",
//     productName: "Cinnamon Sticks",
//     productDescription: "High-quality cinnamon sticks from Kandy",
//     sellingPrice: 10.99,
//     measuringUnitType: "GRAM",
//     productImageURLs: ["https://example.com/cinnamon-sticks.jpg"],
//     createdDate: "2024-01-01",
//     updatedDate: "2024-01-01",
//     productActiveState: true,
//     productRatingValue: 4.5,
//     categoryType: "FOOD_AND_BEVERAGE",
//     productOrigin: 1,
//   },
//   {
//     productID: 2,
//     productCode: "CIN002",
//     productName: "Cinnamon Powder",
//     productDescription: "Organic cinnamon powder from Galle",
//     sellingPrice: 8.99,
//     measuringUnitType: "KILO_GRAM",
//     productImageURLs: ["https://example.com/cinnamon-powder.jpg"],
//     createdDate: "2024-01-01",
//     updatedDate: "2024-01-01",
//     productActiveState: true,
//     productRatingValue: 4.7,
//     categoryType: "FOOD_AND_BEVERAGE",
//     productOrigin: 2,
//   },
// ];

// // Define a type for form input data (for new products, productID is optional)
// type ProductInput = Omit<
//   Product,
//   "productID" | "createdDate" | "updatedDate" | "productOriginID"
// > & {
//   productOrigin: number;
//   productID?: number;
//   createdDate?: string;
//   updatedDate?: string;
// };

// const ProductManagement = () => {
//   const [products, setProducts] = useState<Product[]>(mockData);
//   const [filteredProducts, setFilteredProducts] = useState<Product[]>(mockData);
//   const [editMode, setEditMode] = useState<boolean>(false);
//   const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
//   const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
//   const [snackbarMessage, setSnackbarMessage] = useState<string>("");
//   const [snackbarSeverity, setSnackbarSeverity] =
//     useState<AlertColor>("success");
//   const [showProductForm, setShowProductForm] = useState<boolean>(false);
//   const [showFilters, setShowFilters] = useState<boolean>(false);
//   const [searchQuery, setSearchQuery] = useState<string>("");
//   const [filters, setFilters] = useState<any>({});

//   const productNames = mockData.map(product => product.productName);

//   useEffect(() => {
//     let result = [...products];
    
//     if (searchQuery) {
//       result = result.filter(product => 
//         product.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         product.productCode.toLowerCase().includes(searchQuery.toLowerCase())
//       );
//     }
    
//     if (filters.category) {
//       result = result.filter(product => 
//         product.categoryType.toLowerCase().includes(filters.category.toLowerCase())
//       );
//     }
    
//     if (filters.minPrice || filters.maxPrice) {
//       const min = filters.minPrice || 0;
//       const max = filters.maxPrice || Number.MAX_SAFE_INTEGER;
//       result = result.filter(product => 
//         product.sellingPrice >= min && product.sellingPrice <= max
//       );
//     }
    
//     if (filters.averageRating) {
//       result = result.filter(product => 
//         (product.productRatingValue ?? 0) >= filters.averageRating
//       );
//     }
    
//     if (filters.bestSelling) {
//       result = result.filter(product => (product.productRatingValue ?? 0) >= 4);
//     }

//     setFilteredProducts(result);
//   }, [products, searchQuery, filters]);

//   const handleAddClick = () => {
//     setEditMode(false);
//     setCurrentProduct(null);
//     setShowProductForm(true);
//   };

//   const handleEditClick = (product: Product) => {
//     setEditMode(true);
//     setCurrentProduct(product);
//     setShowProductForm(true);
//   };

//   const handleDeleteClick = (id: number) => {
//     setProducts(products.filter(product => product.productID !== id));
//     setSnackbarMessage("Product deleted successfully!");
//     setSnackbarSeverity("success");
//     setSnackbarOpen(true);
//   };

//   const handleSave = (productData: Omit<Product, "productID" | "updatedDate"> & {
//       productID?: number;
//     }) => {
//     const newProduct: Product = {
//       ...productData,
//       productOrigin: productData.productOrigin,
//       productID:
//         productData.productID !== undefined
//           ? productData.productID
//           : products.length > 0
//             ? Math.max(...products.map((p) => p.productID)) + 1
//             : 1,
//       createdDate:
//         productData.createdDate || new Date().toISOString().split("T")[0],
//       updatedDate: new Date().toISOString().split("T")[0],
//     };

//     if (editMode && currentProduct) {
//       setProducts(products.map(product => 
//         product.productID === currentProduct.productID ? newProduct : product
//       ));
//       setSnackbarMessage("Product updated successfully!");
//     } else {
//       setProducts([...products, newProduct]);
//       setSnackbarMessage("Product added successfully!");
//     }

//     setSnackbarSeverity("success");
//     setSnackbarOpen(true);
//     setShowProductForm(false);
//   };

//   const handleCancel = () => {
//     setShowProductForm(false);
//   };

//   const handleSearch = (query: string) => {
//     setSearchQuery(query);
//   };

//   const handleApplyFilters = (newFilters: any) => {
//     setFilters(newFilters);
//     setShowFilters(false);
//   };

//   const clearAllFilters = () => {
//     setSearchQuery("");
//     setFilters({});
//   };

//   const handleSnackbarClose = (
//     _event: Event | SyntheticEvent<any, Event>, 
//     reason: SnackbarCloseReason
//   ) => {
//     if (reason === 'clickaway') {
//       return;
//     }
//     setSnackbarOpen(false);
//   };

//   console.debug(handleSave); // Prevent TS unused warning


//   return (
//     <>
//       {/* Add your content here */}
//       <Container maxWidth="lg" style={{ marginTop: "2rem" }}>
//         <Typography
//           variant="h4"
//           gutterBottom
//           style={{ fontFamily: "Poppins, sans-serif", color: "#1E293B" }}
//         >
//           Product Management
//         </Typography>
//       {showProductForm ? (
//         // Render ProductForm instead of table
//         <React.Fragment>
//           <ProductForm
//             product={currentProduct}
//             onSave={() => {
//               setSnackbarMessage("Saved through BFF");
//               setSnackbarSeverity("success");
//               setSnackbarOpen(true);
//               setShowProductForm(false);
//             }}
//             onCancel={handleCancel}
//           />
//         </React.Fragment>
//       ) : (
//         <>
//           <Button
//             variant="contained"
//             color="primary"
//             startIcon={<Add />}
//               onClick={handleAddClick}
//               style={{ backgroundColor: "#B45309", color: "#FFFFFF" }}
//             >
//               Add Product
//             </Button>

//       {/* Updated Action Bar Layout */}
//       <Box sx={{ 
//         display: 'flex', 
//         alignItems: 'center',
//         gap: 2, 
//         mb: 3,
//         flexWrap: 'wrap'
//       }}>
//         {/* Add Product Button - Left */}
//         <Button
//           variant="contained"
//           color="primary"
//           startIcon={<Add />}
//           onClick={handleAddClick}
//           style={{ 
//             backgroundColor: "#B45309", 
//             color: "#FFFFFF",
//             minWidth: '150px',
//             order: 1 // Ensures it stays on the left
//           }}
//         >
//           Add Product
//         </Button>

//         {/* Search Bar - Middle (shorter) */}
//         <Box sx={{ 
//           flexGrow: 1,
//           maxWidth: '400px', // Shorter width
//           order: 2 // Middle position
//         }}>
//           <AutoCompleteSearchBar 
//             data={productNames} 
//             onSearch={handleSearch} 
//           />
//         </Box>

//         {/* Filter Button - Right */}
//         <Button
//           variant="outlined"
//           startIcon={<FilterAlt />}
//           onClick={() => setShowFilters(true)}
//           style={{ 
//             backgroundColor: "#F8FAFC",
//             borderColor: "#CBD5E1",
//             color: "#1E293B",
//             order: 3, // Ensures it stays on the right
//             marginLeft: 'auto' // Pushes it to the right
//           }}
//         >
//           Filters
//         </Button>
//       </Box>

//       {/* Filter Chips */}
//       {(searchQuery || Object.keys(filters).length > 0) && (
//         <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
//           {searchQuery && (
//             <Box
//               component="span"
//               sx={{
//                 px: 2,
//                 py: 1,
//                 bgcolor: '#E2E8F0',
//                 borderRadius: '16px',
//                 fontSize: '0.875rem',
//                 display: 'flex',
//                 alignItems: 'center',
//                 gap: 1
//               }}
//             >
//               Search: "{searchQuery}"
//               <IconButton size="small" onClick={() => setSearchQuery("")}>
//                 <Delete fontSize="small" style={{ color: "#64748B" }} />
//               </IconButton>
//             </Box>
//           )}
//           {Object.entries(filters).map(([key, value]) => (
//             value !== undefined && (
//               <Box
//                 key={key}
//                 component="span"
//                 sx={{
//                   px: 2,
//                   py: 1,
//                   bgcolor: '#E2E8F0',
//                   borderRadius: '16px',
//                   fontSize: '0.875rem',
//                   display: 'flex',
//                   alignItems: 'center',
//                   gap: 1
//                 }}
//               >
//                 {key}: {String(value)}
//                 <IconButton 
//                   size="small" 
//                   onClick={() => setFilters((prev: typeof filters) => ({ ...prev, [key]: undefined }))}
//                 >
//                   <Delete fontSize="small" style={{ color: "#64748B" }} />
//                 </IconButton>
//               </Box>
//             )
//           ))}
//           <Button 
//             size="small" 
//             onClick={clearAllFilters}
//             style={{ color: "#3B82F6" }}

//           >
//             Clear all
//           </Button>
//         </Box>
//       )}

//       {showProductForm ? (
//         <ProductForm 
//           product={currentProduct} 
//           onSave={handleSave} 
//           onCancel={handleCancel} 
//         />
//       ) : (
//         <>
//           <TableContainer
//             component={Paper}
//             style={{
//               marginTop: "1.5rem",
//               boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
//             }}
//           >
//             <Table>
//               <TableHead>
//                 <TableRow style={{ backgroundColor: "#F8FAFC" }}>
//                   <TableCell style={{ fontWeight: "bold", color: "#1E293B" }}>Product Code</TableCell>
//                   <TableCell style={{ fontWeight: "bold", color: "#1E293B" }}>Product Name</TableCell>
//                   <TableCell style={{ fontWeight: "bold", color: "#1E293B" }}>Category</TableCell>
//                   <TableCell style={{ fontWeight: "bold", color: "#1E293B" }}>Selling Price</TableCell>
//                   <TableCell style={{ fontWeight: "bold", color: "#1E293B" }}>Unit</TableCell>
//                   <TableCell style={{ fontWeight: "bold", color: "#1E293B" }}>Rating</TableCell>
//                   <TableCell style={{ fontWeight: "bold", color: "#1E293B" }}>Actions</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {filteredProducts.map((product) => (
//                   <TableRow key={product.productID}>
//                     <TableCell>{product.productCode}</TableCell>
//                     <TableCell>{product.productName}</TableCell>
//                     <TableCell>{product.categoryType}</TableCell>
//                     <TableCell>${product.sellingPrice.toFixed(2)}</TableCell>
//                     <TableCell>{product.measuringUnitType}</TableCell>
//                     <TableCell>{product.productRatingValue}</TableCell>
//                     <TableCell>
//                       <IconButton
//                         color="primary"
//                         onClick={() => handleEditClick(product)}
//                       >
//                         <Edit style={{ color: "#291e10" }} />
//                       </IconButton>
//                       <IconButton
//                         color="secondary"
//                         onClick={() => handleDeleteClick(product.productID)}
//                       >
//                         <Delete style={{ color: "#EF4444" }} />
//                       </IconButton>
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </TableContainer>

//           {filteredProducts.length === 0 && (
//             <Box sx={{ 
//               display: 'flex', 
//               flexDirection: 'column', 
//               alignItems: 'center', 
//               justifyContent: 'center', 
//               p: 4,
//               mt: 2,
//               backgroundColor: '#F8FAFC',
//               borderRadius: 1
//             }}>
//               <Typography variant="h6" color="textSecondary" gutterBottom>
//                 No products found
//               </Typography>
//               <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
//                 Try adjusting your search or filters
//               </Typography>
//               <Button 
//                 variant="outlined" 
//                 onClick={clearAllFilters}
//                 startIcon={<FilterAlt />}
//               >
//                 Clear filters
//               </Button>
//             </Box>
//           )}
//         </>
//       )}
//       <Drawer
//         anchor="right"
//         open={showFilters}
//         onClose={() => setShowFilters(false)}
//       >
//         <FilterSideBar 
//           onClose={() => setShowFilters(false)} 
//           setFilters={handleApplyFilters}
//         />
//       </Drawer>

//       <Snackbar 
//         open={snackbarOpen} 
//         autoHideDuration={3000} 
//         onClose={handleSnackbarClose}
//       >
//         <Alert 
//           onClose={(event) => handleSnackbarClose(event, 'timeout')} 
//           severity={snackbarSeverity}
//         >
//           {snackbarMessage}
//         </Alert>
//       </Snackbar>
//     </Container>
//   </>
//   );
// };

// export default ProductManagement;


import { useState, useEffect, SyntheticEvent } from "react";
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
  Box,
  Drawer,
  SnackbarCloseReason,
} from "@mui/material";
import { Add, Edit, Delete, FilterAlt } from "@mui/icons-material";
import ProductForm from "@/components/AdminComponents/ProductForm";
import AutoCompleteSearchBar from "@/components/AutoCompletedSearchBar";
import FilterSideBar from "@/components/FilterSideBar";

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
  productOrigin: number;
}

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
    productOrigin: 1,
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
    productOrigin: 2,
  },
];

const ProductManagement = () => {
  const [products, setProducts] = useState<Product[]>(mockData);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(mockData);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<AlertColor>("success");
  const [showProductForm, setShowProductForm] = useState<boolean>(false);
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filters, setFilters] = useState<any>({});

  const productNames = mockData.map(product => product.productName);

  useEffect(() => {
    let result = [...products];
    
    if (searchQuery) {
      result = result.filter(product => 
        product.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.productCode.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    if (filters.category) {
      result = result.filter(product => 
        product.categoryType.toLowerCase().includes(filters.category.toLowerCase())
      );
    }
    
    if (filters.minPrice || filters.maxPrice) {
      const min = filters.minPrice || 0;
      const max = filters.maxPrice || Number.MAX_SAFE_INTEGER;
      result = result.filter(product => 
        product.sellingPrice >= min && product.sellingPrice <= max
      );
    }
    
    if (filters.averageRating) {
      result = result.filter(product => 
        (product.productRatingValue ?? 0) >= filters.averageRating
      );
    }
    
    if (filters.bestSelling) {
      result = result.filter(product => (product.productRatingValue ?? 0) >= 4);
    }

    setFilteredProducts(result);
  }, [products, searchQuery, filters]);

  const handleAddClick = () => {
    setEditMode(false);
    setCurrentProduct(null);
    setShowProductForm(true);
  };

  const handleEditClick = (product: Product) => {
    setEditMode(true);
    setCurrentProduct(product);
    setShowProductForm(true);
  };

  const handleDeleteClick = (id: number) => {
    setProducts(products.filter(product => product.productID !== id));
    setSnackbarMessage("Product deleted successfully!");
    setSnackbarSeverity("success");
    setSnackbarOpen(true);
  };

  const handleSave = (productData: Omit<Product, "productID" | "updatedDate"> & {
    productID?: number;
  }) => {
    const newProduct: Product = {
      ...productData,
      productID: productData.productID || Math.max(...products.map(p => p.productID), 0) + 1,
      createdDate: productData.createdDate || new Date().toISOString().split("T")[0],
      updatedDate: new Date().toISOString().split("T")[0],
    };

    if (editMode && currentProduct) {
      setProducts(products.map(product => 
        product.productID === currentProduct.productID ? newProduct : product
      ));
      setSnackbarMessage("Product updated successfully!");
    } else {
      setProducts([...products, newProduct]);
      setSnackbarMessage("Product added successfully!");
    }

    setSnackbarSeverity("success");
    setSnackbarOpen(true);
    setShowProductForm(false);
  };

  const handleCancel = () => {
    setShowProductForm(false);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleApplyFilters = (newFilters: any) => {
    setFilters(newFilters);
    setShowFilters(false);
  };

  const clearAllFilters = () => {
    setSearchQuery("");
    setFilters({});
  };

  const handleSnackbarClose = (
    _event: Event | SyntheticEvent<any, Event>, 
    reason: SnackbarCloseReason
  ) => {
    if (reason === 'clickaway') {
      return;
    }
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

      {/* Updated Action Bar Layout */}
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center',
        gap: 2, 
        mb: 3,
        flexWrap: 'wrap'
      }}>
        {/* Add Product Button - Left */}
        <Button
          variant="contained"
          color="primary"
          startIcon={<Add />}
          onClick={handleAddClick}
          style={{ 
            backgroundColor: "#B45309", 
            color: "#FFFFFF",
            minWidth: '150px',
            order: 1
          }}
        >
          Add Product
        </Button>

        {/* Search Bar - Middle (shorter) */}
        <Box sx={{ 
          flexGrow: 1,
          maxWidth: '400px',
          order: 2
        }}>
          <AutoCompleteSearchBar 
            data={productNames} 
            onSearch={handleSearch} 
          />
        </Box>

        {/* Filter Button - Right */}
        <Button
          variant="outlined"
          startIcon={<FilterAlt />}
          onClick={() => setShowFilters(true)}
          style={{ 
            backgroundColor: "#F8FAFC",
            borderColor: "#CBD5E1",
            color: "#1E293B",
            order: 3,
            marginLeft: 'auto'
          }}
        >
          Filters
        </Button>
      </Box>

      {/* Filter Chips */}
      {(searchQuery || Object.keys(filters).length > 0) && (
        <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
          {searchQuery && (
            <Box
              component="span"
              sx={{
                px: 2,
                py: 1,
                bgcolor: '#E2E8F0',
                borderRadius: '16px',
                fontSize: '0.875rem',
                display: 'flex',
                alignItems: 'center',
                gap: 1
              }}
            >
              Search: "{searchQuery}"
              <IconButton size="small" onClick={() => setSearchQuery("")}>
                <Delete fontSize="small" style={{ color: "#64748B" }} />
              </IconButton>
            </Box>
          )}
          {Object.entries(filters).map(([key, value]) => (
            value !== undefined && (
              <Box
                key={key}
                component="span"
                sx={{
                  px: 2,
                  py: 1,
                  bgcolor: '#E2E8F0',
                  borderRadius: '16px',
                  fontSize: '0.875rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1
                }}
              >
                {key}: {String(value)}
                <IconButton 
                  size="small" 
                  onClick={() => setFilters((prev: typeof filters) => ({ ...prev, [key]: undefined }))}
                >
                  <Delete fontSize="small" style={{ color: "#64748B" }} />
                </IconButton>
              </Box>
            )
          ))}
          <Button 
            size="small" 
            onClick={clearAllFilters}
            style={{ color: "#3B82F6" }}
          >
            Clear all
          </Button>
        </Box>
      )}

      {showProductForm ? (
        <ProductForm 
          product={currentProduct} 
          onSave={handleSave} 
          onCancel={handleCancel} 
        />
      ) : (
        <>
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
                  <TableCell style={{ fontWeight: "bold", color: "#1E293B" }}>Rating</TableCell>
                  <TableCell style={{ fontWeight: "bold", color: "#1E293B" }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredProducts.map((product) => (
                  <TableRow key={product.productID}>
                    <TableCell>{product.productCode}</TableCell>
                    <TableCell>{product.productName}</TableCell>
                    <TableCell>{product.categoryType}</TableCell>
                    <TableCell>${product.sellingPrice.toFixed(2)}</TableCell>
                    <TableCell>{product.measuringUnitType}</TableCell>
                    <TableCell>{product.productRatingValue}</TableCell>
                    <TableCell>
                      <IconButton 
                        color="primary" 
                        onClick={() => handleEditClick(product)}
                      >
                        <Edit style={{ color: "#291e10" }} />
                      </IconButton>
                      <IconButton 
                        color="secondary" 
                        onClick={() => handleDeleteClick(product.productID)}
                      >
                        <Delete style={{ color: "#EF4444" }} />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {filteredProducts.length === 0 && (
            <Box sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              justifyContent: 'center', 
              p: 4,
              mt: 2,
              backgroundColor: '#F8FAFC',
              borderRadius: 1
            }}>
              <Typography variant="h6" color="textSecondary" gutterBottom>
                No products found
              </Typography>
              <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                Try adjusting your search or filters
              </Typography>
              <Button 
                variant="outlined" 
                onClick={clearAllFilters}
                startIcon={<FilterAlt />}
              >
                Clear filters
              </Button>
            </Box>
          )}
        </>
      )}

      <Drawer
        anchor="right"
        open={showFilters}
        onClose={() => setShowFilters(false)}
      >
        <FilterSideBar 
          onClose={() => setShowFilters(false)} 
          setFilters={handleApplyFilters}
        />
      </Drawer>

      <Snackbar 
        open={snackbarOpen} 
        autoHideDuration={3000} 
        onClose={handleSnackbarClose}
      >
        <Alert 
          onClose={(event) => handleSnackbarClose(event, 'timeout')} 
          severity={snackbarSeverity}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default ProductManagement;
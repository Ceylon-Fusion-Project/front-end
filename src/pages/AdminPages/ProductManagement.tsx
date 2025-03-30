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
import ProductForm from "@/components/AdminComponents/ProductForm"; // default export

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
  productOrigin: number;
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

// Define a type for form input data (for new products, productID is optional)
type ProductInput = Omit<
  Product,
  "productID" | "createdDate" | "updatedDate" | "productOriginID"
> & {
  productOrigin: number;
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
  const [snackbarSeverity, setSnackbarSeverity] =
    useState<AlertColor>("success");
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
      productOrigin: productData.productOrigin,
      productID:
        productData.productID !== undefined
          ? productData.productID
          : products.length > 0
            ? Math.max(...products.map((p) => p.productID)) + 1
            : 1,
      createdDate:
        productData.createdDate || new Date().toISOString().split("T")[0],
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

  console.debug(handleSave); // Prevent TS unused warning


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
        <ProductForm
          product={currentProduct}
          onSave={() => {
            setSnackbarMessage("Saved through BFF");
            setSnackbarSeverity("success");
            setSnackbarOpen(true);
            setShowProductForm(false);
          }}
          onCancel={handleCancel}
        />
      ) : (
        <>
          <Button
            variant="contained"
            color="primary"
            startIcon={<Add />}
            onClick={handleAddClick}
            style={{ backgroundColor: "#B45309", color: "#FFFFFF" }}
          >
            Add Product
          </Button>

          {/* Products Table */}
          <TableContainer
            component={Paper}
            style={{
              marginTop: "1.5rem",
              boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Table>
              <TableHead>
                <TableRow style={{ backgroundColor: "#F8FAFC" }}>
                  <TableCell style={{ fontWeight: "bold", color: "#1E293B" }}>
                    Product Code
                  </TableCell>
                  <TableCell style={{ fontWeight: "bold", color: "#1E293B" }}>
                    Product Name
                  </TableCell>
                  <TableCell style={{ fontWeight: "bold", color: "#1E293B" }}>
                    Category
                  </TableCell>
                  <TableCell style={{ fontWeight: "bold", color: "#1E293B" }}>
                    Selling Price
                  </TableCell>
                  <TableCell style={{ fontWeight: "bold", color: "#1E293B" }}>
                    Unit
                  </TableCell>
                  <TableCell style={{ fontWeight: "bold", color: "#1E293B" }}>
                    Actions
                  </TableCell>
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
        </>
      )}

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default ProductManagement;

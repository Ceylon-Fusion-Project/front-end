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
import api from "@/api/axiosInstance";
import axios from "axios";
import { deleteProduct } from "@/services/productService";
import { v4 as uuidv4 } from "uuid";

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

const ProductManagement = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [_editMode, setEditMode] = useState<boolean>(false);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");
  const [snackbarSeverity, setSnackbarSeverity] =
    useState<AlertColor>("success");
  const [showProductForm, setShowProductForm] = useState<boolean>(false);
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filters, setFilters] = useState<any>({});
  const [page, setPage] = useState<number>(0);
  const [pageSize] = useState<number>(8);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const productNames = products.map((product) => product.productName);

  const fetchProducts = async () => {
    try {
      const hasFilters = searchQuery || Object.keys(filters).length > 0;

      const endpoint = hasFilters
        ? "/product/get-product-by-filtering"
        : "/product/get-all-products";

      const baseParams = {
        activeStatus: true,
        sort: "nameAsc", // can also be made dynamic
        page,
        size: pageSize,
      };

      const filterParams = {
        productName: searchQuery || undefined,
        minPrice: filters.minPrice,
        maxPrice: filters.maxPrice,
        averageRating: filters.averageRating,
        startDate: filters.startDate,
        endDate: filters.endDate,
        category: filters.category,
        activeStatus: filters.activeStatus,
      };

      const params = hasFilters
        ? Object.fromEntries(
            Object.entries({ ...baseParams, ...filterParams }).filter(
              ([_, value]) => value !== undefined
            )
          )
        : baseParams;

      const response = await api.get(endpoint, { params });

      const productList =
        response?.data?.data?.data?.productGetAllResponseDTOS || [];
      const total = response?.data?.data?.data?.totalItems || 0;

      console.log("Fetched products:", productList);

      if (Array.isArray(productList)) {
        setProducts(productList);
        setFilteredProducts(productList);
        setTotalItems(total);
      } else {
        console.error("Unexpected backend format", response.data);
      }
    } catch (err: unknown) {
      console.error("Error fetching products:", err);
      if (axios.isAxiosError(err)) {
        console.error("Axios error:", err.response?.data);
      }
      setSnackbarMessage("Failed to load products");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [page, searchQuery, filters]);

  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

  const handleAddClick = () => {
    setEditMode(false);
    setCurrentProduct(null);
    setShowProductForm(true);
  };

  const handleEditClick = (product: any) => {
    const transformedProduct: Product = {
      ...product,
      productOrigin: product.productOrigin?.originID ?? null, // extract only originID
      productActiveState: product.productActiveState ?? true,
    };
    setEditMode(true);
    setCurrentProduct(transformedProduct);
    setShowProductForm(true);
  };

  const handleDeleteClick = async (id: number) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (!confirmDelete) return;

    if (deletingId === id) return; // prevent double click
    setDeletingId(id);

    try {
      // idempotencyKey generate ONCE per delete
      const idempotencyKey = uuidv4();
      await deleteProduct(id, idempotencyKey); // API call through product service
      setProducts((prev) => prev.filter((product) => product.productID !== id));
      setSnackbarMessage("Product deleted successfully!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
    } catch (error) {
      console.error("Error deleting product:", error);
      setSnackbarMessage("Failed to delete product.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    } finally {
      setDeletingId(null);
    }
  };

  function handleSave() {
    setShowProductForm(false); // close the form
    fetchProducts(); // reload product list
  }

  const handleCancel = () => {
    setShowProductForm(false);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setPage(0);
  };

  const handleApplyFilters = (newFilters: any) => {
    setFilters(newFilters);
    setPage(0); // Reset to page 0 when filters applied
    setShowFilters(false);
  };

  const clearAllFilters = () => {
    setSearchQuery("");
    setPage(0);
    setFilters({});
  };

  const handleSnackbarClose = (
    _event: Event | SyntheticEvent<any, Event>,
    reason: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") return;
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

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          mb: 3,
          flexWrap: "wrap",
        }}
      >
        <Button
          variant="contained"
          color="primary"
          startIcon={<Add />}
          onClick={handleAddClick}
          style={{
            backgroundColor: "#B45309",
            color: "#FFFFFF",
            minWidth: "150px",
          }}
        >
          Add Product
        </Button>
        <Box sx={{ flexGrow: 1, maxWidth: "400px" }}>
          <AutoCompleteSearchBar data={productNames} onSearch={handleSearch} />
        </Box>
        <Button
          variant="outlined"
          startIcon={<FilterAlt />}
          onClick={() => setShowFilters(true)}
          style={{
            backgroundColor: "#F8FAFC",
            borderColor: "#CBD5E1",
            color: "#1E293B",
            marginLeft: "auto",
          }}
        >
          Filters
        </Button>
      </Box>

      {showProductForm ? (
        <ProductForm
          product={currentProduct}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      ) : (
        <>
          {(searchQuery ||
            Object.values(filters).some(
              (value) => value !== undefined && value !== ""
            )) && (
            <Box sx={{ display: "flex", gap: 1, mb: 2, flexWrap: "wrap" }}>
              {searchQuery && (
                <Box
                  component="span"
                  sx={{
                    px: 2,
                    py: 1,
                    bgcolor: "#E2E8F0",
                    borderRadius: "16px",
                    fontSize: "0.875rem",
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  Search: "{searchQuery}"
                  <IconButton size="small" onClick={() => setSearchQuery("")}>
                    <Delete fontSize="small" style={{ color: "#64748B" }} />
                  </IconButton>
                </Box>
              )}
              {Object.entries(filters).map(
                ([key, value]) =>
                  value !== undefined &&
                  value !== "" && (
                    <Box
                      key={key}
                      component="span"
                      sx={{
                        px: 2,
                        py: 1,
                        bgcolor: "#E2E8F0",
                        borderRadius: "16px",
                        fontSize: "0.875rem",
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                      }}
                    >
                      {key}: {String(value)}
                      <IconButton
                        size="small"
                        onClick={() =>
                          setFilters((prev: typeof filters) => ({
                            ...prev,
                            [key]: undefined,
                          }))
                        }
                      >
                        <Delete fontSize="small" style={{ color: "#64748B" }} />
                      </IconButton>
                    </Box>
                  )
              )}
              <Button
                size="small"
                onClick={clearAllFilters}
                style={{ color: "#3B82F6" }}
              >
                Clear all
              </Button>
            </Box>
          )}
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
                    Rating
                  </TableCell>
                  <TableCell style={{ fontWeight: "bold", color: "#1E293B" }}>
                    Actions
                  </TableCell>
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
                        disabled={deletingId === product.productID}
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
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                p: 4,
                mt: 2,
                backgroundColor: "#F8FAFC",
                borderRadius: 1,
              }}
            >
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

          {/* Pagination */}
          {filteredProducts.length > 0 && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                mt: 3,
                gap: 1,
              }}
            >
              <Button
                variant="outlined"
                disabled={page === 0}
                onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
              >
                Previous
              </Button>
              <Typography>
                Page {page + 1} of {Math.ceil(totalItems / pageSize)}
              </Typography>
              <Button
                variant="outlined"
                disabled={page >= Math.ceil(totalItems / pageSize) - 1}
                onClick={() => setPage((prev) => prev + 1)}
              >
                Next
              </Button>
            </Box>
          )}
        </>
      )}

      <Drawer
        anchor="right"
        open={showFilters}
        onClose={() => setShowFilters(false)}
        PaperProps={{
          sx: {
            mt: "64px", // Adjust this if your header is taller or shorter
            height: "calc(100% - 64px)", // Prevent overflow below
          },
        }}
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
          onClose={(event) => handleSnackbarClose(event, "timeout")}
          severity={snackbarSeverity}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default ProductManagement;

"use client";

import { useState, useEffect, useCallback, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import AppLayout from "../../../../components/AppLayout";
import styles from "../../../../styles/addProduct.module.css";
import { 
  Info,
  Layers,
  Image as ImageIcon,
  Plus,
  CloudLightning,
  Eye,
  Copy,
  Truck,
  Globe,
  Star,
  FileText,
  UploadCloud,
  ChevronDown,
  Trash2,
  X,
  AlertCircle,
  CheckCircle2,
  Settings
} from "lucide-react";

function AddProductForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get("editId");
  
  const categoryFields = {
    Clothing: ["sizes", "colors", "material"],
    Furniture: ["weight", "color", "dimensions", "material"],
    Electronics: ["storage", "ram", "warranty"],
    Shoes: ["sizes", "colors"],
  };

  const initialFormState = {
    name: "",
    category: "Clothing",
    subcategory: "Dress",
    brand: "",
    sku: "",
    productType: "physical",
    tags: [],
    gallery: [],
    featuredImage: null,
    description: "",
    abstract: "",
    specifications: {
      sizes: [],
      colors: [],
      material: "",
      weight: "",
      dimensions: "",
      storage: "",
      ram: "",
      warranty: ""
    },
    variants: [
      {
        id: "initial-variant",
        label: "",
        price: "",
        stock: "",
        lowStockAlert: "",
      },
    ],
    shipping: {
      weight: "",
      shippingClass: "standard",
      expressEligible: false,
    },
    seo: {
      metaTitle: "",
      metaDescription: "",
      slug: "",
    },
    status: "draft",
  };

  const [productData, setProductData] = useState(initialFormState);
  const [errors, setErrors] = useState([]);
  const [fieldErrors, setFieldErrors] = useState({});
  const [tagInput, setTagInput] = useState("");
  const [colorInput, setColorInput] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showCancelPopup, setShowCancelPopup] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Restore Draft, Edit Mode & Mounted check
  useEffect(() => {
    setMounted(true);
    
    if (editId) {
      const allProducts = JSON.parse(localStorage.getItem("all-products") || "[]");
      const existingProduct = allProducts.find(p => String(p.id) === String(editId));
      if (existingProduct) {
        setProductData(existingProduct);
      }
    } else {
      const savedDraft = localStorage.getItem("draft-product");
      if (savedDraft) {
        try {
          setProductData(JSON.parse(savedDraft));
        } catch (e) {
          console.error("Failed to restore draft", e);
        }
      }
    }
  }, [editId]);

  // Save Draft
  const saveDraft = useCallback(() => {
    localStorage.setItem("draft-product", JSON.stringify(productData));
    alert("Draft saved successfully!");
  }, [productData]);

  // Auto-generate fields
  // Reset specs on category change
  useEffect(() => {
    setProductData(prev => ({
      ...prev,
      specifications: initialFormState.specifications
    }));
  }, [productData.category]);

  useEffect(() => {
    if (productData.name) {
      setProductData(prev => ({
        ...prev,
        sku: prev.sku || `${prev.name.toUpperCase().replace(/\s+/g, "-")}-001`,
        seo: {
          ...prev.seo,
          metaTitle: prev.seo.metaTitle || prev.name,
          slug: prev.seo.slug || prev.name.toLowerCase().replace(/\s+/g, "-"),
        }
      }));
    }
  }, [productData.name]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setProductData(prev => ({
        ...prev,
        [parent]: { ...prev[parent], [child]: value }
      }));
    } else {
      setProductData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSpecChange = (field, value) => {
    setProductData(prev => ({
      ...prev,
      specifications: { ...prev.specifications, [field]: value }
    }));
  };

  const handleToggleSize = (size) => {
    setProductData(prev => {
      const sizes = prev.specifications.sizes || [];
      const updatedSizes = sizes.includes(size) 
        ? sizes.filter(s => s !== size) 
        : [...sizes, size];
      return {
        ...prev,
        specifications: { ...prev.specifications, sizes: updatedSizes }
      };
    });
  };

  const handleAddColor = (e) => {
    if (e.key === 'Enter' && colorInput.trim()) {
      e.preventDefault();
      const colors = productData.specifications.colors || [];
      if (!colors.includes(colorInput.trim())) {
        handleSpecChange("colors", [...colors, colorInput.trim()]);
      }
      setColorInput("");
    }
  };

  const handleAddVariant = () => {
    setProductData(prev => ({
      ...prev,
      variants: [...prev.variants, { id: crypto.randomUUID(), label: "", price: "", stock: "", lowStockAlert: "" }]
    }));
  };

  const handleRemoveVariant = (id) => {
    if (productData.variants.length > 1) {
      setProductData(prev => ({
        ...prev,
        variants: prev.variants.filter(v => v.id !== id)
      }));
    }
  };

  const handleVariantChange = (id, field, value) => {
    setProductData(prev => ({
      ...prev,
      variants: prev.variants.map(v => v.id === id ? { ...v, [field]: value } : v)
    }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map(file => URL.createObjectURL(file));
    setProductData(prev => {
      const updatedGallery = [...prev.gallery, ...newImages];
      return {
        ...prev,
        gallery: updatedGallery,
        featuredImage: prev.featuredImage || updatedGallery[0]
      };
    });
  };

  const handleRemoveImage = (img) => {
    setProductData(prev => {
      const updatedGallery = prev.gallery.filter(i => i !== img);
      return {
        ...prev,
        gallery: updatedGallery,
        featuredImage: prev.featuredImage === img ? (updatedGallery[0] || null) : prev.featuredImage
      };
    });
  };

  const handleTagAdd = (e) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      if (!productData.tags.includes(tagInput.trim())) {
        setProductData(prev => ({ ...prev, tags: [...prev.tags, tagInput.trim()] }));
      }
      setTagInput("");
    }
  };

  const validate = () => {
    const newErrors = [];
    const newFieldErrors = {};

    if (!productData.name.trim()) {
      newErrors.push("Product name is required.");
      newFieldErrors.name = "Product name is required.";
    }
    if (!productData.category) {
      newErrors.push("Category is required.");
      newFieldErrors.category = "Category is required.";
    }
    if (!productData.brand.trim()) {
      newErrors.push("Brand is required.");
      newFieldErrors.brand = "Brand name is required.";
    }
    if (productData.gallery.length === 0) {
      newErrors.push("At least one product image is required.");
      newFieldErrors.gallery = "At least one image is required.";
    }
    
    if (productData.variants.some(v => !v.price || parseFloat(v.price) <= 0)) {
      newErrors.push("All variants must have a price greater than 0.");
      newFieldErrors.variants = "All variants must have a price > 0.";
    }
    
    if (productData.productType === "physical" && !productData.shipping.weight) {
      newErrors.push("Weight (Shipping) is required for physical products.");
      newFieldErrors.shippingWeight = "Weight is required for physical products.";
    }

    // Category Spec Validation
    if (productData.category === "Clothing" && (!productData.specifications?.sizes || productData.specifications.sizes.length === 0)) {
      newErrors.push("At least one size is required for Clothing.");
      newFieldErrors.specSizes = "At least one size is required.";
    }
    if (productData.category === "Furniture") {
      if (!productData.specifications?.weight) {
        newErrors.push("Weight is required for Furniture.");
        newFieldErrors.specWeight = "Weight is required.";
      }
      if (!productData.specifications?.colors || productData.specifications.colors.length === 0) {
        newErrors.push("At least one color is required for Furniture.");
        newFieldErrors.specColors = "At least one color is required.";
      }
    }
    if (productData.category === "Electronics" && !productData.specifications?.storage) {
      newErrors.push("Storage capacity is required for Electronics.");
      newFieldErrors.specStorage = "Storage required.";
    }
    if (productData.category === "Shoes" && (!productData.specifications?.sizes || productData.specifications.sizes.length === 0)) {
      newErrors.push("At least one shoe size is required.");
      newFieldErrors.specSizes = "At least one shoe size is required.";
    }

    setErrors(newErrors);
    setFieldErrors(newFieldErrors);
    return newErrors.length === 0;
  };

  const handlePublish = () => {
    if (validate()) {
      const existingProducts = JSON.parse(localStorage.getItem("all-products") || "[]");
      let updatedProducts;
      
      if (editId) {
        updatedProducts = existingProducts.map(p => 
          String(p.id) === String(editId) ? { ...productData, updatedAt: new Date().toISOString() } : p
        );
      } else {
        const newProduct = {
          id: crypto.randomUUID(),
          ...productData,
          createdAt: new Date().toISOString(),
          status: "published",
        };
        updatedProducts = [...existingProducts, newProduct];
      }

      localStorage.setItem("all-products", JSON.stringify(updatedProducts));
      localStorage.removeItem("draft-product");
      setShowSuccessModal(true);
    }
  };

  const resetForm = () => {
    setProductData(initialFormState);
    setErrors([]);
  };

  const handleCancelClick = () => {
    if (productData.name || productData.brand || productData.gallery.length > 0) {
      setShowCancelPopup(true);
    } else {
      router.push("/Pages/Products");
    }
  };

  if (!mounted) return null;

  return (
    <AppLayout>
      <div className={styles.container}>
        <div className={styles.headerRow}>
          <div className={styles.titleSection}>
            <h1>{editId ? "Edit Product" : "Add New Product"}</h1>
            <p>{editId 
              ? "Updating your masterpiece with the latest refinements." 
              : "Curate your inventory with precision and editorial flair."}
            </p>
          </div>
          <a href="/sample-products.csv" download className={styles.bulkImport}>
            <Layers size={18} />
            Bulk CSV Import
          </a>
        </div>

        {errors.length > 0 && (
          <div className={styles.errorBox}>
            <div className={styles.errorHeader}>
              <AlertCircle size={20} />
              <h4>Please correct the following errors:</h4>
            </div>
            <ul>
              {errors.map((err, i) => <li key={i}>{err}</li>)}
            </ul>
          </div>
        )}

        <div className={styles.mainLayout}>
          <div className={styles.mainContent}>
            
            <section className={styles.section}>
              <div className={styles.sectionHeader}>
                <Info size={20} className={styles.sectionIcon} />
                <h3 className={styles.sectionTitle}>Product Basic Details</h3>
              </div>
              
              <div className={styles.inputGroup} style={{ marginBottom: '24px' }}>
                <label className={styles.label}>Product Name *</label>
                <input 
                  type="text" 
                  name="name"
                  value={productData.name}
                  onChange={handleInputChange}
                  className={styles.input} 
                  placeholder="e.g. Silk Evening Gown" 
                />
                {fieldErrors.name && <p className={styles.inputError}>{fieldErrors.name}</p>}
              </div>

              <div className={styles.formRow}>
                <div className={styles.inputGroup}>
                  <label className={styles.label}>Category *</label>
                  <select 
                    name="category"
                    value={productData.category}
                    onChange={handleInputChange}
                    className={styles.select}
                  >
                    <option value="Clothing">Clothing</option>
                    <option value="Shoes">Shoes</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Furniture">Furniture</option>
                    <option value="Home">Home</option>
                  </select>
                  {fieldErrors.category && <p className={styles.inputError}>{fieldErrors.category}</p>}
                </div>
                <div className={styles.inputGroup}>
                  <label className={styles.label}>Subcategory</label>
                  <select 
                    name="subcategory"
                    value={productData.subcategory}
                    onChange={handleInputChange}
                    className={styles.select}
                  >
                    <option value="Dress">Dress</option>
                    <option value="Shirt">Shirt</option>
                    <option value="Pants">Pants</option>
                    <option value="Sneakers">Sneakers</option>
                    <option value="Smartphone">Smartphone</option>
                    <option value="Sofa">Sofa</option>
                  </select>
                </div>
              </div>

              <div className={styles.formRow}>
                <div className={styles.inputGroup}>
                  <label className={styles.label}>Brand</label>
                  <input 
                    type="text" 
                    name="brand"
                    value={productData.brand}
                    onChange={handleInputChange}
                    className={styles.input} 
                    placeholder="Brand Name" 
                  />
                  {fieldErrors.brand && <p className={styles.inputError}>{fieldErrors.brand}</p>}
                </div>
                <div className={styles.inputGroup}>
                  <label className={styles.label}>SKU</label>
                  <input 
                    type="text" 
                    name="sku"
                    value={productData.sku}
                    onChange={handleInputChange}
                    className={styles.input} 
                    placeholder="AUTO-GENERATED" 
                  />
                </div>
              </div>

              <div className={styles.inputGroup} style={{ marginBottom: '24px' }}>
                <label className={styles.label}>Product Type</label>
                <div className={styles.typeButtons}>
                  {['physical', 'digital', 'service'].map((type) => (
                    <button 
                      key={type}
                      type="button"
                      className={`${styles.typeBtn} ${productData.productType === type ? styles.typeBtnActive : ""}`}
                      onClick={() => setProductData(prev => ({ ...prev, productType: type }))}
                    >
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label}>Search Tags</label>
                <div className={styles.tagContainer}>
                  {productData.tags.map(tag => (
                    <span key={tag} className={styles.tag}>
                      {tag} 
                      <X size={12} onClick={() => setProductData(prev => ({ ...prev, tags: prev.tags.filter(t => t !== tag) }))} />
                    </span>
                  ))}
                  <input 
                    type="text" 
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={handleTagAdd}
                    className={styles.tagInput} 
                    placeholder="Press enter to add tags..." 
                  />
                </div>
              </div>
            </section>

            <section className={styles.section}>
              <div className={styles.sectionHeader}>
                <ImageIcon size={20} className={styles.sectionIcon} />
                <h3 className={styles.sectionTitle}>Product Gallery *</h3>
              </div>

              <div className={styles.galleryGrid}>
                {productData.gallery.map((img, idx) => (
                   <div key={idx} className={img === productData.featuredImage ? styles.coverImage : styles.thumbnailImage}>
                      {img === productData.featuredImage && <span className={styles.badge}>Featured</span>}
                      <img src={img} alt="Product" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      <div className={styles.imgOverlay}>
                         <button onClick={() => setProductData(p => ({ ...p, featuredImage: img }))}><Star size={16} /></button>
                         <button onClick={() => handleRemoveImage(img)}><Trash2 size={16} /></button>
                      </div>
                   </div>
                ))}
                
                <label className={styles.dropzone}>
                   <input type="file" multiple onChange={handleImageUpload} hidden />
                   <UploadCloud size={24} style={{ color: 'var(--color-primary)' }} />
                   <p>Upload Images</p>
                </label>
              </div>
              {fieldErrors.gallery && <p className={styles.inputError}>{fieldErrors.gallery}</p>}
            </section>

            <section className={styles.section}>
               <div className={styles.sectionHeader}>
                  <Layers size={20} className={styles.sectionIcon} />
                  <h3 className={styles.sectionTitle}>Variants & Options *</h3>
               </div>

               {productData.variants.map((variant) => (
                 <div key={variant.id} className={styles.variantRow}>
                    <div className={styles.inputGroup}>
                      <input 
                        type="text" 
                        placeholder="Label" 
                        className={styles.input} 
                        value={variant.label}
                        onChange={(e) => handleVariantChange(variant.id, 'label', e.target.value)}
                      />
                    </div>
                    <div className={styles.inputGroup}>
                      <input 
                        type="number" 
                        placeholder="Price" 
                        className={styles.input} 
                        value={variant.price}
                        onChange={(e) => handleVariantChange(variant.id, 'price', e.target.value)}
                      />
                    </div>
                    <div className={styles.inputGroup}>
                      <input 
                        type="number" 
                        placeholder="Stock" 
                        className={styles.input} 
                        value={variant.stock}
                        onChange={(e) => handleVariantChange(variant.id, 'stock', e.target.value)}
                      />
                    </div>
                    <div className={styles.inputGroup}>
                      <input 
                        type="number" 
                        placeholder="Low Alert" 
                        className={styles.input} 
                        value={variant.lowStockAlert}
                        onChange={(e) => handleVariantChange(variant.id, 'lowStockAlert', e.target.value)}
                      />
                    </div>
                    <button 
                      onClick={() => handleRemoveVariant(variant.id)}
                      className={styles.removeVariant}
                      disabled={productData.variants.length === 1}
                    >
                      <Trash2 size={18} />
                    </button>
                 </div>
               ))}

                <button className={styles.addSizeBtn} onClick={handleAddVariant}>
                  <Plus size={18} />
                  Add Another Variant
               </button>
               {fieldErrors.variants && <p className={styles.inputError}>{fieldErrors.variants}</p>}
            </section>

            {/* Specifications Section */}
            <section className={styles.section}>
               <div className={styles.sectionHeader}>
                  <Settings size={20} className={styles.sectionIcon} />
                  <h3 className={styles.sectionTitle}>Product Specifications</h3>
               </div>

                {productData.category === "Clothing" && (
                  <div className={styles.specSection}>
                    <div className={styles.inputGroup} style={{ marginBottom: '20px' }}>
                      <label className={styles.label}>Available Sizes *</label>
                      <div className={styles.typeButtons}>
                        {['XS','S','M','L','XL'].map((size) => (
                          <button 
                            key={size}
                            type="button"
                            className={`${styles.typeBtn} ${(productData.specifications?.sizes || []).includes(size) ? styles.typeBtnActive : ""}`}
                            onClick={() => handleToggleSize(size)}
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                      {fieldErrors.specSizes && <p className={styles.inputError}>{fieldErrors.specSizes}</p>}
                    </div>

                    <div className={styles.formRow}>
                      <div className={styles.inputGroup}>
                         <label className={styles.label}>Colors</label>
                         <div className={styles.tagContainer}>
                           {(productData.specifications?.colors || []).map(color => (
                             <span key={color} className={styles.tag}>
                               {color} 
                               <X size={12} onClick={() => handleSpecChange("colors", (productData.specifications?.colors || []).filter(c => c !== color))} />
                             </span>
                           ))}
                           <input 
                             type="text" 
                             value={colorInput}
                             onChange={(e) => setColorInput(e.target.value)}
                             onKeyDown={handleAddColor}
                             className={styles.tagInput} 
                             placeholder="Add colors..." 
                           />
                         </div>
                      </div>
                      <div className={styles.inputGroup}>
                         <label className={styles.label}>Material</label>
                         <input 
                           type="text" 
                           className={styles.input} 
                           placeholder="Cotton, Silk, etc." 
                           value={productData.specifications?.material || ""}
                           onChange={(e) => handleSpecChange("material", e.target.value)}
                         />
                      </div>
                    </div>
                  </div>
                )}

                {productData.category === "Furniture" && (
                  <div className={styles.specSection}>
                    <div className={styles.formRow}>
                      <div className={styles.inputGroup}>
                         <label className={styles.label}>Weight *</label>
                         <input 
                           type="text" 
                           className={styles.input} 
                           placeholder="e.g. 50kg" 
                           value={productData.specifications?.weight || ""}
                           onChange={(e) => handleSpecChange("weight", e.target.value)}
                         />
                         {fieldErrors.specWeight && <p className={styles.inputError}>{fieldErrors.specWeight}</p>}
                      </div>
                      <div className={styles.inputGroup}>
                         <label className={styles.label}>Dimensions</label>
                         <input 
                           type="text" 
                           className={styles.input} 
                           placeholder="L x W x H" 
                           value={productData.specifications?.dimensions || ""}
                           onChange={(e) => handleSpecChange("dimensions", e.target.value)}
                         />
                      </div>
                    </div>
                    <div className={styles.formRow}>
                      <div className={styles.inputGroup}>
                         <label className={styles.label}>Colors *</label>
                         <div className={styles.tagContainer}>
                           {(productData.specifications?.colors || []).map(color => (
                             <span key={color} className={styles.tag}>
                               {color} 
                               <X size={12} onClick={() => handleSpecChange("colors", (productData.specifications?.colors || []).filter(c => c !== color))} />
                             </span>
                           ))}
                           <input 
                             type="text" 
                             value={colorInput}
                             onChange={(e) => setColorInput(e.target.value)}
                             onKeyDown={handleAddColor}
                             className={styles.tagInput} 
                             placeholder="Add and press enter..." 
                           />
                         </div>
                      </div>
                      <div className={styles.inputGroup}>
                         <label className={styles.label}>Material</label>
                         <input 
                           type="text" 
                           className={styles.input} 
                           placeholder="Wood, Metal, etc." 
                           value={productData.specifications?.material || ""}
                           onChange={(e) => handleSpecChange("material", e.target.value)}
                         />
                      </div>
                    </div>
                  </div>
                )}

                {productData.category === "Electronics" && (
                  <div className={styles.specSection}>
                    <div className={styles.formRow}>
                      <div className={styles.inputGroup}>
                         <label className={styles.label}>Storage *</label>
                         <select 
                           className={styles.select}
                           value={productData.specifications?.storage || ""}
                           onChange={(e) => handleSpecChange("storage", e.target.value)}
                         >
                           <option value="">Select Storage</option>
                           <option value="64GB">64GB</option>
                           <option value="128GB">128GB</option>
                           <option value="256GB">256GB</option>
                           <option value="512GB">512GB</option>
                           <option value="1TB">1TB</option>
                         </select>
                         {fieldErrors.specStorage && <p className={styles.inputError}>{fieldErrors.specStorage}</p>}
                      </div>
                      <div className={styles.inputGroup}>
                         <label className={styles.label}>RAM</label>
                         <select 
                           className={styles.select}
                           value={productData.specifications?.ram || ""}
                           onChange={(e) => handleSpecChange("ram", e.target.value)}
                         >
                           <option value="">Select RAM</option>
                           <option value="4GB">4GB</option>
                           <option value="8GB">8GB</option>
                           <option value="12GB">12GB</option>
                           <option value="16GB">16GB</option>
                         </select>
                      </div>
                    </div>
                    <div className={styles.inputGroup}>
                       <label className={styles.label}>Warranty</label>
                       <input 
                          type="text" 
                          className={styles.input} 
                          placeholder="e.g. 1 Year Manufacturers"
                          value={productData.specifications?.warranty || ""}
                          onChange={(e) => handleSpecChange("warranty", e.target.value)}
                       />
                    </div>
                  </div>
                )}

                {productData.category === "Shoes" && (
                  <div className={styles.specSection}>
                     <div className={styles.inputGroup} style={{ marginBottom: '20px' }}>
                       <label className={styles.label}>Shoe Sizes *</label>
                       <div className={styles.typeButtons}>
                         {['38','39','40','41','42','43','44','45'].map((size) => (
                           <button 
                             key={size}
                             type="button"
                             className={`${styles.typeBtn} ${(productData.specifications?.sizes || []).includes(size) ? styles.typeBtnActive : ""}`}
                             onClick={() => handleToggleSize(size)}
                           >
                             {size}
                           </button>
                         ))}
                       </div>
                       {fieldErrors.specSizes && <p className={styles.inputError}>{fieldErrors.specSizes}</p>}
                     </div>
                     <div className={styles.inputGroup}>
                         <label className={styles.label}>Colors</label>
                         <div className={styles.tagContainer}>
                           {(productData.specifications?.colors || []).map(color => (
                             <span key={color} className={styles.tag}>
                               {color} 
                               <X size={12} onClick={() => handleSpecChange("colors", (productData.specifications?.colors || []).filter(c => c !== color))} />
                             </span>
                           ))}
                           <input 
                             type="text" 
                             value={colorInput}
                             onChange={(e) => setColorInput(e.target.value)}
                             onKeyDown={handleAddColor}
                             className={styles.tagInput} 
                             placeholder="Add colors..." 
                           />
                         </div>
                      </div>
                  </div>
                )}

               {!categoryFields[productData.category] && (
                 <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>No specific specifications required for this category.</p>
               )}
            </section>

            <section className={styles.section}>
              <div className={styles.sectionHeader}>
                <FileText size={20} className={styles.sectionIcon} />
                <h3 className={styles.sectionTitle}>Product Narrative</h3>
              </div>

              <div className={styles.inputGroup} style={{ marginBottom: '24px' }}>
                <label className={styles.label}>Short Abstract</label>
                <textarea 
                   name="abstract"
                   value={productData.abstract}
                   onChange={handleInputChange}
                   className={styles.textarea} 
                   placeholder="Brief overview..."
                   rows={3}
                />
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label}>Full Description</label>
                <textarea 
                   name="description"
                   value={productData.description}
                   onChange={handleInputChange}
                   className={styles.textarea} 
                   placeholder="Detailed description..."
                   rows={6}
                />
              </div>
            </section>

            <div style={{ height: '100px' }}></div>
          </div>

          <div className={styles.sidebar}>
            
            <div className={styles.sidebarSection}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h4 className={styles.sidebarTitle} style={{ margin: 0 }}>Status</h4>
                <span className={styles.statusBadge}>{productData.status.toUpperCase()}</span>
              </div>
              
              <div className={styles.secondaryRow} style={{ gridTemplateColumns: '1fr 1fr' }}>
                 <button className={styles.secondaryBtn} onClick={saveDraft}>
                    <Copy size={16} />
                    Save Draft
                 </button>
                 <button className={styles.secondaryBtn} onClick={() => setShowPreview(true)}>
                    <Eye size={16} />
                    Preview
                 </button>
              </div>
            </div>

            {productData.productType === "physical" && (
              <div className={styles.sidebarSection}>
                <h4 className={styles.sidebarTitle}>Shipping & Logistics</h4>
                <div className={styles.inputGroup} style={{ marginBottom: '20px' }}>
                  <label className={styles.label}>Weight (kg) *</label>
                  <input 
                    type="number" 
                    name="shipping.weight"
                    value={productData.shipping.weight}
                    onChange={handleInputChange}
                    className={styles.input} 
                    placeholder="0.00" 
                  />
                  {fieldErrors.shippingWeight && <p className={styles.inputError}>{fieldErrors.shippingWeight}</p>}
                </div>
                <div className={styles.inputGroup}>
                   <label className={styles.label}>Shipping Class</label>
                   {['standard', 'express'].map(cls => (
                     <div 
                        key={cls}
                        className={`${styles.radioOption} ${productData.shipping.shippingClass === cls ? styles.radioSelected : ""}`}
                        onClick={() => setProductData(p => ({ ...p, shipping: { ...p.shipping, shippingClass: cls } }))}
                     >
                        <div className={styles.radioCircle}>
                          <div className={styles.radioInner}></div>
                        </div>
                        {cls.charAt(0).toUpperCase() + cls.slice(1)} Delivery
                     </div>
                   ))}
                </div>
              </div>
            )}

            <div className={styles.sidebarSection}>
              <h4 className={styles.sidebarTitle}>SEO & Discovery</h4>
              <div className={styles.inputGroup} style={{ marginBottom: '20px' }}>
                <label className={styles.label}>Meta Title</label>
                <input 
                  type="text" 
                  name="seo.metaTitle"
                  value={productData.seo.metaTitle}
                  onChange={handleInputChange}
                  className={styles.input} 
                />
              </div>
              <div className={styles.inputGroup}>
                <label className={styles.label}>Product Slug</label>
                <input 
                  type="text" 
                  name="seo.slug"
                  value={productData.seo.slug}
                  onChange={handleInputChange}
                  className={styles.input} 
                />
              </div>
            </div>
          </div>
        </div>

        <div className={styles.bottomBar}>
          <div className={styles.bottomActions}>
            <button className={styles.cancelButton} onClick={handleCancelClick}>Cancel</button>
            <button className={styles.saveDraftButton} onClick={saveDraft}>Save Draft</button>
            <button className={styles.addProductButton} onClick={handlePublish}>
               {editId ? "Update Product" : "Add Product"}
            </button>
          </div>
        </div>
      </div>

      {showSuccessModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.successModal}>
            <div className={styles.successIcon}>
              <CheckCircle2 size={48} />
            </div>
            <h2>{editId ? "Product Updated Successfully" : "Product Added Successfully"}</h2>
            <p>{editId 
              ? "Your changes have been saved and synced with the dashboard." 
              : "Your product has been published and synced with the dashboard."}
            </p>
            <div className={styles.modalActions}>
              <button 
                className={styles.viewBtn}
                onClick={() => router.push("/Pages/Products")}
              >
                View Products
              </button>
              <button 
                className={styles.addMoreBtn}
                onClick={() => {
                  setShowSuccessModal(false);
                  resetForm();
                }}
              >
                Add Another Product
              </button>
            </div>
          </div>
        </div>
      )}

      {showCancelPopup && (
        <div className={styles.modalOverlay}>
          <div className={styles.confirmModal}>
            <div className={styles.alertIcon}>
              <AlertCircle size={40} />
            </div>
            <h2>Discard changes?</h2>
            <p>You have unsaved changes. Are you sure you want to leave this page?</p>
            <div className={styles.modalActions}>
              <button 
                className={styles.discardBtn}
                onClick={() => router.push("/Pages/Products")}
              >
                Yes, Leave
              </button>
              <button 
                className={styles.continueBtn}
                onClick={() => setShowCancelPopup(false)}
              >
                Continue Editing
              </button>
            </div>
          </div>
        </div>
      )}

      {showPreview && (
        <div className={styles.previewOverlay}>
          <div className={styles.previewModal}>
            <div className={styles.previewHeader}>
              <h2>Product Preview</h2>
              <button className={styles.previewClose} onClick={() => setShowPreview(false)}>
                <X size={20} />
              </button>
            </div>
            <div className={styles.previewBody}>
              <div className={styles.previewScroll}>
                <div className={styles.previewBlock}>
                  <h4>Basic Information</h4>
                  <div className={styles.previewInfoGrid}>
                    <div className={styles.infoTile}>
                      <span>Product Name</span>
                      <p>{productData.name || "N/A"}</p>
                    </div>
                    <div className={styles.infoTile}>
                      <span>Category</span>
                      <p>{productData.category} / {productData.subcategory}</p>
                    </div>
                    <div className={styles.infoTile}>
                      <span>Brand</span>
                      <p>{productData.brand || "N/A"}</p>
                    </div>
                    <div className={styles.infoTile}>
                      <span>SKU</span>
                      <p>{productData.sku || "N/A"}</p>
                    </div>
                    <div className={styles.infoTile}>
                      <span>Type</span>
                      <p>{productData.productType.toUpperCase()}</p>
                    </div>
                  </div>
                </div>

                <div className={styles.previewBlock}>
                  <h4>Visual Assets</h4>
                  <div className={styles.previewGallery}>
                    {productData.gallery.map((img, i) => (
                      <img key={i} src={img} alt="" className={styles.previewImg} />
                    ))}
                    {productData.gallery.length === 0 && <p style={{ color: '#999' }}>No images uploaded</p>}
                  </div>
                </div>

                <div className={styles.previewBlock}>
                  <h4>Specifications</h4>
                  <div className={styles.previewInfoGrid}>
                    {productData.category === "Clothing" && (
                      <>
                        <div className={styles.infoTile}>
                          <span>Sizes</span>
                          <p>{(productData.specifications?.sizes || []).join(", ") || "None"}</p>
                        </div>
                        <div className={styles.infoTile}>
                          <span>Material</span>
                          <p>{productData.specifications?.material || "N/A"}</p>
                        </div>
                      </>
                    )}
                    {productData.category === "Electronics" && (
                      <>
                        <div className={styles.infoTile}>
                          <span>Storage</span>
                          <p>{productData.specifications?.storage || "N/A"}</p>
                        </div>
                        <div className={styles.infoTile}>
                          <span>RAM</span>
                          <p>{productData.specifications?.ram || "N/A"}</p>
                        </div>
                      </>
                    )}
                    <div className={styles.infoTile}>
                      <span>Colors</span>
                      <p>{(productData.specifications?.colors || []).join(", ") || "None"}</p>
                    </div>
                  </div>
                </div>

                <div className={styles.previewBlock}>
                   <h4>Dynamic Variants</h4>
                   <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                     {productData.variants.map((v, i) => (
                       <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px', background: '#f9fafb', borderRadius: '8px' }}>
                         <span style={{ fontWeight: 600 }}>{v.label || `Variant ${i+1}`}</span>
                         <span style={{ color: 'var(--color-primary)', fontWeight: 700 }}>₹{v.price || "0"}</span>
                       </div>
                     ))}
                   </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </AppLayout>
  );
}
// Wrap in Suspense for useSearchParams
export default function AddProductPage() {
  return (
    <Suspense fallback={<div>Loading form...</div>}>
      <AddProductForm />
    </Suspense>
  );
}

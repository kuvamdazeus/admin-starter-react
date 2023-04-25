import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Dialog } from "primereact/dialog";
import { FileUpload } from "primereact/fileupload";
import { InputNumber, InputNumberValueChangeEvent } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { RadioButton, RadioButtonChangeEvent } from "primereact/radiobutton";
import { Rating } from "primereact/rating";
import { Toast } from "primereact/toast";
import { Toolbar } from "primereact/toolbar";
import { classNames } from "primereact/utils";
import React, { useEffect, useRef, useState } from "react";
import { ProductService } from "../demo/service/ProductService";
import { Demo } from "../types/types";
import Layout from "../layout/layout";

const Products = () => {
  let initialState: Demo.Product = {
    id: "",
    name: "",
    image: "",
    description: "",
    category: "",
    price: 0,
    quantity: 0,
    rating: 0,
    inventoryStatus: "INSTOCK",
  };

  const [entities, setEntities] = useState<Demo.Product[]>([]);
  const [entityDialog, setEntityDialog] = useState(false);
  const [deleteEntityDialog, setDeleteEntityDialog] = useState(false);
  const [deleteEntitiesDialog, setDeleteEntitiesDialog] = useState(false);
  const [entity, setEntity] = useState<Demo.Product>(initialState);
  const [selectedEntities, setSelectedEntities] = useState<Demo.Product[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [globalFilter, setGlobalFilter] = useState("");
  const toast = useRef<Toast>(null);
  const dt = useRef<DataTable<Demo.Product[]>>(null);

  useEffect(() => {
    ProductService.getAll().then((data) => setEntities(data));
  }, []);

  const openNew = () => {
    setEntity(initialState);
    setSubmitted(false);
    setEntityDialog(true);
  };

  const hideDialog = () => {
    setSubmitted(false);
    setEntityDialog(false);
  };

  const hideDeleteEntityDialog = () => {
    setDeleteEntityDialog(false);
  };

  const hideDeleteEntitiesDialog = () => {
    setDeleteEntitiesDialog(false);
  };

  const saveEntity = () => {
    setSubmitted(true);

    if (entity.name.trim()) {
      let _products = [...entities];
      let _product = { ...entity };
      if (entity.id) {
        const index = findIndexById(entity.id);

        _products[index] = _product;
        toast.current?.show({
          severity: "success",
          summary: "Successful",
          detail: "Product Updated",
          life: 3000,
        });
      } else {
        _product.id = createId();
        _product.image = "product-placeholder.svg";
        _products.push(_product);
        toast.current?.show({
          severity: "success",
          summary: "Successful",
          detail: "Product Created",
          life: 3000,
        });
      }

      setEntities(_products);
      setEntityDialog(false);
      setEntity(initialState);
    }
  };

  const editEntity = (product: Demo.Product) => {
    setEntity({ ...product });
    setEntityDialog(true);
  };

  const confirmDelete = (product: Demo.Product) => {
    setEntity(product);
    setDeleteEntityDialog(true);
  };

  const deleteEntity = () => {
    let _products = entities.filter((val) => val.id !== entity.id);
    setEntities(_products);
    setDeleteEntityDialog(false);
    setEntity(initialState);
    toast.current?.show({
      severity: "success",
      summary: "Successful",
      detail: "Product Deleted",
      life: 3000,
    });
  };

  const findIndexById = (id: string) => {
    let index = -1;
    for (let i = 0; i < entities.length; i++) {
      if (entities[i].id === id) {
        index = i;
        break;
      }
    }

    return index;
  };

  const createId = () => {
    let id = "";
    let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < 5; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  };

  const exportCSV = () => {
    dt.current?.exportCSV();
  };

  const confirmDeleteSelected = () => {
    setDeleteEntitiesDialog(true);
  };

  const deleteSelected = () => {
    let _products = entities.filter((val) => !selectedEntities?.includes(val));
    setEntities(_products);
    setDeleteEntitiesDialog(false);
    setSelectedEntities([]);
    toast.current?.show({
      severity: "success",
      summary: "Successful",
      detail: "Products Deleted",
      life: 3000,
    });
  };

  const onCategoryChange = (e: RadioButtonChangeEvent) => {
    let _product = { ...entity };
    _product["category"] = e.value;
    setEntity(_product);
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, name: string) => {
    const val = (e.target && e.target.value) || "";
    let _product = { ...entity };
    _product[`${name}`] = val;

    setEntity(_product);
  };

  const onInputNumberChange = (e: InputNumberValueChangeEvent, name: string) => {
    const val = e.value || 0;
    let _product = { ...entity };
    _product[`${name}`] = val;

    setEntity(_product);
  };

  const leftToolbarTemplate = () => {
    return (
      <React.Fragment>
        <div className="my-2">
          <Button label="New" icon="pi pi-plus" severity="success" className=" mr-2" onClick={openNew} />
          <Button
            label="Delete"
            icon="pi pi-trash"
            severity="danger"
            onClick={confirmDeleteSelected}
            disabled={!selectedEntities || !selectedEntities.length}
          />
        </div>
      </React.Fragment>
    );
  };

  const rightToolbarTemplate = () => {
    return (
      <React.Fragment>
        <FileUpload
          mode="basic"
          accept="image/*"
          maxFileSize={1000000}
          chooseLabel="Import"
          className="mr-2 inline-block"
        />
        <Button label="Export" icon="pi pi-upload" severity="help" onClick={exportCSV} />
      </React.Fragment>
    );
  };

  // ------- Column Body Templates --------
  const codeBodyTemplate = (rowData: Demo.Product) => {
    return <>{rowData.code}</>;
  };

  const nameBodyTemplate = (rowData: Demo.Product) => {
    return <>{rowData.name}</>;
  };

  const imageBodyTemplate = (rowData: Demo.Product) => {
    return (
      <>
        <img
          src={`/demo/images/product/${rowData.image}`}
          alt={rowData.image}
          className="shadow-2"
          width="100"
        />
      </>
    );
  };

  const actionBodyTemplate = (rowData: Demo.Product) => {
    return (
      <>
        <Button
          icon="pi pi-pencil"
          rounded
          severity="success"
          className="mr-2"
          onClick={() => editEntity(rowData)}
        />
        <Button icon="pi pi-trash" rounded severity="warning" onClick={() => confirmDelete(rowData)} />
      </>
    );
  };
  // ------- Column Body Templates --------

  const header = (
    <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
      <h5 className="m-0">Manage Products</h5>
      <span className="block mt-2 md:mt-0 p-input-icon-left">
        <i className="pi pi-search" />
        <InputText
          type="search"
          onInput={(e) => setGlobalFilter(e.currentTarget.value)}
          placeholder="Search..."
        />
      </span>
    </div>
  );

  const entityDialogFooter = (
    <>
      <Button label="Cancel" icon="pi pi-times" text onClick={hideDialog} />
      <Button label="Save" icon="pi pi-check" text onClick={saveEntity} />
    </>
  );
  const deleteEntityDialogFooter = (
    <>
      <Button label="No" icon="pi pi-times" text onClick={hideDeleteEntityDialog} />
      <Button label="Yes" icon="pi pi-check" text onClick={deleteEntity} />
    </>
  );
  const deleteEntitiesDialogFooter = (
    <>
      <Button label="No" icon="pi pi-times" text onClick={hideDeleteEntitiesDialog} />
      <Button label="Yes" icon="pi pi-check" text onClick={deleteSelected} />
    </>
  );

  return (
    <div className="grid crud-demo">
      <div className="col-12">
        <div className="card">
          <Toast ref={toast} />
          <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>

          <DataTable
            ref={dt}
            value={entities}
            selection={selectedEntities}
            onSelectionChange={(e) => setSelectedEntities(e.value as Demo.Product[])}
            dataKey="id"
            paginator
            rows={10}
            rowsPerPageOptions={[5, 10, 25]}
            className="datatable-responsive"
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
            globalFilter={globalFilter}
            emptyMessage="No products found."
            header={header}
            responsiveLayout="scroll"
          >
            <Column selectionMode="multiple" headerStyle={{ width: "4rem" }}></Column>
            <Column
              field="code"
              header="Code"
              sortable
              body={codeBodyTemplate}
              headerStyle={{ minWidth: "15rem" }}
            ></Column>
            <Column
              field="name"
              header="Name"
              sortable
              body={nameBodyTemplate}
              headerStyle={{ minWidth: "15rem" }}
            ></Column>
            <Column header="Image" body={imageBodyTemplate}></Column>
            <Column body={actionBodyTemplate} headerStyle={{ minWidth: "10rem" }}></Column>
          </DataTable>

          <Dialog
            visible={entityDialog}
            style={{ width: "450px" }}
            header="Product Details"
            modal
            className="p-fluid"
            footer={entityDialogFooter}
            onHide={hideDialog}
          >
            {entity.image && (
              <img
                src={`/demo/images/product/${entity.image}`}
                alt={entity.image}
                width="150"
                className="mt-0 mx-auto mb-5 block shadow-2"
              />
            )}
            <div className="field">
              <label htmlFor="name">Name</label>
              <InputText
                id="name"
                value={entity.name}
                onChange={(e) => onInputChange(e, "name")}
                required
                autoFocus
                className={classNames({ "p-invalid": submitted && !entity.name })}
              />
              {submitted && !entity.name && <small className="p-invalid">Name is required.</small>}
            </div>
            <div className="field">
              <label htmlFor="description">Description</label>
              <InputTextarea
                id="description"
                value={entity.description}
                onChange={(e) => onInputChange(e, "description")}
                required
                rows={3}
                cols={20}
              />
            </div>

            <div className="field">
              <label className="mb-3">Category</label>
              <div className="formgrid grid">
                <div className="field-radiobutton col-6">
                  <RadioButton
                    inputId="category1"
                    name="category"
                    value="Accessories"
                    onChange={onCategoryChange}
                    checked={entity.category === "Accessories"}
                  />
                  <label htmlFor="category1">Accessories</label>
                </div>
                <div className="field-radiobutton col-6">
                  <RadioButton
                    inputId="category2"
                    name="category"
                    value="Clothing"
                    onChange={onCategoryChange}
                    checked={entity.category === "Clothing"}
                  />
                  <label htmlFor="category2">Clothing</label>
                </div>
                <div className="field-radiobutton col-6">
                  <RadioButton
                    inputId="category3"
                    name="category"
                    value="Electronics"
                    onChange={onCategoryChange}
                    checked={entity.category === "Electronics"}
                  />
                  <label htmlFor="category3">Electronics</label>
                </div>
                <div className="field-radiobutton col-6">
                  <RadioButton
                    inputId="category4"
                    name="category"
                    value="Fitness"
                    onChange={onCategoryChange}
                    checked={entity.category === "Fitness"}
                  />
                  <label htmlFor="category4">Fitness</label>
                </div>
              </div>
            </div>

            <div className="formgrid grid">
              <div className="field col">
                <label htmlFor="price">Price</label>
                <InputNumber
                  id="price"
                  value={entity.price}
                  onValueChange={(e) => onInputNumberChange(e, "price")}
                  mode="currency"
                  currency="USD"
                  locale="en-US"
                />
              </div>
              <div className="field col">
                <label htmlFor="quantity">Quantity</label>
                <InputNumber
                  id="quantity"
                  value={entity.quantity}
                  onValueChange={(e) => onInputNumberChange(e, "quantity")}
                />
              </div>
            </div>
          </Dialog>

          <Dialog
            visible={deleteEntityDialog}
            style={{ width: "450px" }}
            header="Confirm"
            modal
            footer={deleteEntityDialogFooter}
            onHide={hideDeleteEntityDialog}
          >
            <div className="flex align-items-center justify-content-center">
              <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: "2rem" }} />
              {entity && (
                <span>
                  Are you sure you want to delete <b>{entity.name}</b>?
                </span>
              )}
            </div>
          </Dialog>

          <Dialog
            visible={deleteEntitiesDialog}
            style={{ width: "450px" }}
            header="Confirm"
            modal
            footer={deleteEntitiesDialogFooter}
            onHide={hideDeleteEntitiesDialog}
          >
            <div className="flex align-items-center justify-content-center">
              <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: "2rem" }} />
              {entity && <span>Are you sure you want to delete the selected products?</span>}
            </div>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default function ProductsPage() {
  return (
    <Layout>
      <Products />
    </Layout>
  );
}

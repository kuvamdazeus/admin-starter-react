import React, { useEffect, useRef, useState } from "react";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Dialog } from "primereact/dialog";
import { InputNumber, InputNumberValueChangeEvent } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Toast } from "primereact/toast";
import { Toolbar } from "primereact/toolbar";
import { classNames } from "primereact/utils";
import { ProductService } from "@/demo/service/ProductService";
import Layout from "@/layout/layout";
import { IProduct } from "@/types/products";

const Products = () => {
  let initialState: IProduct = {
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
  const importCsvInputRef = useRef<HTMLInputElement | null>(null);

  const [entities, setEntities] = useState<IProduct[]>([]);
  const [entityDialog, setEntityDialog] = useState(false);
  const [deleteEntityDialog, setDeleteEntityDialog] = useState(false);
  const [deleteEntitiesDialog, setDeleteEntitiesDialog] = useState(false);
  const [entity, setEntity] = useState<IProduct>(initialState);
  const [selectedEntities, setSelectedEntities] = useState<IProduct[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [globalFilter, setGlobalFilter] = useState("");
  const toast = useRef<Toast>(null);
  const dt = useRef<DataTable<IProduct[]>>(null);

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

  const saveEntity = async () => {
    setSubmitted(true);

    if (entity.name.trim()) {
      let _products: IProduct[] = [];

      if (entity.id) {
        _products = await ProductService.updateById(entity.id, entity);

        toast.current?.show({
          severity: "success",
          summary: "Successful",
          detail: "Product Updated",
          life: 3000,
        });
      } else {
        _products = await ProductService.createOne(entity);

        toast.current?.show({
          severity: "success",
          summary: "Successful",
          detail: "Product Created",
          life: 3000,
        });
      }

      setEntities(_products);
      // setEntityDialog(false);
      // setEntity(initialState);
    }
  };

  const editEntity = (rowData: IProduct) => {
    setEntity({ ...rowData });
    setEntityDialog(true);
  };

  const confirmDelete = (rowData: IProduct) => {
    setEntity(rowData);
    setDeleteEntityDialog(true);
  };

  const deleteEntity = async () => {
    const _products = await ProductService.deleteById(entity.id);

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

  const exportCSV = () => {
    dt.current?.exportCSV();
  };

  const confirmDeleteSelected = () => {
    setDeleteEntitiesDialog(true);
  };

  const deleteSelected = async () => {
    const _products = await ProductService.deleteSelected(selectedEntities);

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

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, name: string) => {
    const val = (e.target && e.target.value) || "";
    let newEntity = { ...entity };
    newEntity[`${name}`] = val;

    // setEntity(newEntity);
  };

  const onInputNumberChange = (e: InputNumberValueChangeEvent, name: string) => {
    const val = e.value || 0;
    let newEntity = { ...entity };
    newEntity[`${name}`] = val;

    // setEntity(newEntity);
  };

  const onFileImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const csvFile = e.target.files?.[0];
    if (!csvFile) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const csvTextContent = e.target?.result as string;
      // ...
    };

    reader.readAsText(csvFile);

    // setEntities(_products);
    toast.current?.show({
      severity: "success",
      summary: "Successful",
      detail: "Products Imported",
      life: 3000,
    });
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
        <Button
          label="Import CSV"
          icon="pi pi-plus"
          severity="info"
          className="mr-3"
          onClick={() => importCsvInputRef.current?.click()}
        />
        <input ref={importCsvInputRef} onChange={onFileImport} className="hidden" type="file" accept=".csv" />

        <Button label="Export" icon="pi pi-upload" severity="help" onClick={exportCSV} />
      </React.Fragment>
    );
  };

  // ------- Column Body Templates --------
  const codeBodyTemplate = (rowData: IProduct) => {
    return <>{rowData.code}</>;
  };

  const nameBodyTemplate = (rowData: IProduct) => {
    return <>{rowData.name}</>;
  };

  const imageBodyTemplate = (rowData: IProduct) => {
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

  const actionBodyTemplate = (rowData: IProduct) => {
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
            onSelectionChange={(e) => setSelectedEntities(e.value as IProduct[])}
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

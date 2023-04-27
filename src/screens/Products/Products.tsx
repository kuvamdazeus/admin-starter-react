import React, { useEffect, useRef, useState } from "react";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import { Toolbar } from "primereact/toolbar";
import { ProductService } from "@/service/ProductService";
import Layout from "@/layout/layout";
import { ProductsType } from "@/types/products";
import { useNavigate } from "react-router-dom";

const Products = () => {
  const navigate = useNavigate();

  let initialState: ProductsType = {
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

  const [entities, setEntities] = useState<ProductsType[]>([]);
  const [deleteEntityDialog, setDeleteEntityDialog] = useState(false);
  const [deleteEntitiesDialog, setDeleteEntitiesDialog] = useState(false);
  const [entity, setEntity] = useState<ProductsType>(initialState);
  const [selectedEntities, setSelectedEntities] = useState<ProductsType[]>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const toast = useRef<Toast>(null);
  const dt = useRef<DataTable<ProductsType[]>>(null);

  useEffect(() => {
    ProductService.getAll().then((data) => setEntities(data));
  }, []);

  const hideDeleteEntityDialog = () => {
    setDeleteEntityDialog(false);
  };

  const hideDeleteEntitiesDialog = () => {
    setDeleteEntitiesDialog(false);
  };

  const confirmDelete = (rowData: ProductsType) => {
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
          <Button
            label="New"
            icon="pi pi-plus"
            severity="success"
            className=" mr-2"
            onClick={() => navigate("/products/create")}
          />
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
  const codeBodyTemplate = (rowData: ProductsType) => {
    return <>{rowData.code}</>;
  };

  const nameBodyTemplate = (rowData: ProductsType) => {
    return <>{rowData.name}</>;
  };

  const imageBodyTemplate = (rowData: ProductsType) => {
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

  const actionBodyTemplate = (rowData: ProductsType) => {
    return (
      <>
        <Button
          icon="pi pi-pencil"
          rounded
          severity="success"
          className="mr-2"
          onClick={() => navigate("/products/edit/" + rowData.id)}
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
            onSelectionChange={(e) => setSelectedEntities(e.value as ProductsType[])}
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

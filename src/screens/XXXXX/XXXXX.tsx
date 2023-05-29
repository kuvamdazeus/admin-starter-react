import React, { useRef, useState } from "react";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import Layout from "@/layout/layout";
import { XXXXXType } from "@/types/xxxxx";
import { useNavigate } from "react-router-dom";
import { fetcher } from "@/usefetcher";
import { ServerResponse } from "@/types/types";

const XXXXX = () => {
  const navigate = useNavigate();

  const initialState: XXXXXType = {
    /*INITIAL_STATE_FIELDS*/
  };

  const importCsvInputRef = useRef<HTMLInputElement | null>(null);

  const [deleteEntityDialog, setDeleteEntityDialog] = useState(false);
  const [deleteEntitiesDialog, setDeleteEntitiesDialog] = useState(false);
  const [entity, setEntity] = useState<XXXXXType>(initialState);
  const [selectedEntities, setSelectedEntities] = useState<XXXXXType[]>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const toast = useRef<Toast>(null);
  const dt = useRef<DataTable<XXXXXType[]>>(null);

  const { data: entities, refetchData: refetchEntities } =
    fetcher.useGET<ServerResponse<XXXXXType[]>>("/xxxxx");

  const { postData: deleteEntities } = fetcher.usePOST<ServerResponse<any>>("/xxxxx/delete", {
    onSuccess: async ({ message }) => {
      toast.current?.show({
        severity: "success",
        summary: "Successful",
        detail: message,
        life: 3000,
      });

      refetchEntities();
    },
    onError: async ({ fetchResponse }) => {
      const error = (await fetchResponse.json()) as ServerResponse<any>;

      toast.current?.show({
        severity: "error",
        summary: "Error occured",
        detail: error.message,
        life: 3000,
      });
    },
  });

  const { deleteData } = fetcher.useDELETE({
    onSuccess: () => refetchEntities(),
  });

  const hideDeleteEntityDialog = () => {
    setDeleteEntityDialog(false);
  };

  const hideDeleteEntitiesDialog = () => {
    setDeleteEntitiesDialog(false);
  };

  const confirmDelete = (rowData: XXXXXType) => {
    setEntity(rowData);
    setDeleteEntityDialog(true);
  };

  const deleteEntity = async () => {
    const { error } = await deleteData(`/xxxxx/${entity.id}`);

    if (!error) {
      setDeleteEntityDialog(false);
      setEntity(initialState);
    }
  };

  const exportCSV = () => {
    dt.current?.exportCSV();
  };

  const confirmDeleteSelected = () => {
    setDeleteEntitiesDialog(true);
  };

  const deleteSelected = async () => {
    const { error } = await deleteEntities({ ids: selectedEntities.map((entity) => entity.id) });

    if (!error) {
      setDeleteEntitiesDialog(false);
      setSelectedEntities([]);
    }
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

    // setEntities(_xxxxx);
    toast.current?.show({
      severity: "success",
      summary: "Successful",
      detail: "XXXXX Imported",
      life: 3000,
    });
  };

  // ------- Column Body Templates --------
  const textBodyTemplate = (rowData: XXXXXType, fieldName: string) => {
    return <>{`${rowData[fieldName]}`}</>;
  };

  const imageBodyTemplate = (rowData: XXXXXType, fieldName: string) => {
    return (
      <>
        <img src={rowData[fieldName]} className="shadow-2" width="100" alt={fieldName} />
      </>
    );
  };

  const actionBodyTemplate = (rowData: XXXXXType) => {
    return (
      <>
        <Button
          icon="pi pi-pencil"
          rounded
          severity="success"
          className="mr-2"
          onClick={() => navigate("/xxxxx/edit/" + rowData.id)}
        />
        <Button icon="pi pi-trash" rounded severity="warning" onClick={() => confirmDelete(rowData)} />
      </>
    );
  };
  // ------- Column Body Templates --------

  const header = (
    <div className="flex justify-content-between">
      <div>
        <span className="p-input-icon-left mr-2">
          <i className="pi pi-search" />
          <InputText
            type="search"
            onInput={(e) => setGlobalFilter(e.currentTarget.value)}
            placeholder="Search..."
          />
        </span>
        <Button
          label="Delete Selected"
          icon="pi pi-trash"
          severity="danger"
          onClick={confirmDeleteSelected}
          disabled={!selectedEntities || !selectedEntities.length}
        />
      </div>
      <div>
        <Button
          label="Import CSV"
          icon="pi pi-plus"
          severity="info"
          className="mr-3"
          onClick={() => importCsvInputRef.current?.click()}
        />
        <input ref={importCsvInputRef} onChange={onFileImport} className="hidden" type="file" accept=".csv" />

        <Button label="Export" icon="pi pi-upload" severity="help" onClick={exportCSV} />
        <Button
          label="New"
          icon="pi pi-plus"
          severity="success"
          className=" mr-2"
          onClick={() => navigate("/xxxxx/create")}
        />
      </div>
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
          <h4>Manage xxxxx</h4>
          <DataTable
            ref={dt}
            value={entities?.data || []}
            selection={selectedEntities}
            onSelectionChange={(e) => setSelectedEntities(e.value as XXXXXType[])}
            dataKey="id"
            paginator
            rows={10}
            rowsPerPageOptions={[5, 10, 25]}
            className="datatable-responsive"
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} xxxxx"
            globalFilter={globalFilter}
            emptyMessage="No xxxxx found."
            header={header}
            responsiveLayout="scroll"
          >
            <Column selectionMode="multiple" headerStyle={{ width: "4rem" }}></Column>
            <Column header="Action" body={actionBodyTemplate} headerStyle={{ minWidth: "10rem" }}></Column>
            {/*TABLE_COLUMNS*/}
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
              {entity && <span>Are you sure you want to delete?</span>}
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
              {entity && <span>Are you sure you want to delete the selected xxxxx?</span>}
            </div>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default function XXXXXPage() {
  return (
    <Layout>
      <XXXXX />
    </Layout>
  );
}

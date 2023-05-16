import Layout from "@/layout/layout";
import { XXXXXService } from "@/service/XXXXXService";
import { XXXXXType } from "@/types/xxxxx";
import { Button } from "primereact/button";
import { InputNumber, InputNumberValueChangeEvent } from "primereact/inputnumber";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Toast } from "primereact/toast";
import { classNames } from "primereact/utils";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { RadioButton } from "primereact/radiobutton";
import { InputSwitch } from "primereact/inputswitch";
import { FileUpload } from "primereact/fileupload";
import { fetcher } from "@/usefetcher";

function EditXXXXX() {
  const params = useParams();

  const initialState: XXXXXType = {
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

  const id = params.id;

  const toast = useRef<Toast>(null);

  const [entity, setEntity] = useState(initialState);
  const [submitted, setSubmitted] = useState(false);

  fetcher.useGET<XXXXXType>(`/xxxxx/${id}`, {
    onSuccess: (data) => setEntity(data),
  });

  const { patchData: patchEntity } = fetcher.usePATCH();

  const saveEntity = async () => {
    setSubmitted(true);

    if (entity.name.trim()) {
      await patchEntity(`/xxxxx/${id}`, entity);

      toast.current?.show({
        severity: "success",
        summary: "Successful",
        detail: "XXXXX Updated",
        life: 3000,
      });
    }
  };

  const onInputChange = (value: any, name: string) => {
    let newEntity = { ...entity };
    newEntity[`${name}`] = value;

    setEntity(newEntity);
  };

  const onInputNumberChange = (value: any, name: string) => {
    let newEntity = { ...entity };
    newEntity[`${name}`] = value;

    setEntity(newEntity);
  };

  return (
    <>
      <Toast ref={toast} />

      <div className="p-card p-3">
        <p className="p-card-title">
          <a href="/xxxxx" className="pi pi-arrow-left mr-2 cursor-pointer" />
          <span>Edit XXXXX</span>
        </p>

        <div className="p-card-content">
          <div className="flex flex-wrap align-items-end gap-3">INPUT-FIELDS</div>
        </div>

        <div className="p-card-footer">
          <Button className="w-max" label="Save" icon="pi pi-check" onClick={saveEntity} />
        </div>
      </div>
    </>
  );
}

export default function EditXXXXXPage() {
  return (
    <Layout>
      <EditXXXXX />
    </Layout>
  );
}

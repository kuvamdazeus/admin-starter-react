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
import { useRef, useState } from "react";
import { RadioButton } from "primereact/radiobutton";
import { InputSwitch } from "primereact/inputswitch";

function CreateXXXXX() {
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

  const toast = useRef<Toast>(null);

  const [checked, setChecked] = useState(false);

  const [entity, setEntity] = useState(initialState);
  const [submitted, setSubmitted] = useState(false);

  const saveEntity = async () => {
    setSubmitted(true);

    if (entity.name.trim()) {
      await XXXXXService.createOne(entity);

      toast.current?.show({
        severity: "success",
        summary: "Successful",
        detail: "XXXXX Created",
        life: 3000,
      });
    }
  };

  const onInputChange = (value: string, name: string) => {
    let newEntity = { ...entity };
    newEntity[`${name}`] = value;

    setEntity(newEntity);
  };

  const onInputNumberChange = (value: number, name: string) => {
    let newEntity = { ...entity };
    newEntity[`${name}`] = value;

    setEntity(newEntity);
  };

  return (
    <section className="bg-white p-3 p-fluid border-round">
      <p className="text-2xl font-bold">Create New XXXXX</p>
      <Toast ref={toast} />
      INPUT-FIELDS
      <Button className="w-max" label="Save" icon="pi pi-check" onClick={saveEntity} />
    </section>
  );
}

export default function CreateXXXXXPage() {
  return (
    <Layout>
      <CreateXXXXX />
    </Layout>
  );
}

import Layout from "@/layout/layout";
import { XXXXXService } from "@/service/XXXXXService";
import { XXXXXType } from "@/types/xxxxx";
import { Button } from "primereact/button";
import { InputNumber, InputNumberValueChangeEvent } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Toast } from "primereact/toast";
import { classNames } from "primereact/utils";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

function CreateXXXXX() {
  const params = useParams();

  let initialState: XXXXXType = {
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

  useEffect(() => {
    XXXXXService.getOne(id).then((data) => setEntity(data));
  }, []);

  const saveEntity = async () => {
    setSubmitted(true);

    if (entity.id) {
      await XXXXXService.updateById(entity.id, entity);

      toast.current?.show({
        severity: "success",
        summary: "Successful",
        detail: "XXXXX Updated",
        life: 3000,
      });
    }
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, name: string) => {
    const val = (e.target && e.target.value) || "";
    let newEntity = { ...entity };
    newEntity[`${name}`] = val;

    setEntity(newEntity);
  };

  const onInputNumberChange = (e: InputNumberValueChangeEvent, name: string) => {
    const val = e.value || 0;
    let newEntity = { ...entity };
    newEntity[`${name}`] = val;

    setEntity(newEntity);
  };

  return (
    <section className="bg-white p-3 p-fluid border-round">
      <p className="text-2xl font-bold">Edit XXXXX</p>
      <Toast ref={toast} />

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
      <div className="field">
        <label htmlFor="quantity">Quantity</label>
        <InputNumber
          id="quantity"
          value={entity.quantity}
          onValueChange={(e) => onInputNumberChange(e, "quantity")}
        />
      </div>

      <Button className="w-max" label="Save" icon="pi pi-check" onClick={saveEntity} />
    </section>
  );
}

export default function EditXXXXXPage() {
  return (
    <Layout>
      <CreateXXXXX />
    </Layout>
  );
}

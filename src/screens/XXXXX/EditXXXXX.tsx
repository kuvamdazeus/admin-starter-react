import Layout from "@/layout/layout";
import { XXXXXType } from "@/types/xxxxx";
import { Button } from "primereact/button";
import { InputNumber, InputNumberValueChangeEvent } from "primereact/inputnumber";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Toast } from "primereact/toast";
import { classNames } from "primereact/utils";
import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { RadioButton } from "primereact/radiobutton";
import { InputSwitch } from "primereact/inputswitch";
import { FileUpload } from "primereact/fileupload";
import { fetcher } from "@/usefetcher";
import { ServerResponse } from "@/types/types";

function EditXXXXX() {
  const params = useParams();

  const initialState: XXXXXType = {
    /*INITIAL_STATE_FIELDS*/
  };

  const id = params.id;

  const toast = useRef<Toast>(null);

  const [entity, setEntity] = useState(initialState);
  const [submitted, setSubmitted] = useState(false);

  fetcher.useGET<ServerResponse<XXXXXType>>(`/xxxxx/${id}`, {
    onSuccess: (response) => setEntity(response.data),
  });

  const { patchData: patchEntity } = fetcher.usePATCH({
    onSuccess: () => {
      toast.current?.show({
        severity: "success",
        summary: "Successful",
        detail: "XXXXX Updated",
        life: 3000,
      });
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

  const saveEntity = async () => {
    setSubmitted(true);

    /*VALIDATE_FIELDS*/ await patchEntity(`/xxxxx`, entity);
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
      <div className="grid">
        <div className="col-12 md:col-8 col-offset-2">
          <div className="p-card p-3">
            <div className="card-header flex justify-content-between ">
              <h5 className="card-title">Edit XXXXX</h5>
              <Link to="/xxxxx">
                <Button
                  icon="pi pi-backward"
                  label="Back"
                  className="p-button-sm p-button-secondary p-button-secondary"
                />
              </Link>
            </div>

            <div className="p-card-content">
              <div className="flex flex-wrap align-items-end gap-3">{/*INPUT_FIELDS*/}</div>
            </div>

            <div className="p-card-footer">
              <Button className="w-max" label="Save" icon="pi pi-check" onClick={saveEntity} />
            </div>
          </div>
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

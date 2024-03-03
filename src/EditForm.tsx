import { FormEventHandler, ChangeEventHandler, useState } from "react";
import { IUpdate } from "./App";
import './EditForm.css'

export interface IEditForm {
    text: string;
    id: number;
    editSave: (data: IUpdate) => void;
    editCancel: (id: number) => void;
}

export function EditForm( {text, id, editSave, editCancel}: IEditForm) {
    const [value, setValue] = useState(text);

    const handleOnChange: ChangeEventHandler<HTMLInputElement> = (event) => {
        setValue(event.target.value);
    }

    const handleOnSubmit: FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();
        editSave({text: value, id: id});
    }

    const handleOnSave: React.MouseEventHandler<HTMLButtonElement> = (event) => {
        event.preventDefault();
        editSave({text: value, id: id});
    }

    const handleOnCancel: React.MouseEventHandler<HTMLButtonElement> = (event) => {
        event.preventDefault();
        editCancel(id);
    }

    return <>
        <form onSubmit={handleOnSubmit}>
            <div className="edit-container">
                <input type="text" onChange={handleOnChange} value={value} />
                <div className="button-row">
                    <button className="btnSave" onClick={handleOnSave}>Save</button>
                    <button className="btnCancel" onClick={handleOnCancel}>Cancel</button>
                </div>
            </div>
        </form>
    </>
}
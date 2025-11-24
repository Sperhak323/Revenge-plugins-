import { storage } from "@vendetta/plugin";
import { Forms } from "@vendetta/ui/components";
import React, { useState } from "react";
// FormRow a FormInput sú pre vkladanie dát
const { FormSection, FormRow, FormInput } = Forms; 

// Inicializácia pre nové polia, ak neexistujú
if (!storage.targetId) storage.targetId = "";
if (!storage.targetUrl) storage.targetUrl = "";

export default () => {
    // Používame useState na sledovanie zmien
    const [idInput, setIdInput] = useState(storage.targetId);
    const [urlInput, setUrlInput] = useState(storage.targetUrl);

    return (
        <FormSection title="Nastavenie ikony pre jedného užívateľa">
            
            {/* Pole pre ID */}
            <FormRow 
                label="ID Používateľa"
                sublabel="Vložte presné 18-miestne ID."
            >
                <FormInput
                    placeholder="1106246400158728242"
                    value={idInput}
                    onChange={(newValue) => {
                        setIdInput(newValue);
                        storage.targetId = newValue; // Uloženie ID
                    }}
                />
            </FormRow>
            
            {/* Pole pre URL */}
            <FormRow 
                label="URL Adresa Ikony"
                sublabel="Odkaz (URL) na obrázok (napr. .png)."
            >
                <FormInput
                    placeholder="https://i.postimg.cc/..."
                    value={urlInput}
                    onChange={(newValue) => {
                        setUrlInput(newValue);
                        storage.targetUrl = newValue; // Uloženie URL
                    }}
                />
            </FormRow>
        </FormSection>
    );
};

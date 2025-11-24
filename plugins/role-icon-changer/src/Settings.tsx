import { storage } from "@vendetta/plugin";
import { Forms } from "@vendetta/ui/components";
import React from "react"; // Váš funkčný import Reactu

// Používame Váš funkčný destructuring, len pridáme FormRow
const { FormSection, FormRow, FormInput } = Forms || {};

// Inicializácia pre nové polia, ktoré budeme používať
if (!storage.targetId) storage.targetId = "";
if (!storage.targetUrl) storage.targetUrl = "";


export default () => {
    // Používame useState, pretože React import funguje
    const [idInput, setIdInput] = React.useState(storage.targetId);
    const [urlInput, setUrlInput] = React.useState(storage.targetUrl);

    // Ak sa komponenty nenačítali, vrátime jednoduchý text
    if (!FormSection || !FormInput || !FormRow) {
        return <Forms.FormText>Chyba: Chýbajú UI komponenty!</Forms.FormText>;
    }
    
    return (
        <FormSection title="Nastavenia Ikony (ID a URL)">
            
            {/* Pole 1: ID */}
            <FormRow 
                label="ID Používateľa"
                sublabel="Vložte 18-miestne Discord ID."
            >
                <FormInput
                    placeholder="1106246400158728242"
                    value={idInput}
                    // Používame Váš pôvodný 'onChange'
                    onChange={(newValue) => {
                        setIdInput(newValue);
                        storage.targetId = newValue; // Uloženie ID
                    }}
                />
            </FormRow>
            
            {/* Pole 2: URL */}
            <FormRow 
                label="URL Ikony"
                sublabel="Odkaz na obrázok (.png, .jpg)."
            >
                <FormInput
                    placeholder="https://i.postimg.cc/..."
                    value={urlInput}
                    onChange={(newValue) => {
                        setUrlInput(newValue);
                        storage.targetUrl = newValue;
                    }}
                />
            </FormRow>
        </FormSection>
    );
};

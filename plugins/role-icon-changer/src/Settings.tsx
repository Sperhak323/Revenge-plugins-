import { storage } from "@vendetta/plugin";
import { Forms } from "@vendetta/ui/components";
import { findByProps } from "@vendetta/metro";

// Váš pôvodný import (ktorý je zrejme len pre JSX)
import React from "react"; 

// === KRITICKÁ ÚPRAVA ===
// Použijeme findByProps na získanie Reactu S HOOKMI (vyriešenie chyby useState of null)
const InternalReact = findByProps("createElement", "useState");
const { useState } = InternalReact; 
// ======================

// Používame Váš funkčný destructuring
const { FormSection, FormRow, FormInput } = Forms || {};

// Inicializácia pre nové polia, ktoré budeme používať
if (!storage.targetId) storage.targetId = "";
if (!storage.targetUrl) storage.targetUrl = "";


export default () => {
    // Odteraz používame HOOKS z InternalReact, nie z pôvodného 'React'
    const [idInput, setIdInput] = useState(storage.targetId);
    const [urlInput, setUrlInput] = useState(storage.targetUrl);

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

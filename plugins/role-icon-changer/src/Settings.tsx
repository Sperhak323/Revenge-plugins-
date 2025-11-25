import { storage } from "@vendetta/plugin";
import { Forms } from "@vendetta/ui/components";
import React from "react"; 

// Používame Váš funkčný destructuring
const { FormSection, FormInput, FormText } = Forms || {};

// Inicializácia pre nové polia (targetId a targetUrl)
if (!storage.targetId) storage.targetId = "";
if (!storage.targetUrl) storage.targetUrl = "";


export default () => {
    const [idInput, setIdInput] = React.useState(storage.targetId);
    const [urlInput, setUrlInput] = React.useState(storage.targetUrl);

    if (!FormSection || !FormInput || !FormText) {
        return <Forms.FormText>Chyba: Chýbajú UI komponenty!</Forms.FormText>;
    }
    
    return (
        <FormSection title="Nastavenia Ikony (ID a URL)">
            
            {/* Popis pre prvé pole */}
            <FormText>ID Používateľa (18 cifier):</FormText>

            {/* 1. Pole pre ID (Priamo FormInput pod FormText) */}
            <FormInput
                placeholder="192927727282922"
                value={idInput}
                onChange={(newValue) => {
                    setIdInput(newValue);
                    storage.targetId = newValue; 
                }}
            />
            
            {/* Popis pre druhé pole */}
            <FormText>URL Ikony (.png, .jpg):</FormText>

            {/* 2. Pole pre URL */}
            <FormInput
                placeholder="https://i.postimg.cc/..."
                value={urlInput}
                onChange={(newValue) => {
                    setUrlInput(newValue);
                    storage.targetUrl = newValue;
                }}
            />
        </FormSection>
    );
};
                

import { storage } from "@vendetta/plugin";
import { Forms } from "@vendetta/ui/components";
import { findByProps } from "@vendetta/metro";

// === KRITICKÁ FIXA PRE REACT HOOKY (oprava chyby useState of null) ===
const { React } = findByProps("createElement", "useState"); 
const { useState } = React;
// =======================================================================

// Získanie základných UI komponentov
const { FormSection, FormRow } = Forms || {};
// Získanie základného TextInput pre vstup
const TextInput = findByProps("TextInput").TextInput;

// Inicializácia úložiska (musí byť mimo komponentu)
if (!storage.targetId) storage.targetId = "";
if (!storage.targetUrl) storage.targetUrl = "";


export default () => {
    // Používame hooky odteraz, lebo React už je načítaný
    const [idInput, setIdInput] = useState(storage.targetId);
    const [urlInput, setUrlInput] = useState(storage.targetUrl);

    // Kontrola, či sa načítali základné komponenty, inak to padne
    if (!FormSection || !FormRow || !TextInput) {
        return (
            <FormSection title="CHYBA">
                <FormRow label="Plugin UI Error" sublabel="Chýbajú základné komponenty Discord UI." />
            </FormSection>
        );
    }
    
    return (
        <FormSection title="Nastavenia Ikony (ID a URL)">
            
            {/* 1. Pole pre ID */}
            <FormRow 
                label="ID Používateľa"
                sublabel="Vložte 18-miestne Discord ID."
            >
                {/* Používame najbezpečnejší TextInput */}
                <TextInput
                    placeholder="1106246400158728242"
                    value={idInput}
                    onChangeText={(newValue) => {
                        setIdInput(newValue);
                        storage.targetId = newValue; // Uloženie ID
                    }}
                    style={{ color: "#fff" }} // Pre tmavý režim
                />
            </FormRow>
            
            {/* 2. Pole pre URL */}
            <FormRow 
                label="URL Ikony"
                sublabel="Odkaz na obrázok (.png, .jpg)."
            >
                <TextInput
                    placeholder="https://i.postimg.cc/..."
                    value={urlInput}
                    onChangeText={(newValue) => {
                        setUrlInput(newValue);
                        storage.targetUrl = newValue; // Uloženie URL
                    }}
                    style={{ color: "#fff" }} // Pre tmavý režim
                />
            </FormRow>
        </FormSection>
    );
};

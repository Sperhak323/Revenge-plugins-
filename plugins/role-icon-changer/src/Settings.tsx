import { storage } from "@vendetta/plugin";
import { findByProps } from "@vendetta/metro";
import { Forms } from "@vendetta/ui/components";
import { ReactNative } from "@vendetta/metro/common"; 
// === KRITICKÁ ZMENA TU ===
// Namiesto importu z "react" ich získame priamo z knižnice Discordu:
const { React } = findByProps("createElement", "useState"); 
const { useState } = React;
// =========================

// Ostatné importy UI
const { View, Text } = ReactNative; 
const { FormSection, FormRow } = Forms;
const FormInput = findByProps("TextInput").TextInput; // Zabezpečený FormInput

// Inicializácia pre nové polia, ak neexistujú
if (!storage.targetId) storage.targetId = "";
if (!storage.targetUrl) storage.targetUrl = "";


export default () => {
    // Kód nastavení sa môže spustiť až odtiaľto:
    
    // Používame useState na sledovanie zmien
    const [idInput, setIdInput] = useState(storage.targetId);
    const [urlInput, setUrlInput] = useState(storage.targetUrl);
    
    // Zabezpečíme, že existujú Form komponenty pred renderom
    if (!FormSection || !FormRow || !FormInput) {
        return <View><Text>Chyba: Chýbajú UI komponenty!</Text></View>;
    }

    // ... zvyšok kódu FormRow a FormInput
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
                    onChangeText={(newValue) => {
                        setIdInput(newValue);
                        storage.targetId = newValue; 
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
                    onChangeText={(newValue) => {
                        setUrlInput(newValue);
                        storage.targetUrl = newValue; 
                    }}
                />
            </FormRow>
        </FormSection>
    );
};

import { storage } from "@vendetta/plugin";
import { findByProps } from "@vendetta/metro";
import { Forms } from "@vendetta/ui/components"; // Importujeme Forms
import React, { useState } from "react"; // Dôležitý React import
import { View } from "react-native"; // Pre bezpečný obal

// === BEZPEČNÉ ZÍSKANIE KOMPONENTOV ===
// Získame FormRow a FormSection priamo z Vendetta Forms
const { FormSection, FormRow } = Forms;

// Použijeme FormInput namiesto FormText/Area pre jednoduché vkladanie
// POZNÁMKA: FormInput nemusí byť v Forms, ale je to najbezpečnejšia voľba!
// Ak by FormInput nefungoval, nahradíme ho React Native TextInput
const FormInput = findByProps("TextInput").TextInput;

// Inicializácia pre nové polia, ak neexistujú
if (!storage.targetId) storage.targetId = "";
if (!storage.targetUrl) storage.targetUrl = "";


export default () => {
    // Používame useState na sledovanie zmien
    const [idInput, setIdInput] = useState(storage.targetId);
    const [urlInput, setUrlInput] = useState(storage.targetUrl);
    
    // Zabezpečíme, že existujú Form komponenty pred renderom
    if (!FormSection || !FormRow || !FormInput) {
        return <View><Text>Chyba: Chýbajú UI komponenty!</Text></View>;
    }

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
                    onChangeText={(newValue) => { // Zmena z onChange na onChangeText
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
                    onChangeText={(newValue) => { // Zmena z onChange na onChangeText
                        setUrlInput(newValue);
                        storage.targetUrl = newValue; 
                    }}
                />
            </FormRow>
        </FormSection>
    );
};

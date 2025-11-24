// Súbor: plugins/role-icon-changer/src/Settings.tsx

import { storage } from "@vendetta/plugin";
import { Forms } from "@vendetta/ui/components";
import React, { useState } from "react"; // <--- OPRAVA: Stabilný React import

// Používame destructuring pre komponenty UI 
const { FormText, FormRow, FormTextArea } = Forms;

// Príklad, ako by mala mapa vyzerať
const defaultMapExample = '{"1234567890": "https://link.na/ikonu.png"}';

export default () => {
    // Inicializujeme úložisko, ak je prázdne, s prázdnym JSON
    if (!storage.iconMapJson) {
        storage.iconMapJson = "{}";
    }
    
    // Používame React hook useState
    const [jsonInput, setJsonInput] = useState(storage.iconMapJson);
    
    return (
        <FormText>
            <FormRow 
                label="Mapa ikon (JSON)"
                sublabel="Vložte mapu ID používateľov a URL ikon vo formáte JSON. Nezabudnite na úvodzovky!"
            />
            <FormTextArea
                placeholder={defaultMapExample}
                value={jsonInput}
                onChange={(newValue) => {
                    setJsonInput(newValue);
                    // Uložíme do úložiska Vendetty
                    storage.iconMapJson = newValue; 
                }}
            />
        </FormText>
    );
};
    

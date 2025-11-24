import { storage } from "@vendetta/plugin";
import { Forms } from "@vendetta/ui/components";
import { ReactNative } from "@vendetta/metro/common";
import React, { useState } from "react";

// Bezpečné vytiahnutie komponentov. Ak neexistujú, použijeme prázdny objekt, aby to nepadlo.
const { FormRow } = Forms || {};
const { ScrollView, TextInput, Text } = ReactNative;

// Príklad mapy
const defaultMapExample = '{"1234567890": "https://link.na/ikonu.png"}';

export default () => {
    // Inicializácia storage
    if (!storage.iconMapJson) {
        storage.iconMapJson = "{}";
    }

    const [jsonInput, setJsonInput] = useState(storage.iconMapJson);

    return (
        // Používame ScrollView, aby sa dalo posúvať, ak je text dlhý
        <ScrollView style={{ flex: 1, padding: 10 }}>
            <FormRow
                label="Mapa ikon (JSON)"
                sublabel="Vložte ID a URL. Formát: { 'ID': 'URL' }"
            />
            
            {/* Náhrada za problémový FormTextArea -> obyčajný TextInput */}
            <TextInput
                style={{
                    borderColor: "#444",
                    borderWidth: 1,
                    borderRadius: 8,
                    padding: 10,
                    color: "#fff", // Biela farba textu pre Dark mode
                    backgroundColor: "#222",
                    minHeight: 100,
                    textAlignVertical: "top"
                }}
                multiline={true}
                placeholder={defaultMapExample}
                placeholderTextColor="#666"
                value={jsonInput}
                onChangeText={(newValue) => {
                    setJsonInput(newValue);
                    storage.iconMapJson = newValue;
                }}
            />
            
            <Text style={{ color: "#888", marginTop: 10, fontSize: 12 }}>
                Zmeny sa uložia automaticky.
            </Text>
        </ScrollView>
    );
};
                

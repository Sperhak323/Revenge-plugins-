import { storage } from "@vendetta/plugin";
import { Forms } from "@vendetta/ui/components";
import React from "react";

// Použijeme FormInput namiesto FormText, aby sa dalo písať
// Ak by FormInput nefungoval, vrátime sa k FormText na test
const { FormSection, FormInput } = Forms;

export default () => (
    <FormSection title="Nastavenia Ikon">
        <FormInput
            value={storage.iconMapJson || ""}
            placeholder='{"ID": "URL"}'
            onChange={(v) => {
                // Jednoduché uloženie priamo do pamäte pri každom údere klávesy
                storage.iconMapJson = v;
            }}
            style={{ height: 100 }}
            multiline={true}
        />
    </FormSection>
)

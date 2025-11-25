import { storage } from "@vendetta/plugin";
import { Forms } from "@vendetta/ui/components";

// === BEZ IMPORTU REACTU A USESTATE, ABY SME PREDIŠLI PÁDU ===
const { FormSection, FormInput, FormText } = Forms || {};

// Inicializácia pre nové polia
if (!storage.targetId) storage.targetId = "";
if (!storage.targetUrl) storage.targetUrl = "";


export default () => {
    // Kód je funkčný a nepoužíva React Hooky
    if (!FormSection || !FormInput || !FormText) {
        return <Forms.FormText>Chyba: Chýbajú UI komponenty!</Forms.FormText>;
    }
    
    return (
        <FormSection title="Nastavenia Ikony (ID a URL)">
            
            <FormText>ID Používateľa (18 cifier):</FormText>
            <FormInput
                placeholder="1106246400158728242"
                // Čítame priamo zo storage, čo robí Váš funkčný kód
                value={storage.targetId} 
                onChange={(newValue) => {
                    // Ukladáme priamo do storage, čo robí Váš funkčný kód
                    storage.targetId = newValue; 
                }}
            />
            
            <FormText>URL Ikony (.png, .jpg):</FormText>
            <FormInput
                placeholder="https://i.postimg.cc/..."
                value={storage.targetUrl}
                onChange={(newValue) => {
                    storage.targetUrl = newValue;
                }}
            />
        </FormSection>
    );
};

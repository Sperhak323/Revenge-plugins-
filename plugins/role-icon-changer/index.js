import { findByProps } from "@vendetta/metro";
import { after } from "@vendetta/patcher";
import { React } from "@vendetta/metro/common";
import { storage } from "@vendetta/plugin"; // <--- NOVÝ IMPORT

// Funkcia na bezpečné načítanie mapy z úložiska (zabraňuje pádu pri neplatnom JSON)
const getUserIconMap = () => {
    try {
        // storage.iconMapJson je JSON string z nastavení
        return JSON.parse(storage.iconMapJson || '{}');
    } catch {
        console.error("CustomIcons: Chyba pri parsovaní nastavení JSON.");
        return {}; 
    }
};

// Hľadáme hlavný komponent pre hlavičku správy
const MessageHeader = findByProps("MessageHeader") || findByProps("MessageTimestamp"); 
const { Image } = findByProps("Image"); 

let unpatch;

export default {
    onLoad: () => {
        if (!MessageHeader || !Image) {
            console.error("CustomIcons: Required components not found!");
            return;
        }

        unpatch = after("default", MessageHeader, ([props], result) => {
            
            // Načítame aktuálne nastavenia z úložiska pri každom renderovaní
            const userIconMap = getUserIconMap(); 
            
            const message = props?.message;
            const userId = message?.author?.id;

            // Ak ID existuje v mape nastavení
            if (userId && userIconMap[userId]) {
                
                const customIcon = React.createElement(Image, {
                    source: { uri: userIconMap[userId] },
                    style: {
                        width: 16,
                        height: 16,
                        marginLeft: 4,
                        marginTop: 2,
                        resizeMode: 'contain',
                        borderRadius: 0 
                    }
                });

                // Vložíme ikonku do React stromu
                try {
                    // ... (logika vkladania zostáva rovnaká)
                    if (Array.isArray(result?.props?.children)) {
                        result.props.children.push(customIcon);
                    } else if (result?.props?.children) {
                        result.props.children = [result.props.children, customIcon];
                    }
                } catch (e) {
                    console.error("Chyba pri vkladaní ikony:", e);
                }
            }
            return result;
        });
    },

    onUnload: () => {
        if (unpatch) unpatch();
    }
};

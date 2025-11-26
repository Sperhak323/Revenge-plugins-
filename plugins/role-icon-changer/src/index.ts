import { storage } from "@vendetta/plugin";
import { findByProps } from "@vendetta/metro";
import { after } from "@vendetta/patcher";
import Settings from "./Settings"; // <== KĽÚČOVÉ: Import pre nastavenia

let patch;

// FUNKCIA NA ČÍTANIE DÁT Z DVOCH POLÍ
function getIconMap() {
    if (storage.targetId && storage.targetUrl) {
        return {
            [storage.targetId]: storage.targetUrl
        };
    }
    return {};
}

export default {
    onLoad: () => {
        // === BEZPEČNÉ ZÍSKANIE ZÁVISLOSTÍ (Crash-Proof) ===
        // Získanie všetkých závislostí cez findByProps, aby sa predišlo pádu
        const ReactModule = findByProps("createElement", "useState");
        const ImageModule = findByProps("Image"); 
        const MessageHeaderModule = findByProps("MessageHeader") || findByProps("MessageTimestamp"); 

        if (!ReactModule || !ImageModule || !MessageHeaderModule) {
             return; // Ak niečo chýba, ticho zlyhá
        }

        const React = ReactModule;
        const Image = ImageModule.Image;
        const MessageHeader = MessageHeaderModule;
        
        // =================================================

        patch = after("default", MessageHeader, ([args], res) => {
            const iconMap = getIconMap();
            const authorId = args?.message?.author?.id; 

            if (!authorId) return res;
            
            const iconUrl = iconMap[authorId];

            if (iconUrl) {
                // Vytvorenie elementu ikony (cez React.createElement)
                const iconElement = React.createElement(Image, {
                    source: { uri: iconUrl },
                    style: { width: 16, height: 16, marginRight: 4, borderRadius: 3, top: 2 },
                    resizeMode: "cover",
                });

                // Vkladanie elementu do správy
                try {
                    const children = res?.props?.children;
                    if (ArrayOf(children)) { // Použijeme všeobecnú ArrayOf, ak sa isArray nenačítalo
                        children.push(iconElement);
                    } else if (children) {
                        res.props.children = [children, iconElement];
                    }
                } catch (e) {
                    // Ignorujeme chybu vkladania
                }
            }
            return res;
        });
    },

    onUnload: () => {
        if (patch) patch();
    },

    // === KĽÚČOVÁ OPRAVA: Obnovenie exportu nastavení ===
    settings: Settings,
};
    

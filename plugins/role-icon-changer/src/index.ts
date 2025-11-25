// Súbor: index.ts

import { storage } from "@vendetta/plugin";
import { findByProps } from "@vendetta/metro";
import { after } from "@vendetta/patcher";
import { logger } from "@vendetta/logger"; // <== NOVÝ IMPORT
import { ReactNative } from "@vendetta/metro/common";

const { React } = ReactNative;
const { Image } = findByProps("Image");

// === FUNKCIA ZÍSKAVANIA IKONY (Debug) ===
function getIconMap() {
    if (storage.targetId && storage.targetUrl) {
        const map = {
            [storage.targetId]: storage.targetUrl
        };
        // LOG 1: Nastavenia načítané
        logger.log("CustomIcons: Nastavenia načítané (Mapa ikon):", map);
        return map;
    }
    // LOG 2: Nastavenia prázdne
    logger.log("CustomIcons: Nastavenia NENACITANE (Chýba ID alebo URL)");
    return {};
}

let patch;

export default {
    onLoad: () => {
        const MessageHeader = findByProps("MessageHeader") || findByProps("MessageTimestamp");

        // === KONTROLA KOMPONENTU (Endpointu) ===
        if (!MessageHeader) {
            // LOG 3: Kritická chyba
            logger.error("CustomIcons: Komponent 'MessageHeader' nenájdený! PATCH ZLYHAL.");
            return;
        } else {
            // LOG 4: Komponent nájdený
            logger.log("CustomIcons: Komponent MessageHeader nájdený. Pokus o PATCH...");
        }

        patch = after("default", MessageHeader, ([args], res) => {
            const iconMap = getIconMap();
            const authorId = args?.message?.author?.id; 

            if (!authorId) return res; // Nie je správa, ignorovať

            // LOG 5: Spracovanie ID
            // logger.log("CustomIcons: Spracovanie ID:", authorId); // Tieto sú veľmi časté, zatiaľ ich necháme zakomentované
            
            const iconUrl = iconMap[authorId];

            if (iconUrl) {
                // LOG 6: Nájdená zhoda
                logger.log("CustomIcons: NÁJDENÁ ZHODA! Vkladanie ikony pre ID:", authorId, " URL:", iconUrl);
                
                // ... (Kód pre vloženie ikony je tu) ...
                
                // Vytvorenie elementu ikony
                const iconElement = React.createElement(Image, {
                    source: { uri: iconUrl },
                    style: { width: 16, height: 16, marginRight: 4, borderRadius: 3, top: 2 },
                    resizeMode: "cover",
                });

                try {
                    const children = res?.props?.children;
                    if (Array.isArray(children)) {
                        children.push(iconElement);
                    } else if (children) {
                        res.props.children = [children, iconElement];
                    }
                } catch (e) {
                    logger.error("CustomIcons: Chyba pri vkladaní React Elementu:", e);
                }
            }
            return res;
        });
    },

    onUnload: () => {
        if (patch) patch();
    },
};

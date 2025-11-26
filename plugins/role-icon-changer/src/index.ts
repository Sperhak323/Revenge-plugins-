// Súbor: index.ts

import { storage } from "@vendetta/plugin";
import { findByProps } from "@vendetta/metro";
import { after } from "@vendetta/patcher";
// Odstránené importy loggera a ReactNative, ktoré spôsobovali pád

let patch;

// Funkcia na získavanie ikony zostáva bezo zmeny
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
        // === BEZPEČNÉ ZÍSKANIE KOMPONENTOV AŽ V ONLOAD ===
        
        // Získanie kľúčových závislostí:
        const ReactModule = findByProps("createElement", "useState"); // Získanie Reactu
        const ImageModule = findByProps("Image"); // Získanie komponentu Image
        const MessageHeaderModule = findByProps("MessageHeader") || findByProps("MessageTimestamp"); // Získanie cieľového komponentu

        // === KRITICKÁ KONTROLA ===
        if (!ReactModule || !ImageModule || !MessageHeaderModule) {
            // Ak zlyháme tu, kód ďalej nepadne, len sa plugin nenačíta
            return; 
        }

        // Deklarácia, aby bol kód čistý
        const React = ReactModule;
        const Image = ImageModule.Image;
        const MessageHeader = MessageHeaderModule;
        
        // ===================================
        
        patch = after("default", MessageHeader, ([args], res) => {
            const iconMap = getIconMap();
            const authorId = args?.message?.author?.id; 

            if (!authorId) return res;
            
            const iconUrl = iconMap[authorId];

            if (iconUrl) {
                // Vytvorenie elementu ikony (používame createElement z nájdeného Reactu)
                const iconElement = React.createElement(Image, {
                    source: { uri: iconUrl },
                    style: { width: 16, height: 16, marginRight: 4, borderRadius: 3, top: 2 },
                    resizeMode: "cover",
                });

                // Logika vkladania
                try {
                    const children = res?.props?.children;
                    if (Array.isArray(children)) {
                        children.push(iconElement);
                    } else if (children) {
                        res.props.children = [children, iconElement];
                    }
                } catch (e) {
                    // Ak sa vkladanie nepodarí, plugin nepadne
                }
            }
            return res;
        });
    },

    onUnload: () => {
        if (patch) patch();
    },
};

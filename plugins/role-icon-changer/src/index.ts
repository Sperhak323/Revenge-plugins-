// Súbor: plugins/role-icon-changer/index.ts

import Settings from "./Settings"; 
import { storage } from "@vendetta/plugin";
import { findByProps } from "@vendetta/metro";
import { after } from "@vendetta/patcher";
// DÔLEŽITÉ: Musíme importovať React, inak React.createElement nebude fungovať
import React from "react"; 

const logger = findByProps("logger").logger;
const { Image } = findByProps("Image");
const MessageHeader = findByProps("MessageHeader") || findByProps("MessageTimestamp");

let patch;

function getIconMap() {
    try {
        return JSON.parse(storage.iconMapJson || "{}");
    } catch {
        // Tichý pád alebo logovanie, ak je JSON zlý
        return {};
    }
}

// Všetko musí byť v tomto jednom objekte!
export default {
    // 1. OPRAVA: Settings musí byť TU, vnútri objektu
    settings: Settings,
    
    onLoad: () => {
        if (!MessageHeader || !Image) {
            logger.error("CustomIcons: Required components not found!");
            return;
        }

        patch = after("default", MessageHeader, ([args], res) => {
            const iconMap = getIconMap();
            const authorId = args?.message?.author?.id;

            if (authorId && iconMap[authorId]) {
                // Tu sa používal React, ale nebol importovaný
                const iconElement = React.createElement(Image, {
                    source: { uri: iconMap[authorId] },
                    style: { width: 16, height: 16, marginLeft: 4, marginTop: 2, resizeMode: "contain", borderRadius: 0 },
                });

                try {
                    const children = res?.props?.children;
                    if (Array.isArray(children)) {
                        children.push(iconElement);
                    } else if (children) {
                        res.props.children = [children, iconElement];
                    }
                } catch (e) {
                    // Ignorujeme chyby pri renderi, aby nepadol Discord
                }
            }
            return res;
        });
    },
    
    onUnload: () => {
        if (patch) {
            patch();
        }
    }
};

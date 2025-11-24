// Súbor: plugins/role-icon-changer/index.ts

// 1. DÔLEŽITÉ: Importujeme komponent nastavení
import Settings from "./Settings"; 

// 2. KĽÚČOVÉ: Exportujeme ju pre Vendettu/Rollup
export const settings = Settings; // <--- TENTO RIADOK CHÝBAL!

// Zvyšné importy pluginu
import { storage } from "@vendetta/plugin";
import { findByProps } from "@vendetta/metro";
import { after } from "@vendetta/patcher";

const logger = findByProps("logger").logger;
const { Image } = findByProps("Image");
const MessageHeader = findByProps("MessageHeader") || findByProps("MessageTimestamp");

let patch;

// Funkcia na bezpečné parsovanie JSON nastavení
function getIconMap() {
    try {
        return JSON.parse(storage.iconMapJson || "{}");
    } catch {
        logger.error("CustomIcons: Chyba pri parsovaní nastavení JSON.");
        return {};
    }
}

export default {
    onLoad: () => {
        if (!MessageHeader || !Image) {
            logger.error("CustomIcons: Required components not found!");
            return;
        }

        patch = after("default", MessageHeader, ([args], res) => {
            const iconMap = getIconMap();
            const authorId = args?.message?.author?.id;

            if (authorId && iconMap[authorId]) {
                const iconElement = React.createElement(Image, {
                    source: { uri: iconMap[authorId] },
                    style: { width: 16, height: 16, marginLeft: 4, marginTop: 2, resizeMode: "contain", borderRadius: 0 },
                });

                try {
                    // Logika vkladania ikony (podobná tvojmu pôvodnému kódu)
                    const children = res?.props?.children;
                    if (Array.isArray(children)) {
                        children.push(iconElement);
                    } else if (children) {
                        res.props.children = [children, iconElement];
                    }
                } catch (e) {
                    logger.error("Chyba pri vkladaní ikony:", e);
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

    

import { useContext } from "react";
import { cardsVisibilityContext } from "../contexts/cardsVisibility";

export function useCardsVisibility() {
    const context = useContext(cardsVisibilityContext);
    if (!context) {
        throw new Error("useCardsVisibility must be used within a CardsVisibilityProvider");
    }
    return context;
}

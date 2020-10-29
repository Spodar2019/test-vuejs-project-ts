import {Entity} from "@/interfaces/Entity";
import {LocationSummary} from "@/interfaces/LocationSummary";

export interface Campaign {
    entity: Entity;
    locationSummary: LocationSummary;
    id: string | number;
}

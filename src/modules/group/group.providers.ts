import { GroupTable } from 'src/core/db/models/group.model';
import { GROUPTABLE_REPOSITORY } from "src/core/constants";

export const groupTableProviders = [{
    provide:GROUPTABLE_REPOSITORY,
    useValue:GroupTable 
}]
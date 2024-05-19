import { Groups } from 'src/core/db/models/groups.model';
import { GROUPS_REPOSITORY } from "src/core/constants";

export const groupTableProviders = [{
    provide:GROUPS_REPOSITORY,
    useValue:Groups
}]
import { UserRoles } from "./UserRoles";

export const WikiCollectionName = "wikis";
export interface Wiki {
  name: string;
  description?: string;
  userIds: string[];
  userRoles: {
    [id: string]: UserRoles;
  };
  rootPages: string[];
}

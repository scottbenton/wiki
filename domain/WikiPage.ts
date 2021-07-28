export const WikiPageSubCollectionName = "pages";
export interface WikiPage {
  title: string;
  childPages: string[];
  parentPage?: string;
}

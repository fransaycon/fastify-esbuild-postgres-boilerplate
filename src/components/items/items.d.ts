export interface Item {
  name: string
  description: string
}

export type UnsavedItem = Pick<Item, "name" | "description">

import { CommonMixin } from "../common"

export interface Item extends CommonMixin {
  name: string
  description: string
}

export type UnsavedItem = Pick<Item, "name" | "description">

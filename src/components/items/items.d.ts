import { CommonMixin } from "../common"

export interface ItemAttributes extends CommonMixin {
  name: string
  description: string
}

export type ItemCreationAtrributes = Pick<
  ItemAttributes,
  "name" | "description"
>

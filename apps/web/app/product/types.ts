export interface Product {
  id: string
  model: string
  name: string
  slug?: string
  category: string
  tempRange: string
  dimensions: string
  capacity: string
  refrigerant: string
  power: string
  inStock: boolean
  isPremium: boolean
  imageType: "upright-chiller" | "upright-freezer" | "underbench" | "showcase" | "ice-machine" | "coldroom"
  description: string
}

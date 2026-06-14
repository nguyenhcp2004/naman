"use client"

import { useEffect, useState } from "react"

import { Product } from "@/app/product/types"

const COMPARE_STORAGE_KEY = "compare_products"
const COMPARE_PRODUCTS_EVENT = "compare-products-change"
export const MAX_COMPARE_PRODUCTS = 4

function readCompareProducts(): Product[] {
  if (typeof window === "undefined") {
    return []
  }

  const saved = window.localStorage.getItem(COMPARE_STORAGE_KEY)
  if (!saved) {
    return []
  }

  try {
    const parsed = JSON.parse(saved)
    return Array.isArray(parsed)
      ? (parsed as Product[]).slice(0, MAX_COMPARE_PRODUCTS)
      : []
  } catch (error) {
    console.error(error)
    return []
  }
}

function writeCompareProducts(products: Product[]) {
  window.localStorage.setItem(
    COMPARE_STORAGE_KEY,
    JSON.stringify(products.slice(0, MAX_COMPARE_PRODUCTS))
  )
  window.dispatchEvent(new Event(COMPARE_PRODUCTS_EVENT))
}

export function useCompareProducts() {
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    const updateProducts = () => setProducts(readCompareProducts())

    updateProducts()
    window.addEventListener("storage", updateProducts)
    window.addEventListener(COMPARE_PRODUCTS_EVENT, updateProducts)

    return () => {
      window.removeEventListener("storage", updateProducts)
      window.removeEventListener(COMPARE_PRODUCTS_EVENT, updateProducts)
    }
  }, [])

  const addProduct = (product: Product) => {
    const currentProducts = readCompareProducts()
    if (
      currentProducts.some((item) => item.id === product.id) ||
      currentProducts.length >= MAX_COMPARE_PRODUCTS
    ) {
      return
    }

    const nextProducts = [...currentProducts, product]
    setProducts(nextProducts)
    writeCompareProducts(nextProducts)
  }

  const removeProduct = (productId: string) => {
    const nextProducts = readCompareProducts().filter(
      (product) => product.id !== productId
    )
    setProducts(nextProducts)
    writeCompareProducts(nextProducts)
  }

  const clearProducts = () => {
    setProducts([])
    writeCompareProducts([])
  }

  return {
    addProduct,
    clearProducts,
    isFull: products.length >= MAX_COMPARE_PRODUCTS,
    products,
    removeProduct,
  }
}

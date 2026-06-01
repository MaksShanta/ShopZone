import ProductCard from './ProductCard.vue'

export default {
  title: 'Shop/ProductCard',
  component: ProductCard,
  tags: ['autodocs'],
}

export const Default = {
  args: {
    product: {
      id: 'demo-product-1',
      title: 'Смартфон Samsung Galaxy A55',
      description: '128 GB, AMOLED дисплей',
      price: 15999,
      oldPrice: 17999,
      category: 'Смартфони',
      imageUrl: 'https://via.placeholder.com/400x300?text=Samsung+A55',
      rating: 4.8,
      inStock: true,
    },
  },
}

export const OutOfStock = {
  args: {
    product: {
      id: 'demo-product-2',
      title: 'Ноутбук Lenovo IdeaPad',
      description: '15.6", Ryzen 5',
      price: 24999,
      oldPrice: 27999,
      category: 'Ноутбуки',
      imageUrl: 'https://via.placeholder.com/400x300?text=Lenovo',
      rating: 4.6,
      inStock: false,
    },
  },
}
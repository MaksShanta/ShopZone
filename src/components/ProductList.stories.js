import ProductList from './ProductList.vue'

export default {
  title: 'Shop/ProductList',
  component: ProductList,
  tags: ['autodocs'],
}

export const Default = {
  args: {
    products: [
      {
        id: '1',
        title: 'Смартфон Samsung Galaxy A55',
        price: 15999,
        oldPrice: 17999,
        category: 'Смартфони',
        imageUrl: 'https://via.placeholder.com/400x300?text=Phone',
        rating: 4.8,
        inStock: true,
      },
      {
        id: '2',
        title: 'Ноутбук Lenovo IdeaPad',
        price: 24999,
        oldPrice: 27999,
        category: 'Ноутбуки',
        imageUrl: 'https://via.placeholder.com/400x300?text=Laptop',
        rating: 4.6,
        inStock: true,
      },
    ],
  },
}
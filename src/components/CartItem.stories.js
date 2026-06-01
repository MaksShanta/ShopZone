import CartItem from './CartItem.vue'

export default {
  title: 'Shop/CartItem',
  component: CartItem,
  tags: ['autodocs'],
}

export const Default = {
  args: {
    item: {
      title: 'Навушники JBL Tune 520BT',
      price: 1999,
      quantity: 2,
      imageUrl: 'https://via.placeholder.com/300x300?text=JBL',
    },
  },
}
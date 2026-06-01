import BaseInput from './BaseInput.vue'

export default {
  title: 'UI/BaseInput',
  component: BaseInput,
  tags: ['autodocs'],
}

export const Default = {
  args: {
    label: 'Email',
    placeholder: 'example@gmail.com',
    modelValue: '',
    type: 'email',
    error: '',
  },
}

export const WithError = {
  args: {
    label: 'Пароль',
    placeholder: 'Введіть пароль',
    modelValue: '',
    type: 'password',
    error: 'Пароль обов’язковий',
  },
}
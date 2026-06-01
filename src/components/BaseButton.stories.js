import BaseButton from './BaseButton.vue'

export default {
  title: 'UI/BaseButton',
  component: BaseButton,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'danger', 'outline'],
    },
    disabled: {
      control: 'boolean',
    },
  },
}

export const Primary = {
  args: {
    variant: 'primary',
    disabled: false,
    default: 'Кнопка',
  },
  render: (args) => ({
    components: { BaseButton },
    setup() {
      return { args }
    },
    template: `
      <BaseButton v-bind="args">
        {{ args.default }}
      </BaseButton>
    `,
  }),
}

export const Danger = {
  args: {
    variant: 'danger',
    default: 'Видалити',
  },
  render: Primary.render,
}

export const Outline = {
  args: {
    variant: 'outline',
    default: 'Скасувати',
  },
  render: Primary.render,
}
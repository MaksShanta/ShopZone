import BaseModal from './BaseModal.vue'

export default {
  title: 'UI/BaseModal',
  component: BaseModal,
  tags: ['autodocs'],
}

export const Open = {
  args: {
    isOpen: true,
    title: 'Підтвердження дії',
  },
  render: (args) => ({
    components: { BaseModal },
    setup() {
      return { args }
    },
    template: `
      <BaseModal v-bind="args">
        <p>Ви точно хочете виконати цю дію?</p>
      </BaseModal>
    `,
  }),
}
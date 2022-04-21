import PokemonForm from '@/components/PokemonForm.vue';
import { mount } from '@vue/test-utils';

describe('PokemonForm', () => {
  test('Hide AlertMessage by default', () => {
    // Arrange
    const wrapper = mount(PokemonForm);

    // Assert
    expect(wrapper.find('#alertMessage').isVisible()).toBe(false);
  });

  test('show AlertMessage if there are incomplete fields', async () => {
    // Arrange
    const wrapper = mount(PokemonForm);
    const submit = wrapper.find('#submit');

    // Act
    await submit.trigger('click');

    // Assert
    expect(wrapper.find('#alertMessage').isVisible()).toBe(true);
  });
});

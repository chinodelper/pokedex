<template>
  <div class="col-lg-3 col-sm-6 col-xs-12 my-3">
    <div class="card shadow-sm h-100">
      <PokemonCardContent
        :url="baseContent.url"
        :name="baseContent.name"
      />
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  onBeforeMount,
  toRefs,
  inject,
} from 'vue';
import PokemonCardContent from '@/components/PokemonCardContent.vue';
import { useStore } from 'vuex';
import * as types from '@/store/types';

export default defineComponent({
  name: 'PokemonCard',
  components: {
    PokemonCardContent,
  },
  props: {
    baseContent: Object,
  },
  setup(props) {
    type Type = {
      name: string,
      url: string
    }
    type IResponseContent = {
      types: Type[],
      sprites: []
    }
    const { baseContent } = toRefs(props);
    const axios: any = inject('$http'); // inject axios
    const store = useStore();
    const isDataStored = () => store.getters[types.GET_IS_DATA_STORED];
    // retreive the list of pokemons
    const getContent = async (): Promise<void> => {
      store.dispatch(types.SET_START_LOADING); // Start loading
      try {
        await axios
          .get(baseContent.value?.url)
          .then((response: { data: IResponseContent }) => {
            store.dispatch(types.SET_POKEMON_CONTENT, response.data);
          });
      } catch (error) {
        console.log(error);
        const errorLog = {
          error,
          label: 'Error retrieving the pokemon content',
          type: types.SET_POKEMON_CONTENT,
          visible: true,
        };
        // Save error in the store
        store.dispatch(types.MUTATE_SET_ERRORS, errorLog);
      }
    };
    onBeforeMount(() => {
      // Check if data is already stored to avoid overloads
      if (isDataStored()) {
        getContent();
      }
    });
  },
});
</script>

<style lang="scss">

</style>

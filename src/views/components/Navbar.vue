<template>
  <v-app-bar
    :clipped-left="$vuetify.breakpoint.lgAndUp"
    app
    color="blue darken-4"
    dark
  >
    <v-toolbar-title style="width: 300px" class="ml-0 pl-4">
      <span class="hidden-sm-and-down">Kam za vědou</span>
    </v-toolbar-title>

    <v-autocomplete
      v-model="autocomplete"
      @input="autocompleteSelected"
      :append-icon="null"
      :label="
        Object.keys(selected).length < 15
          ? 'Vyhledat školu, fakultu nebo obor'
          : 'Porovnávat lze maximálně 15 položek'
      "
      clearable
      :items="autocompleteOptions"
      flat
      solo-inverted
      prepend-inner-icon="search"
      no-data-text="Nic nenalezeno"
      item-text="name"
      :item-value="item => item"
      :disabled="Object.keys(selected).length >= 15"
    >
      <template v-slot:item="{ index, item }">
        {{ item.name }}
        <div class="flex-grow-1"></div>
        <v-list-item-action @click.stop>
          <v-btn icon @click.stop.prevent="showChildren(item)">
            <v-icon>mdi-chevron-down</v-icon>
          </v-btn>
        </v-list-item-action>
      </template>
    </v-autocomplete>

    <div class="flex-grow-1"></div>
    <v-btn icon @click="$emit('toggle-statistics')">
      <v-icon>mdi-chart-bar</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
export default {
  name: "Navbar",
  props: {
    selected: Object,
    schools: Object
  },
  data: () => ({
    autocomplete: null
  }),

  methods: {
    showChildren(item) {
      console.log("Show children of ", item);
    },
    autocompleteSelected(value) {
      if (value) {
        this.$emit("select-option", value);
        this.$nextTick(() => {
          this.autocomplete = null;
        });
      }
    }
  },

  computed: {
    autocompleteOptions() {
      let result = [];
      for (let ico in this.schools)
        if (!this.selected[ico]) result.push(this.schools[ico]);

      return result;
    }
  }
};
</script>

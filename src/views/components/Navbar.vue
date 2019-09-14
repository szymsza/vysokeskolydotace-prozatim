<template>
  <v-app-bar
    :clipped-left="$vuetify.breakpoint.lgAndUp"
    app
    color="blue darken-4"
    dark
  >
    <v-toolbar-title style="width: 300px" class="ml-0 pl-4">
      <span class="hidden-sm-and-down">Vysoké školy</span>
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
        <v-list-item-action @click.stop v-if="item.faculties">
          <v-btn icon @click.stop.prevent="toggleChildren(item)">
            <v-icon
              >mdi-chevron-{{
                item.ico === visibleFaculties ? "up" : "down"
              }}</v-icon
            >
          </v-btn>
        </v-list-item-action>
      </template>
    </v-autocomplete>

    <div class="flex-grow-1"></div>
    <v-btn icon>
      <v-icon>mdi-information-outline</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
export default {
  name: "Navbar",
  props: {
    selected: Object,
    schools: Object,
    faculties: Object
  },
  data: () => ({
    autocomplete: null,
    visibleFaculties: null
  }),

  methods: {
    toggleChildren(item) {
      let ico = item.ico;

      if (this.visibleFaculties === ico) this.visibleFaculties = null;
      else this.visibleFaculties = ico;
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
      for (let ico in this.schools) {
        let school = this.schools[ico];
        if (!this.selected[ico]) result.push(school);
        if (this.visibleFaculties === ico)
          result.push({ name: "- Jsem fakulta" });
      }

      return result;
    }
  }
};
</script>

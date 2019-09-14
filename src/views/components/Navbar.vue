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
      :search-input.sync="autocompleteCurrentValue"
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
        <span v-if="item.isChild" class="faculty-item">
          {{ item.name }}
        </span>
        <template v-else-if="item.orjk">
          {{ item.name }}
          <span class="faculty-school">({{ item.school_name }})</span>
        </template>
        <template v-else>
          {{ item.name }}
        </template>
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
    schools: Object,
    faculties: Object
  },
  data: () => ({
    autocomplete: null,
    autocompleteCurrentValue: null,
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
          for (let orjk in school.faculties)
            result.push(
              Object.assign({ isChild: true }, school.faculties[orjk])
            );
      }

      if (this.autocompleteCurrentValue)
        for (let orjk in this.faculties) {
          result.push(this.faculties[orjk]);
        }

      return result;
    }
  },

  watch: {
    autocompleteCurrentValue() {
      this.visibleFaculties = null;
    }
  }
};
</script>

<template>
  <v-app-bar
    :clipped-left="$vuetify.breakpoint.lgAndUp"
    app
    color="blue darken-4"
    dark
  >
    <v-toolbar-title style="width: 300px" class="ml-0 pl-4">
      <img src="@/assets/logo.png" /><span>Kam za vědou</span>
    </v-toolbar-title>

    <v-autocomplete
      v-model="autocomplete"
      :search-input.sync="autocompleteCurrentValue"
      @input="autocompleteSelected"
      :append-icon="null"
      :label="
        Object.keys(selected).length < 15
          ? 'Vyhledat školu nebo fakultu'
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
              >mdi-chevron-{{ item.ico === visibleFaculties ? "up" : "down" }}
            </v-icon>
          </v-btn>
        </v-list-item-action>
      </template>
    </v-autocomplete>

    <div class="flex-grow-1"></div>
    <v-btn icon @click="$emit('toggle-statistics')" title="Přehled statistik">
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
    },
    sortArray(a, b) {
      let aN = a.name.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      let bN = b.name.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      if (aN < bN) return -1;
      if (aN > bN) return 1;
      return 0;
    }
  },

  computed: {
    autocompleteOptions() {
      let result = [];

      // Push schools that were not selected yet
      let schoolsArray = Object.values(this.schools).sort(this.sortArray);
      for (let index in schoolsArray) {
        let school = schoolsArray[index];
        let ico = school.ico;
        if (!this.selected[ico]) result.push(school);

        // School is visible -> push its faculties
        if (this.visibleFaculties === ico)
          for (let orjk in school.faculties)
            result.push(
              Object.assign({ isChild: true }, school.faculties[orjk])
            );
      }

      // Push all faculties if search is in progress
      if (this.autocompleteCurrentValue) {
        let facultiesArray = Object.values(this.faculties).sort(this.sortArray);
        for (let index in facultiesArray)
          if (!this.selected[facultiesArray[index].orjk])
            result.push(facultiesArray[index]);
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

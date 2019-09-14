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

    <v-combobox
      v-model="model"
      :filter="filter"
      :hide-no-data="true"
      :items="items"
      :search-input.sync="search"
      hide-selected
      :append-icon="null"
      label="Search for an option"
      clearable
      multiple
      flat
      solo-inverted
      prepend-inner-icon="search"
    >
      <template v-slot:selection="{ attrs, item, parent, selected }">
        <v-chip
          v-if="item === Object(item)"
          v-bind="attrs"
          :color="`${item.color} lighten-3`"
          :input-value="selected"
          label
          small
        >
          <span class="pr-2">
            {{ item.text }}
          </span>
          <v-icon small @click="parent.selectItem(item)">close</v-icon>
        </v-chip>
      </template>
      <template v-slot:item="{ index, item }">
        {{ item.text }}
        <div class="flex-grow-1"></div>
        <v-list-item-action @click.stop>
          <v-btn icon @click.stop.prevent="edit(index, item)">
            <v-icon>mdi-chevron-down</v-icon>
          </v-btn>
        </v-list-item-action>
      </template>
    </v-combobox>

    <div class="flex-grow-1"></div>
    <v-btn icon>
      <v-icon>mdi-information-outline</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
export default {
  name: "Navbar",
  data: () => ({
    activator: null,
    attach: null,
    editing: null,
    index: -1,
    items: [
      {
        text: "Foo",
        color: "blue"
      },
      {
        text: "Bar",
        color: "red"
      }
    ],
    nonce: 1,
    menu: false,
    model: [
      {
        text: "Foo",
        color: "blue"
      }
    ],
    x: 0,
    search: null,
    y: 0
  }),

  watch: {
    model(val, prev) {
      if (val.length === prev.length) return;

      this.model = val.map(v => {
        if (typeof v === "string") {
          v = {
            text: v,
            color: "red"
          };

          this.items.push(v);

          this.nonce++;
        }

        return v;
      });
    }
  },

  methods: {
    edit(index, item) {
      if (!this.editing) {
        this.editing = item;
        this.index = index;
      } else {
        this.editing = null;
        this.index = -1;
      }
    },
    filter(item, queryText, itemText) {
      if (item.header) return false;

      const hasValue = val => (val != null ? val : "");

      const text = hasValue(itemText);
      const query = hasValue(queryText);

      return (
        text
          .toString()
          .toLowerCase()
          .indexOf(query.toString().toLowerCase()) > -1
      );
    }
  }
};
</script>

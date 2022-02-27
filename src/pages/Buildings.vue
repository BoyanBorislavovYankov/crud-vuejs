<template>
  <q-page>

    <Header />

    <div class="row">
      <div class="col q-pa-md">

        <q-dialog v-model="showDialog">
          <q-card>
            <q-card-section>
              <div class="text-h6">Enter building details</div>
            </q-card-section>

            <q-card-section>
                <q-input v-model="editedItem.id" ref="id" type="number" label="Id" :disable="editedIndex !== null" :rules="[val => (val && val > 0) || '* Required']" lazy-rules></q-input>
                <q-input v-model="editedItem.name" ref="name" label="Name" :rules="[val => (val && val.length > 0) || '* Required']" lazy-rules></q-input>
                <q-input v-model="editedItem.area" ref="area" type="number" label="Area, square meter" :rules="[val => (val && val > 0) || '* Required']" lazy-rules></q-input>
                <q-input v-model="editedItem.location" ref="location" label="Location"></q-input>
                <q-input v-model="editedItem.image" ref="image" label="Image URL" type="textarea"></q-input>
            </q-card-section>

            <q-card-actions align="right">
              <q-btn flat :label="editedIndex === null ? 'Add building' : 'Update building'" color="primary" @click="modifyRow" ></q-btn>
            </q-card-actions>
          </q-card>
        </q-dialog>

        <q-table
          title="Buildings"
          :rows="rows"
          :columns="columns"
          row-key="id"
          :pagination="paginationSettings"
          >
          {{showDialog}}

          <template v-slot:top>
            <div class="q-table__title">Buildings</div>
            <q-space />
            <q-btn color="primary" label="Add building" @click="addItemForm" ></q-btn>
          </template>

          <template v-slot:body="props">
            <q-tr :props="props">
              <q-td key="id" :props="props">
                {{ props.row.id }}
              </q-td>
              <q-td key="name" :props="props">
                {{ props.row.name }}
              </q-td>
              <q-td key="area" :props="props">
                {{ props.row.area }} m<sup>2</sup>
              </q-td>
              <q-td key="location" :props="props">
                {{ props.row.location }}
              </q-td>
              <q-td key="image" :props="props">
                <img :src="props.row.image" :alt="props.row.name" :title="props.row.name" style="max-width: 160px;" />
              </q-td>
              <q-td key="actions" :props="props">
                <q-btn color="blue" label="Edit" @click="editItemForm(props.row)" size=sm></q-btn>
                &nbsp;
                <q-btn color="red" label="Delete"  @click="deleteItemPrompt(props.row)" size=sm></q-btn>
              </q-td>
            </q-tr>
          </template>

        </q-table>

      </div>
    </div>

  </q-page>
</template>

<script>
import { defineComponent, ref } from "vue";
import { useQuasar, LocalStorage } from 'quasar';
import Header from "components/Header.vue";

export default defineComponent({
  name: "Buildings",
  components: {
    Header,
  },
  data() {
    return {
      /**
       * data - table rows
       */
      rows: [],

      /**
       * table columns configuration
       */
      columns: [
        { name: 'id', required: true, label: 'Id', align: 'center', field: 'id', sortable: true },
        { name: 'name', required: true, label: 'Name', align: 'left', field: 'name',  sortable: true },
        { name: 'area', required: true, align: 'center', label: 'Area', field: 'area', sortable: true },
        { name: 'location', label: 'Location', field: 'location', sortable: true },
        { name: 'image', label: 'Image', align: 'center', field: 'image' },
        { name: "actions", label: "Actions", field: "actions" },
      ],

      /**
       * table pagination configuration
       */
      paginationSettings: {
        sortBy: 'id',
        descending: false,
        page: 1,
        rowsPerPage: 10
      },

      /**
       * flag which indicates thether to show the dialog for adding new items
       */
      showDialog: false,


      /**
       * temp store of the currently edited item's data
       */
      editedItem: {
        id: null,
        name: '',
        area: null,
        location: '',
        image: ''
      },

      /**
       * the index of the currently edited item
       */
      editedIndex: null,

      /**
       * key to use for local storage
       */
      localStorageKey: 'data',
    }
  },
  created () {
    //load seed data
    const seed = [
      {
        id: 1,
        name: 'Windsor',
        area: 1590,
        location: 'Sofia, Bulgaria',
        image: 'https://images.pexels.com/photos/302769/pexels-photo-302769.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=160&w=120'
      },
      {
        id: 2,
        name: 'Astoria',
        area: 2370,
        location: 'New Yourk City, USA',
        image: 'https://images.pexels.com/photos/269077/pexels-photo-269077.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=160&w=120'
      },
      {
        id: 3,
        name: 'Blue lagune',
        area: 262,
        location: 'Bucharest, Romania',
        image: 'https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=160&w=120'
      },
      {
        id: 4,
        name: 'Windsor 2',
        area: 305,
        location: 'Talin, Armenia',
        image: 'https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=160&w=120'
      },
      {
        id: 5,
        name: 'Windsor 3',
        area: 356,
        location: 'Athens, Greece',
        image: 'https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=160&w=120'
      },
      {
        id: 6,
        name: 'Windsor 4',
        area: 375,
        location: 'Sofia, Bulgaria',
        image: 'https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=160&w=120'
      },
      {
        id: 7,
        name: 'Windsor 5',
        area: 392,
        location: 'Sofia, Bulgaria',
        image: 'https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=160&w=120'
      },
    ];

    //attempt to load stored data from local storage
    const storedData = LocalStorage.getItem(this.localStorageKey);
    if ( storedData !== null && Array.isArray(storedData) ){
      //found - load stored data
      this.rows = storedData;
    } else {
      //not found - load initial seed instead
      this.rows = seed;
      LocalStorage.set(this.localStorageKey, this.rows);
    }
  },
  methods: {

    /**
     * checkForm - check the form for errors
     *
     * @return {boolean}  check result
     */
    checkForm () {
      this.$refs.id.validate();
      this.$refs.name.validate();
      this.$refs.area.validate();

      if (this.$refs.id.hasError || this.$refs.name.hasError || this.$refs.area.hasError) {
        return false;
      } else {

        if (this.editedIndex !== null){
          //editing item
          return true;
        } else {

          //adding a new item
          //check if an item with the same id already exists
          const duplicateFlag = this.rows.find(obj => {
            return parseInt(obj.id) === parseInt(this.editedItem.id);
          });
          if (typeof duplicateFlag === 'undefined'){
            return true;
          } else {
            return false;
          }
        }
      }
    },

    //

    /**
     * addItemForm - show the form for adding an item
     *
     */
    addItemForm() {
      this.editedIndex = null;

      this.editedItem.id = null;
      this.editedItem.name = '';
      this.editedItem.area = null;
      this.editedItem.location = '';
      this.editedItem.image = '';

      this.showDialog = true;
    },

    /**
     * editItemForm - show the form for editing an item
     *
     * @param  {int} item item index
     */
    editItemForm(item) {
      this.editedIndex = this.rows.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.showDialog = true;
    },

    /**
     * closeItemForm - close the form for adding items
     *
     */
    closeItemForm () {
      this.showDialog = false
      this.editedItem = Object.assign({}, this.defaultItem);
      this.editedIndex = null;
    },

    /**
     * modifyRow - update or add a data row
     *
     */
    modifyRow() {
      //check for for validation errors
      if (this.checkForm()){
        if (this.editedIndex !== null) {
          Object.assign(this.rows[this.editedIndex], this.editedItem);
        } else {
          this.rows.push(this.editedItem);
        }
        this.editedIndex = null;
        this.closeItemForm();

        //write to local storage
        LocalStorage.set(this.localStorageKey, this.rows);
      }
    },

    /**
     * deleteItemPrompt - prompt to delete an item and delete it is the user confirms
     *
     * @param  {int} item item index
     */
    deleteItemPrompt(item) {
      const index = this.rows.indexOf(item);
      if ( confirm("Are you sure you want to delete this item?") === true ){
          this.rows.splice(index, 1);

          //write to local storage
          LocalStorage.set(this.localStorageKey, this.rows);
      }
    },

  },
});
</script>

<template>
  <div class="container">
    <div class="table-wrapper">
      <div class="table-title">
        <div class="row">
          <div class="col-sm-6">
            <h2>Clients</h2>
          </div>
          <div class="col-sm-6 d-flex justify-content-end">
            <a href="#clientModal" data-toggle="modal" class="btn btn-primary"
              >add new client</a
            >
          </div>
          <div class="col-sm-12 mt-4 d-flex justify-content-end align-item-center">
            <form class="form-inline my-2 my-lg-0">
              <input
                class="form-control mr-sm-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button
                class="btn btn-outline-success my-2 my-sm-0"
                type="submit"
              >
                Search
              </button>
            </form>
          </div>
        </div>
      </div>
      <table class="table table-striped table-hover">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Providers</th>
            <th
              colspan="2"
              class="d-flex justify-content-center align-self-center"
            >
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="client in clients" :key="client._id">
            <td>{{ client.name }}</td>
            <td>{{ client.email }}</td>
            <td>{{ client.phone }}</td>
            <td>
              <div v-for="provider in client.providers" :key="provider.id">
                {{ provider.name }}
              </div>
            </td>
            <td>
              <a @click="openEditModal(client._id)" class="btn btn-primary"
                >Edit</a
              >
            </td>
            <td>
              <a v-on:click="openDeleteModal(client._id)" class="btn btn-danger"
                >Delete</a
              >
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Add new Client Modal -->
    <div id="clientModal" class="modal fade">
      <div class="modal-dialog">
        <div class="modal-content">
          <form>
            <div class="modal-header">
              <h4 class="modal-title">Add Client</h4>
              <button
                type="button"
                data-dismiss="modal"
                class="close"
                aria-hidden="true"
              >
                &times;
              </button>
            </div>
            <div class="modal-body">
              <div class="form-group">
                <label for="name">Name</label>
                <input type="text" v-model="form.name" class="form-control" />
              </div>
              <div class="form-group">
                <label for="email">Email</label>
                <input type="email" v-model="form.email" class="form-control" />
              </div>
              <div class="form-group">
                <label for="phone">Phone Number</label>
                <input
                  type="number"
                  v-model="form.phone"
                  class="form-control"
                />
              </div>
              <div>
                <label class="typo__label">Provider(s)</label>
                <multiselect
                  v-model="form.providers"
                  tag-placeholder="Add this as new tag"
                  placeholder="Search or add a tag"
                  label="name"
                  track-by="_id"
                  :options="providers"
                  :multiple="true"
                  :taggable="true"
                  @tag="addTag"
                ></multiselect>
              </div>
            </div>
            <div class="modal-footer">
              <input
                type="button"
                class="btn btn-warning"
                data-dismiss="modal"
                value="cancel"
              />
              <input
                type="button"
                @click="addNewClient"
                class="btn btn-success"
                value="add"
              />
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- Delete Modal -->
    <div
      class="modal fade"
      id="deleteModal"
      tabindex="-1"
      aria-labelledby="deleteModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title text-info" id="deleteModalLabel">
              Delete
              <span v-if="current_client.data">{{
                current_client.data.name
              }}</span>
              Client Info
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            Are you sure you want to perform this action?
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
            >
              Cancel
            </button>
            <button
              type="button"
              class="btn btn-danger"
              @click="deleteClient(current_client.data._id)"
            >
              confirm
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- edit Modal -->
    <div id="editeClientModal" class="modal fade">
      <div class="modal-dialog">
        <div class="modal-content">
          <form v-if="current_client.data">
            <div class="modal-header">
              <h4 class="modal-title text-info">
                Edit
                <span v-if="current_client.data">{{
                  current_client.data.name
                }}</span>
                info
              </h4>
              <button
                type="button"
                data-dismiss="modal"
                class="close"
                aria-hidden="true"
              >
                &times;
              </button>
            </div>
            <div class="modal-body">
              <!-- {{ current_client.data }} -->
              <div class="form-group">
                <label for="name">Name</label>
                <input
                  type="text"
                  v-model="current_client.data.name"
                  class="form-control"
                />
              </div>
              <div class="form-group">
                <label for="email">Email</label>
                <input
                  type="email"
                  v-model="current_client.data.email"
                  class="form-control"
                />
              </div>
              <div class="form-group">
                <label for="phone">Phone Number</label>
                <input
                  type="number"
                  v-model="current_client.data.phone"
                  class="form-control"
                />
              </div>
              <div>
                <label class="typo__label">Provider</label>
                <multiselect
                  v-model="current_client.data.providers"
                  tag-placeholder="Add this as new tag"
                  placeholder="Search or add a tag"
                  label="name"
                  track-by="_id"
                  :options="providers"
                  :multiple="true"
                  :taggable="true"
                  @tag="addTag"
                ></multiselect>
              </div>
            </div>
            <div class="modal-footer">
              <input
                type="button"
                class="btn btn-info"
                data-dismiss="modal"
                value="cancel"
              />
              <input
                type="button"
                @click="updateClient(current_client.data._id)"
                class="btn btn-warning"
                value="update"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Multiselect from "vue-multiselect";
import _ from "underscore";
import $ from "jquery";
import axios from "axios";
export default {
  components: {
    Multiselect,
  },
  data() {
    return {
      clients: [],
      form: {
        name: "",
        email: "",
        phone: "",
        providers: [],
      },
      providers: [],
      selected: null,
      current_client: {},
    };
  },

  created() {
    axios.get("api/v1/providers").then((res) => {
      console.log(res.data.response);
      this.providers = res.data.response;
    });
    

    this.getClients();
    // this.deleteModal()
    this.getProviders();

    
  },

  computed: {
    providersArray() {
      return _.map(this.providers, function (provider) {
        return provider.name;
      });
    },
  },

  methods: {
    addTag(newTag) {
      const tag = {
        name: newTag,
        id: newTag,
      };
      this.options.push(tag);
      this.form.providers.push(tag);
    },

    //retrieve all providers
    getProviders() {
      axios.get("api/v1/providers").then((res) => {
        console.log(res);
        this.providers = res.data.response;
      });
    },

    //update selected providers from dropdown
    updateSelected(newSelected) {
      this.selected = newSelected;
    },

    //retrieve all clients
    getClients() {
      axios.get("api/v1/clients").then((res) => {
        // console.log(res.data.data)
        this.clients = res.data.data;
      });
    },

    //add new client
    addNewClient() {
      axios.post("api/v1/create-client", this.form).then((res) => {
        console.log(res);
      });
      (this.form.name = ""),
        (this.form.email = ""),
        (this.form.phone = ""),
        (this.form.providers = []);
      $("#clientModal").modal("hide");
      this.getClients();
    },

    //delete clients
    deleteClient(id) {
      axios.delete(`api/v1/client/${id}`);
      $("#deleteModal").modal("hide");
      this.getClients();
    },

    //open Delete modal or pop up
    openDeleteModal(id) {
      $("#deleteModal").modal("show");
      axios.get(`api/v1/client/${id}`).then((res) => {
        this.current_client = res.data;
        console.log(this.current_client);
      });
    },

    //open Edit clients modal
    openEditModal(id) {
      $("#editeClientModal").modal("show");
      axios.get(`api/v1/client/${id}`).then((res) => {
        this.current_client = res.data;
      });
    },

    //retrieve single client base on ID
    getSingleClient(id) {
      axios.get(`api/v1/client/${id}`).then((res) => {
        console.log(res.data);
        this.current_client = res.data;
      });
    },

    //update client info base on id
    updateClient(id) {
      axios.put(`api/v1/client/${id}`, this.current_client.data);
      $("#editeClientModal").modal("hide");
      this.getClients();
    },
  },
};
</script>


<style  scoped>
.table-wrapper {
  padding: 20px 25px;
  margin: 30px 0;
  border-radius: 1px;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.247);
}

.table-title {
  padding-bottom: 15px;
  background: linear-gradient(40deg, #2096ff, #05ffa3) !important;
  color: #fff;
  padding: 16px 30px;
  margin: -20px -25px 10px;
  border-radius: 1px 1px 0 0;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.247);
}

.table-title h2 {
  margin: 5px 0 0;
  font-size: 24px;
}
</style>
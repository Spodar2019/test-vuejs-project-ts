<template>
  <div class="home mt-5 mb-5">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <h1>Automations:</h1>
          <ul class="list-group">
            <router-link
              :to="{ name: 'Automation', params: { id: 316 } }"
              class="list-group-item"
              >Automation #316</router-link
            >
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({})
export default class Home extends Vue {}
</script>

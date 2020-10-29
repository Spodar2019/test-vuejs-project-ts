<template>
  <div>
    <AddCampaigns />
    <table class="table table-hover">
      <thead>
        <tr>
          <td>Campaign</td>
          <td>Master Geo Level</td>
          <td>Breakdown Geo Level</td>
          <td></td>
          <td></td>
        </tr>
      </thead>
      <tbody>
        <CampaignTableRow
          v-for="(campaign, index) in campaigns"
          :key="'campaign-row-' + index"
          :campaign="campaign"
        />
      </tbody>
    </table>
    <button :disabled="true" class="btn btn-secondary shadow">
      Save added campaigns
    </button>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import AddCampaigns from "@/components/AddCampaigns.vue";
import CampaignTableRow from "@/components/CampaignTableRow.vue";

@Component({
  components: { CampaignTableRow, AddCampaigns }
})
export default class CampaignTable extends Vue {
  @Prop() private campaigns!: object;
}
</script>

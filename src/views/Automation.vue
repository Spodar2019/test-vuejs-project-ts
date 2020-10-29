<template>
  <div class="container mt-5 mb-5">
    <h2 class="mb-4">Automation #{{ id }}</h2>
    <CampaignTable :campaigns="computedCampaigns" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import CampaignTable from "@/components/CampaignTable.vue";

@Component({
  components: { CampaignTable }
})
export default class Automation extends Vue {
  @Prop() private id!: string;
  private campaigns: Array<unknown> = [];

  get computedCampaigns() {
    const { campaigns } = this;
    const temporaryCampaigns = this.$store.getters.getTemporaryCampaigns;
    return campaigns.concat(temporaryCampaigns);
  }

  async created() {
    this.$store.commit("setTemporaryCampaigns", []);
    this.campaigns = await this.$store.dispatch("getAutomationEntity", this.id);
  }
}
</script>

<template>
  <div class="mb-2">
    <button
      class="btn btn-success d-flex align-items-center shadow"
      data-toggle="modal"
      data-target="#add-campaigns-modal"
    >
      <IconPlus />
      <span>Add campaigns</span>
    </button>
    <div
      ref="modal"
      class="modal fade"
      id="add-campaigns-modal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Add campaigns</h5>
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
            <ul class="list-group">
              <li
                v-for="(campaign, index) in campaigns"
                :key="'campaign-' + index"
                class="list-group-item"
              >
                <div class="custom-control custom-checkbox">
                  <input
                    title=""
                    type="checkbox"
                    :checked="selectedCampaignIds.indexOf(campaign.id) !== -1"
                    class="custom-control-input"
                    @change="toggleCampaign(campaign)"
                    :id="'campaign-list-' + campaign.id"
                  />
                  <label
                    class="custom-control-label"
                    :for="'campaign-list-' + campaign.id"
                  >
                    <span class="ml-2">{{ campaign.name }}</span>
                  </label>
                </div>
              </li>
            </ul>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              ref="closeModal"
              data-dismiss="modal"
            >
              Cancel
            </button>
            <button @click="addCampaigns" type="button" class="btn btn-primary">
              Add campaigns
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import IconPlus from "@/assets/icons/icon-plus.svg";
import { Component, Vue } from "vue-property-decorator";
import { Campaign } from "@/interfaces/Campaign";

@Component({
  components: { IconPlus }
})
export default class AddCampaigns extends Vue {
  $refs!: {
    closeModal: HTMLFormElement;
  };

  private campaigns: Array<Campaign> = [];
  private selectedCampaignIds: Array<unknown> = [];

  get selectedCampaigns() {
    const { selectedCampaignIds, campaigns } = this;
    return campaigns.filter(
      (e: Campaign) => selectedCampaignIds.indexOf(e.id) !== -1
    );
  }

  // methods
  /**
   *
   * @param campaign
   */
  public toggleCampaign(campaign: Campaign) {
    const { selectedCampaignIds } = this;

    if (selectedCampaignIds.indexOf(campaign.id) === -1) {
      selectedCampaignIds.push(campaign.id);
    } else {
      delete this.selectedCampaignIds[
        this.selectedCampaignIds.indexOf(campaign.id)
      ];
    }

    this.selectedCampaignIds = Object.values(selectedCampaignIds);
  }
  /**
   *
   * @returns {Promise<void>}
   */
  public async addCampaigns() {
    this.$store.commit("setTemporaryCampaigns", this.selectedCampaigns);

    for (const selectedCampaign of this.selectedCampaigns) {
      this.$store.dispatch("addCampaign", selectedCampaign).then(data => {
        this.handleCampaignsResponse(selectedCampaign, data);
      });
    }

    this.$refs.closeModal.click();
  }
  /**
   * TODO
   * @param selectedCampaign
   * @param createdCampaign
   */
  public handleCampaignsResponse(
    selectedCampaign: unknown, //TODO describe interface
    createdCampaign: unknown // TODO describe interface
  ) {
    //TODO
    console.log(selectedCampaign, createdCampaign);
  }

  async created() {
    this.campaigns = await this.$store.dispatch("getCampaigns");
  }
}
</script>

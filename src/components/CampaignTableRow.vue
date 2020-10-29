<template>
  <tr>
    <td>{{ name }}</td>
    <td>
      <div
        v-for="(originalLocation, index) in originalLocations"
        :key="'original-location-' + index"
      >
        {{ getLocation(originalLocation) }}
      </div>
    </td>
    <td>
      <div
        v-for="(breakdownLocation, index) in breakdownLocations"
        :key="'breakdown-location-' + index"
      >
        {{ getLocation(breakdownLocation) }}
      </div>
    </td>
    <td>
      <span class="badge bg-success m-1">Sync Succeeded</span>
      <span class="badge bg-danger m-1">Sync Failed</span>
    </td>
    <td>
      <button
        @click="reSyncCampaign"
        class="btn btn-outline shadow m-1"
        title="Remove Campaign"
      >
        <IconRepeat /> re-sync
      </button>
      <button
        @click="removeCampaign"
        class="btn btn-danger shadow m-1"
        title="Remove Campaign"
      >
        <IconTrash /> Remove
      </button>
    </td>
  </tr>
</template>

<script lang="ts">
import IconTrash from "@/assets/icons/icon-trash.svg";
import IconRepeat from "@/assets/icons/icon-repeat.svg";
import CommonMixin from "@/mixins/common.mixin";
import { Component, Prop, Mixins } from "vue-property-decorator";
import { Campaign } from "@/interfaces/Campaign";
import { OriginalLocation } from "@/interfaces/OriginalLocation";

@Component({
  components: { IconTrash, IconRepeat }
})
export default class CampaignTableRow extends Mixins(CommonMixin) {
  // props
  @Prop() private campaign!: Campaign;

  // computed
  get entity() {
    const { entity } = this.campaign;
    return entity || {};
  }
  get locationSummary() {
    const { locationSummary } = this.campaign;
    return locationSummary || {};
  }
  get originalLocations() {
    const { locationSummary } = this;
    return locationSummary.originalLocations || [];
  }
  get breakdownLocations() {
    const { locationSummary } = this;
    return locationSummary.breakdownLocations || [];
  }
  get name() {
    const { entity } = this;
    return entity.name || "-";
  }

  // methods
  public removeCampaign() {
    const { id } = this.entity;
    alert("Removed #" + id);
  }
  /**
   * TODO
   */
  public reSyncCampaign() {
    console.log("TODO");
  }
  /**
   *
   * @param originalLocation
   * @returns {string|string}
   */
  public getLocation(originalLocation: OriginalLocation) {
    const { locationType, count } = originalLocation;
    return locationType && count
      ? `${this._capitalizeFirstLetter(locationType)} (${count})`
      : "-";
  }
}
</script>

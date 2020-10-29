import { shallowMount } from "@vue/test-utils";
import AddCampaigns from "@/components/AddCampaigns.vue";
import store from "../../store";

describe("AddCampaigns.vue", () => {
  it("renders component", () => {

    const wrapper = shallowMount(AddCampaigns, {
      store,
      propsData: { }
    });
  });
});

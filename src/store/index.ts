import Vue from "vue";
import Vuex from "vuex";
import Axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    apiEndpoint: location.origin + "/api_endpoints",
    temporaryCampaigns: []
  },
  getters: {
    getTemporaryCampaigns: state => state.temporaryCampaigns
  },
  mutations: {
    setTemporaryCampaigns: (state, payload) =>
        (state.temporaryCampaigns = payload)
  },
  actions: {
    /**
     * get campaigns /AutomationEntity/GetByAutomationId
     * @param state
     * @param dispatch
     * @param automationId
     * @returns {Promise<>}
     */
    getAutomationEntity: function({ state, dispatch }, automationId) {
      return new Promise((resolve, reject) => {
        Axios.get(
            state.apiEndpoint +
            "/AutomationEntity-GetByAutomationId-" +
            automationId +
            ".json"
        )
            .then(response => {
              resolve(response.data);
            })
            .catch(async error => {
              await dispatch("handleErrors", error);
              reject();
            });
      });
    },
    /**
     * get available campaigns /api/facebook/getcampaigns/
     * @param state
     * @param dispatch
     * @returns {Promise<>}
     */
    getCampaigns: function({ state, dispatch }) {
      return new Promise((resolve, reject) => {
        Axios.get(state.apiEndpoint + "/Campaigns.json")
            .then(response => {
              const { adsets } = response.data;
              resolve(adsets || []);
            })
            .catch(async error => {
              await dispatch("handleErrors", error);
              reject();
            });
      });
    },
    /**
     * get campaign entity /AutomationEntity/GetEntityBreakdown
     * @param state
     * @param dispatch
     * @param campaign
     * @returns {Promise<>}
     */
    addCampaign: function({ state, dispatch }, campaign) {
      return new Promise((resolve, reject) => {
        Axios.get(
            state.apiEndpoint +
            "/AutomationEntity-GetEntityBreakdown-316-response-body.json",
            {
              data: campaign
            }
        )
            .then(response => {
              setTimeout(() => {
                // api delay
                resolve(response.data);
              }, 2000);
            })
            .catch(async error => {
              await dispatch("handleErrors", error);
              reject();
            });
      });
    },
    /**
     *  TODO handle api response errors
     */
    handleErrors: function() {
      //TODO
    }
  },
  modules: {}
});

import { Component, Vue } from 'vue-property-decorator'
@Component
class CommonMixin extends Vue {
    public _capitalizeFirstLetter(string: string): string {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
}
export default CommonMixin

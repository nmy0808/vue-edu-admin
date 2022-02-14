<script>
export default {
  name: 'Render',
  props: {
    renderFn: {
      type: Function,
      default: () => {}
    },
    slotData: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {}
  },
  mounted() {
  },
  methods: {},
  render(h) {
    return <span>{this.renderFn(this.slotData)}</span>
  }
}
</script>
<style scoped lang="scss">
</style>

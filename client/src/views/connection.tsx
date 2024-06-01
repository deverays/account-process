import { defineComponent, h } from 'vue'
import { Preloader } from '@/components/ui/loader'
import imports from '@/utils/imports'
import { getReq } from '@/utils/axiosReqs'

const urlMap = new Map([['discord', '/connection/discord']])

export default defineComponent({
  setup() {
    const { store } = imports()
    return { store }
  },
  async mounted() {
    this.store._isWorked = 40
    const url = urlMap.get(this.$route.query.type as string)

    if (!url) this.$router.push('/users/signin')

    getReq(`${url}?code=${this.$route.query.code}`)
      .then((res) => {
        this.store._isWorked = 100
        localStorage.setItem('user_data', JSON.stringify({ access_token: res.data.access_token, ...(JSON.parse(localStorage.user_data || 'null') || {}) }))
        window.location.href = '/'
      }).catch(() => this.$router.push('/users/signin'))
  },
  render() { return h(Preloader) }
})

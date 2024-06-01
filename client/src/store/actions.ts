import { getReq } from '@/utils/axiosReqs'

export default {
  async initUser() {
    const getUser = async () => {
      return await getReq('/users/self')
    }

    const response = await this.makeRequest(getUser).catch(() => { })

    if (response.data.success) {
      delete response.data._id
      delete response.data.message
      delete response.data.success

      localStorage.setItem(
        'user_data',
        JSON.stringify({
          info: response.data,
          ...(JSON.parse(localStorage.user_data || 'null') || {})
        })
      )

        ; (this as any)._isLogin = true
        ; (this as any).getters._getUser = response.data
    }
  },

  async makeRequest(this: any, requestFunc: () => Promise<any>) {
    try {
      const response = await requestFunc()
      return response
    } catch (err: any) {
      await this.handleRateLimit(err, () => this.makeRequest(requestFunc))
      this.handleUnauthorized()
      window.location.href = '/'
      throw err
    }
  },

  async handleRateLimit(this: any, err: any, retryCallback: () => Promise<any>) {
    if (err?.response?.data?.message === 'You are being rate limited.') {
      const retryAfter = err.response.data.retry_after || 1
      setTimeout(retryCallback, retryAfter * 1300)
    }
  },

  handleUnauthorized() {
    ; (this as any)._isLogin = false
      ; (this as any).getters._getUser = null

    const userData = JSON.parse(localStorage.getItem('user_data') ?? '{}')
    delete userData.access_token

    localStorage.setItem('user_data', JSON.stringify(userData))
  }
}

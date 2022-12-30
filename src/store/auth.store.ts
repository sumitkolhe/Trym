import { defineStore } from 'pinia'
import { logger } from 'utils/logger'
import type { User } from 'interfaces/user.interface'

export const useAuthStore = defineStore('authentication-store', {
  state: () => ({
    user: {} as Omit<User, 'apiKey' | 'userLinks'>,
  }),
  actions: {
    async loginUser(email: string, password: string) {
      try {
        const response = await this.$http.auth.login(email, password)

        const { accessToken, refreshToken } = useToken()

        accessToken.value = response.data!.accessToken
        refreshToken.value = response.data!.refreshToken

        await this.fetchUser()
      } catch (error) {
        if (error instanceof Error) logger.error(error.message)
      }
    },

    async registerUser(email: string, password: string) {
      try {
        await this.$http.auth.login(email, password)
      } catch (error) {
        if (error instanceof Error) logger.error(error.message)
      }
    },

    async fetchUser() {
      try {
        const response = await this.$http.auth.fetchUser()

        this.user = response.data!
      } catch (error) {
        if (error instanceof Error) logger.error(error.message)
      }
    },

    async logout() {
      try {
        await this.$http.auth.logout()

        const router = useRouter()

        router.replace('/')
      } catch (error) {
        if (error instanceof Error) logger.error(error.message)
      }
    },

    async refreshToken(refreshToken: string) {
      try {
        const response = await this.$http.auth.refreshAccessToken(refreshToken)

        const { accessToken } = useToken()

        accessToken.value = response.data!.accessToken
      } catch (error) {
        if (error instanceof Error) logger.error(error.message)
        await this.logout()
      }
    },

    async resendVerificationEmail() {
      try {
        await this.$http.auth.resendVerificationEmail()
      } catch (error) {
        if (error instanceof Error) logger.error(error.message)
      }
    },
  },
})

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { TOKEN_KEY } from '@/enums/cacheEnum'

interface UserInfo {
  name: string
  avatar: string
}

interface UserState {
  token: string | null
  userInfo: UserInfo | null
  setUserInfo: (userInfo: UserInfo) => void
  setToken: (token: string) => void
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      token: null,
      userInfo: null,
      setUserInfo: (userInfo: any) => set({ userInfo }),
      setToken: (token: string) => {
        set({ token })
        localStorage.setItem(TOKEN_KEY, token)
      }
    }),
    {
      name: 'user-storage'
    }
  )
)

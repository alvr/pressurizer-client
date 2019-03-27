import { WishlistShop } from '@/models/WishlistShop'

export interface UserWishlist {
  appId: string
  name: string
  shops: WishlistShop[]
}

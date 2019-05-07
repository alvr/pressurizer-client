import { Stats } from '@/models/Stats'
import { Game } from '@/models/Game'

export interface GamesWithStats {
  stats: Stats
  games: Game[]
}

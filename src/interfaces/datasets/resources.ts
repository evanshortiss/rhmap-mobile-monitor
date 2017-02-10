
interface FHApp {
  cpu: number
  disk: number
  guid: string
  lastModified: number
  memory: number
  name: string
  state: string
  type: string
  title: string
}

export interface FHEnvironment {
  data: {
    apps: Array<FHApp>
    environment: string
    resources: {
      apps: {
        apps: number // represents memory usage
        running: number
        total: number
      }
      cache: {
        system: number
        total: number
        used: number
      }
      cpu: {
        apps: number
        system: number
        used: number
        total: number
      }
      disk: {
        used: number
        total: number
      }
      memory: {
        apps: number
        cache: number
        system: number
        total: number
        used: number
      }
    }
    ts: number
  }
  hash: string
}

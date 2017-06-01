
import { FHEnvironment } from './datasets/resources'

export interface HomeState {
  resources: {
    [key: string]: FHEnvironment
  }
}

export interface EnvironmentViewProps {
  params: {
    env: string
  }
  resources: {
    // support for multiple environment keys, e.g "acme-dev", "acme-test"
    [key: string]: FHEnvironment
  }
}

export interface EnvironmentViewState {
  selectedEnv: string
}

export interface HeaderProps {
  showMenuIcon: boolean
  syncing: boolean
}

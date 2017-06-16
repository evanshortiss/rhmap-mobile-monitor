
export interface ConfigAction {
  type: string
  payload: {
    environment?: string
    user?: string
  }
}

export interface ConfigState {
  environment?: string
  user?: string
}

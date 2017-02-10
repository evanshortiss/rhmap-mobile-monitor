
export interface LoaderAction {
  type: string
  payload: {
    message?: string,
    visible?: boolean
  }
}

export interface LoaderViewProps {
  message?: string
  visible: boolean
}

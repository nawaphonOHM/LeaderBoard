export interface DashBoardAddNewRunnerInformationEnvelop<T> {
  state: 'SEND_REQUEST' | 'RESPONSE_DATA'

  data: T | null
}

import {DashBoardAddNewRunnerData} from './dash-board-add-new-runner-data';

export interface DashBoardAddNewRunnerInformationEnvelop<T>{
  state: 'SEND_REQUEST' | 'RESPONSE_DATA'

  data: T | null
}

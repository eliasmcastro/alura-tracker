import IProject from './IProject'

export default interface ITask {
  durationInSeconds: number
  description: string
  project: IProject
}

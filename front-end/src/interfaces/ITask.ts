import IProject from './IProject'

export default interface ITask {
  id: number,
  description: string,
  project: IProject,
  durationInSeconds: number
}

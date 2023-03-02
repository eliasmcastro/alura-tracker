export enum TypeNotification {
  SUCESSO,
  FALHA,
  ATENCAO,
}

export interface INotification {
  id: number
  title: string
  text: string
  type: TypeNotification
}

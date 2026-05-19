export interface Passageiro {
  id: number,
  auth_user_id: string,
  nome_completo: string;
  email: string;
  senha: string;
  telefone: string;
  codigo_cartao: string;
  faculdade: string;
  endereco: string;
  tipo: "PASSAGEIRO" | "MOTORISTA" | "ADMIN",
}

export type PassageiroCreateDTO = Omit<Passageiro, "id" | "auth_user_id">

export interface MotoristaInfo {
  nome_completo: string;
  email: string;
}

export interface Rota {
  id: number;
  descricao: string;
  codigo_veiculo: string;
  motorista_id: number;
  turno: 'Manhã' | 'Tarde' | 'Noite';
  motorista: MotoristaInfo;
}

export type Result<T> =
  | { success: true; data: T }
  | { success: false; error: any };

export type AsyncResult<T> = Promise<Result<T>>

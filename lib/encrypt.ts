import { hashSync, compareSync } from "bcrypt-ts-edge";

/**
 * Gera um hash seguro da senha usando bcrypt-ts-edge.
 * Esse método é compatível com ambientes Edge e Node.
 */
export async function hash(password: string): Promise<string> {
  return hashSync(password, 10); // 10 = número de rounds de salt
}

/**
 * Compara uma senha em texto puro com o hash armazenado no banco.
 * Retorna true se for válida, false caso contrário.
 */
export async function compare(password: string, hashed: string): Promise<boolean> {
  return compareSync(password, hashed);
}

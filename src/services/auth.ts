import { Identity } from "@dfinity/agent";
import { AuthClient } from "@dfinity/auth-client";

export class Auth {
  private static instance: Auth;

  private client: AuthClient | undefined = undefined;

  private constructor() {}

  public static async getInstance(): Promise<Auth> {
    if (!Auth.instance) {
      Auth.instance = new Auth();
      await Auth.instance.init();
    }

    return Auth.instance;
  }

  private async init() {
    this.client = await AuthClient.create();
    console.log({ client: this.client });
  }

  public logIn() {
    // Verifica si el cliente de autenticación está inicializado.
    if (!this.client) {
      throw new Error("Auth client is not initialized");
    }

    // Inicia sesión con el cliente de autenticación.
    return this.client.login();
  }

  public logOut() {
    // Verifica si el cliente de autenticación está inicializado.
    if (!this.client) {
      throw new Error("Auth client is not initialized");
    }

    // Cierra la sesión con el cliente de autenticación.
    return this.client.logout();
  }

  public getIdentity() {
    // Verifica si el cliente de autenticación está inicializado.
    if (!this.client) {
      throw new Error("Auth client is not initialized");
    }

    // Obtiene la identidad del cliente de autenticación.
    return this.client.getIdentity;
  }

  public isAuthenticated() {
    // Verifica si el cliente de autenticación está inicializado.
    if (!this.client) {
      throw new Error("Auth client is not initialized");
    }

    // Devuelve si el cliente de autenticación está autenticado.
    return this.client.isAuthenticated();
  }
}

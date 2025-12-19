import { useCallback } from "react";

import http from "../service/http";
import { useNotification } from "@/src/context/NotificationContext";

interface LoginResponse {
  email: string;
  senha: string;
}

function useHookLogin() {
  const { showNotification } = useNotification();

  const handleLogin = useCallback(async (data: LoginResponse) => {
    try {
      showNotification("loading", "Carregando...");
      await http.post("/login", {
        email: data.email,
        senha: data.senha
      });
      showNotification("success", "Login efetuado com sucesso!");
    } catch (error) {
      showNotification("error", "Erro ao efetuar login. Verifique suas credenciais.");
    }
  }, [showNotification]);

  return { handleLogin };
}

export default useHookLogin;
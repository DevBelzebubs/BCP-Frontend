export const API_URL = 'http://localhost:8080';

export const AUTH_ENDPOINTS = {
  login: `${API_URL}/auth/login`,
} as const;

export const API_ENDPOINTS = {
  cliente: {
    buscarPorDni: (dni: string) => `${API_URL}/api/cliente/${dni}/buscar`,
    dashboard: `${API_URL}/api/cliente/dashboard`,
  },
  cuentas: {
    abrirCuenta: `${API_URL}/api/cuentas/abrir-cuenta`,
  },
} as const;

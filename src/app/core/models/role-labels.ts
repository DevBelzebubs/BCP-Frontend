export const ROLE_LABELS: Record<string, string> = {
  CLIENTE: 'Cliente',
  EMPLEADO: 'Empleado',
  ASESOR: 'Asesor',
  BACKOFFICE: 'Backoffice',
  ADMIN: 'Administrador',
};

export function getRoleLabel(role: string | null): string {
  return role ? ROLE_LABELS[role] ?? role : '';
}

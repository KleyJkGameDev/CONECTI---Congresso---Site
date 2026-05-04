/**
 * SERVIÇO LOCAL DE NOTIFICAÇÕES
 * 
 * Substitui dependências de APIs externas por soluções locais
 * Utiliza localStorage para persistir dados
 */

export interface Notification {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  title: string;
  message: string;
  timestamp: number;
}

/**
 * Salva notificação no localStorage
 */
export function saveNotification(notification: Omit<Notification, 'id' | 'timestamp'>) {
  const notifications = getNotifications();
  const newNotification: Notification = {
    ...notification,
    id: Math.random().toString(36).substr(2, 9),
    timestamp: Date.now(),
  };
  
  notifications.push(newNotification);
  
  // Manter apenas as últimas 50 notificações
  if (notifications.length > 50) {
    notifications.shift();
  }
  
  localStorage.setItem('notifications', JSON.stringify(notifications));
  return newNotification;
}

/**
 * Recupera todas as notificações do localStorage
 */
export function getNotifications(): Notification[] {
  try {
    const data = localStorage.getItem('notifications');
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

/**
 * Remove notificação por ID
 */
export function removeNotification(id: string) {
  const notifications = getNotifications();
  const filtered = notifications.filter(n => n.id !== id);
  localStorage.setItem('notifications', JSON.stringify(filtered));
}

/**
 * Limpa todas as notificações
 */
export function clearNotifications() {
  localStorage.removeItem('notifications');
}

/**
 * Exporta notificações como JSON
 */
export function exportNotifications() {
  const notifications = getNotifications();
  return JSON.stringify(notifications, null, 2);
}

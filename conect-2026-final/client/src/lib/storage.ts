/**
 * SERVIÇO LOCAL DE ARMAZENAMENTO
 * 
 * Gerencia dados de inscrições, submissões e perfis de usuários
 * Utiliza localStorage como banco de dados local
 */

export interface UserRegistration {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  cpf: string;
  phone: string;
  institution: string;
  category: string;
  area: string;
  timestamp: string;
}

export interface ArticleSubmission {
  id: string;
  title: string;
  authors: string;
  email: string;
  institution: string;
  area: string;
  abstract: string;
  fileName: string;
  fileSize: number;
  timestamp: string;
  status: 'pending' | 'approved' | 'rejected';
}

export interface CongressEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  capacity: number;
  description: string;
  createdAt: string;
}

/**
 * REGISTROS DE INSCRIÇÃO
 */
export function saveRegistration(data: Omit<UserRegistration, 'id'>) {
  const registrations = getRegistrations();
  const newRegistration: UserRegistration = {
    ...data,
    id: Math.random().toString(36).substr(2, 9),
  };
  registrations.push(newRegistration);
  localStorage.setItem('registrations', JSON.stringify(registrations));
  return newRegistration;
}

export function getRegistrations(): UserRegistration[] {
  try {
    const data = localStorage.getItem('registrations');
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function getRegistrationByEmail(email: string): UserRegistration | null {
  const registrations = getRegistrations();
  return registrations.find(r => r.email === email) || null;
}

/**
 * SUBMISSÕES DE ARTIGOS
 */
export function saveSubmission(data: Omit<ArticleSubmission, 'id' | 'status'>) {
  const submissions = getSubmissions();
  const newSubmission: ArticleSubmission = {
    ...data,
    id: Math.random().toString(36).substr(2, 9),
    status: 'pending',
  };
  submissions.push(newSubmission);
  localStorage.setItem('submissions', JSON.stringify(submissions));
  return newSubmission;
}

export function getSubmissions(): ArticleSubmission[] {
  try {
    const data = localStorage.getItem('submissions');
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function getSubmissionsByEmail(email: string): ArticleSubmission[] {
  const submissions = getSubmissions();
  return submissions.filter(s => s.email === email);
}

/**
 * EVENTOS DO CONGRESSO
 */
export function saveEvent(data: Omit<CongressEvent, 'id' | 'createdAt'>) {
  const events = getEvents();
  const newEvent: CongressEvent = {
    ...data,
    id: Math.random().toString(36).substr(2, 9),
    createdAt: new Date().toISOString(),
  };
  events.push(newEvent);
  localStorage.setItem('events', JSON.stringify(events));
  return newEvent;
}

export function getEvents(): CongressEvent[] {
  try {
    const data = localStorage.getItem('events');
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function updateEvent(id: string, updates: Partial<CongressEvent>) {
  const events = getEvents();
  const index = events.findIndex(e => e.id === id);
  if (index !== -1) {
    events[index] = { ...events[index], ...updates };
    localStorage.setItem('events', JSON.stringify(events));
    return events[index];
  }
  return null;
}

export function deleteEvent(id: string) {
  const events = getEvents();
  const filtered = events.filter(e => e.id !== id);
  localStorage.setItem('events', JSON.stringify(filtered));
}

/**
 * EXPORTAÇÃO DE DADOS
 */
export function exportAllData() {
  return {
    registrations: getRegistrations(),
    submissions: getSubmissions(),
    events: getEvents(),
    exportedAt: new Date().toISOString(),
  };
}

/**
 * LIMPEZA DE DADOS
 */
export function clearAllData() {
  localStorage.removeItem('registrations');
  localStorage.removeItem('submissions');
  localStorage.removeItem('events');
}

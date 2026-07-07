import fs from 'fs';
import path from 'path';
import { SERVICES as STATIC_SERVICES } from './data';

export interface ManagedService {
  id: string;
  name: string;
  description: string;
  images: string[];
  visible: boolean;
  createdAt: string;
}

const dataFilePath = path.join(process.cwd(), 'data', 'services.json');

// Seed from static data.ts on first run
function seedIfEmpty(): ManagedService[] {
  const seeded: ManagedService[] = STATIC_SERVICES.map((s, i) => ({
    id: `seed-${i}-${s.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}`,
    name: s.name,
    description: s.description || '',
    images: s.images || [],
    visible: true,
    createdAt: new Date().toISOString(),
  }));
  fs.mkdirSync(path.dirname(dataFilePath), { recursive: true });
  fs.writeFileSync(dataFilePath, JSON.stringify(seeded, null, 2));
  return seeded;
}

export function getServicesSync(): ManagedService[] {
  try {
    if (!fs.existsSync(dataFilePath)) {
      return seedIfEmpty();
    }
    const raw = fs.readFileSync(dataFilePath, 'utf8');
    const parsed = JSON.parse(raw) as ManagedService[];
    if (parsed.length === 0) return seedIfEmpty();
    return parsed;
  } catch {
    return [];
  }
}

export async function getServices(): Promise<ManagedService[]> {
  return getServicesSync();
}

export async function getServiceById(id: string): Promise<ManagedService | null> {
  const all = getServicesSync();
  return all.find(s => s.id === id) ?? null;
}

export async function createService(service: Omit<ManagedService, 'id' | 'createdAt'>): Promise<ManagedService> {
  const all = getServicesSync();
  const newService: ManagedService = {
    ...service,
    id: `custom-${Date.now()}`,
    createdAt: new Date().toISOString(),
  };
  all.unshift(newService);
  fs.mkdirSync(path.dirname(dataFilePath), { recursive: true });
  fs.writeFileSync(dataFilePath, JSON.stringify(all, null, 2));
  return newService;
}

export async function updateService(id: string, updates: Partial<Omit<ManagedService, 'id' | 'createdAt'>>): Promise<void> {
  const all = getServicesSync();
  const idx = all.findIndex(s => s.id === id);
  if (idx === -1) throw new Error('Service not found');
  all[idx] = { ...all[idx], ...updates };
  fs.writeFileSync(dataFilePath, JSON.stringify(all, null, 2));
}

export async function deleteService(id: string): Promise<void> {
  const all = getServicesSync();
  const updated = all.filter(s => s.id !== id);
  fs.writeFileSync(dataFilePath, JSON.stringify(updated, null, 2));
}

export async function toggleServiceVisibility(id: string): Promise<void> {
  const all = getServicesSync();
  const idx = all.findIndex(s => s.id === id);
  if (idx === -1) throw new Error('Service not found');
  all[idx].visible = !all[idx].visible;
  fs.writeFileSync(dataFilePath, JSON.stringify(all, null, 2));
}

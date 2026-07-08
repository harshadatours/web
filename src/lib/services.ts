import { SERVICES as STATIC_SERVICES } from './data';
import { supabase } from './supabase';

export interface ManagedService {
  id: string;
  name: string;
  description: string;
  images: string[];
  visible: boolean;
  createdAt: string;
}

// Seed from static data.ts on first run if empty
async function seedIfEmpty(): Promise<ManagedService[]> {
  const seeded: ManagedService[] = STATIC_SERVICES.map((s, i) => ({
    id: `seed-${i}-${s.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}`,
    name: s.name,
    description: s.description || '',
    images: s.images || [],
    visible: true,
    createdAt: new Date().toISOString(),
  }));
  
  const { error } = await supabase.from('services').insert(seeded);
  if (error) console.error('Error seeding services:', error);
  
  return seeded;
}

export async function getServices(): Promise<ManagedService[]> {
  try {
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .order('created_at', { ascending: false });
      
    if (error) throw error;
    
    if (!data || data.length === 0) {
      return await seedIfEmpty();
    }
    
    // Map camelCase to snake_case from DB if needed
    return data.map(item => ({
      ...item,
      createdAt: item.created_at
    })) as ManagedService[];
  } catch (error) {
    console.error('Error fetching services from Supabase:', error);
    return [];
  }
}

export function getServicesSync(): ManagedService[] {
  // Synchronous fetching is no longer supported with Supabase in the same way, 
  // but this is mostly used as a fallback if any components are still synchronous.
  // Ideally, all consumers of getServices() are async Server Components.
  return [];
}

export async function getServiceById(id: string): Promise<ManagedService | null> {
  const { data, error } = await supabase
    .from('services')
    .select('*')
    .eq('id', id)
    .single();
    
  if (error || !data) return null;
  return { ...data, createdAt: data.created_at } as ManagedService;
}

export async function createService(service: Omit<ManagedService, 'id' | 'createdAt'>): Promise<ManagedService> {
  const newService = {
    ...service,
    id: `custom-${Date.now()}`,
    created_at: new Date().toISOString(),
  };
  
  const { error } = await supabase.from('services').insert([newService]);
  if (error) throw error;
  
  return { ...newService, createdAt: newService.created_at } as ManagedService;
}

export async function updateService(id: string, updates: Partial<Omit<ManagedService, 'id' | 'createdAt'>>): Promise<void> {
  const { error } = await supabase
    .from('services')
    .update(updates)
    .eq('id', id);
    
  if (error) throw error;
}

export async function deleteService(id: string): Promise<void> {
  const { error } = await supabase
    .from('services')
    .delete()
    .eq('id', id);
    
  if (error) throw error;
}

export async function toggleServiceVisibility(id: string): Promise<void> {
  const service = await getServiceById(id);
  if (!service) throw new Error('Service not found');
  
  const { error } = await supabase
    .from('services')
    .update({ visible: !service.visible })
    .eq('id', id);
    
  if (error) throw error;
}


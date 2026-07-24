import { SERVICES as STATIC_SERVICES } from './data';
import { supabase } from './supabase';
import { unstable_cache, revalidateTag } from 'next/cache';

export interface ManagedService {
  id: string;
  name: string;
  description: string;
  images: string[];
  visible: boolean;
  createdAt: string;
}

const STATIC_FALLBACK_SERVICES: ManagedService[] = STATIC_SERVICES.map((s, i) => ({
  id: `seed-${i}-${s.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}`,
  name: s.name,
  description: s.description || '',
  images: s.images || [],
  visible: true,
  createdAt: new Date().toISOString(),
}));

async function seedIfEmpty(): Promise<ManagedService[]> {
  const dbPayload = STATIC_FALLBACK_SERVICES.map(item => ({
    id: item.id,
    name: item.name,
    description: item.description,
    images: item.images,
    visible: item.visible,
    created_at: item.createdAt,
  }));

  const { error } = await supabase.from('services').insert(dbPayload);
  if (error) console.error('Error seeding services:', error);

  return STATIC_FALLBACK_SERVICES;
}

async function fetchServicesFromSupabase(): Promise<ManagedService[]> {
  try {
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching services from Supabase:', error);
      return STATIC_FALLBACK_SERVICES;
    }

    if (!data || data.length === 0) {
      return await seedIfEmpty();
    }

    return data.map(item => ({
      ...item,
      createdAt: item.created_at || new Date().toISOString()
    })) as ManagedService[];
  } catch (error) {
    console.error('Error fetching services from Supabase:', error);
    return STATIC_FALLBACK_SERVICES;
  }
}

export const getServices = unstable_cache(
  fetchServicesFromSupabase,
  ['services-list-v1'],
  { revalidate: 60, tags: ['services'] }
);

export function getServicesSync(): ManagedService[] {
  return STATIC_FALLBACK_SERVICES;
}

export async function getServiceById(id: string): Promise<ManagedService | null> {
  try {
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !data) {
      const fallback = STATIC_FALLBACK_SERVICES.find(s => s.id === id);
      return fallback || null;
    }

    return { ...data, createdAt: data.created_at } as ManagedService;
  } catch {
    const fallback = STATIC_FALLBACK_SERVICES.find(s => s.id === id);
    return fallback || null;
  }
}

export async function createService(service: Omit<ManagedService, 'id' | 'createdAt'>): Promise<ManagedService> {
  const newService = {
    ...service,
    id: `custom-${Date.now()}`,
    created_at: new Date().toISOString(),
  };

  const { error } = await supabase.from('services').insert([newService]);
  if (error) throw error;

  try {
    revalidateTag('services', 'max');
  } catch {}

  return { ...newService, createdAt: newService.created_at } as ManagedService;
}

export async function updateService(id: string, updates: Partial<Omit<ManagedService, 'id' | 'createdAt'>>): Promise<void> {
  const { error } = await supabase
    .from('services')
    .update(updates)
    .eq('id', id);

  if (error) throw error;

  try {
    revalidateTag('services', 'max');
  } catch {}
}

export async function deleteService(id: string): Promise<void> {
  const service = await getServiceById(id);

  if (service && service.images && service.images.length > 0) {
    const pathsToRemove = service.images.map(url => {
      const parts = url.split('/uploads/');
      return parts.length > 1 ? parts[1] : null;
    }).filter(Boolean) as string[];

    if (pathsToRemove.length > 0) {
      const { error } = await supabase.storage.from('uploads').remove(pathsToRemove);
      if (error) console.error('Error deleting service images:', error);
    }
  }

  const { error } = await supabase
    .from('services')
    .delete()
    .eq('id', id);

  if (error) throw error;

  try {
    revalidateTag('services', 'max');
  } catch {}
}

export async function toggleServiceVisibility(id: string): Promise<void> {
  const service = await getServiceById(id);
  if (!service) throw new Error('Service not found');

  const { error } = await supabase
    .from('services')
    .update({ visible: !service.visible })
    .eq('id', id);

  if (error) throw error;

  try {
    revalidateTag('services', 'max');
  } catch {}
}



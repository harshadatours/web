'use server';

import { revalidatePath } from 'next/cache';
import {
  createService,
  updateService,
  deleteService,
  toggleServiceVisibility,
} from '@/lib/services';

export async function createServiceAction(formData: FormData) {
  const name = formData.get('name') as string;
  const description = formData.get('description') as string;
  const images = (formData.get('images') as string || '')
    .split(',')
    .map(s => s.trim())
    .filter(Boolean);

  await createService({ name, description, images, visible: true });
  revalidatePath('/admin/services');
  revalidatePath('/tours');
}

export async function updateServiceAction(id: string, formData: FormData) {
  const name = formData.get('name') as string;
  const description = formData.get('description') as string;
  const images = (formData.get('images') as string || '')
    .split(',')
    .map(s => s.trim())
    .filter(Boolean);

  await updateService(id, { name, description, images });
  revalidatePath('/admin/services');
  revalidatePath('/tours');
}

export async function deleteServiceAction(id: string) {
  await deleteService(id);
  revalidatePath('/admin/services');
  revalidatePath('/tours');
}

export async function toggleVisibilityAction(id: string) {
  await toggleServiceVisibility(id);
  revalidatePath('/admin/services');
  revalidatePath('/tours');
}

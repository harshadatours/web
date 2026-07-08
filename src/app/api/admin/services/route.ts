import { NextResponse } from 'next/server';
import { getServices, createService } from '@/lib/services';

export async function GET() {
  const services = await getServices();
  return NextResponse.json(services);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, description, images } = body;
    if (!name) return NextResponse.json({ error: 'Name is required' }, { status: 400 });
    const service = await createService({ name, description: description || '', images: images || [], visible: true });
    return NextResponse.json(service, { status: 201 });
  } catch (e) {
    return NextResponse.json({ error: 'Failed to create service' }, { status: 500 });
  }
}

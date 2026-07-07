import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { nanoid } from 'nanoid';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const files = formData.getAll('files') as File[];

    if (!files || files.length === 0) {
      return NextResponse.json(
        { error: 'No files provided' },
        { status: 400 }
      );
    }

    const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'feedbacks');
    
    // Ensure directory exists
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const uploadedUrls: string[] = [];

    for (const file of files) {
      const buffer = Buffer.from(await file.arrayBuffer());
      // Generate a unique name to prevent collisions
      const ext = path.extname(file.name);
      const uniqueName = `${nanoid()}${ext}`;
      const filePath = path.join(uploadDir, uniqueName);
      
      fs.writeFileSync(filePath, buffer);
      
      // Store the public URL
      uploadedUrls.push(`/uploads/feedbacks/${uniqueName}`);
    }

    return NextResponse.json({ urls: uploadedUrls }, { status: 200 });
  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json(
      { error: 'Failed to upload files' },
      { status: 500 }
    );
  }
}

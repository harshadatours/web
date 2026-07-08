import imageCompression from 'browser-image-compression';

export async function compressImage(file: File): Promise<File> {
  const options = {
    maxSizeMB: 1,
    maxWidthOrHeight: 1280,
    useWebWorker: true,
    fileType: 'image/webp'
  };

  try {
    const compressedBlob = await imageCompression(file, options);
    // Convert Blob to File to maintain compatibility with FormData
    return new File([compressedBlob], file.name.replace(/\.[^/.]+$/, ".webp"), {
      type: 'image/webp',
    });
  } catch (error) {
    console.error('Error compressing image:', error);
    return file; // fallback to original file if compression fails
  }
}

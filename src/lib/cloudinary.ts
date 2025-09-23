import { toast } from "sonner";

export async function uploadImageToCloudinary(file: File): Promise<string | null> {
  try {
    // Crear FormData para enviar el archivo
    const formData = new FormData();
    formData.append('file', file);

    // Subir usando la API route (SDK de Cloudinary en el backend)
    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Error uploading image to Cloudinary');
    }

    const data = await response.json();

    if (data.success && data.url) {
      toast.success('Imagen subida exitosamente');
      return data.url;
    } else {
      throw new Error('No se recibió URL de la imagen');
    }
  } catch (error) {
    console.error('Error uploading image:', error);
    toast.error('Error al subir la imagen');
    return null;
  }
}

export async function deleteImageFromCloudinary(imageUrl: string): Promise<boolean> {
  try {
    // Extraer el public_id de la URL de Cloudinary
    const urlParts = imageUrl.split('/');
    const filename = urlParts[urlParts.length - 1];
    const publicId = filename.split('.')[0];

    const response = await fetch('/api/cloudinary/delete', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ publicId }),
    });

    if (!response.ok) {
      throw new Error('Error deleting image from Cloudinary');
    }

    toast.success('Imagen eliminada exitosamente');
    return true;
  } catch (error) {
    console.error('Error deleting image:', error);
    toast.error('Error al eliminar la imagen');
    return false;
  }
}
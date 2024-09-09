import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
})

export async function POST(request: Request) {
	try {
		const formData = await request.formData()
		const file = formData.get('file') as File

		if (!file) {
			return new Response(
				JSON.stringify({
					error: 'No se ha proporcionado un archivo válido',
				}),
				{
					status: 400,
					headers: { 'Content-Type': 'application/json' },
				}
			)
		}
		//TODO: aqui va la parte para subir el archivo a cloudinary
		return new Response(
			JSON.stringify({ message: 'Archivo subido correctamente' })
		)
	} catch (error) {
		return new Response(
			JSON.stringify({ error: 'Error al procesar la subida' }),
			{
				status: 500,
				headers: { 'Content-Type': 'application/json' },
			}
		)
	}
}

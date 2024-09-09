import { v2 as cloudinary, UploadApiResponse } from 'cloudinary'

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
})

const uploadFileStream = async (
	buffer: Uint8Array,
	options: { folder: string }
): Promise<UploadApiResponse> => {
	return new Promise((resolve, reject) => {
		cloudinary.uploader
			.upload_stream(options, (error, result) => {
				if (result) return resolve(result)
				reject(error)
			})
			.end(buffer)
	})
}

export async function POST(request: Request) {
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

	try {
		//TODO: aqui va la parte para subir el archivo a cloudinary

		console.log('nuevo archivo:' + file)
		const arrayBuffer = await file.arrayBuffer()
		const uint8Arrray = new Uint8Array(arrayBuffer)

		const result = await uploadFileStream(uint8Arrray, {
			folder: 'pdf',
		})

		const { asset_id: id, secure_url: url, pages } = result
		return new Response(
			JSON.stringify({
				id,
				pages,
				url,
			})
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

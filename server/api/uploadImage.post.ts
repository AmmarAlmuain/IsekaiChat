import { v2 as cloudinary } from 'cloudinary';

export default defineEventHandler( async (event) => {
    const config = useRuntimeConfig()
    const timestamp = new Date().getTime();
    const signature = await cloudinary.utils.api_sign_request(
      { timestamp },
      config.cloudinarySecret
    );
    return { timestamp, signature };;
})
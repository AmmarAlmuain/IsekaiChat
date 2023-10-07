import imageKitClient from "~/config/imageKit";

export class useMedia {

  async upload(file: File, fileName: string, folder: string) {
    const authenticationParameters = await generateSignature()
    const media = imageKitClient.upload({
      file: file as File,
      fileName: fileName,
      folder: folder,
      token: authenticationParameters?.token as string,
      signature: authenticationParameters?.signature as string,
      expire: authenticationParameters?.expire as number
    })
    return media
  }

}
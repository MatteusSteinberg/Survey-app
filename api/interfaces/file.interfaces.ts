type fileType = "image" | "video" | "audio" | "document" | "other"

export interface IFile {
  id?: any,
  type: fileType,
  key: string,
  size: number,
  contentType: string,
}
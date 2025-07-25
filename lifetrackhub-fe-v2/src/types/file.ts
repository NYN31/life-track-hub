export type FileType = 'IMG' | 'PDF';

export interface FileDto {
  userId: number;
  fileType: FileType;
  originalFileName: string;
  filePath: string;
  previewUrl: string;
  createdDate: string;
  lastModifiedDate: string;
}

export interface PageDto<T> {
  content: T[];
  pageNumber: number;
  hasNext: boolean;
  hasPrevious: boolean;
  totalPages: number;
}

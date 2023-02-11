import { useField } from "formik"
import { useCallback, useEffect, useState } from "react"
import { FileError, FileRejection, useDropzone } from "react-dropzone"
import SingleFileUpload from "./upload"

export interface UploadedFileProps {
  file: File
  errors: FileError[]
  preview?: string
}

export interface FieldProps {
  name: string
}

const thumbsContainer = {
  display: 'flex',
  marginTop: 16
}

const thumb = {
  display: 'inline-flex',
  borderRadius: 2,
  border: '1px solid #eaeaea',
  marginBottom: 6,
  marginRight: 6,
  width: 100,
  height: 100,
  padding: 2
}

const thumbInner = {
  display: 'flex',
  minWidth: 0,
  overflow: 'hidden'
}

const img = {
  display: 'block',
  width: 'auto',
  height: '100%'
}

export function DropzonePicture({ name }: FieldProps) {
  const [_,__,helpers] = useField(name)
  const [files, setFiles] = useState<UploadedFileProps[]>([])

  const onDrop = useCallback((accFiles: File[], rejFiles: FileRejection[]) => {
    const mappedAccFiles = accFiles.map(file => ({ 
      file,
      errors: [], 
      preview: URL.createObjectURL(file),
    }))

    setFiles(curr => [...curr, ...mappedAccFiles, ...rejFiles])

  }, [])

  const {getRootProps, getInputProps} = useDropzone({ 
    onDrop,
    accept: { 
      "image/jpeg": [".jpeg",".jpg", ".png"]
    } 
  })

  useEffect(() => {
    if (files.length) {
      files.forEach((file) => file.preview && URL.revokeObjectURL(file.preview))
      helpers.setValue(files)
    }
  }, [files])

  const thumbs = files.map((file,idx) => (
    <div key={idx}>
      <div style={thumb}>
        <div style={thumbInner}>
          <img
            src={file.preview}
            style={img}
            // Revoke data uri after image is loaded
            onLoad={() => { file.preview && URL.revokeObjectURL(file.preview) }}
          />        
        </div>      
      </div>
      <SingleFileUpload file={file.file} />
    </div>
  ))

  return (
    <section className="container">
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <p>Drag & drop a file here or click to select a file</p>
      </div>
      <aside style={thumbsContainer}>
        {thumbs}
      </aside>
    </section>    
  )
}
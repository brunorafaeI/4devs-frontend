import { Box, LinearProgress } from "@mui/material"
import { useCallback, useEffect, useState } from "react"

export interface SingleFileUploadProps {
  file: File
}

export default function SingleFileUpload({ file }: SingleFileUploadProps) {
  const [progress, setProgress] = useState(0)

  const uploadFileProgress = useCallback(() => {
    const _url = `https://upload.imagekit.io/api/v1/files/upload`
    const formData = new FormData()
    formData.append('file', file)
    formData.append('fileName', file.name)

    const xhr = new XMLHttpRequest()
    return new Promise((resolve, reject) => {
      xhr.onerror = (err) => reject(err)
      xhr.onload = () => {
        const response = JSON.parse(xhr.response)
        console.log(response)
      }
      xhr.upload.onprogress = (evt) => {
        if (evt.lengthComputable) {
          const percent = Math.round((evt.loaded / evt.total) * 100)
          setProgress(percent)
        }
      }     
      xhr.onloadend = () => resolve(xhr.status === 200 && xhr.readyState === 4)
      
      xhr.open("POST", _url, true)
      xhr.setRequestHeader(
        'Authorization',
        'Basic cHJpdmF0ZV8zK0RaR0l5OVc0YWRCekVESS9LMzg5OFlxL3c9OkJydW5vUmFmYWVsMjAyMg=='
      )
      xhr.send(formData)
    })

  }, [])

  const uploadFileFetch = useCallback(async () => {
    const _url = `https://upload.imagekit.io/api/v1/files/upload`
    const formData = new FormData()

    formData.append('file', file)
    formData.append('fileName', file.name)

    const response = await fetch(_url, {
      method: 'POST',
      headers: {
        'Authorization': 'Basic cHJpdmF0ZV8zK0RaR0l5OVc0YWRCekVESS9LMzg5OFlxL3c9OkJydW5vUmFmYWVsMjAyMg=='
      },
      body: formData
    })

    if (response) {
      const {body, headers} = response

      if (body && headers) {
        const reader = body.getReader()
        const bytesToUpload = Number(headers.get('content-length'))
  
        const stream = new ReadableStream({
          async start(ctrl) {
            if (reader) {
              let bytesReceived = 0
    
              while (true) {
                const { done, value } = await reader.read()
                
                if (value) {
                  bytesReceived += value.length
                  setProgress(Math.round((bytesReceived / bytesToUpload) * 100))
                  
                  // Enqueue the next data chunk into our target stream
                  ctrl.enqueue(value)
                } else if (done) {
                  break
                }
              }

              // Close the stream
              ctrl.close()
              reader.releaseLock()
            }
          }
        })

        const resp = new Response(stream)
        const _data = await resp.json()

        console.log(_data)
      }
    }

  }, [])

  useEffect(() => {    
    if (file.name) {
      uploadFileFetch()
    }
  }, [file.name, uploadFileFetch])

  return (
    <Box>
      <LinearProgress variant="determinate" value={progress} />
    </Box>
  )
}
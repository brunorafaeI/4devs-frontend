
interface HttpClientRequestProps {
    method?: string
    url: string
    data?: BodyInit
    headers?: HeadersInit,
    token?: string
}

export const ApiClient = {
  async request({ 
    method = 'GET', 
    url,
    data,
    headers = { "Content-Type": "application/json" }, 
    token
  }: HttpClientRequestProps) {
    const baseUrl = import.meta.env.VITE_API_URI

    if (token) {
      headers = Object.assign(headers, {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      })
    }
    if (data instanceof FormData) {
      if ("Content-Type" in headers) {
        delete headers["Content-Type"]
      }
    }
    
    try {
      const resp = await fetch(baseUrl.concat(url), {
        method,
        headers,
        body: data
      })

      return await resp.json()
    } catch (err) {
      return err 
    }
  }
}

export default ApiClient

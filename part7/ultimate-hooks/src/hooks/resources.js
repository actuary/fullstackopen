import { useState, useEffect, useCallback } from 'react'
import axios from 'axios'

export const useResource = (baseUrl) => {
  const [resource, setResource] = useState([])
  const [token, _setToken] = useState(null)

  const setToken = newToken => {
    _setToken(`bearer ${newToken}`)
  }

  const getAll = useCallback(async () => {
    const response = await axios.get(baseUrl)
    setResource(response.data)
    return response.data
  }, [baseUrl])

  useEffect(() => {
    getAll()
  }, [getAll])

  const create = async newObject => {
    const config = {
      headers: { Authorization: token },
    }

    const response = await axios.post(baseUrl, newObject, config)
    setResource(resource.concat(response.data))
    return response.data
  }

  const update = async (id, newObject) => {
    const response = await axios.put(`${baseUrl}/${id}`, newObject)
    const data = response.data
    setResource(resource.map((element) => element.id === id ? data : element))
    return data
  }

  const service = { create, update, getAll, setToken }

  return [resource, service]
}
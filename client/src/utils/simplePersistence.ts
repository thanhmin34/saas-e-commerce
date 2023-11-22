type ILocalStorage = {
  value: unknown
  timeStored: number
  ttl?: number
}

export default class LocalStorageManager {
  setItem(key: string, value: unknown, ttl?: number) {
    try {
      const timeStored = Date.now()
      let serializedValue: ILocalStorage = {
        value: value,
        timeStored,
      }
      if (ttl) {
        serializedValue = { ...serializedValue, ttl: ttl }
      }
      localStorage.setItem(key, JSON.stringify(serializedValue))
    } catch (error) {
      console.error(error)
    }
  }

  getItem(key: string) {
    try {
      const now = Date.now()
      const serializedValue = localStorage.getItem(key)
      if (serializedValue === null) {
        return null
      }
      const values = JSON.parse(serializedValue)
      const { ttl, timeStored } = values

      if ('ttl' in values && ttl && now - timeStored > ttl * 1000) {
        localStorage.removeItem(key)
        return undefined
      }
      return values
    } catch (error) {
      console.error(error)
      return null
    }
  }

  removeItem(key: string) {
    localStorage.removeItem(key)
  }
}

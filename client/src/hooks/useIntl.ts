import { useCallback, useMemo } from 'react'
import { useParams } from 'next/navigation'
import en from '../dictionaries/en.json'
import vn from '../dictionaries/vn.json'

interface LanguageData {
  [key: string]: string
}
const useIntl = () => {
  const pathname = useParams()
  const { lang } = pathname

  const languages: LanguageData = useMemo(() => {
    return lang === 'en' ? en : vn
  }, [lang])

  const localizeMessage = useCallback(
    (id: string) => {
      const translation = languages[id as keyof LanguageData]
      if (translation) {
        return translation
      } else {
        return id
      }
    },
    [languages]
  )

  interface Values {
    value: number
  }

  function format(tpl: string, data: Values) {
    var re = /\{([^\}]+)?\}/g,
      match
    while ((match = re.exec(tpl))) {
      const propertyName = match[1]
      if (propertyName in data) {
        const value = data[propertyName as keyof Values].toString()
        tpl = tpl.replace(match[0], value)
      } else {
        return tpl
      }
      re.lastIndex = 0
    }
    return tpl
  }

  const formatMessage = ({ id }: { id: string }, values: Values) => {
    const message = languages[id]
    return values ? format(message, values) : message
  }

  return { localizeMessage, formatMessage }
}

export default useIntl

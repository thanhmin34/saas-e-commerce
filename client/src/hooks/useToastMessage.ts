import { TypeOptions, toast } from 'react-toastify'

interface TypeToast {
  success: TypeOptions
  error: TypeOptions
}

const useToastMessage = () => {
  const typeToast: TypeToast = {
    success: 'success',
    error: 'error',
  }

  const showToast = (message: String, typeToastMessage: TypeOptions | undefined) => {
    toast(message, {
      autoClose: 3000,
      type: typeToastMessage,
    })
  }
  return {
    showToast,
    typeToast,
  }
}

export default useToastMessage

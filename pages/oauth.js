import React, { useRouter } from 'next/router';
import { useEffect } from 'react';
import queryString from 'query-string'

const Oauth = () => {
  const router = useRouter()
  useEffect(() => {
    const { access_token, token_type } = queryString.parse(window.location.hash)
    debugger
    localStorage.setItem('g_oauth', access_token)
    router.push('/')
  }, [])
  return <div>
    Carregando...
  </div>
} 

export default Oauth
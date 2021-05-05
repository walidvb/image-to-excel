import Head from 'next/head'
import { useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'
import googleConfig from '../src/googleConfig'

const LoginToGoogle = () => {
  const [url, setUrl] = useState()
  
  useEffect(() =>{

    const params = {
      client_id: googleConfig.clientId,
      redirect_uri: `${window.location.origin}/oauth`,
      response_type: 'token',
      scope: 'https://www.googleapis.com/auth/drive.readonly'
    }
  
    setUrl(`https://accounts.google.com/o/oauth2/v2/auth?${Object.entries(params).map((en) => `${en[0]}=${en[1]}`).join('&')}`)
  }, [])

  return <a href={url}> Login</a>
}


export default function Home() {
  useEffect(() => {
    window.onApiLoad = () => {
      console.log('loaded')
    }
  }, [])
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
        <script type="text/javascript" src="https://apis.google.com/js/api.js?onload=onApiLoad"></script>
      </Head>

      <main className={styles.main}>
        <div>
          <LoginToGoogle />
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  )
}

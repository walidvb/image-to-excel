import Head from 'next/head'
import { useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'
import googleConfig from '../src/googleConfig'
import initPicker from '../src/initPicker';

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
  const [readyForScript, setReadyForScript] = useState()
  const [documents, setDocuments] = useState()
  
  useEffect(() => {
    window.onApiLoad = () => {
      gapi.load('auth2');
      gapi.load('picker', console.log);
    }
    setReadyForScript(true)
  }, [])

  const onPick = () => {
    initPicker(({ docs, ...rest }) => {
      console.log(docs, rest)
      setDocuments(docs)
    })
  }
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
        {readyForScript && <script type="text/javascript" src="https://apis.google.com/js/api.js?onload=onApiLoad"></script>}
      </Head>

      <main className={styles.main}>
        <div>
          <LoginToGoogle />
          <br />
          <button onClick={onPick} type="submit" value="pick">
            Pick
          </button>
        </div>
        <div>
          {documents && documents.map((d) => <div>{d.id}</div>)}
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

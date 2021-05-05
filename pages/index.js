import Head from 'next/head'
import { useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'
import googleConfig from '../src/googleConfig'
import initPicker from '../src/initPicker';
import { CopyToClipboard } from 'react-copy-to-clipboard';

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

  return <a className="mx-12 px-4 py-2 bg-blue-400 rounded-sm inline-block" href={url}> Login</a>
}


const DocumentsToCopy = ({ documents }) => {
  const [showTextArea, setShowTextArea] = useState()
  
  if(!documents){
    return null
  }
  const urls = documents.sort((a,b) => a.name[0] > b.name[0]).map(({ id, ...doc }) => ({
    src: `https://drive.google.com/uc?id=${id}`,
    ...doc
  }))
  const value = urls.map(({ url }) => `=IMAGE("${url}")`).join('\n')
  if(showTextArea){
    return <>
      <textarea value={value} className="w-full h-full"/>
      <div className="px-4 py-2 bg-green-700 text-center text-white" onClick={() => setShowTextArea(false)}>Ver imagens</div>
    </>
  }
  return <div>
    <div>
      {urls.map(({ src, name, id }) => <div key={id} className="mb-2 flex items-center">
        <img src={src} className="w-12 h-12 mr-2" />
        {name}
      </div>
      )}
    </div>
    <div className="px-4 py-2 bg-green-700 text-center text-white" onClick={() => setShowTextArea(true)}>Copiar</div>
  </div>
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

  const isLoggedIn = localStorage.getItem('g_oauth') !== null
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
        {readyForScript && <script type="text/javascript" src="https://apis.google.com/js/api.js?onload=onApiLoad"></script>}
      </Head>

      <main className="flex-grow items-center grid grid-cols-2 h-screen justify-center">
          {!isLoggedIn ? <LoginToGoogle /> : 
            <button onClick={onPick} type="submit" value="pick" className="mx-12 px-4 py-2 bg-blue-400 rounded-sm inline-block">
              Selecionar
            </button>
          }
        <div>
          <DocumentsToCopy documents={documents} />
        </div>
      </main>

    </>
  )
}

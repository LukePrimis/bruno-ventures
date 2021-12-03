import '../styles/globals.css'
import type {AppProps} from 'next/app'
import {FirebaseAuthProvider, useFirebaseAuth} from "../util/firebaseAuthHelpers"
import Head from "next/head";

import Hero from '../components/Hero';
import Navbar from '../components/Navbar'
import Footer from '../components/Footer';
import Startups from './startups';

import logo from "../assets/logo.jpeg";

import {useEffect, useState} from 'react';
import SplashScreen from '../util/splashscreen';

function MyApp({Component, pageProps}: AppProps) {
    const firebaseAuthState = useFirebaseAuth();

    // Waits until the session is loaded before loading the page
    // if (firebaseAuthState.isLoading) return null
    
    const [loading, setLoading] = useState<boolean>(true);
    const [fading, setFading] = useState<boolean>(false);

    useEffect(() => {
      document.body.scrollTop = 0; // For Safari
      document.documentElement.scrollTop = 1;
      loading ? document.body.style.overflow = 'hidden' : document.body.style.overflow = 'visible';
    })

    const StopLoading = () => {
      console.log()
      setFading(true);
      setTimeout(() => setLoading(false), 1000);
    }

    return (<FirebaseAuthProvider value={firebaseAuthState}>
        {loading && <SplashScreen fading={fading}/>}
        <Head>
            <title>🐻 Bruno Ventures</title>
            <div className="box-border">
      <div className="flex flex-col">
        <Navbar/>
        <Hero 
          tagLine={'Startups start here.'}
        />
        <div id="divider" className="rounded-full ring-2 ring-gray-200 lg:w-1/2 lg:mx-auto "></div>
      </div>
      <div className="relative top-48">
        <Startups/>
        </div>
        
        <div className="relative top-96 h-2 my-24">
        <Footer logo={logo}/>
        </div>
    </div>
        </Head>
        <Component {...pageProps} />
    </FirebaseAuthProvider>)
}

export default MyApp

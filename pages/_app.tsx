import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import { wrapper } from "../app/store"
import {useState, useEffect} from 'react';
import Router from 'next/router';
import Loader from '../components/Loader';

function MyApp({ Component, pageProps }: AppProps) {

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    Router.events.on('routeChangeStart', () => setLoading(true));
    Router.events.on('routeChangeComplete', () => setLoading(false));
    Router.events.on('routeChangeError', () => setLoading(false));
    return () => {
      Router.events.off('routeChangeStart', () => setLoading(true));
      Router.events.off('routeChangeComplete', () => setLoading(false));
      Router.events.off('routeChangeError', () => setLoading(false));
    };
  }, [Router.events]);
  return (loading? <Loader/> : <Component {...pageProps} />)
}

export default wrapper.withRedux(MyApp);

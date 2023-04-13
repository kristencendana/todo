import '@/styles/globals.css'
import Layout from '@/components/Layout'
import { Provider } from "react-redux";
import reduxStore from "../redux/store"
import Head from 'next/head';

export default function App({ Component, pageProps }) {
  return (
    <Provider store={reduxStore}>
      <Head>
        <title>Todo App</title>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
        <link href="https://fonts.googleapis.com/css2?family=Staatliches&display=swap" rel="stylesheet"/>
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  )
}

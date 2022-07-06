import React from 'react'
import { Provider } from 'react-redux'
import store from 'redux/store'
import 'styles/index.css'
import '@fontsource/ubuntu/400.css';
import "@fontsource/ubuntu/500.css";
import "@fontsource/ubuntu/700.css";
import "@fontsource/karla/400.css";
import "@fontsource/karla/700.css";
import "@fontsource/source-serif-pro/400.css";
import "@fontsource/source-serif-pro/700.css";



function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}

export default MyApp

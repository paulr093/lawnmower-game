import type { AppProps } from 'next/app'
import { Global, MantineProvider } from '@mantine/core'
import { Cursor } from '../components/Cursor'

const GlobalStyles = () => {
   return (
      <Global
         styles={(theme) => [
            {
               body: {
                  backgroundColor: '#9EB23B',
                  overflow: 'hidden',
               },
            },
         ]}
      />
   )
}

function MyApp({ Component, pageProps }: AppProps) {
   return (
      <MantineProvider
         // withGlobalStyles
         // withNormalizeCSS
         theme={{
            /** Put your mantine theme override here */
            headings: {
               fontFamily: 'Silkscreen, cursive',
            },
            colors: { yellow: '#fcdc3a' as any },
         }}
      >
         <Cursor />
         <GlobalStyles />
         <Component {...pageProps} />
      </MantineProvider>
   )
}

export default MyApp

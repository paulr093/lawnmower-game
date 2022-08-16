import type { AppProps } from 'next/app'
import { Global, MantineProvider } from '@mantine/core'
import { Cursor } from '../components/Cursor'
import { NotificationsProvider } from '@mantine/notifications'

const GlobalStyles = () => {
   return (
      <Global
         styles={(theme) => [
            {
               body: {
                  backgroundColor: '#9EB23B',
                  overflow: 'hidden',
                  color: 'yellow',
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
               color: 'yellow',
            },
            colors: { customYellow: '#fcdc3a' as any, green: '#9EB23B' as any },
         }}
      >
         <NotificationsProvider>
            <Cursor />
            <GlobalStyles />
            <Component {...pageProps} />
         </NotificationsProvider>
      </MantineProvider>
   )
}

export default MyApp

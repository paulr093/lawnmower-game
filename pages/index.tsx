import { Image, Progress, SimpleGrid, Title } from '@mantine/core'
import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect } from 'react'
import { Garage } from '../components/Garage'
import { Level1 } from '../components/level1/Level1'
import { SaveButton } from '../components/SaveButton'
import { Store } from '../components/Store'
import { useStatsStore } from '../store/zustandStore'

const Home: NextPage = () => {
   const {
      patchesMowed,
      bagsFilled,
      increaseBagsFilled,
      resetPatchesMowed,
      mowerStats,
      botsPerTick,
      botsTickRate,
      increasePatchesMowed,
   } = useStatsStore((state: any) => state)

   useEffect(() => {
      if (patchesMowed >= 100) {
         const fullAmount = Math.floor(patchesMowed / 100)
         increaseBagsFilled(fullAmount)
         resetPatchesMowed()
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [patchesMowed])

   useEffect(() => {
      let tickInterval: ReturnType<typeof setInterval>
      if (botsPerTick) {
         tickInterval = setInterval(() => {
            increasePatchesMowed(botsPerTick)
         }, botsTickRate)
      }

      return () => clearInterval(tickInterval)
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [botsPerTick])

   return (
      <div
         style={{
            display: 'flex',
            justifyContent: 'center',
            height: '100vh',
            width: '100vw',
            alignItems: 'flex-start',
            paddingTop: '80px',
            userSelect: 'none',
         }}
      >
         <Head>
            <title>LAWN MOWER 5000</title>
            <meta name='description' content='If you love the sound of lawn mowers, this is the game for you.' />
            <link rel='icon' href='/favicon.ico' />
         </Head>

         <div
            style={{
               position: 'relative',
               alignItems: 'center',
               cursor: 'none',
               justifyContent: 'center',
               display: 'flex',
               height: '600px',
               width: '800px',
               userSelect: 'none',
            }}
         >
            <div style={{ position: 'absolute', top: 20, left: 20, zIndex: 10 }}>
               <Store />
            </div>

            <div style={{ position: 'absolute', top: 20, left: 120, zIndex: 10 }}>
               <Garage />
            </div>

            <div style={{ position: 'absolute', top: 20, right: 20, zIndex: 10 }}>
               <SaveButton />
            </div>

            <Image
               alt='logo'
               src='/textures/logo.png'
               height='200px'
               width='450px'
               style={{ position: 'absolute', top: '-120px', zIndex: 6 }}
            />

            <Level1 />

            <div style={{ position: 'absolute', bottom: '-140px', width: '800px' }}>
               <Title order={3}>Bags Filled: {bagsFilled}</Title>
               <Progress
                  value={patchesMowed}
                  color='yellow'
                  style={{ border: '1px solid green', backgroundColor: 'rgba(0,0,0,0.2)' }}
               />
               <Title order={4}>Mower Stats:</Title>
               <SimpleGrid cols={2}>
                  <Title order={5}>Per Patch: {mowerStats.perPatch}</Title>
                  <Title order={5}>Growth Rate: 0.1 per {mowerStats.growthRate / 1000} seconds </Title>
               </SimpleGrid>
               <Title order={4}>Robot Stats:</Title>
               <SimpleGrid cols={2}>
                  <Title order={5}>Bot Per Patch: {botsPerTick}</Title>
                  <Title order={5}>Bot Tick Rate: {botsTickRate / 1000} second</Title>
               </SimpleGrid>
            </div>
         </div>
      </div>
   )
}

export default Home

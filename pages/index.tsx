import { Image, Progress, SimpleGrid, Title } from '@mantine/core'
import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect } from 'react'
import { Garage } from '../components/Garage'
import { Level1 } from '../components/level1/Level1'
import { SaveButton } from '../components/SaveButton'
import { Stats } from '../components/Stats'
import { Store } from '../components/Store'
import { TimePassed } from '../components/TimePassed'
import { useStatsStore } from '../store/zustandStore'
import { homeStyles } from '../styles/home'

export const MOWERIMAGES = {
   BASE: '/textures/mower-cursor.png',
   SILVER: '/textures/lawn-mower-silver.gif',
   GOLD: '/textures/lawn-mower-gold.gif',
   DIAMOND: '/textures/lawn-mower-dmnd.gif',
}

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
   const { classes } = homeStyles()

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
      <div className={classes.mainPage}>
         <Head>
            <title>LAWN MOWER 5000</title>
            <meta name='description' content='If you love the sound of lawn mowers, this is the game for you.' />
            <link rel='icon' href='/favicon.ico' />
         </Head>

         <div className={classes.gameContainer}>
            <Store />

            <Garage />

            <SaveButton />

            <TimePassed />

            <Image
               alt='logo'
               src='/textures/logo.png'
               height='200px'
               width='450px'
               style={{ position: 'absolute', top: '-120px', zIndex: 6 }}
            />

            <Level1 />

            <Stats />
         </div>
      </div>
   )
}

export default Home

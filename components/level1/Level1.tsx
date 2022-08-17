import { SimpleGrid } from '@mantine/core'
import Image from 'next/image'
import { FunctionComponent, useEffect, useRef, useState } from 'react'
import { StatsState, useStatsStore } from '../../store/zustandStore'
import { homeStyles } from '../../styles/home'

const GrassTile = () => {
   const [opacity, setOpacity] = useState(1)
   const increasePatchesMowed = useStatsStore((state: any) => state.increasePatchesMowed)
   const mowerStats = useStatsStore((state: any) => state.mowerStats)

   const handleMouseEnter = () => {
      if (opacity >= 1) {
         increasePatchesMowed(mowerStats.perPatch)
         setOpacity(0.65)
      }
   }

   useEffect(() => {
      let intervalId: ReturnType<typeof setInterval>
      if (opacity < 1) {
         intervalId = setInterval(() => {
            setOpacity((curr) => curr + 0.1)
         }, mowerStats.growthRate)
      }

      return () => clearInterval(intervalId)
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [opacity])

   return (
      <div style={{ height: '80px', width: '80px', opacity: opacity, zIndex: 4 }} onMouseEnter={handleMouseEnter}>
         <Image src='/textures/grass7.png' layout='fixed' height={80} width={80} alt='grass' />
      </div>
   )
}

export const Level1: FunctionComponent = () => {
   const { classes } = homeStyles()
   const amountOfGrass = new Array(50).fill(undefined)
   const mowerSound = useRef<HTMLAudioElement>(null)

   useEffect(() => {
      if (mowerSound.current) {
         mowerSound.current.volume = 0.3
         mowerSound.current.loop = true
      }
   }, [])

   const playSound = () => {
      mowerSound.current?.play()
   }
   const pauseSound = () => {
      mowerSound.current?.pause()
   }

   return (
      <div className={classes.grassContainer} onMouseEnter={playSound} onMouseLeave={pauseSound}>
         <audio ref={mowerSound} src='/sounds/lawn-mower-sound.mp3' />
         <div style={{ position: 'absolute', zIndex: 2 }}>
            <Image
               src='/textures/background.png'
               priority
               layout='fixed'
               alt='bg'
               height={600}
               width={800}
               style={{ borderRadius: '20px' }}
            />
         </div>
         <div style={{ position: 'absolute', top: 15, zIndex: 5 }}>
            <Image
               src='/textures/background-100.png'
               alt='top'
               layout='fixed'
               height={100}
               width={800}
               style={{ borderRadius: '20px 0 0 0' }}
            />
         </div>
         <div
            style={{
               position: 'absolute',
               bottom: 20,
               zIndex: 5,
            }}
         >
            <Image src='/textures/background-100-bot.png' alt='bottom' layout='fixed' height={100} width={800} />
         </div>
         <SimpleGrid cols={10} spacing={0} style={{ paddingTop: '20px' }}>
            {amountOfGrass.map((_, idx) => (
               <GrassTile key={idx} />
            ))}
         </SimpleGrid>
      </div>
   )
}

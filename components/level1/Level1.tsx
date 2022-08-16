import { SimpleGrid } from '@mantine/core'
import Image from 'next/image'
import { FunctionComponent, useEffect, useState } from 'react'
import { useStatsStore } from '../../store/zustandStore'
import { homeStyles } from '../../styles/home'

const GrassTile = () => {
   const [opacity, setOpacity] = useState(1)
   const increasePatchesMowed = useStatsStore((state: any) => state.increasePatchesMowed)

   const handleMouseEnter = () => {
      if (opacity >= 1) {
         increasePatchesMowed(10)
         setOpacity(0.5)
      }
   }

   useEffect(() => {
      let intervalId: ReturnType<typeof setInterval>
      if (opacity < 1) {
         intervalId = setInterval(() => {
            setOpacity((curr) => curr + 0.1)
         }, 2500)
      }

      return () => clearInterval(intervalId)
   }, [opacity])

   return (
      <div style={{ height: '80px', width: '80px', opacity: opacity, zIndex: 4 }} onMouseEnter={handleMouseEnter}>
         <Image src='/textures/grass7.png' layout='fixed' height={80} width={80} alt='grass' />
      </div>
   )
}

export const Level1: FunctionComponent = () => {
   const { classes } = homeStyles()
   const amountOfGrass = new Array(40).fill(undefined)

   return (
      <div className={classes.grassContainer}>
         <div style={{ position: 'absolute', zIndex: 2 }}>
            <Image
               src='/textures/background.png'
               layout='fixed'
               alt='bg'
               height={500}
               width={800}
               style={{ borderRadius: '20px' }}
            />
         </div>
         <div style={{ position: 'absolute', top: 0, zIndex: 3 }}>
            <Image
               src='/textures/background-100.png'
               alt='top'
               layout='fixed'
               height={100}
               width={800}
               style={{ borderRadius: '20px' }}
            />
         </div>
         <div
            style={{
               position: 'absolute',
               bottom: 0,
               zIndex: 1,
            }}
         >
            <Image
               src='/textures/background-100-bot.png'
               alt='bottom'
               layout='fixed'
               height={100}
               width={800}
               style={{ borderRadius: '20px' }}
            />
         </div>
         <SimpleGrid cols={10} spacing={0} style={{ paddingTop: '20px', zIndex: 4 }}>
            {amountOfGrass.map((_, idx) => (
               <GrassTile key={idx} />
            ))}
         </SimpleGrid>
      </div>
   )
}

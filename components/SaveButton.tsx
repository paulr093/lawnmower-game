import { Button, ThemeIcon } from '@mantine/core'
import { useLocalStorage } from '@mantine/hooks'
import { showNotification } from '@mantine/notifications'
import { IconDeviceFloppy } from '@tabler/icons'
import { useEffect, useRef } from 'react'
import { StatsState, useStatsStore } from '../store/zustandStore'

export const SaveButton = () => {
   const {
      bagsFilled,
      mowerStats,
      mowerImage,
      purchasedMowers,
      robots,
      botsPerTick,
      botsTickRate,
      setBagsFilled,
      setBotsPerTickFromStorage,
      setTickRate,
      setMowerImage,
      setMowerStats,
      setPurchasedMowersFromStorage,
      setRobotsFromStorage,
   } = useStatsStore((state: any) => state)
   const [localStorage, setLocalStorage] = useLocalStorage<any>({ key: 'data' })
   const successAudio = useRef<HTMLAudioElement>(null)
   const errorAudio = useRef<HTMLAudioElement>(null)

   useEffect(() => {
      if (localStorage) {
         setBagsFilled(localStorage.bagsFilled)
         setBotsPerTickFromStorage(localStorage.botsPerTick)
         setTickRate(localStorage.botsTickRate)
         setMowerImage(localStorage.mowerImage)
         setMowerStats(localStorage.mowerStats?.perPatch, localStorage.mowerStats?.growthRate)
         setPurchasedMowersFromStorage(localStorage.purchasedMowers)
         setRobotsFromStorage(localStorage.robots)
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [localStorage])

   const handleClick = () => {
      try {
         setLocalStorage({
            date: new Date(),
            bagsFilled: bagsFilled,
            mowerStats: mowerStats,
            robots: robots,
            botsPerTick: botsPerTick === 0 ? 0 : botsPerTick,
            botsTickRate: botsTickRate,
            mowerImage: mowerImage,
            purchasedMowers: purchasedMowers,
         })
         if (successAudio.current) {
            successAudio.current.volume = 0.3
            successAudio.current.play()
         }
         showNotification({
            title: 'Data Saved Successfully!',
            message: 'Data will be loaded next time you visit.',
            color: 'lime',
            autoClose: 3000,
         })
      } catch (error) {
         if (errorAudio.current) {
            errorAudio.current.volume = 0.3
            errorAudio.current.play()
         }
         showNotification({
            title: 'Error Saving Data.',
            message: 'Please try again later.',
            color: 'red',
            autoClose: 3000,
         })
      }
   }

   return (
      <div style={{ position: 'absolute', top: 20, right: 20, zIndex: 10 }}>
         <audio ref={successAudio} src='/sounds/purchase.mp3' />
         <audio ref={errorAudio} src='/sounds/error.mp3' />
         <Button color='yellow' size='lg' onClick={handleClick}>
            <ThemeIcon color='yellow'>
               <IconDeviceFloppy />
            </ThemeIcon>
         </Button>
      </div>
   )
}

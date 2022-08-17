import { Image } from '@mantine/core'
import { useEffect, useState } from 'react'
import { useStatsStore } from '../store/zustandStore'

export const Robots = ({ mowerImage }: { mowerImage: string }) => {
   const [top, setTop] = useState(425)
   const [left, setLeft] = useState(700)
   const { setBotsPerTick } = useStatsStore((state: any) => state)
   let firstUp: ReturnType<typeof setTimeout>
   let firstRight: ReturnType<typeof setTimeout>
   let secondUp: ReturnType<typeof setTimeout>
   let secondLeft: ReturnType<typeof setTimeout>
   let thirdUp: ReturnType<typeof setTimeout>
   let secondRight: ReturnType<typeof setTimeout>
   let backToStart: ReturnType<typeof setTimeout>
   let restarts: ReturnType<typeof setTimeout>

   function robotLoop(
      firstUp: ReturnType<typeof setTimeout>,
      firstRight: ReturnType<typeof setTimeout>,
      secondUp: ReturnType<typeof setTimeout>,
      secondLeft: ReturnType<typeof setTimeout>,
      thirdUp: ReturnType<typeof setTimeout>,
      secondRight: ReturnType<typeof setTimeout>,
      backToStart: ReturnType<typeof setTimeout>,
      restarts: ReturnType<typeof setTimeout>
   ) {
      setLeft(50)
      firstUp = setTimeout(() => {
         setTop(325)
      }, 5000)
      firstRight = setTimeout(() => {
         setLeft(700)
      }, 10000)
      secondUp = setTimeout(() => {
         setTop(225)
      }, 15000)
      secondLeft = setTimeout(() => {
         setLeft(50)
      }, 20000)
      thirdUp = setTimeout(() => {
         setTop(125)
      }, 25000)
      secondRight = setTimeout(() => {
         setLeft(700)
      }, 30000)
      backToStart = setTimeout(() => {
         setTop(425)
      }, 35000)
      restarts = setTimeout(() => {
         robotLoop(firstUp, firstRight, secondUp, secondLeft, thirdUp, secondRight, backToStart, restarts)
      }, 40000)
   }

   useEffect(() => {
      robotLoop(firstUp, firstRight, secondUp, secondLeft, thirdUp, secondRight, backToStart, restarts)

      return () => {
         clearTimeout(firstUp)
         clearTimeout(firstRight)
         clearTimeout(secondUp)
         clearTimeout(secondLeft)
         clearTimeout(thirdUp)
         clearTimeout(secondRight)
         clearTimeout(backToStart)
         clearTimeout(restarts)
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [])

   // useEffect(() => {
   //    if (botsPerTick) {

   //       if (mowerImage === '/textures/mower-cursor.png') {
   //          setBotsPerTick(1)
   //       } else if (mowerImage === '/textures/lawn-mower-silver.gif') {
   //          setBotsPerTick(2)
   //       } else if (mowerImage === '/textures/lawn-mower-gold.gif') {
   //          setBotsPerTick(5)
   //       } else if (mowerImage === '/textures/lawn-mower-dmnd.gif') {
   //          setBotsPerTick(10)
   //       }
   //    }
   // }, [])

   return (
      <div
         style={{
            position: 'absolute',
            zIndex: 20,
            left: `${left}px`,
            top: `${top}px`,
            transitionDuration: '5s',
            transitionProperty: 'left top',
         }}
      >
         <Image src={mowerImage} alt='basebot' height='50px' width='50px' />
      </div>
   )
}

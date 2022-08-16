import { Image } from '@mantine/core'
import { useEffect, useState } from 'react'
import { StatsState, useStatsStore } from '../store/zustandStore'

export const Cursor = () => {
   const [position, setPosition] = useState({ x: 0, y: 0 })
   const { mowerImage } = useStatsStore((state: any) => state)

   const handleMouseMove = (event: MouseEvent) => {
      setPosition({ x: event.clientX, y: event.clientY })
   }

   useEffect(() => {
      window.addEventListener('mousemove', handleMouseMove)

      return () => window.removeEventListener('mousemove', handleMouseMove)
   }, [])

   return (
      <Image
         src={mowerImage}
         alt='Cursor'
         style={{
            position: 'absolute',
            height: '100px',
            width: '100px',
            left: `${position.x}px`,
            top: `${position.y}px`,
            transform: 'translate(-45%, -55%)',
            pointerEvents: 'none',
            zIndex: 100,
         }}
      />
   )
}

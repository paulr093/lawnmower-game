import { Image } from '@mantine/core'
import { useEffect, useState } from 'react'

export const Cursor = () => {
   const [position, setPosition] = useState({ x: 0, y: 0 })

   const handleMouseMove = (event: MouseEvent) => {
      setPosition({ x: event.clientX, y: event.clientY })
   }

   useEffect(() => {
      window.addEventListener('mousemove', handleMouseMove)

      return () => window.removeEventListener('mousemove', handleMouseMove)
   }, [])

   return (
      <Image
         src='/textures/mower-cursor.png'
         alt='Cursor'
         style={{
            position: 'absolute',
            height: '75px',
            width: '100px',
            left: `${position.x}px`,
            top: `${position.y}px`,
            transform: 'translate(-45%, -75%)',
            pointerEvents: 'none',
            zIndex: 999,
         }}
      />
   )
}

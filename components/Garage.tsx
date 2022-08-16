import { Button, Image, Modal, SimpleGrid, ThemeIcon, Title, useMantineTheme } from '@mantine/core'
import { IconBuildingCottage } from '@tabler/icons'
import { FunctionComponent, useState } from 'react'
import { StatsState, useStatsStore } from '../store/zustandStore'

export const Garage: FunctionComponent = () => {
   const [opened, setOpened] = useState(false)
   const theme = useMantineTheme()
   const { purchasedMowers, setMowerImage, setMowerStats, mowerImage } = useStatsStore((state: any) => state)

   const selectMower = (mower: string) => {
      setMowerImage(mower)
      if (mower === '/textures/mower-cursor.png') {
         setMowerStats(1, 2000)
      } else if (mower === '/textures/lawn-mower-silver.gif') {
         setMowerStats(2, 1500)
      } else if (mower === '/textures/lawn-mower-gold.gif') {
         setMowerStats(5, 1000)
      } else if (mower === '/textures/lawn-mower-dmnd.gif') {
         setMowerStats(20, 500)
      }
   }

   return (
      <>
         <Modal
            opened={opened}
            onClose={() => setOpened(false)}
            centered
            size='95%'
            title={<Title>Purchased Mowers</Title>}
            styles={{
               modal: { backgroundColor: theme.colors.green as any, color: 'yellow' },
               close: { backgroundColor: 'yellow' },
            }}
         >
            <SimpleGrid cols={4} style={{ alignItems: 'center' }}>
               {purchasedMowers.map((mower: string, id: number) => (
                  <div key={id} style={{ opacity: mowerImage === mower ? 0.5 : 1 }}>
                     <Button
                        onClick={() => selectMower(mower)}
                        color='yellow'
                        disabled={mowerImage === mower}
                        variant='outline'
                        style={{ height: '150px', width: '150px' }}
                     >
                        <Image src={mower} alt={`mower${id}`} height='100px' width='100px' />
                     </Button>
                  </div>
               ))}
            </SimpleGrid>
         </Modal>

         <Button color='yellow' size='lg' onClick={() => setOpened(true)}>
            <ThemeIcon color='yellow'>
               <IconBuildingCottage />
            </ThemeIcon>
         </Button>
      </>
   )
}

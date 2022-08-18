import { Button, Center, Grid, Image, SimpleGrid, Title } from '@mantine/core'
import { showNotification } from '@mantine/notifications'
import { MOWERIMAGES } from '../../pages'
import { StatsState, useStatsStore } from '../../store/zustandStore'

const BASEBOT = 25
const SILVERBOT = 75
const GOLDBOT = 200
const DIAMONDBOT = 750

interface RowProps {
   handlePurchase: (e: any) => void
   title: string
   name: string
   cost: number
   description: string
   image: string
   type: string[]
}

const GridRowBots = ({ handlePurchase, title, name, cost, description, image, type }: RowProps) => {
   return (
      <>
         <Button fullWidth color='yellow' name={name} onClick={(e: any) => handlePurchase(e)}>
            <Title order={6}>{title}</Title>
         </Button>

         <Title order={6} align='center'>
            {cost} bags
         </Title>

         <Title align='right' order={6}>
            {description}
         </Title>

         <Center>
            <Image src={image} alt='silver' height='100px' width='100px' />
         </Center>

         <Title align='center' order={1}>
            {type?.length}
         </Title>
      </>
   )
}

export const RobotStore = ({ purchaseSound, errorSound }: { purchaseSound: any; errorSound: any }) => {
   const { setRobots, robots, bagsFilled, subtractBagsFilled, setBotsPerTick } = useStatsStore((state: any) => state)

   const handlePurchase = (event: any) => {
      const { name } = event.currentTarget

      const similars = (mowerName: string, mowerImage: string, mowerCost: number, perTick: number) => {
         purchaseSound.current.volume = 0.3
         purchaseSound.current.play()
         setRobots(mowerName, mowerImage)
         setBotsPerTick(perTick)
         subtractBagsFilled(mowerCost)
         showNotification({
            title: 'Purchase Successful!',
            message: `You now have a ${mowerName} mower robot!`,
            color: 'lime',
            autoClose: 3000,
         })
      }

      if (name === 'base' && bagsFilled >= BASEBOT) {
         similars(name, MOWERIMAGES.BASE, BASEBOT, 1)
      } else if (name === 'silver' && bagsFilled >= SILVERBOT) {
         similars(name, MOWERIMAGES.SILVER, SILVERBOT, 2)
      } else if (name === 'gold' && bagsFilled >= GOLDBOT) {
         similars(name, MOWERIMAGES.GOLD, GOLDBOT, 5)
      } else if (name === 'diamond' && bagsFilled >= DIAMONDBOT) {
         similars(name, MOWERIMAGES.DIAMOND, DIAMONDBOT, 10)
      } else {
         errorSound.current.volume = 0.3
         errorSound.current.play()
         showNotification({
            title: 'Not enough bags!',
            message: `You only have ${bagsFilled}.`,
            color: 'red',
            autoClose: 3000,
         })
      }
   }

   return (
      <>
         <Title order={2}>{bagsFilled} Bags</Title>
         <SimpleGrid style={{ alignItems: 'center' }} cols={5}>
            <GridRowBots
               handlePurchase={handlePurchase}
               title='Base Robot'
               name='base'
               description='Mows 1 patch per second.'
               cost={BASEBOT}
               image={MOWERIMAGES.BASE}
               type={robots.base}
            />
            <GridRowBots
               handlePurchase={handlePurchase}
               title='Silver Robot'
               name='silver'
               description='Mows 2 patches per second.'
               cost={SILVERBOT}
               image={MOWERIMAGES.SILVER}
               type={robots.silver}
            />
            <GridRowBots
               handlePurchase={handlePurchase}
               title='Gold Robot'
               name='gold'
               description='Mows 5 patches per second.'
               cost={GOLDBOT}
               image={MOWERIMAGES.GOLD}
               type={robots.gold}
            />
            <GridRowBots
               handlePurchase={handlePurchase}
               title='Diamond Robot'
               name='diamond'
               description='Mows 10 patch per second.'
               cost={DIAMONDBOT}
               image={MOWERIMAGES.DIAMOND}
               type={robots.diamond}
            />
         </SimpleGrid>
      </>
   )
}

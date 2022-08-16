import { Button, Center, Image, Modal, SimpleGrid, ThemeIcon, Title, useMantineTheme } from '@mantine/core'
import { showNotification } from '@mantine/notifications'
import { IconBuildingStore } from '@tabler/icons'
import { FunctionComponent, useState } from 'react'
import { StatsState, useStatsStore } from '../store/zustandStore'

const SILVERPRICE = 50
const GOLDPRICE = 250
const DIAMONDPRICE = 1000

export const Store: FunctionComponent = () => {
   const [opened, setOpened] = useState<boolean>(false)
   const theme = useMantineTheme()
   const { bagsFilled, subtractBagsFilled, setMowerImage, setMowerStats, setPurchasedMowers } = useStatsStore(
      (state: StatsState) => state
   )

   const handlePurchase = (price: number, image: string, perPatch: number, growthRate: number, mowerName: string) => {
      if (bagsFilled >= price) {
         subtractBagsFilled(price)
         setMowerImage(image)
         setPurchasedMowers(image)
         setMowerStats(perPatch, growthRate)
         showNotification({
            title: 'Purchase Successful!',
            message: `You now have a ${mowerName} mower.`,
            color: 'green',
            autoClose: 3000,
         })
      } else {
         showNotification({
            title: 'Not enough bags!',
            message: `You have ${bagsFilled} bags. You need ${price} bags`,
            color: 'red',
            autoClose: 3000,
         })
      }
   }

   const handleSilver = () => {
      if (bagsFilled >= SILVERPRICE) {
         subtractBagsFilled(SILVERPRICE)
         setMowerImage('/textures/lawn-mower-silver.gif')
         setPurchasedMowers('/textures/lawn-mower-silver.gif')
         setMowerStats(2, 1500)
         showNotification({
            title: 'Purchase Successful!',
            message: `You now have a silver mower.`,
            color: 'green',
            autoClose: 3000,
         })
      } else {
         showNotification({
            title: 'Not enough bags!',
            message: `You have ${bagsFilled} bags. You need ${SILVERPRICE} bags`,
            color: 'red',
            autoClose: 3000,
         })
      }
   }

   const handleGold = () => {
      if (bagsFilled >= GOLDPRICE) {
         subtractBagsFilled(GOLDPRICE)
         setMowerImage('/textures/lawn-mower-gold.gif')
         setPurchasedMowers('/textures/lawn-mower-gold.gif')
         setMowerStats(5, 1000)
         showNotification({
            title: 'Purchase Successful!',
            message: `You now have a gold mower.`,
            color: 'green',
            autoClose: 3000,
         })
      } else {
         showNotification({
            title: 'Not enough bags!',
            message: `You have ${bagsFilled} bags. You need ${GOLDPRICE} bags`,
            color: 'red',
            autoClose: 3000,
         })
      }
   }

   const handleDiamond = () => {
      if (bagsFilled >= DIAMONDPRICE) {
         subtractBagsFilled(DIAMONDPRICE)
         setMowerImage('/textures/lawn-mower-dmnd.gif')
         setPurchasedMowers('/textures/lawn-mower-dmnd.gif')
         setMowerStats(5, 500)
         showNotification({
            title: 'Purchase Successful!',
            message: `You now have a diamond mower.`,
            color: 'green',
            autoClose: 3000,
         })
      } else {
         showNotification({
            title: 'Not enough bags!',
            message: `You have ${bagsFilled} bags. You need ${DIAMONDPRICE} bags`,
            color: 'red',
            autoClose: 3000,
         })
      }
   }

   return (
      <>
         <Modal
            opened={opened}
            onClose={() => setOpened(false)}
            centered
            size='95%'
            title={<Title>Bags: {bagsFilled}</Title>}
            styles={{
               modal: { backgroundColor: theme.colors.green as any, color: 'yellow' },
               close: { backgroundColor: 'yellow' },
            }}
         >
            <SimpleGrid cols={3} style={{ alignItems: 'center' }} spacing='xs'>
               <Button color='yellow'>
                  <Title
                     order={6}
                     onClick={() => handlePurchase(SILVERPRICE, '/textures/lawn-mower-silver.gif', 2, 1500, 'silver')}
                  >
                     Silver Lawn Mower
                  </Title>
               </Button>

               <Title align='center' order={5}>
                  {SILVERPRICE} Bags
               </Title>

               <Image src='/textures/lawn-mower-silver.gif' alt='silver' height='150px' width='150px' />

               <Button
                  color='yellow'
                  onClick={() => handlePurchase(GOLDPRICE, '/textures/lawn-mower-gold.gif', 5, 1000, 'gold')}
               >
                  <Title order={6}>Gold Lawn Mower</Title>
               </Button>

               <Title align='center' order={5}>
                  {GOLDPRICE} Bags
               </Title>

               <Image src='/textures/lawn-mower-gold.gif' alt='silver' height='150px' width='150px' />
               <Button
                  color='yellow'
                  onClick={() => handlePurchase(DIAMONDPRICE, '/textures/lawn-mower-dmnd.gif', 20, 500, 'diamond')}
               >
                  <Title order={6}>Diamond Lawn Mower</Title>
               </Button>

               <Title align='center' order={5}>
                  {DIAMONDPRICE} Bags
               </Title>

               <Image src='/textures/lawn-mower-dmnd.gif' alt='silver' height='150px' width='150px' />
            </SimpleGrid>
         </Modal>

         <Button color='yellow' size='lg' onClick={() => setOpened(true)}>
            <ThemeIcon color='yellow'>
               <IconBuildingStore />
            </ThemeIcon>
         </Button>
      </>
   )
}

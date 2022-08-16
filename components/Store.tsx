import { Button, Center, Image, Modal, SimpleGrid, ThemeIcon, Title, useMantineTheme } from '@mantine/core'
import { showNotification } from '@mantine/notifications'
import { IconBuildingStore } from '@tabler/icons'
import { FunctionComponent, useEffect, useRef, useState } from 'react'
import { StatsState, useStatsStore } from '../store/zustandStore'

const SILVERPRICE = 50
const GOLDPRICE = 150
const DIAMONDPRICE = 500
const useAudio = (url: string) => {
   const [purchaseSound] = useState(new Audio(url))
   const [playing, setPlaying] = useState(false)

   // const toggle = () => setPlaying(!playing);

   useEffect(
      () => {
         playing ? purchaseSound.play() : purchaseSound.pause()
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [playing]
   )

   useEffect(() => {
      purchaseSound.addEventListener('ended', () => setPlaying(false))
      return () => {
         purchaseSound.removeEventListener('ended', () => setPlaying(false))
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [])

   return [playing, setPlaying]
}

export const Store: FunctionComponent = () => {
   const [opened, setOpened] = useState<boolean>(false)
   const theme = useMantineTheme()
   const { bagsFilled, subtractBagsFilled, setMowerImage, setMowerStats, setPurchasedMowers, purchasedMowers } =
      useStatsStore((state: any) => state)
   const purchaseSound = useRef<HTMLAudioElement>(null)
   const errorSound = useRef<HTMLAudioElement>(null)

   /** Handles the values to display and set for a purchase of a lawnmower
    *
    * @params {price} number The price to be subtracted from total bags.
    * @params {image} string The mower image to be set when the purchase is made.
    * @params {perPatch} number A number used for how much each patch mowed is worth.
    * @params {growthRate} number In milliseconds: how fast the grass grows back.
    * @params {mowerName} string The name of the mower. Used for purchase notification.
    */
   const handlePurchase = (price: number, image: string, perPatch: number, growthRate: number, mowerName: string) => {
      if (bagsFilled >= price) {
         if (purchaseSound.current) purchaseSound.current.volume = 0.2
         purchaseSound.current?.play()
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
         if (errorSound.current) errorSound.current.volume = 0.2
         errorSound.current?.play()
         showNotification({
            title: 'Not enough bags!',
            message: `You have ${bagsFilled} bags. You need ${price} bags`,
            color: 'red',
            autoClose: 3000,
         })
      }
   }

   return (
      <>
         <audio ref={purchaseSound} src='/sounds/purchase.mp3' />
         <audio ref={errorSound} src='/sounds/error.mp3' />
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
               <Button
                  color='yellow'
                  disabled={purchasedMowers.includes('/textures/lawn-mower-silver.gif')}
                  onClick={() => handlePurchase(SILVERPRICE, '/textures/lawn-mower-silver.gif', 2, 1500, 'silver')}
               >
                  <Title order={6}>Silver Lawn Mower</Title>
               </Button>

               <Title align='center' order={5}>
                  {SILVERPRICE} Bags
               </Title>

               <Image src='/textures/lawn-mower-silver.gif' alt='silver' height='150px' width='150px' />

               <Button
                  color='yellow'
                  disabled={purchasedMowers.includes('/textures/lawn-mower-gold.gif')}
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
                  disabled={purchasedMowers.includes('/textures/lawn-mower-dmnd.gif')}
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

import { Button, Image, SimpleGrid, Title } from '@mantine/core'
import { showNotification } from '@mantine/notifications'
import { MOWERIMAGES } from '../../pages'
import { useStatsStore } from '../../store/zustandStore'

const SILVERPRICE = 50
const GOLDPRICE = 150
const DIAMONDPRICE = 500

export const MowerStore = ({ purchaseSound, errorSound }: { purchaseSound: any; errorSound: any }) => {
   const { bagsFilled, subtractBagsFilled, setMowerImage, setPerPatch, setPurchasedMowers, purchasedMowers } =
      useStatsStore((state: any) => state)
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
         setPerPatch(perPatch)
         showNotification({
            title: 'Purchase Successful!',
            message: `You now have a ${mowerName} mower.`,
            color: 'lime',
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
         <Title order={2}>Bags: {bagsFilled}</Title>
         <SimpleGrid cols={3} style={{ alignItems: 'center' }} spacing='xs'>
            <Button
               color='yellow'
               disabled={purchasedMowers.includes(MOWERIMAGES.SILVER)}
               onClick={() => handlePurchase(SILVERPRICE, MOWERIMAGES.SILVER, 2, 1500, 'silver')}
            >
               <Title order={6}>Silver Lawn Mower</Title>
            </Button>

            <Title align='center' order={5}>
               {SILVERPRICE} Bags
            </Title>

            <Image src={MOWERIMAGES.SILVER} alt='silver' height='150px' width='150px' />

            <Button
               color='yellow'
               disabled={purchasedMowers.includes(MOWERIMAGES.GOLD)}
               onClick={() => handlePurchase(GOLDPRICE, MOWERIMAGES.GOLD, 5, 1000, 'gold')}
            >
               <Title order={6}>Gold Lawn Mower</Title>
            </Button>

            <Title align='center' order={5}>
               {GOLDPRICE} Bags
            </Title>

            <Image src={MOWERIMAGES.GOLD} alt='silver' height='150px' width='150px' />
            <Button
               color='yellow'
               disabled={purchasedMowers.includes(MOWERIMAGES.DIAMOND)}
               onClick={() => handlePurchase(DIAMONDPRICE, MOWERIMAGES.DIAMOND, 20, 500, 'diamond')}
            >
               <Title order={6}>Diamond Lawn Mower</Title>
            </Button>

            <Title align='center' order={5}>
               {DIAMONDPRICE} Bags
            </Title>

            <Image src={MOWERIMAGES.DIAMOND} alt='silver' height='150px' width='150px' />
         </SimpleGrid>
      </>
   )
}

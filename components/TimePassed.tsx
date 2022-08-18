import { Modal, Title, useMantineTheme } from '@mantine/core'
import { useLocalStorage } from '@mantine/hooks'
import { useEffect, useState } from 'react'
import { useStatsStore } from '../store/zustandStore'

const getSecondsDiff = (startDate: Date, endDate: Date) => {
   const msInSeconds = 1000

   return Math.round(Math.abs(startDate.getTime() - endDate.getTime()) / msInSeconds)
}

export const TimePassed = () => {
   const [localStorage, setLocalStorage] = useLocalStorage<any>({ key: 'data' })
   const { botsPerTick, botsTickRate, increaseBagsFilled } = useStatsStore((state: any) => state)
   const [opened, setOpened] = useState(false)
   const theme = useMantineTheme()
   const now = new Date()
   const patchesMowedFromDiff = getSecondsDiff(new Date(now), new Date(localStorage?.date))
   const bagsFilledFromDiff = Math.floor(patchesMowedFromDiff / (100 / botsPerTick / (botsTickRate / 1000)))
   const storageDate = new Date(localStorage?.date)
   const patchesMowedIdle = getSecondsDiff(now, storageDate) * botsPerTick.toLocaleString()

   useEffect(() => {
      if (localStorage?.date) {
         console.log('Minutes since last visit: ', now.getMinutes() - new Date(localStorage.date).getMinutes())
         if (now.getMinutes() - new Date(localStorage.date).getMinutes() >= 2 && localStorage.botsPerTick >= 1) {
            setOpened(true)
         }
      }

      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [localStorage?.date])

   return (
      <>
         <Modal
            opened={opened}
            onClose={() => {
               setOpened(false)
               increaseBagsFilled(bagsFilledFromDiff)
            }}
            centered
            size='95%'
            title={<Title>{`Since Your Last Save`}</Title>}
            styles={{
               modal: { backgroundColor: theme.colors.green as any, color: 'yellow' },
               close: { backgroundColor: 'yellow' },
            }}
         >
            <Title order={3}>Your robots have been working hard.</Title>
            <Title order={3}>
               They have mowed <b>{patchesMowedIdle || ''}</b> patches of grass!
            </Title>
            <Title order={3}>
               That adds{' '}
               <b style={{ fontSize: 30, textDecoration: 'underline' }}>{bagsFilledFromDiff.toLocaleString() || ''}</b>{' '}
               bags to your last saved total total!
            </Title>
         </Modal>
      </>
   )
}

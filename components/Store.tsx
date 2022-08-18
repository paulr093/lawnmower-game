import { Button, Modal, Tabs, ThemeIcon, Title, useMantineTheme } from '@mantine/core'
import { IconBuildingStore } from '@tabler/icons'
import { FunctionComponent, useRef, useState } from 'react'
import { MowerStore } from './stores/MowerStore'
import { RobotStore } from './stores/RobotStore'

export const Store: FunctionComponent = () => {
   const [opened, setOpened] = useState<boolean>(false)
   const theme = useMantineTheme()
   const purchaseSound = useRef<HTMLAudioElement>(null)
   const errorSound = useRef<HTMLAudioElement>(null)

   return (
      <div style={{ position: 'absolute', top: 20, left: 20, zIndex: 10 }}>
         <audio ref={purchaseSound} src='/sounds/purchase.mp3' />
         <audio ref={errorSound} src='/sounds/error.mp3' />
         <Modal
            opened={opened}
            onClose={() => setOpened(false)}
            centered
            size='95%'
            title={<Title>Store</Title>}
            styles={{
               modal: { backgroundColor: theme.colors.green as any, color: 'yellow' },
               close: { backgroundColor: 'yellow' },
            }}
         >
            <Tabs color='yellow' variant='pills' defaultValue='mowerStore'>
               <Tabs.List grow>
                  <Tabs.Tab value='mowerStore'>
                     <Title order={6}>Mower Store</Title>
                  </Tabs.Tab>
                  <Tabs.Tab value='robotStore'>
                     <Title order={6}>Robot Mower Store</Title>
                  </Tabs.Tab>
               </Tabs.List>
               <Tabs.Panel value='mowerStore'>
                  <MowerStore purchaseSound={purchaseSound} errorSound={errorSound} />
               </Tabs.Panel>
               <Tabs.Panel value='robotStore'>
                  <RobotStore purchaseSound={purchaseSound} errorSound={errorSound} />
               </Tabs.Panel>
            </Tabs>
         </Modal>

         <Button color='yellow' size='lg' onClick={() => setOpened(true)}>
            <ThemeIcon color='yellow'>
               <IconBuildingStore />
            </ThemeIcon>
         </Button>
      </div>
   )
}

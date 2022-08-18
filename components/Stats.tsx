import { Progress, SimpleGrid, Title } from '@mantine/core'
import { useStatsStore } from '../store/zustandStore'

export const Stats = () => {
   const { patchesMowed, bagsFilled, mowerStats, botsPerTick, botsTickRate } = useStatsStore((state: any) => state)
   return (
      <div style={{ position: 'absolute', bottom: '-140px', width: '800px' }}>
         <Title order={3}>Bags Filled: {bagsFilled}</Title>
         <Progress
            value={patchesMowed}
            color='yellow'
            style={{ border: '1px solid green', backgroundColor: 'rgba(0,0,0,0.2)' }}
         />
         <Title order={4}>Mower Stats:</Title>
         <SimpleGrid cols={2}>
            <Title order={5}>Per Patch: {mowerStats.perPatch}</Title>
            <Title order={5}>Growth Rate: 0.1 per {mowerStats.growthRate / 1000} seconds </Title>
         </SimpleGrid>
         <Title order={4}>Robot Stats:</Title>
         <SimpleGrid cols={2}>
            <Title order={5}>Bot Per Patch: {botsPerTick}</Title>
            <Title order={5}>Bot Tick Rate: {botsTickRate / 1000} second</Title>
         </SimpleGrid>
      </div>
   )
}

import create from 'zustand';

export type StatsState = {
    patchesMowed: number
}

export const useStatsStore = create((set) => ({
    patchesMowed: 0,
    increasePatchesMowed: (amount: number) => set((state: StatsState)=>({patchesMowed: state.patchesMowed + amount}))
}))
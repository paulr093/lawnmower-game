import create from 'zustand';

export type StatsState = {
    patchesMowed: number,
    bagsFilled: number,
    mowerStats: {perPatch: number, growthRate: number},
    mowerImage: string,
    /** Sets how many patches are mowed per square.
     * 
     * @params {number} amount Number to set per square.
     */
    increasePatchesMowed: (amount: number) => void,

    /** Adds 1 bag to bagsFilled.
     * 
     * Triggered when patchesMowed reaches 100.
     */
    increaseBagsFilled: () => void,

    /** Sets patchesMowed back to 0.
     * 
     * Used for resetting the progress bar.
     */
    resetPatchesMowed: () => void,

    /** Subtracts the bagsFilled from amount parameter
     * 
     * @params {number} amount Amount to be subtracted from bagsFilled
     */
    subtractBagsFilled: (amount: number) => void,

    /** Sets the current mower to the image provided.
     * 
     * @params {string} mowerImage Image to be applied to mowerImage.
     */
    setMowerImage: (mowerImage: string) => void,

    /** Sets mowerStats.
     * 
     * @params {number} perPatch Number to set mowerStats.perPatch to.
     * @params {number} growthRate Number to set mowerStats.growthRate to.
     */
    setMowerStats: (perPatch: number, growthRate: number) => void,

    purchasedMowers: string[],

    setPurchasedMowers: (image: string) => void,

    robots: {base: string[], silver: string[], gold: string[], diamond: string[]},
    setRobots: (type: string, image: string) => void,
    botsPerTick: number,
}

export const useStatsStore = create((set) => ({
    patchesMowed: 0,
    increasePatchesMowed: (amount: number) => set((state: StatsState)=>({patchesMowed: state.patchesMowed + amount})),
    resetPatchesMowed: () => set(() => ({patchesMowed: 0})),

    bagsFilled: 0,
    increaseBagsFilled: () => set((state: StatsState) => ({bagsFilled: state.bagsFilled + 1})),
    subtractBagsFilled: (amount: number) => set((state: StatsState) => ({bagsFilled: state.bagsFilled - amount})),

    mowerStats: {perPatch: 1, growthRate: 2000},
    setMowerStats: (perPatch: number, growthRate: number) => set(() => ({mowerStats: {perPatch: perPatch, growthRate: growthRate }})),

    mowerImage: '/textures/mower-cursor.png',
    setMowerImage: (image: string) => set(() => ({mowerImage: image})),

    purchasedMowers: ['/textures/mower-cursor.png'],
    setPurchasedMowers: (image: string) => set((state: StatsState) => ({purchasedMowers: [...state.purchasedMowers, image]})),

    robots: {
        base: [],
        silver: [],
        gold: [],
        diamond: [],
    },
    botsPerTick: 0,
    setBotsPerTick: (amount: number) => set((state: StatsState) => ({botsPerTick: state.botsPerTick + amount})),
    botsTickRate: 1000,
    setTickRate: (amount: number) => set(() => ({botsTickRate: amount})),

    setRobots: (type: any, image: string) => set((state: any) => ({robots: {...state.robots, [type]: [...state.robots[type], image]}}))

}))
import { createStyles } from "@mantine/core";

export const homeStyles = createStyles((theme) => ({
    mainPage: {
        display: 'flex',
        justifyContent: 'center',
        height: '100vh',
        width: '100vw',
        alignItems: 'flex-start',
        paddingTop: '80px',
        userSelect: 'none',
     },
     gameContainer: {
        position: 'relative',
        alignItems: 'center',
        cursor: 'none',
        justifyContent: 'center',
        display: 'flex',
        height: '600px',
        width: '800px',
        userSelect: 'none',
     },

    grassContainer: {
        cursor: 'hidden',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '500px',
        width: '800px',
        overflow: 'hidden'
    }
  }));
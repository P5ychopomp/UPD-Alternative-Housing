import { Global } from '@emotion/react'

const Fonts = () => (
  <Global
    styles={`
      /* latin */
      @font-face {
        font-family: 'Source Sans Heading';
        font-style: normal;
        font-weight: 700;
        font-display: swap;
        src: url('https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,300;1,400;1,500;1,600;1,700;1,800&display=swap');
      }
      /* latin */
      @font-face {
        font-family: 'Source Sans Body';
        font-style: normal;
        font-weight: 400;
        font-display: swap;
        src: url('https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,300;1,400;1,500;1,600;1,700;1,800&display=swap');
      }
      `}
  />
)

export default Fonts
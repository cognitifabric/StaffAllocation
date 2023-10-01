
const SVG = ({svg, classprop, color}) => {

  const selectSVG = (svg) => {
    switch(svg){

      case 'plus':
        return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
          <path d="M5 13h6v6c0 0.552 0.448 1 1 1s1-0.448 1-1v-6h6c0.552 0 1-0.448 1-1s-0.448-1-1-1h-6v-6c0-0.552-0.448-1-1-1s-1 0.448-1 1v6h-6c-0.552 0-1 0.448-1 1s0.448 1 1 1z"></path>
          </svg> 
        break;

      case 'thrashCan':
        return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
          <path d="M6 32h20l2-22h-24zM20 4v-4h-8v4h-10v6l2-2h24l2 2v-6h-10zM18 4h-4v-2h4v2z"></path>
          </svg> 
        break;
    }
  }
  
  return (
    <>
      {selectSVG(svg)}
    </>
  )
}

export default SVG

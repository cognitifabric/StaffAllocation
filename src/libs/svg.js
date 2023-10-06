
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

      case 'sort':
        return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 32">
            <path d="M16 17c0 0.266-0.109 0.516-0.297 0.703l-7 7c-0.187 0.187-0.438 0.297-0.703 0.297s-0.516-0.109-0.703-0.297l-7-7c-0.187-0.187-0.297-0.438-0.297-0.703 0-0.547 0.453-1 1-1h14c0.547 0 1 0.453 1 1zM16 11c0 0.547-0.453 1-1 1h-14c-0.547 0-1-0.453-1-1 0-0.266 0.109-0.516 0.297-0.703l7-7c0.187-0.187 0.438-0.297 0.703-0.297s0.516 0.109 0.703 0.297l7 7c0.187 0.187 0.297 0.438 0.297 0.703z"></path>
          </svg> 
        break;
        
      case 'dropdown':
        return <svg id="icon-list" viewBox="0 0 24 24">
          <path d="M3 12.984v-1.969h12v1.969h-12zM3 6h18v2.016h-18v-2.016zM3 18v-2.016h6v2.016h-6z"></path>
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

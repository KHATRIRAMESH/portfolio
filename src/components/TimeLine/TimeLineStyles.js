
import styled from 'styled-components'

export const CarouselContainer = styled.div`
  max-width: 1040px;
  background: #0F1624;
  padding: 2rem;
  display: flex;
  border-radius: 10px;
  flex-direction: column;
  justify-content: space-between;
  margin-left: 32px;
  margin-bottom: 80px;

  @media ${props => props.theme.breakpoints.sm} {
    margin-left: 0;
    margin-bottom: 24px;
    padding-left: 16px; 
  }
`

export const CarouselItem = styled.div`
  display: flex;
  flex-direction: row; // Horizontal item structure
  align-items: flex-start; // Align top
  margin-bottom: 24px;
  position: relative;
  
  &:last-child {
    margin-bottom: 0;
  }
`

export const CarouselItemTitle = styled.h4`
  font-weight: bold;
  font-size: 24px;
  line-height: 32px;
  letter-spacing: 0.02em;
  color: #FFFFFF;
  margin-right: 24px;
  min-width: 80px; // Fixed width for year alignment

  @media ${props => props.theme.breakpoints.sm} {
    font-size: 20px;
    line-height: 28px;
    min-width: 60px;
    margin-right: 16px;
  }
`

export const CarouselItemText = styled.p`
  font-size: 16px;
  line-height: 24px;
  letter-spacing: 0.02em;
  color: #FFFFFF;
  margin-left: 10px;
  max-width: 600px;
  
  @media ${props => props.theme.breakpoints.sm} {
    font-size: 14px;
    line-height: 22px;
  }
`

// Visual elements for the line
export const TimelinePoint = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: linear-gradient(270deg, #13ADC7 0%, #945DD6 100%);
  z-index: 10;
  margin-top: 10px; // Align with text top approx
`

export const TimelineLine = styled.div`
  position: absolute;
  top: 10px; 
  left: 85px; // Adjust based on Title width + spacing
  width: 2px;
  height: 100%;
  background: linear-gradient(180deg, #13ADC7 0%, #945DD6 100%);
  opacity: 0.5;
  z-index: 0;
  
  /* Hide line for last item */
  ${({ active }) => active && `
    display: none;
  `}

  @media ${props => props.theme.breakpoints.sm} {
     left: 65px; // Mobile adjustment
  }
`

// Keeping empty/unused exports to prevent import errors during transition if I miss one
export const CarouselButton = styled.button`display:none;`
export const CarouselButtonDot = styled.div`display:none;`
export const CarouselButtons = styled.div`display:none;`
export const CarouselMobileScrollNode = styled.div``
export const CarouselItemImg = styled.div``

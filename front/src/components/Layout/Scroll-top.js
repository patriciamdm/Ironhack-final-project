import { Button } from 'react-bootstrap'

const ScrollToTop = props => {
    
    return (
        <Button onClick={() => props.scrollToTop()} variant='link' style={{position: 'fixed', right: '20px', bottom: '20px'}}>
                <img src="https://raw.githubusercontent.com/linea-io/Linea-Iconset/master/_arrows/_PNG64/arrows_circle_up.png"
                alt="Scroll to top" style={{ width: '40px', height: '40px' }} />
            </Button>
    )
}

export default ScrollToTop
import styled from 'styled-components'

const Wrapper = styled.main`
.popup{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background-color: rgba(0,0,0,0.2);
    display: flex;
    justify-content: center;
    align-items: center;
}


.popup-inner{
    position: relative;
    width: 60vw;
    padding: 4vw;
    background-color: #fff;
}

.popup-inner .close-btn{
    position: absolute;
    top: 10px;
    right: 10px;
}
`

export default Wrapper

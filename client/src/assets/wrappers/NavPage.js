import styled from 'styled-components'

const Wrapper = styled.main`
.Navbar{
    position: fixed;
    height: 100vh;
    top: 1px;
    right: 1%;
    display: flex;
    flex-direction: column;
    /* transition: width 2s; */
    /* transition-duration: 1s; */
    /* justify-content: space-between; */
    /* font-family: var(--bodyFont); */
}

.icons{
    opacity: 50%;
    transition: 1s;
}

/* .icons:hover{
    height: 3.5em;
    width: 3.5em;
} */


.iconn{
    opacity: 20%;
}

.navs{
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
}


/* .Navbar:hover{
    right: 60px;
    
    transition-duration: 1s;

} */

.choosen_one{
    opacity: 100%;
    height: 3em;
    width: 3em;
}


.choosen_one::after{
    content: '';
    border-radius: 50%;
    height: 10px;
    background-color: #F24E1E;
}

`

export default Wrapper
import styled from 'styled-components'

const Wrapper = styled.main`
.navbarr{
    position: fixed;
}

.Header{
    /* height: 5rem; */
    background-color: #F5F5F5;
}

.LogoContainer{
    height: 100%;
}


.Container{
    height: 100%;
    display: flex;
    padding: 5% 0% 0% 0%;
    justify-content: space-around;

}


.Gallery{
    height: 35rem;
    width: 40%;
    padding: 1%;
}


.user_img{
    height: 100%;
    width: 100%;
    border-radius: 10%;
    /* box-shadow: 10px 10px black; */
}


.user_img::before {
    content: "";
    position: absolute;
    height: 50%;
    width: 50%;
    background: linear-gradient(90deg, purple, green, hotpink);
    z-index: -1;
    filter: blur(20px);
  }



.Details_and_Controls{
    width: 35rem;
    width: 40%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.Details{
    background-color: #F5F5F5;
    border-radius: 10%;
    padding: 5% 5%;
    text-align: left;
}


.Controls{
    display: flex;
    justify-content: space-around;
}

button{
    height: 150%;
    width: 150%;
    border-radius: 50%;
    padding: 20%;
}

.hobbies{
    display: flex;
    justify-content: space-evenly;
}

.hobby{
    background-color: #BFB5B5;
    border-radius: 10%;
    padding: 1.5%;
}

`

export default Wrapper
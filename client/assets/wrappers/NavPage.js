import styled from "styled-components"

const Wrapper = styled.main`
	.Navbar {
		position: fixed;
		height: 70vh;
		top: 20%;
		margin: 0;
		right: 0.5%;
		background: var(--grey-100);
		border-radius: 1rem;
		border: 0.01rem solid var(--grey-200);
		padding: 1% 0;
		display: flex;
		flex-direction: column;
		/* transition: width 2s; */
		/* transition-duration: 1s; */
		/* justify-content: space-between; */
		/* font-family: var(--bodyFont); */
	}

	.icons {
		opacity: 70%;
		transition: 1s;
	}

	/* .icons:hover{
    height: 3.5em;
    width: 3.5em;
} */

	.iconn {
		opacity: 20%;
	}

	.navs {
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		align-items: center;
	}

	.choosen_one {
		opacity: 100%;
		padding-left: 7%;
		border-left: 3px solid navy;
		border-radius: 2rem;
	}

	.choosen_one::after {
		content: "";
		border-radius: 50%;
		height: 10px;
		background-color: #f24e1e;
	}
`

export default Wrapper

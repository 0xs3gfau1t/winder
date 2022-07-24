import styled from "styled-components"

const Wrapper = styled.main`
	z-index: 7; //top of stack
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100vh;
	background-color: rgba(0, 0, 0, 0.88);
	display: flex;
	justify-content: center;
	align-items: center;

	.popup-inner {
		position: relative;
		padding: 2vw 7vw;
		max-width: 80vw;
		background-color: #ffffffd4;
		border-radius: 1rem;
	}

	.popup-inner:hover {
		box-shadow: 2px 2px 12px 15px #644c4375;
	}
	.popup-inner .close-btn {
		position: absolute;
		top: 1.25em;
		right: 1.5em;
	}

	// .popup-inner .close-btn {
	// 		position: absolute;
	// 		bottom: 10px;
	// 		right: 50%;
	// 		border: 1px solid black;
	// 		padding: 3px;
	// 		border-radius: 10px;
	// 	}
`

export default Wrapper

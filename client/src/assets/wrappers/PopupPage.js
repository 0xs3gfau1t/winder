import styled from "styled-components"

const Wrapper = styled.main`
	.popup {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100vh;
		background-color: rgba(0, 0, 0, 0.8);
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.popup-inner {
		position: relative;
		padding: 2vw;
		width: 60vw;
		background-color: #fff;
	}

	.popup-inner .close-btn {
		position: absolute;
		bottom: 10px;
		right: 50%;
		border: 1px solid black;
		padding: 3px;
		border-radius: 10px;
	}
`

export default Wrapper

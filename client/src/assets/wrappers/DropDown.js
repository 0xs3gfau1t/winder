import styled from "styled-components"

const DropDownStyled = styled.div`
	position: relative;

	.toggler {
		position: absolute;
		top: 0%;
		right: 1rem;
		font-size: 1rem;
		font-weight: 600;
		padding: 0.5rem;
		background-color: black;
		border-radius: 0.4rem;
		color: white;
	}

	.items {
		position: absolute;
		top: 2rem;
		right: 1rem;
		background-color: white;
		border-radius: 1rem;
		padding: 0.5rem;
		box-shadow: 10px 10px 20px gray;
		opacity: 0;
		pointer-events: none;
		transform: translateY(-50%);
		transition: opacity 300ms ease-in-out, transform 300ms ease-in-out;
	}

	.items--active {
		opacity: 1;
		pointer-events: auto;
		transform: translateY(0%);
	}

	.item {
		cursor: pointer;
		background-color: white;
		border-radius: 0.75rem;
		padding: 0.3rem;
		color: black;
	}

	.item:hover {
		background-color: rgb(30, 30, 30, 0.9);
		color: white;
	}
`

export default DropDownStyled

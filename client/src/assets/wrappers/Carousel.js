import styled from "styled-components"

const CarouselStyled = styled.div`
	width: ${props => props.width || "100%"};
	height: ${props => props.height || "100%"};
	background-color: #222222;
	overflow: hidden;

	.carousel-items {
		position: relative;
		width: inherit;
		height: inherit;
	}

	.carousel-item {
		position: absolute;
		opacity: 0;

		transition: opacity 400ms ease-in-out;
	}

	.carousel-items > .active {
		opacity: 1;
	}
	.carousel-items > img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		border-radius: 0.5em;
	}

	position: relative;
	.header {
		display: flex;
		align-items: center;
		justify-content: center;

		width: 100%;
		position: absolute;
		top: 0px;
	}

	.indicator-btn {
		background-color: #646464;

		margin: 0 0.2em;
		width: 3em;
		height: 0.3em;
		border-radius: 1em;

		transition: 0.5s;
	}

	.indicator-btn--active {
		position: relative;
		background-color: white;

		transition: 0.5s;
	}

	.carousel-control {
		position: absolute;
		top: 45%;

		opacity: 0.07;
		transition: 0.5s;
	}
	.carousel-control:hover {
		transition: 0.5s;
		opacity: 1;
	}
	.carousel-control--right {
		right: 0;
	}
	.name-container {
		position: absolute;
		bottom: 0;

		display: flex;

		background-color: #222222cc;

		border: 1px solid #ff3c00;
		border-top-left-radius: 2em;
		border-bottom-right-radius: 2em;

		margin: 1em;
		padding: 0 1.3em;
	}
	.name {
		display: flex;
		align-items: center;
		gap: 1em;
		font-size: 1.5em;
		background: -webkit-linear-gradient(#ff3c00, #d53a9d);
		-webkit-background-clip: text;
		background-clip: text;
		-webkit-text-fill-color: transparent;
	}
	.name > .age {
		display: flex;
		align-items: center;
		gap: 1em;
	}
`

export default CarouselStyled

import styled from "styled-components"

const CarouselStyled = styled.div`
	width: ${props => props.width || "100%"};
	height: ${props => props.height || "100%"};
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

		border-radius: .5em;
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

		opacity: .07;
		transition: 0.5s;
	}
	.carousel-control:hover {
		transition: 0.5s;
		opacity: 1;
	}
	.carousel-control--right {
		right: 0;
	}

	.name {
		position: absolute;
		bottom: 0;

		display: flex;
		align-items: center;
		gap: 1em;
		font-size: 1.5em;
		background: -webkit-linear-gradient(#ff3c00, #d53a9d);
		-webkit-background-clip: text;
		background-clip: text;
		-webkit-text-fill-color: transparent;

		margin: 1em;
	}
	.name > .age {
		display: flex;
		align-items: center;
		gap: 1em;
	}
`

export default CarouselStyled

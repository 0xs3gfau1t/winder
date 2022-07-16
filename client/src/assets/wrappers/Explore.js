import styled from "styled-components"

const ExploreStyled = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;

	//	border: 3px solid green;
	margin-top: 1em;

	.outer {
		display: flex;
		margin-bottom: 1em;
		//		border: 3px solid blue;
	}

	.carousel-wrapper {
		width: 40vw;
		height: 80vh;

		margin-right: 2vw;

		//		border: 2px solid black;
	}
	.details {
		display: flex;
		align-items: center;

		background-color: #eeddee;
		width: 40vw;
		padding-left: 4em;

		border: 5px solid;
		border-image-slice: 1;
		border-image-source: linear-gradient(to left, #743ad5, #d53a9d);
		border-radius: inherit;
	}

	.actions {
		display: flex;
		gap: 5em;
		justify-content: center;
		align-items: center;

		padding: 1em;
		//		border: 2px solid black;
	}
	.actions > span:hover {
		transition: 0.2s;
		transform: scale(1.3);
	}

	.scan_container {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

		border-radius: 1em;
		outline: 2px solid red;

		padding: 1em;
	}
	.scan {
		text-align: center;
		background-image: linear-gradient(
			-225deg,
			#231557 0%,
			#44107a 29%,
			#ff1361 67%,
			#231557 100%
		);
		background-size: 200% auto;
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		font-size: 1em;
		animation: textclip linear 2s infinite;
		margin: 0.3em;
	}
	@keyframes textclip {
		to {
			background-position: 200% center;
		}
	}
	.goto-profile {
		padding: 0.3em 1em;
		text-align: center;

		background-color: #541ab5;
		color: #eeddee;
		border-radius: 1em;
	}
	.goto-profile:hover {
		cursor: pointer;
		background-color: #340fa5;
		transition: 0.3s;
		transform: scale(1.1);
	}
`

export default ExploreStyled

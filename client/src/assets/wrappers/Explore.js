import styled from "styled-components"

const ExploreStyled = styled.div`
	width: 100vw;
	height: 100vh;
	display: flex;
	/* border: 3px solid green; */

	.carousel-wrapper {
		flex: 0 0 35%;
		padding: 1rem;
	}

	.outer {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		flex: 0 0 50%;
		padding: 1rem;
		/* border: 3px solid blue; */
	}

	.details {
		flex-grow: 1;
		width: 100%;
		display: flex;
		justify-content: center;
	}

	.actions {
		display: flex;
		width: 100%;
		justify-content: space-around;
	}
`

export default ExploreStyled

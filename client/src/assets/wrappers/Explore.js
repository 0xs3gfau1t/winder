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
		transition: .2s;
		transform: scale(1.3)
	}
`

export default ExploreStyled

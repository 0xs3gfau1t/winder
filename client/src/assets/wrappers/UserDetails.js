import styled from "styled-components"
const UserDetailsStyled = styled.div`
	width: 30em;
//	border: 5px solid purple;

	.detail{
		display: flex;
		flex-direction: column;
		align-items: center;

		gap: .5em;

		padding: 1em;
//		border: 2px solid red;
	}
	.detail > h1{
		font-size: 1.5em;
		border-bottom: 1px solid black;
		margin: 0 auto .3em 0;
	}
	
	.bio > span{
		border: 2px solid #ff3c00;
		border-radius: 1em;
		padding: 1em;
		margin: 0 auto 0 1em;
	}

	.academics{
//		border: 2px solid aqua;
	}
	.academics > div{
		display: flex;
		flex-direction: column;
		margin: 0 auto 0 1em;
		padding: 0.5em;
//		border: 2px solid black;
	}
	.academics > div > p{
		margin: 0;
	}
	.academics > div > p > span{
		border: 2px solid #ff3c00;
		background-color: #ff7d5155;
		border-radius: .5em;

		text-align: center;

		padding: .4em .7em;
		margin: 0 0 0 1em;
	}
	.passion-container{
		margin: 0 auto 0 1em;
	}
	.passion-container > span{
		border: 2px solid #ff3c00;
		background-color: #ff7d5155;
		border-radius: .5em;

		text-align: center;

		padding: .4em .7em;
		margin: 0 0 0 1em;
	}
`

export default UserDetailsStyled

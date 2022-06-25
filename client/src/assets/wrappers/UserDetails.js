import styled from "styled-components"

const UserDetailsStyled = styled.div`
	display: flex;
	width: 100%;
	flex-direction: column;
	justify-content: center;

	.detail {
		display: flex;
		align-items: center;
		justify-content: flex-start;
		gap: 0.7rem;
		border: 2px solid #87eaf2;
		border-radius: 0.5rem;
		margin: 0.25rem;
		padding: 0.2rem 0;
	}

	.detail > span {
		color: rgb(66, 59, 59);
	}
`

export default UserDetailsStyled

import styled from 'styled-components'

const Wrapper = styled.main`
  nav {
    width: var(--fluid-width);
    max-width: var(--max-width);
    margin: 0 auto;
    height: var(--nav-height);
    display: flex;
    align-items: center;
  }
  .page {
    min-height: calc(100vh - var(--nav-height));
    display: grid;
    align-items: center;
    margin-top: -3rem;
  }
  .tagline {
    text-indent: 1.2rem;
    font-size: 1.5rem;
    font-weight: 700;
    margin-top: -3vh;
    border-left : 5px solid var(--primary-500);
    span {
      color: var(--primary-500);
    }
    .block{
        color: var(--primary-500);
    }
  }
  h3{
    font-weight:700;
    text-align: center;
  }
  p {
    color: var(--grey-600);
  }
  .main-img {
    display: none;
  }
  @media (min-width: 992px) {
    .page {
      grid-template-columns: 1fr 1fr;
      column-gap: 3rem;
    }
    .main-img {
      display: block;
    }
  }
`
export default Wrapper

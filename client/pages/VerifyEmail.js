import React, { useEffect } from "react"
import { useDispatch } from "react-redux"
import { Link, useParams } from "react-router-dom"
import { verifyEmail } from "../actions/user"
import { logout } from "../actions/auth"
import { Alert } from "../components"
import img from "../assets/images/email_verified.svg"
import Wrapper from "../assets/wrappers/ErrorPage"

const Verify = () => {
	const token = useParams()
	const dispatch = useDispatch()
	useEffect(() => {
		dispatch(verifyEmail(token))
	}, [token])
	const handleLog = () => {
		dispatch(logout())
	}
	return (
		<Wrapper className="full-page">
			<div>
				<img src={img} alt="not found" />
				<Alert float={false} />
				<Link to="/login" onClick={handleLog}>
					Login to continue
				</Link>
			</div>
		</Wrapper>
	)
}

export default Verify

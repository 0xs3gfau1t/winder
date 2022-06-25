export function connect() {
	return { type: "CONNECT" }
}

export function apiGotData(data) {
	return { type: "ADD_USER", data }
}

export function apiSetData(data) {
	return { type: "CHAT", data }
}

const getStart = async () => {
	return Date.now();
}

const getDifference = async (startTime) => {
	try {
		const endTime = Date.now() - startTime;
		return endTime
	} catch(e) {
		console.log(e.message)
	}
}

export default {
  startTime: getStart,
  timeElapsed: getDifference
}
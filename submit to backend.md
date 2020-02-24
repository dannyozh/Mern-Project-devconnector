// submit to backend
	  const newUser = {
		name,
		email,
		password
	  };

	  try {
		const config = {
		  headers: {
			"Content-Type": "application/json"
		  }
		};
		const body = JSON.stringify(newUser);
		const res = await axios.post("/api/users", body, config);
		console.log(res.data);
	  } catch (err) {
		console.error(err.response.data);
	  }
	}
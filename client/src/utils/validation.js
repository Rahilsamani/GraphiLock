import axios from "axios";

async function checkUsername(username, setLoading) {
  try {
    setLoading(true);
    const response = await axios.get(
      `http://localhost:8080/api/user/check?username=${username}`,
      {
        headers: { "Access-Control-Allow-Origin": "*" },
      }
    );
    setLoading(false);
    return response.data.exists;
  } catch (err) {
    setLoading(false);
    return false;
  }
}

async function checkEmail(email, setLoading) {
  try {
    setLoading(true);
    const response = await axios.get(
      `http://localhost:8080/api/user/check?email=${email}`
    );
    setLoading(false);
    return response.data.exists;
  } catch (err) {
    setLoading(false);
    return false;
  }
}

export { checkEmail, checkUsername };

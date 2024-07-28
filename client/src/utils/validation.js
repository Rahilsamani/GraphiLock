import axios from "axios";

async function checkUsername(username, setLoading) {
  try {
    setLoading(true);
    const response = await axios.get(
      `${process.env.REACT_APP_BACKEND}/api/user/check?username=${username}`,
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
      `${process.env.REACT_APP_BACKEND}/api/user/check?email=${email}`
    );
    setLoading(false);
    return response.data.exists;
  } catch (err) {
    setLoading(false);
    return false;
  }
}

export { checkEmail, checkUsername };

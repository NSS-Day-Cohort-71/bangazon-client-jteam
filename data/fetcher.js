const API_URL = "http://localhost:8000";

const checkError = (res) => {
  if (!res.ok) {
    throw Error(res.status);
  }
  return res;
};

const checkErrorJson = async (res) => {
  const data = await res.json();
  if (!res.ok) {
    // If the server sends error details, use them
    const errorMessage = data.message || data.error || `Error: ${res.status}`;
    throw new Error(errorMessage);
  }
  return data;
};

const catchError = (err) => {
  if (err.message === "401") {
    window.location.href = "/login";
  }
  if (err.message === "404") {
    throw Error(err.message);
  }
};

export const fetchWithResponse = async (resource, options) => {
  try {
    const response = await fetch(`${API_URL}/${resource}`, options);
    return await checkErrorJson(response);
  } catch (error) {
    if (error.message === "401") {
      window.location.href = "/login";
    }
    throw error; // Re-throw the error for the component to handle
  }
};

export const fetchWithoutResponse = (resource, options) =>
  fetch(`${API_URL}/${resource}`, options).then(checkError).catch(catchError);

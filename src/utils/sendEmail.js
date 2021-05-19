export default async function sendEmail(body) {
  try {
    const res = await fetch('https://vast-beach-47720.herokuapp.com/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })

    let result = null;
    result = await res.json();

    if (res.status > 399) {
      throw result;
    }

    return result;
  } catch (e) {
    throw (e);
  }
}
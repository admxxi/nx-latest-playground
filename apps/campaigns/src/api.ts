import axios from 'axios'
const url = 'https://api.cilabs.com/campaigns/api/v1/conferences/ws23_AP/rsvp/events/event_type/perk'

const headers = () => {
  return {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': 'true'
  }
}

const headersWithToken = (token: string) => {
  return {
    ...headers(),
    'Authorization': `Bearer ${token}`
  }
}

export async function fetchPerks(token?: string) {
  const response = await fetch(url, {
    method: 'GET',
    headers: token ? headersWithToken(token) : headers(),
  });


  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  return response.json();
}


export async function fetchPerks2() {
  try {
    const response = await axios({
      method: 'get',
      url: 'https://api.cilabs.com/campaigns/api/v1/conferences/ws23_AP/rsvp/events/event_type/perk',
      withCredentials: true,
      headers: {
        "Access-Control-Allow-Origin": "*",
      }
    });

    console.log(response);

    if (response.status !== 200) {
      throw new Error('Network response was not ok');
    }

    return response.data;
  } catch (error) {
    console.error('Network error:', error);
    throw error;
  }
}


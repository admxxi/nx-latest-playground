const url = '/conferences/ws23_AP/rsvp/events/event_type/perk';

const headers = () => {
  return {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': 'true',
  };
};

const headersWithToken = (token: string) => {
  return {
    ...headers(),
    Authorization: `Bearer ${token}`,
  };
};

export async function fetchPerks(token?: string, api?: string) {
  const response = await fetch(
    api + '/conferences/ws23_AP/rsvp/events/event_type/perk',
    {
      method: 'GET',
      headers: token ? headersWithToken(token) : headers(),
    }
  );

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  return response.json();
}

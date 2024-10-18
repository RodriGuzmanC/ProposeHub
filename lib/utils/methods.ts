
export async function postData(url = '', data = {}) {
    const response = await fetch(url, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'X-RapidAPI-Key': '5c7640690cmsh79310cc4c4f2c48p1e08cejsn52776ccdd891',
            'X-RapidAPI-Host': 'proposehub.p.rapidapi.com',
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(data)
    });
    return response.json(); // parses JSON response into native JavaScript objects
}


const host = 'http://localhost:3000';


const request = async (method, url, data) => {
    const options = {};

    if (method !== 'GET') {
        options.method = method;

        if (data) {
            options.headers = {
                'content-type': 'application/json',
            };

            options.body = JSON.stringify(data);
        }
    }



    const response = await fetch(host + url, options);

    if (response.status === 204) {
        return {};
    }

    const result = await response.json();

    if (!response.ok) {
        throw result;
    }

    return result;
};

export const get = request.bind(null, "GET");
export const post = request.bind(null, "POST");
export const put = request.bind(null, "PUT");
export const del = request.bind(null, "DELETE");

// export const requestFactory = () => {
//     return {
//         get: request.bind(null, 'GET' ),
//         post: request.bind(null, 'POST' ),
//         put: request.bind(null, 'PUT' ),
//         patch: request.bind(null, 'PATCH' ),
//         delete: request.bind(null, 'DELETE' ),
//     }
// };

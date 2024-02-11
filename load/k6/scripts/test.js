// import http from 'k6/http';
// import { sleep } from 'k6';
// export const options = {
//   vus: 2,
//   duration: '10s',
// };
// export default function () {
//   http.get('http://test.k6.io');
//   sleep(1);
// }


import http from 'k6/http';
import { check, sleep } from 'k6';
import { Rate } from 'k6/metrics';

const MAX_VUS = `${__ENV.MAX_VUS}`;
const BASE_URL = `${__ENV.API_DOMAIN}`;

export let errorRate = new Rate('errors');

export let options = {
    stages: [
        { duration: '80s', target: MAX_VUS },
        { duration: '100s', target: MAX_VUS },
        { duration: '40s', target: 0 },
    ],
};

export default function () {
    const userId = createUser();
    const postId = createPost(userId);

    console.log(`User ID: ${userId}, Post ID: ${postId}`);


    sleep(1);

    if (postId) {
        getPost(postId);
    }

    sleep(2);

    deletePost(postId);
    deleteUser(userId);
}

function getPost(id) {
    let response = http.get(`${BASE_URL}/post/${id}`);
    checkResponse(response);
}

function createUser() {
    let data = { name: 'Prabhat', email: makeEmail() };
    let id = '';

    let response = http.post(`${BASE_URL}/user/create-user`, JSON.stringify(data), {
        headers: { 'Content-Type': 'application/json' },
    });

    checkResponse(response);
    if (response.status === 201) {
        id = response.json().id;
    }

    return id;
}

function createPost(authorId) {
    let data = { title: 'this is title for k6', content: "this is content for k6", authorId };
    let id = '';

    let response = http.post(`${BASE_URL}/post/create-post`, JSON.stringify(data), {
        headers: { 'Content-Type': 'application/json' },
    });

    checkResponse(response);

    if (response.status === 201) {
        id = response.json().id;
    }

    return id;
}

function deletePost(id) {
    let response = http.del(`${BASE_URL}/post/${id}`);
    checkResponse(response);
}

function deleteUser(id) {
    let response = http.del(`${BASE_URL}/user/${id}`);
    checkResponse(response);
}

function makeEmail() {
    var strValues = "abcdefg12345";
    var strEmail = "";
    var strTmp;
    for (var i = 0; i < 10; i++) {
        strTmp = strValues.charAt(Math.round(strValues.length * Math.random()));
        strEmail = strEmail + strTmp;
    }
    strTmp = "";
    strEmail = strEmail + "@";
    for (var j = 0; j < 8; j++) {
        strTmp = strValues.charAt(Math.round(strValues.length * Math.random()));
        strEmail = strEmail + strTmp;
    }
    strEmail = strEmail + ".com";
    return strEmail;
}

function checkResponse(httpResponse) {
    check(httpResponse, { 'status was Ok': (r) => r.status >= 200 && r.status < 300 });
    if (httpResponse.status >= 400) {
        errorRate.add(1);
    }
}

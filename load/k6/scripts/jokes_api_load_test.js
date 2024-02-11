
import http from 'k6/http';
import { check, group, sleep } from 'k6';

export let options = {
  stages: [
    { duration: '1m', target: 100 }, // simulate ramp-up of traffic over 1 minute
    { duration: '2m', target: 100 }, // stay at 100 virtual users for 2 minutes
    { duration: '1m', target: 0 }, // ramp-down to 0 virtual users
  ],
};

export default function () {
  group('Performance Test', function () {
    let res = http.get('https://official-joke-api.appspot.com/random_joke');
    check(res, { 'status is 200': (r) => r.status === 200 });
    sleep(1);
  });

  group('Stress Test', function () {
    for (let i = 0; i < 100; i++) {
      let res = http.get('https://official-joke-api.appspot.com/random_joke');
      check(res, { 'status is 200': (r) => r.status === 200 });
    }
    sleep(1);
  });

  group('Spike Test', function () {
    let res = http.get('https://official-joke-api.appspot.com/random_joke');
    check(res, { 'status is 200': (r) => r.status === 200 });
    sleep(5);
    for (let i = 0; i < 50; i++) {
      http.get('https://official-joke-api.appspot.com/random_joke');
    }
    sleep(5);
  });

  group('Endurance Test', function () {
    for (let i = 0; i < 100; i++) {
      let res = http.get('https://official-joke-api.appspot.com/random_joke');
      check(res, { 'status is 200': (r) => r.status === 200 });
      sleep(1);
    }
  });

  group('Volume Test', function () {
    for (let i = 0; i < 1000; i++) {
      let res = http.get('https://official-joke-api.appspot.com/random_joke');
      check(res, { 'status is 200': (r) => r.status === 200 });
    }
    sleep(1);
  });
}
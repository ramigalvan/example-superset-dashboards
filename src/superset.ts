// import { embedDashboard } from "@superset-ui/embedded-sdk";

import { embedDashboard } from "@superset-ui/embedded-sdk";
import axios from "axios";

// embedDashboard({
//   id: "cf331065-4357-4877-8743-70d68b397014", // given by the Superset embedding UI
//   supersetDomain: "http://localhost:8088",
//   mountPoint: document.getElementById("my-superset-container")!, // any html element that can contain an iframe
//   // SIMPLEMENTE DEVUELVES EL TOKEN QUE OBTUVISTE EN POSTMAN
//   fetchGuestToken: () => Promise.resolve("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJuYW1lIjoiaW52aXRhZG8iLCJmaXJzdF9uYW1lIjoiVGVzdCIsImxhc3RfbmFtZSI6IlVzZXIifSwicmVzb3VyY2VzIjpbeyJ0eXBlIjoiZGFzaGJvYXJkIiwiaWQiOiJjZjMzMTA2NS00MzU3LTQ4NzctODc0My03MGQ2OGIzOTcwMTQifV0sInJsc19ydWxlcyI6W10sImlhdCI6MTc2NDc2ODA2OC45NjUzNzQ1LCJleHAiOjE3NjQ3NjgzNjguOTY1Mzc0NSwiYXVkIjoiaHR0cDovL3N1cGVyc2V0OjgwODgvIiwidHlwZSI6Imd1ZXN0In0.Ce0Y6HpFD0MnOfWjRhI32OUXzOY6uS5N2iwAToEua-w"),
//   // fetchGuestToken: () => Promise.resolve("PEGA_AQUI_TU_TOKEN_LARGO_DE_POSTMAN"),
//   // fetchGuestToken: () => fetchGuestTokenFromBackend(),
//   dashboardUiConfig: { // dashboard UI config: hideTitle, hideTab, hideChartControls, filters.visible, filters.expanded (optional), urlParams (optional)
//       hideTitle: true,
//       filters: {
//           expanded: true,
//       },
//       urlParams: {
//           foo: 'value1',
//           bar: 'value2',
//           // ...
//       }
//   },
//     // optional additional iframe sandbox attributes
//   iframeSandboxExtras: ['allow-top-navigation', 'allow-popups-to-escape-sandbox'],
//   // optional config to enforce a particular referrerPolicy
//   referrerPolicy: "same-origin"
// });

// export function fetchGuestTokenFromBackend(): Promise<string> {
//     throw new Error("Function not implemented.");
// }

const supersetUrl = 'http://localhost:8088/'
const supersetApiUrl = supersetUrl + '/api/v1/security'
const dashboardId = "5f6d1cf4-45f7-4e32-ae50-d359f82de2fa"

export async function getToken() {

  //calling login to get access token
  const login_body = {
    "password": "admin",
    "provider": "db",
    "refresh": true,
    "username": "admin"
  };

  const login_headers = {
    "headers": {
      "Content-Type": "application/json"
    }
  }

  console.log(supersetApiUrl + '/login')
  const { data } = await axios.post(supersetApiUrl + '/login', login_body, login_headers)
  const access_token = data['access_token']
  console.log(access_token)


  // Calling guest token
  const guest_token_body = JSON.stringify({
    "resources": [
      {
        "type": "dashboard",
        "id": dashboardId,
      }
    ],
    "rls": [],
    "user": {
      "username": "report-viewer",
      "first_name": "report-viewer",
      "last_name": "report-viewer",
    }
  });

  const guest_token_headers = {
    "headers": {
      "Content-Type": "application/json",
      "Authorization": 'Bearer ' + access_token
    }
  }


  console.log(supersetApiUrl + '/guest_token/')
  console.log(guest_token_body)
  console.log(guest_token_headers)
  await axios.post(supersetApiUrl + '/guest_token/', guest_token_body, guest_token_headers).then(dt => {
    console.log(dt.data['token'])
    embedDashboard({
      id: dashboardId,  // given by the Superset embedding UI
      supersetDomain: supersetUrl,
      mountPoint: document.getElementById("superset-container")!, // html element in which iframe render
      fetchGuestToken: () => dt.data['token'],
      dashboardUiConfig: { hideTitle: true }
    });
  })

  const iframe = document.querySelector("iframe")
  if (iframe) {
    iframe.style.width = '100%'; // Set the width as needed
    iframe.style.minHeight = '100vw'; // Set the height as needed
  }

}

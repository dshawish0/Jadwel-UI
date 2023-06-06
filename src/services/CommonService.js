import ApiService from './ApiService'

export async function apiGetNotificationCount() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const count = 3; // Simulated count value
        resolve({ data: { count } });
      }, 1000); // Simulate a 1-second delay
    });
  }
  
  export async function apiGetNotificationList() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const notifications = [
          {
            id: 1,
            type: 0,
            target: 'Mohammad kanaan',
            description: 'You have a new notification.',
            readed: false,
            message: 'Good morning mohammad tody you need to visit me on the office regards!'
          },
          {
            id: 1,
            type: 0,
            target: 'Deiaa',
            description: 'You have a new notification.',
            readed: false,
            message: 'Good morning mohammad tody you need to visit me on the office regards!'
          },
          // Add more fake notifications as needed
        ];
  
        resolve({ data: notifications });
      }, 2000); // Simulate a 2-second delay
    });
  }

export async function apiGetSearchResult(data) {
    return ApiService.fetchData({
        url: '/search/query',
        method: 'post',
        data,
    })
}

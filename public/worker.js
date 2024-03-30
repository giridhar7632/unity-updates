//

self.addEventListener("push", (event) => {
  if (event.data) {
    const payload = event.data.json();
    event.waitUntil(
      self.registration?.showNotification(payload.title, {
        body: payload.body,
        icon: payload.icon,
        vibrate: [200, 100, 200],
        tag: payload.tag,
        data: payload.data,
      }),
    );
  }
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  event.waitUntil(
    self.clients
      .matchAll({ type: "window", includeUncontrolled: true })
      .then((clientList) => {
        if (clientList.length > 0) {
          let client = clientList[0];
          for (let i = 0; i < clientList.length; i++) {
            if (clientList[i].focused) {
              client = clientList[i];
            }
          }
          return client.focus();
        }
        return clients.openWindow("/");
      }),
  );
});

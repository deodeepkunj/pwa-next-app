const CACHE_NAME = "weather-app-v1.0.0";
const STATIC_CACHE_URLS = [
  "/",
  "/manifest.json",
  "https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css",
  "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap",
];

const DYNAMIC_CACHE_URLS = ["/api/weather/current", "/api/weather/search"];

// Install event - cache static assets
self.addEventListener("install", (event) => {
  console.log("Service Worker: Installing...");
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        console.log("Service Worker: Caching static assets");
        return cache.addAll(STATIC_CACHE_URLS);
      })
      .then(() => {
        console.log("Service Worker: Skip waiting");
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error("Service Worker: Cache failed", error);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener("activate", (event) => {
  console.log("Service Worker: Activating...");
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME) {
              console.log("Service Worker: Deleting old cache", cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log("Service Worker: Claiming clients");
        return self.clients.claim();
      })
  );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Handle API requests with network-first strategy
  if (url.pathname.startsWith("/api/")) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          // Clone the response before caching
          const responseClone = response.clone();

          // Cache successful API responses
          if (response.status === 200) {
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, responseClone);
            });
          }

          return response;
        })
        .catch(() => {
          // Fallback to cache if network fails
          return caches.match(request).then((cachedResponse) => {
            if (cachedResponse) {
              return cachedResponse;
            }

            // Return offline fallback for weather data
            if (url.pathname.includes("/api/weather/current")) {
              return new Response(
                JSON.stringify({
                  success: false,
                  error:
                    "You are offline. Please check your internet connection.",
                  offline: true,
                }),
                {
                  status: 200,
                  headers: { "Content-Type": "application/json" },
                }
              );
            }

            return new Response("Offline", { status: 503 });
          });
        })
    );
    return;
  }

  // Handle static assets with cache-first strategy
  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }

      return fetch(request)
        .then((response) => {
          // Don't cache non-successful responses
          if (
            !response ||
            response.status !== 200 ||
            response.type !== "basic"
          ) {
            return response;
          }

          // Clone the response
          const responseToCache = response.clone();

          // Add to cache
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, responseToCache);
          });

          return response;
        })
        .catch(() => {
          // Return offline page for navigation requests
          if (request.mode === "navigate") {
            return caches.match("/");
          }
          return new Response("Offline", { status: 503 });
        });
    })
  );
});

// Background sync for weather updates
self.addEventListener("sync", (event) => {
  if (event.tag === "weather-sync") {
    event.waitUntil(
      // Sync weather data when connection is restored
      self.clients.matchAll().then((clients) => {
        clients.forEach((client) => {
          client.postMessage({
            type: "SYNC_WEATHER",
            message: "Connection restored, syncing weather data...",
          });
        });
      })
    );
  }
});

// Push notifications for weather alerts
self.addEventListener("push", (event) => {
  if (event.data) {
    const data = event.data.json();
    const options = {
      body: data.body || "Weather update available",
      icon: "",
      badge: "",
      vibrate: [200, 100, 200],
      data: {
        url: data.url || "/",
        timestamp: Date.now(),
      },
      actions: [
        {
          action: "view",
          title: "View Weather",
          icon: "/icons/action-view.png",
        },
        {
          action: "dismiss",
          title: "Dismiss",
          icon: "/icons/action-dismiss.png",
        },
      ],
      requireInteraction: true,
      tag: "weather-alert",
    };

    event.waitUntil(
      self.registration.showNotification(data.title || "Weather Alert", options)
    );
  }
});

// Handle notification clicks
self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  if (event.action === "view") {
    event.waitUntil(
      self.clients.openWindow(event.notification.data.url || "/")
    );
  } else if (event.action === "dismiss") {
    // Just close the notification
    return;
  } else {
    // Default action - open the app
    event.waitUntil(
      self.clients.matchAll({ type: "window" }).then((clients) => {
        // Check if app is already open
        for (const client of clients) {
          if (client.url === self.location.origin && "focus" in client) {
            return client.focus();
          }
        }
        // Open new window if app is not open
        if (self.clients.openWindow) {
          return self.clients.openWindow("/");
        }
      })
    );
  }
});

// Handle messages from the main thread
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

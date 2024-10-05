module.exports = {
    // other configuration options...
    resolve: {
      fallback: {
        "http": require.resolve("stream-http"), // or false if not needed
        // other fallbacks...
      }
    }
  };
  
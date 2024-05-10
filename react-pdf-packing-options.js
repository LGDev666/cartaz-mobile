module.exports = (config) => {
  config = {
    android: {
      packagingOptions: {
        pickFirsts: [
          'lib/x86/libc++_shared.so',
          'lib/x86_64/libjsc.so',
          'lib/arm64-v8a/libjsc.so',
          'lib/arm64-v8a/libc++_shared.so',
          'lib/x86_64/libc++_shared.so',
          'lib/armeabi-v7a/libc++_shared.so',
        ]
      }
    }
  }

  return config
};
  
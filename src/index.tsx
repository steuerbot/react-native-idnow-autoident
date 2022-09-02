import { NativeModules, Platform } from 'react-native';

const LINKING_ERROR =
  `The package 'react-native-idnow-autoident' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo managed workflow\n';

const IDnowAutoIdent = NativeModules.IDnowAutoIdent
  ? NativeModules.IDnowAutoIdent
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

export function startAutoIdent(options: {
  id: string;
  language?: string;
}): Promise<string> {
  return IDnowAutoIdent.startAutoIdent(options);
}

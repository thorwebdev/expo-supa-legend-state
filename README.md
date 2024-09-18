# Expo App with LegendState and Supabase

Local-first Expo App with [Legend-State](https://legendapp.com/open-source/state/v3/) and [Supabase](https://supabase.com/).

- [Read the detailed tutorial](https://supabase.link/local-first-expo-legend-state)
- [Watch the video guide](https://supabase.link/local-first-expo-legend-state-yt)

## 🚀 How to use on web

- Run `yarn` or `npm install`
- Run `yarn start` or `npm run start` to try it out.

## How to use on native mobile

Since `react-native-mmkv` is not supported in Expo Go, you will need to perform a native build locally by running:

```js
npx expo prebuild

npx expo run:android
npx expo run:ios
```

## How to generate types

```bash
supabase start
supabase gen types --lang=typescript --local > utils/database.types.ts
```

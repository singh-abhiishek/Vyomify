import React from 'react'
import { createRoot } from 'react-dom/client';
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store, { persistor } from './store/store.js'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import { PersistGate } from "redux-persist/integration/react"

import {
  HomePage,
  Signup,
  Login,
  AuthLayout,
  ProfilePage,
  DashBoard,
} from './components/index.js'

import {
  VerifyEmailWithOtp,
  ResetPassword,
  UploadProfileImages,
  Home,
  LikedVideos,
  WatchLater,
  Playlists,
  SinglePlaylistScreen,
} from './pages/index.js'

import ExploreLayout from './ExploreLayout.jsx';
import AppProvider from './contextAPI/AppProvider.jsx';
import WatchVideoPage from './components/watchVideo/WatchVideoPage.jsx';
import History from './pages/explore/History/History.jsx';
import Subscription from './pages/explore/Subscription/Subscription.jsx';
import PageNotFound from './pages/PageNotFound.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route path='' element={<HomePage />} />

      {/* 404 route */}
      <Route path="*" element={<PageNotFound />} />

      <Route
        path='signup'
        element={<AuthLayout isAuthenticationRequired={false}> <Signup /> </AuthLayout>} />

      <Route path='verify-Email' element={<VerifyEmailWithOtp />} />

      <Route
        path='login'
        element={<AuthLayout isAuthenticationRequired={false}> <Login /> </AuthLayout>} />

      <Route path='upload-Profile-Images' element={<UploadProfileImages />} />

      <Route path='reset-Password' element={<ResetPassword />} />


      // Nested route :- /explore/
      <Route path='explore' element={<AuthLayout isAuthenticationRequired> <ExploreLayout /> </AuthLayout>}>

        <Route index element={<Home />} />

        <Route path='dashboard' element={<DashBoard />} />
        <Route path='likedVideos' element={<LikedVideos />} />
        <Route path='history' element={<History />} />
        <Route path='subscriptions' element={<Subscription />} />
        <Route path='watch-later' element={<WatchLater />} />
        <Route path='playlists' element={<Playlists />} />
        <Route path='playlists/:playlistId' element={<SinglePlaylistScreen />} />
        <Route path='profile/:username' element={<ProfilePage />} />
        <Route path='watchVideo' element={<WatchVideoPage />} />

      </Route>

    </Route>

  )
)

createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <Provider store={store}>
        <AppProvider>
          <PersistGate loading={null} persistor={persistor}>
            <RouterProvider router={router} />
          </PersistGate>
        </AppProvider>
      </Provider>
    </React.StrictMode>,
)

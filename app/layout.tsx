import React from 'react'
import Navbar from '@/src/components/Navbar'
import './globals.css'
import { Inter } from 'next/font/google'

import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyDhPTXjyPqni0Jg-j9wVuqS4DXknWZhTsQ",
  authDomain: "vanity-block-e5345.firebaseapp.com",
  databaseURL: "https://vanity-block-e5345-default-rtdb.firebaseio.com",
  projectId: "vanity-block-e5345",
  storageBucket: "vanity-block-e5345.appspot.com",
  messagingSenderId: "178845216223",
  appId: "1:178845216223:web:050a3eeb9d3a790d9a686a",
  measurementId: "G-31P5GL4H3H"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };

const inter = Inter({ subsets: ['latin'] })

interface RootLayoutProps {
  children: React.ReactNode;
}

const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header>
          {/* Navbar Component */}
          
          <Navbar />
        </header>
        {children}
      </body>
    </html>
  );
};
export default RootLayout;
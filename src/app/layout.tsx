'use client';

import { Inter } from "next/font/google";
import "./globals.css";

import { normalFont } from "./ui/fonts";


import { createTheme, ThemeOptions, ThemeProvider } from '@mui/material/styles';

export const theme = createTheme ({
  palette: {
    mode: 'dark',
    primary: {
      main: '#cdf564',
    },
    secondary: {
      main: '#50a9c4',
    },
    error: {
      main: '#b74a4a',
    },
    info: {
      main: '#5645e2',
    },
    success: {
      main: '#a4c450',
    },
  },
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ThemeProvider theme={theme}>
      <html lang="en">
        <head >
          <meta property="og:image" content={'/logo.svg'} />
        </head>
        <body className={normalFont.className}>{children}</body>
      </html>
    </ThemeProvider>
  );
}

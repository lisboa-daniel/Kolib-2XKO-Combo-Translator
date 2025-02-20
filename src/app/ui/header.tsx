'use client';

import Title from "@/app/ui/title";
import { VERSION } from "@/app/scripts/changelog";
import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';

import { Adb } from "@mui/icons-material";
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import Button from "./button";
import { useState } from "react";

import { boldFont } from "./fonts";
import BasicList from "./basicList";
import { redirect } from "next/navigation";


  
export function Header(){

    const links = [
      {
        label: "Input translator",
        href: "/translator"
      },
      {
        label: "Combo recipe browser",
        href: "/browser"
      },
      {
        label: "Video overlay editor",
        href: "/editor"
      },

    ]

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [menuOptions, setMenuOptions] = useState<boolean>(false);


    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
      React.useState<null | HTMLElement>(null);
  
    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  
    const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
    };

      const handleMobileMenuClose = () => {
      setMobileMoreAnchorEl(null);
    };
  
    const handleMenuClose = () => {
      setAnchorEl(null);
      handleMobileMenuClose();
    };
  
    const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
      setMobileMoreAnchorEl(event.currentTarget);
    };
  
    const menuId = 'primary-search-account-menu';
    const renderMenu = (
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        id={menuId}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={isMenuOpen}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
        <MenuItem onClick={handleMenuClose}>My account</MenuItem>
      </Menu>
    );
  
    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
      <Menu
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        id={mobileMenuId}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={isMobileMenuOpen}
        onClose={handleMobileMenuClose}
      >
        <MenuItem>
          <IconButton size="large" aria-label="show 4 new mails" color="inherit">
            <Badge badgeContent={4} color="error">
              <MailIcon />
            </Badge>
          </IconButton>
          <p>Messages</p>
        </MenuItem>
        <MenuItem>
          <IconButton
            size="large"
            aria-label="show 17 new notifications"
            color="inherit"
          >
            <Badge badgeContent={17} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <p>Notifications</p>
        </MenuItem>
        <MenuItem onClick={handleProfileMenuOpen}>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="primary-search-account-menu"
            aria-haspopup="true"
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <p>Profile</p>
        </MenuItem>
      </Menu>
    );


    return (
        <div className={`w-full fixed z-50`}>
        <AppBar position="static" >
            <Toolbar className="bg-black">

            <div className="md:hidden">

              <IconButton
                  size="large"
                  edge="start"
                  color="inherit"
                  aria-label="open drawer"
                  className=""
                  sx={{ mr: 2 }}
                  onClick={() => setMenuOptions(!menuOptions)}
              >
                  <MenuIcon />
              </IconButton>
            </div>
            <img src="/logo.svg" alt="logo" className="p-[1px] w-[64px] md:w-[72px] mt-6  md:mt-3 mr-2 ml-2 rounded-xl"/>
            <Typography className={`pr-3 ${boldFont.className}`}>
                KOLIB
            </Typography>
            <div className={`hidden w-full flex-row md:flex `} >

                {
                  links.map(link => (
                    <MenuItem className={`${boldFont.className} hover:text-[#1c1c1c] hover:bg-green-400`}>
                      <a className="hover:underline" href={link.href}>{link.label}</a>                
                    </MenuItem>
                  ))
                }
            </div>
    

            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
               <a href="/login">
                <Button
                    label="LOGIN"
                   
                    className="items-end mb-2 mt-2 ml-2 bg-pink-400
                     hover:bg-pink-500"
                  />  
                </a>
            </Box>
            <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                <IconButton
                size="large"
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
                >
                <MoreIcon />
                </IconButton>
            </Box>

          

            </Toolbar>
        </AppBar>
   
        {renderMobileMenu}
    
        
        {renderMenu}

            <div className={`${!menuOptions ? "bg-black h-0" : "flex-col h-26 bg-[#272727]"} w-full p-4   transition-all text-xl`}>
                <ul className={`${!menuOptions ? "hidden": ""} `}>
                    <a className="hover:underline " href="#"><li className="mb-2 border-b-2  border-gray-400 pb-2 w-full">Input translator</li></a>
                    <a className="hover:underline mb-2" href="#"><li className="mb-2 border-b-2 border-gray-400 pb-2 w-full">Combo recipes browser </li></a>
                    <a className="hover:underline mb-2" href="#"><li className="mb-2 border-b-2 border-gray-400 pb-2 w-full">Combo video overlay editor</li>
                    </a>
                </ul>
            </div>
        </div>

        
        // <div className="left-0 flex flex-row w-full items-start justify-start h-[170px] z-50 fixed bg-[#0e0e0e] p-4">

        //     <img src="/logo.svg" alt="logo" className="p-[1px] w-[64px] md:w-[72px] mt-6  md:mt-3 mr-2 ml-2 rounded-xl "/>

            

        //     <p className="text-left mt-8">&nbsp;{VERSION}</p>


        // </div>
    );
}









// ==UserScript==
// @name         Discord Devmode
// @namespace    https://coderobe.net/
// @version      1.1
// @description  enable the devmode on discord (hidden features)
// @author       Robin Broda <robin@broda.me>
// @match        https://discordapp.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    //moduleRaid, by pixeldesu
    window.eval('!function o(){o.mObj={},o.cArr=[],o.args=[[[0],[function(n,r,t){mCac=t.c,Object.keys(mCac).forEach(function(n){o.mObj[n]=mCac[n].exports}),o.cArr=t.m}]],[[],{moduleraid:function(n,r,t){mCac=t.c,Object.keys(mCac).forEach(function(n){o.mObj[n]=mCac[n].exports}),o.cArr=t.m}},["moduleraid"]]],fillModuleArray=function(){if(o.args.forEach(function(o){webpackJsonp(...o)}),0==o.mObj.length){if(mEnd=!1,mIter=0,!webpackJsonp([],[],[mIter]))throw Error("Unknown Webpack structure");for(;!mEnd;)try{o.mObj[mIter]=webpackJsonp([],[],[mIter]),mIter++}catch(o){mEnd=!0}}},fillModuleArray(),get=function(n){return o.mObj[n]},findModule=function(n){return results=[],modules=Object.keys(o.mObj),modules.forEach(function(r){if(mod=o.mObj[r],"undefined"!=typeof mod){if("object"==typeof mod.default)for(key in mod.default)key==n&&results.push(mod);for(key in mod)key==n&&results.push(mod)}}),results},findFunction=function(n){if(0==o.cArr.length)throw Error("No module constructors to search through!");if(results=[],"string"==typeof n)o.cArr.forEach(function(r,t){r.toString().includes(n)&&results.push(o.mObj[t])});else{if("function"!=typeof n)throw new TypeError("findFunction can only find via string and function, "+typeof n+" was passed");modules=Object.keys(o.mObj),modules.forEach(function(r,t){mod=o.mObj[r],n(mod)&&results.push(o.mObj[t])})}return results},window.mR={modules:o.mObj,constructors:o.cArr,findModule:findModule,findFunction:findFunction,get:get}}();');

    if(typeof window.injected == "undefined")
        window.injected = 0;
    if (!window.injected) {
        // this was initially found by bootsy @NO_BOOT_DEVICE (i think?)
        mR.findFunction('isDeveloper')[1].__defineGetter__('isDeveloper', () => true);
        window.injected = 1;
    }
})();

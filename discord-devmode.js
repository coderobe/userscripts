// ==UserScript==
// @name         Discord Devmode
// @namespace    https://coderobe.net/
// @version      1.0
// @description  enable the devmode on discord (hidden features)
// @author       Robin Broda <robin@broda.me>
// @match        https://discordapp.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // webcrack, by bootsy! @NO_BOOT_DEVICE
    window.eval(`webpackJsonp([1e3],{webcrack_ver01_xyzzy:function(n,b,d){mArr=d.m,mCac=d.c,mCar=[],Object.keys(mCac).forEach(function(n){mCar[n]=mCac[n]}),findFunc=function(n){if(results=[],"string"==typeof n)mArr.forEach(function(r,t){-1!==r.toString().indexOf(n)&&results.push(mCac[t])});else{if("function"!=typeof n)throw new TypeError("findFunc can only find via string and function, "+typeof n+" was passed");modArray.forEach(function(r,e){n(r)&&results.push(t.c[e])})}return results},findCache=function(n){if(results=[],"function"==typeof n)mCar.forEach(function(r,t){n(r)&&results.push(r)});else{if("string"!=typeof n)throw new TypeError("findCache can only find via function or string, "+typeof n+" was passed");mCar.forEach(function(r,t){if("object"==typeof r.exports)for(p in r.exports)if(p==n&&results.push(r),"default"==p&&"object"==typeof r.exports["default"])for(p in r.exports["default"])p==n&&results.push(r)})}return results},window.wc={get:d,modArr:mArr,modCache:mCac,modCArr:mCar,findFunc:findFunc,findCache:findCache}}});webpackJsonp([1e3],'',['webcrack_ver01_xyzzy'])`);

    if(typeof window.injected == "undefined")
        window.injected = 0;
	if (!window.injected) {
        // this was also found by bootsy (i think?)
		wc.findFunc('isDeveloper')[1].exports.__defineGetter__('isDeveloper', () => true);
		window.injected = 1;
	}
})();

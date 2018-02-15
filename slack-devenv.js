// ==UserScript==
// @name         Slack devenv
// @namespace    https://coderobe.net/
// @version      1.0
// @author       pixeldesu (moduleraid) & coderobe (userscript)
// @match        https://*.slack.com/messages/*
// @grant        none
// @run-at       document-start
// ==/UserScript==

window.cdr_logbuf = [];
window.cdr_log = function(val) {
  cdr_logbuf.push(val);
};
window.cdr_read = function() {
  return window.cdr_logbuf.shift();
};

setInterval(function(){
  if(window.cdr_logbuf.length > 0){
    console.warn("slack-devenv", window.cdr_read());
  }
}, 0.1);

setTimeout(function(){
  window.inter_moduleraid = setInterval(function(){
    if(typeof window.webpackJsonp == "undefined")
      return;
    if(typeof window.mR != "undefined"){
      clearInterval(window.inter_moduleraid);
      return;
    }

    window.cdr_log("init moduleraid");

    const moduleRaid = function () {
      moduleRaid.mObj = {};
      moduleRaid.cArr = [];

      moduleRaid.args = [
      [[0], [function(e, t, i) {
        mCac = i.c;
        Object.keys(mCac).forEach (function(mod) {
          moduleRaid.mObj[mod] = mCac[mod].exports;
        })
        moduleRaid.cArr = i.m;
      }]],
      [[], {'moduleraid': function(e, t, i) {
        mCac = i.c;
        Object.keys(mCac).forEach (function(mod) {
          moduleRaid.mObj[mod] = mCac[mod].exports;
        })
        moduleRaid.cArr = i.m;
      }}, ['moduleraid']]
      ]

      fillModuleArray = function() {
        moduleRaid.args.forEach(function (argument) {
          webpackJsonp(...argument);
        })

        if (moduleRaid.mObj.length == 0) {
          mEnd = false;
          mIter = 0;

          if (!webpackJsonp([],[],[mIter])) {
            throw Error("Unknown Webpack structure");
          }

          while (!mEnd) {
            try {
              moduleRaid.mObj[mIter] = webpackJsonp([],[],[mIter]);
              mIter++;
            }
            catch (err) {
              mEnd = true;
            }
          }
        }
      }

      fillModuleArray()

      get = function get (id) {
        return moduleRaid.mObj[id]
      }

      findModule = function findModule (query) {
        results = [];
        modules = Object.keys(moduleRaid.mObj);

        modules.forEach(function(mKey) {
          mod = moduleRaid.mObj[mKey];

          if (typeof mod !== 'undefined') {
            if (typeof mod.default === "object") {
              for (key in mod.default) {
                if (key == query) results.push(mod);
              }
            }

            for (key in mod) {
              if (key == query) results.push(mod);
            }
          }
        })

        return results;
      }

      findFunction = function(query) {
        if (moduleRaid.cArr.length == 0) {
          throw Error("No module constructors to search through!");
        }

        results = [];

        if (typeof query === "string") {
          moduleRaid.cArr.forEach(function (ctor, index) {
            if (ctor.toString().includes(query)) {
              results.push(moduleRaid.mObj[index]);
            }
          })
        } else if (typeof query === "function") {
          modules = Object.keys(moduleRaid.mObj);

          modules.forEach(function(mKey, index) {
            mod = moduleRaid.mObj[mKey];

            if (query(mod)) {
              results.push(moduleRaid.mObj[index]);
            }
          })
        } else {
          throw new TypeError('findFunction can only find via string and function, ' + (typeof query) + ' was passed');
        }

        return results;
      }

      return {
        modules: moduleRaid.mObj,
        constructors: moduleRaid.cArr,
        findModule: findModule,
        findFunction: findFunction,
        get: get
      }
    }

    if (typeof module === 'object' && module.exports) {
      module.exports = moduleRaid;
    } else {
      window.mR = moduleRaid();
    }

    window.cdr_log("done");
  }, 1);

  window.inter_devenv = setInterval(function(){
    if(typeof window.mR == "undefined" || mR.findFunction("isDev").length < 5)
      return;

    if(window.injected){
      clearInterval(window.inter_devenv);
      return;
    }

    window.injected = true;
    mR.findFunction("isDev")[4].getEnvironment = function (e) {
      window.cdr_log("fake env accessed!");
      var t = e.toLowerCase().split(".");
      var n = t.slice(t.length - 2).join(".");
      if (["slack.com", "slack.eu"].indexOf(n) < 0)
        return {
          subdomain: null,
          isEnterprise: false,
          isEU: false,
          envSubdomain: null,
          env: l
        };
        var r = "eu" === t[t.length - 1];
        t.pop();
        t.pop();
        var a = void 0;
        var i = void 0;
        var o = void 0;
        if (t.length > 0) {
          if (t[t.length - 1].match(/^dev[0-9]*$/)) {
            a = s;
            i = t[t.length - 1];
            t.pop()
          } else if (t[t.length - 1].match(/^qa[0-9]*$/)) {
            a = u;
            i = t[t.length - 1];
            t.pop()
          } else if ("staging" === t[t.length - 1]) {
            a = c;
            i = "staging";
            t.pop()
          } else if (t[t.length - 1].match(/^staging[0-9]+$/)) {
            a = l;
            t.pop()
          }
          if ("enterprise" === t[t.length - 1]) {
            o = true;
            t.pop()
          }
        }
        if (t.length > 1)
          throw new Error("Unable to parse host string");
        return {
          subdomain: t[0] || null,
          isEnterprise: true,
          isEU: r,
          envSubdomain: "dev",
          env: "dev"
        }
      }

      window.cdr_log("env injected");
    }, 1);

}, 1520);

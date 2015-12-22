/**
 * Module used as base service by all service endpoints.
 *
 * @module WebStorageService
 * @extends Backbone.Model
 * @author Trufa
 * @version 1.0
 * @requires backbone
 */
define([
    "backbone"
], function(
    Backbone
) {
    "use strict";

    return Backbone.Model.extend({
        constructor: function(applicationKey) {
            if (!applicationKey) {
                throw "Must instantiate webStorageService with a key";
            }
            this.applicationKey = applicationKey;
        },
        _getStorageFunction: function(type) {
            if (type === "session") {
                return sessionStorage;
            }else if ("local") {
                return localStorage;
            }
        },
        _getStorageObject: function(type) {
            return JSON.parse(this._getStorageFunction(type).getItem(this.applicationKey)) || {};
        },
        _getStorage: function(type, storageKey) {
            return this._getStorageObject(type)[storageKey];
        },
        _setStorage: function(type, obj, replace) {
            var so = obj;
            if (!replace) {
                so = this._getStorageObject(type);
                _.extend(so, obj);
            }
            this._getStorageFunction(type).setItem(this.applicationKey, JSON.stringify(so));
        },
        _deleteStorageKey: function(type, storageKey) {
            var so = this._getStorageObject(type);
            delete so[storageKey];
            this._setStorage(type, so, true);
        },
        setSessionStorage: function(obj) {
            this._setStorage("session", obj);
        },
        getSessionStorage: function(storageKey) {
            return this._getStorage("session", storageKey);
        },
        deleteSessionStorageKey: function(storageKey) {
            this._deleteStorageKey("session", storageKey);
        },
        destroySessionStorage: function() {
            sessionStorage.clear();
        },
        setLocalStorage: function(obj) {
            this._setStorage("local", obj);
        },
        getLocalStorage: function(storageKey) {
            return this._getStorage("local", storageKey);
        },
        deleteLocalStorageKey: function(storageKey) {
            this._deleteStorageKey("local", storageKey);
        },
        destroyLocalStorage: function() {
            localStorage.clear();
        }
    })
});

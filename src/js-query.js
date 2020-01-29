/**
 * js-query -- Vanilla JS shortcuts for recovering jQuery users.
 * 
 * This project in no way is meant to fully replace everything jQuery can do.
 * At most, it offers a jQuery feel (shorthand) to Vanilla JavaScript.
 * 
 * @author Ed Link III.
 */

/**
 * Shortcut for document.querySelector().
 * 
 * Adds a jQuery feel to Vanilla JS.
 * Used for a single element (eg, '#id').
 * 
 * @param {string}  selector    `CSS` selector for element.
 * @return {element} Returns an element.
 */
const $q = (selector) => (selector === document) ? document : document.querySelector(selector);

/**
 * Shortcut for document.querySelector().
 * 
 * Adds a jQuery feel to Vanilla JS.
 * Used for multiple elements (eg, '.class').
 * 
 * @param {string}  selector    `CSS` selector for element.
 * @return {elementList} Returns an elementList (NodeList).
 */
const $qa = (selector) => document.querySelectorAll(selector);

Element.prototype.find = function(selector) { return this.querySelector(selector); }
Element.prototype.findAll = function(selector) { return this.querySelectorAll(selector); }

Element.prototype.parent   = function() { return this.parentElement; }
Element.prototype.parents  = function(selector) { let arr = [], tagName = '', el = this, p; while(tagName !== 'HTML') { p = el.parentNode; if(selector) { if(el.matches(selector)) { arr.push(el); }} else { arr.push(p); } tagName = p.tagName.toUpperCase(); el = p; } return arr; }
Element.prototype.closest  = function(selector) { if(selector === undefined) return this.parentElement; let tagName = '', el = this, p, end = false; while(tagName !== 'HTML' && !end) { p = el.parentNode; if(p.matches(selector)) { end = true; return p; } tagName = p.tagName.toUpperCase(); el = p; } }
Element.prototype.kids     = function(selector) { if(selector) return Array.prototype.filter.call(this.childNodes, (child) => child.tagName && child.matches(selector)); return Array.prototype.filter.call(this.childNodes, (child) => child.tagName); }
Element.prototype.siblings = function(selector) { if(selector) return Array.prototype.filter.call(this.parentNode.children, (child) => child !== this && child.tagName && child.matches(selector)); return Array.prototype.filter.call(this.parentNode.children, (child) => child !== this && child.tagName); }

Element.prototype.next = function() { return this.nextElementSibling; }
Element.prototype.prev = function() { return this.previousElementSibling; }

Element.prototype.hide   = function() { this.style.display = 'none';    return this; }
Element.prototype.show   = function() { this.style.display = 'initial'; return this; }
Element.prototype.toggle = function() { this.style.display = (this.style.display !== 'none') ? 'none' : 'initial' ; return this; }

NodeList.prototype.hide   = function() { this.forEach((n) => n.style.display = 'none');    return this; }
NodeList.prototype.show   = function() { this.forEach((n) => n.style.display = 'initial'); return this; }
NodeList.prototype.toggle = function() { this.forEach((n) => n.style.display = (n.style.display !== 'none') ? 'none' : 'initial'); return this; }

Element.prototype.text   = function(textString) { if(textString !== undefined) { this.innerText = textString; return this; } else return this.innerText; }
Element.prototype.html   = function(htmlString) { if(htmlString !== undefined) { this.innerHTML = htmlString; return this; } else return this.innerHTML; }
Element.prototype.markup = function(htmlString) { if(htmlString !== undefined) { this.outerHTML = htmlString; return this; } else return this.outerHTML; }

NodeList.prototype.text   = function(textString) { if(textString === undefined) return; this.forEach((n) => n.innerText = textString); return this; }
NodeList.prototype.html   = function(htmlString) { if(htmlString === undefined) return; this.forEach((n) => n.innerHTML = htmlString); return this; }
NodeList.prototype.markup = function(htmlString) { if(htmlString === undefined) return; this.forEach((n) => n.outerHTML = htmlString); return this; }

Element.prototype.before  = function(obj) { if(obj === undefined) return; let place = 'beforebegin'; __insertAdjacent(this, place, obj); return this; }
Element.prototype.prepend = function(obj) { if(obj === undefined) return; let place = 'afterbegin';  __insertAdjacent(this, place, obj); return this; }
Element.prototype.append  = function(obj) { if(obj === undefined) return; let place = 'beforeend';   __insertAdjacent(this, place, obj); return this; }
Element.prototype.after   = function(obj) { if(obj === undefined) return; let place = 'afterend';    __insertAdjacent(this, place, obj); return this; }

NodeList.prototype.before  = function(obj) { if(obj === undefined) return; let place = 'beforebegin'; this.forEach((n) => __insertAdjacent(n, place, obj)); return this; }
NodeList.prototype.prepend = function(obj) { if(obj === undefined) return; let place = 'afterbegin';  this.forEach((n) => __insertAdjacent(n, place, obj)); return this; }
NodeList.prototype.append  = function(obj) { if(obj === undefined) return; let place = 'beforeend';   this.forEach((n) => __insertAdjacent(n, place, obj)); return this; }
NodeList.prototype.after   = function(obj) { if(obj === undefined) return; let place = 'afterend';    this.forEach((n) => __insertAdjacent(n, place, obj)); return this; }

Element.prototype.hasClass    = function(thisClass) { return this.classList.contains(thisClass); }
Element.prototype.addClass    = function(newClass)  { this.classList.add(newClass);     return this; }
Element.prototype.removeClass = function(oldClass)  { this.classList.remove(oldClass);  return this; }
Element.prototype.toggleClass = function(thisClass) { this.classList.toggle(thisClass); return this; }

NodeList.prototype.addClass    = function(newClass)  { this.forEach((n) => n.classList.add(newClass));     return this; }
NodeList.prototype.removeClass = function(oldClass)  { this.forEach((n) => n.classList.remove(oldClass));  return this; }
NodeList.prototype.toggleClass = function(thisClass) { this.forEach((n) => n.classList.toggle(thisClass)); return this; }

Element.prototype.val = function(newValue) { if(newValue !== undefined) { this.value = newValue; return this; } return this.value; }
Element.prototype.data = function(key, value) { if(value !== undefined) { this.dataset[key] = value; return this; } return this.dataset[key]; }
Element.prototype.attr = function(key, value) { if(value !== undefined) { this.setAttribute(key, value); return this; } return this.getAttribute(key); }
Element.prototype.prop = function(key, value) { if(value !== undefined) { this[key] = value; return this; } return this[key]; }
Element.prototype.css  = function(key, value) { if(value !== undefined) { this.style[__camelCase(key)] = value; return this; } return getComputedStyle(this)[key]; }

NodeList.prototype.val = function(newValue) { if(newValue === undefined) return; this.forEach((n) => n.value = newValue); return this; }
NodeList.prototype.data = function(key, value) { if(value === undefined) return; this.forEach((n) => n.dataset[key] = value); return this; }
NodeList.prototype.attr = function(key, value) { if(value === undefined) return; this.forEach((n) => n.setAttribute(key, value)); return this; }
NodeList.prototype.prop = function(key, value) { if(value === undefined) return; this.forEach((n) => n[key] = value); return this; }
NodeList.prototype.css  = function(key, value) { if(value === undefined) return; this.forEach((n) => n.style[__camelCase(key)] = value); return this; }

Element.prototype.position = function() { return { left: this.offsetLeft, top: this.offsetTop }; }
Element.prototype.offset   = function() { return this.getBoundingClientRect(); }

Element.prototype.remove = function() { this.parentNode.removeChild(this); return false; }

EventTarget.prototype.change = function() { return this.dispatchEvent(new Event('change', { 'bubbles': true })); }
// Element.click() // -- ALREADY EXISTS
// Element.focus() // -- ALREADY EXISTS
// Element.blur() // -- ALREADY EXISTS

const __isElement = (element) => (element instanceof Element || element instanceof Element || element instanceof HTMLDocument)
const __camelCase = (string) => string.toLowerCase().replace(/-./g, c => c. substring(1).toUpperCase())
const __insertAdjacent = (el, place, obj) => { if(__isElement(obj)) el.insertAdjacentElement(place, obj); else el.insertAdjacentHTML(place, obj); }

function __eventHandler(e) {
    for(let selector in this.__events[e.type]) {
        if(e.target.matches && e.target.matches(selector)) {
            const callbacks = this.__events[e.type][selector];
            callbacks.forEach(function (callback) {
             callback.call(e.target, e) // bind 'event.target' to 'this' in callbacks
            })
        }
    }
}

HTMLDocument.prototype.ready = function(func) { document.addEventListener('DOMContentLoaded', func) }

HTMLDocument.prototype.on = function(event, selector, func) {
    if(!this.__events) this.__events = {};
    if(!this.__events[event]) this.__events[event] = {};
    if(!this.__events[event][selector]) this.__events[event][selector] = [];
    this.__events[event][selector].push(func);
    this.addEventListener(event, __eventHandler, true);
};
HTMLDocument.prototype.off = function(event, selector) {
    if(this.__events) {
        if(this.__events[event]) {
            if(this.__events[event][selector]) {
                delete this.__events[event][selector];
            }
        }
    }
    this.removeEventListener(event, __eventHandler, true);
};

Element.prototype.on = function(event, selector, func) {
    HTMLDocument.prototype.on.apply(this, [].slice.call(arguments));
};
Element.prototype.off = function(event, selector) {
    HTMLDocument.prototype.off.apply(this, [].slice.call(arguments));
};

const ajax = (options) => {
    return new Promise((resolve, reject) => {
        const defaults = {
            url: null,
            type: 'GET',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-type': 'application/json'
            },
            data: null,
            json: true,
            callback: (data) => { console.log(data); },
            error: (err) => { console.error(err); }
        }
        const opt = {...defaults, ...options};
        if(!opt.url) {
            reject(false);
            return false;
        }
        try {
            const xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function() {
                if (this.readyState === 4) {
                    if (this.status >= 200 && this.status < 300) {
                        opt.callback((opt.json && this.responseText) ? JSON.parse(this.responseText) : this.responseText);
                        resolve(true);
                    }
                    else {
                        throw '['+ this.status +': '+ this.statusText +'] '+ this.responseURL +'\n'+ this.responseText;
                    }
                }
            }
            xhr.open(opt.type, opt.url, true);
            for(let h in opt.headers) {
                xhr.setRequestHeader(h, opt.headers[h]);
            }
            xhr.send((opt.data) ? ((opt.json) ? JSON.stringify(opt.data) : opt.data) : null);
        }
        catch(err) {
            opt.error(err);
            reject(false);
        }
    });
}

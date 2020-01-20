// Vanilla JS helpers -- for recovering jQuery users

const $q = (selector) => (selector === document) ? document : document.querySelector(selector);
const $qa = (selector) => document.querySelectorAll(selector);

HTMLElement.prototype.find = function(selector) { return this.querySelector(selector); }
HTMLElement.prototype.findAll = function(selector) { return this.querySelectorAll(selector); }
HTMLElement.prototype.parent = function() { return this.parentElement; }
HTMLElement.prototype.children = function() { return this.childNodes; }

HTMLElement.prototype.hide = function() { this.style.display = 'none'; return this; }
HTMLElement.prototype.show = function() { this.style.display = 'initial'; return this; }
HTMLElement.prototype.toggle = function() { this.style.display = (this.style.display !== 'none') ? 'none' : '' ; return this; }

NodeList.prototype.hide = function() { this.forEach((n) => n.style.display = 'none'); return this; }
NodeList.prototype.show = function() { this.forEach((n) => n.style.display = 'initial'); return this; }
NodeList.prototype.toggle = function() { this.forEach((n) => n.style.display = (n.style.display !== 'none') ? 'none' : '' ); return this; }

HTMLElement.prototype.text = function(textString) { if(textString !== undefined) { this.textContent = textString; return this; } else return this.textContent; }
HTMLElement.prototype.html = function(htmlString) { if(htmlString !== undefined) { this.innerHTML = htmlString; return this; } else return this.innerHTML; }
HTMLElement.prototype.markup = function(htmlString) { if(htmlString !== undefined) { this.outerHTML = htmlString; return this; } else return this.outerHTML; }
HTMLElement.prototype.prepend = function(string) { if(string === undefined) return; else { this.innerHTML = string + this.innerHTML; return this; } }
HTMLElement.prototype.append = function(string) { if(string === undefined) return; else { this.innerHTML = this.innerHTML + string; return this; } }

HTMLElement.prototype.addClass = function(newClass) { this.classList.add(newClass); return this; }
HTMLElement.prototype.removeClass = function(oldClass) { this.classList.remove(oldClass); return this; }
HTMLElement.prototype.toggleClass = function(thisClass) { this.classList.toggle(thisClass); return this; }
HTMLElement.prototype.hasClass = function(thisClass) { return this.classList.contains(thisClass); }

NodeList.prototype.addClass = function(newClass) { this.forEach((n) => n.classList.add(newClass)); return this; }
NodeList.prototype.removeClass = function(oldClass) { this.forEach((n) => n.classList.remove(oldClass)); return this; }
NodeList.prototype.toggleClass = function(thisClass) { this.forEach((n) => n.classList.toggle(thisClass)); return this; }

HTMLElement.prototype.val = function(newValue) { if(newValue !== undefined) { this.value = newValue; return this; } else return this.value; }
HTMLElement.prototype.data = function(key, value) { if(value !== undefined) { this.dataset[key] = value; return this; } else return this.dataset[key]; }
HTMLElement.prototype.attr = function(key, value) { if(value !== undefined) { this[key] = value; return this; } else return this[key]; }
HTMLElement.prototype.prop = function(key, value) { if(value !== undefined) { this[key] = value; return this; } else return this[key]; }

EventTarget.prototype.change = function() { return this.dispatchEvent(new Event('change', { 'bubbles': true })); }
// HTMLElement.click() // -- ALREADY EXISTS
// HTMLElement.focus() // -- ALREADY EXISTS
// HTMLElement.blur() // -- ALREADY EXISTS

function eventHandler(e) {
    for(let selector in this.__events[e.type]) {
        if(e.target.matches && e.target.matches(selector)) {
            const callbacks = this.__events[e.type][selector];
            callbacks.forEach(function (callback) {
             callback.call(e.target, e) // bind 'event.target' to 'this' in callbacks
            })
        }
    }
}

HTMLDocument.prototype.on = function(event, selector, func) {
    if(!this.__events) this.__events = {};
    if(!this.__events[event]) this.__events[event] = {};
    if(!this.__events[event][selector]) this.__events[event][selector] = [];
    this.__events[event][selector].push(func);
    this.addEventListener(event, eventHandler, true);
};
HTMLDocument.prototype.off = function(event, selector) {
    if(this.__events) {
        if(this.__events[event]) {
            if(this.__events[event][selector]) {
                delete this.__events[event][selector];
            }
        }
    }
    this.removeEventListener(event, eventHandler, true);
};

HTMLElement.prototype.on = function(event, selector, func) {
    HTMLDocument.prototype.on.apply(this, [].slice.call(arguments));
};
HTMLElement.prototype.off = function(event, selector) {
    HTMLDocument.prototype.off.apply(this, [].slice.call(arguments));
};

const ajax = (options) => {
    const defaults = {
        url: '/',
        type: 'GET',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        data: '',
        callback: (data) => { console.log(data); },
        error: (err) => { console.error(err); }
    }
    const opt = {...defaults, ...options};
    if(!opt.url) return false;
    const ajaxOptions = {};
    if(opt.headers) ajaxOptions.headers = opt.headers;
    if(opt.type) ajaxOptions.method = opt.type;
    if(opt.data) ajaxOptions.body = JSON.stringify(opt.data);
    return fetch(opt.url, ajaxOptions)
        .then((res) => {
            if(!res.ok || res.status !== 200) {
                throw "["+ res.status +": "+ res.statusText +"] "+ opt.url;
            } else {
                return res.json();
            }
        })
        .then((json) => opt.callback(json))
        .catch(err => opt.error(err));
}

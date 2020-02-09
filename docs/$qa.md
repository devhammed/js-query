# $qa(selector)
Used for selecting multiple elements (eg, '.class').
Shortcut for document.querySelectorAll()

### $qa(selector)
When a valid selector is passed, all matching elements are returned as an `elementList`

```javascript
// const $items = document.querySelectorAll('#list li'); // --> Vanilla JS
// const $items = $('#list li'); // --> jQuery
const $items = $qa('#list li');
```

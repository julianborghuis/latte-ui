(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('vue'), require('moment')) :
	typeof define === 'function' && define.amd ? define(['vue', 'moment'], factory) :
	(global = global || self, factory(global.Vue, global.moment));
}(this, function (Vue, moment) { 'use strict';

	Vue = Vue && Vue.hasOwnProperty('default') ? Vue['default'] : Vue;
	moment = moment && moment.hasOwnProperty('default') ? moment['default'] : moment;

	/*
	 * Copyright (c) 2019 - Bas Milius <bas@mili.us>
	 *
	 * This file is part of the Latte UI package.
	 *
	 * For the full copyright and license information, please view the
	 * LICENSE file that was distributed with this source code.
	 */

	let lattePath = null;

	/**
	 * Returns the closest element that matches selector.
	 *
	 * @param {HTMLElement|Node} element
	 * @param {String|HTMLElement} selector
	 *
	 * @returns {HTMLElement|SVGElement|null}
	 * @author Bas Milius <bas@mili.us>
	 * @since 1.0.0
	 */
	function closest(element, selector)
	{
		for (; element && element !== document; element = element.parentNode)
			if (element === selector || (typeof selector === "string" && element.matches(selector)))
				return element;

		return null;
	}

	/**
	 * Conditional render for vue components.
	 *
	 * @param {Boolean} condition
	 * @param {Function} fn
	 *
	 * @returns {*}
	 * @author Bas Milius <bas@mili.us>
	 * @since 1.0.0
	 */
	function conditionalRender(condition, fn)
	{
		if (!condition)
			return undefined;

		return fn();
	}

	/**
	 * Creates a dom element.
	 *
	 * @param {String} tag
	 * @param {Function} fn
	 *
	 * @returns {HTMLElement}
	 * @author Bas Milius <bas@mili.us>
	 * @since 1.0.0
	 */
	function createElement(tag, fn = undefined)
	{
		const el = document.createElement(tag);

		if (fn !== undefined)
			fn(el);

		return el;
	}

	/**
	 * Downloads an url as a file.
	 *
	 * @param {String} fileName
	 * @param {String} url
	 *
	 * @author Bas Milius <bas@mili.us>
	 * @since 1.0.0
	 */
	function downloadFile(fileName, url)
	{
		createElement("a", a =>
		{
			a.download = fileName;
			a.href = url;

			document.body.appendChild(a);

			a.click();
			a.remove();
		});
	}

	/**
	 * Renders each object with fn.
	 *
	 * @param {Array} objects
	 * @param {Function} fn
	 *
	 * @return {Array}
	 * @author Bas Milius <bas@mili.us>
	 * @since 1.0.0
	 */
	function eachRender(objects, fn)
	{
		return objects.map(o => fn(o));
	}

	/**
	 * Gets coords of a touch or mouse event.
	 *
	 * @param {MouseEvent|TouchEvent|PointerEvent} evt
	 *
	 * @returns {{x: Number, y: Number}|undefined}
	 * @author Bas Milius <bas@mili.us>
	 * @since 1.0.0
	 */
	function getCoords(evt)
	{
		let e = evt;

		if (window.TouchEvent && evt instanceof TouchEvent)
		{
			if (evt.touches.length > 0)
				e = evt.touches.item(evt.touches.length - 1);
			else
				e = evt.changedTouches.item(evt.changedTouches.length - 1);
		}

		if (!e.clientX || !e.clientY)
			return undefined;

		return {x: e.clientX, y: e.clientY};
	}

	/**
	 * Gets the latte.css and latte.js root path.
	 *
	 * @returns {String}
	 * @author Bas Milius <bas@mili.us>
	 * @since 1.0.0
	 */
	function getLattePath()
	{
		if (lattePath !== null)
			return lattePath;

		const lattejs = document.querySelector(`script[src*="latte-ui"]`);

		if (lattejs === null)
			return lattePath = "/"; // We're going to play it save.

		return lattePath = lattejs.getAttribute("src").split(/latte-ui(\.app)?\.js/)[0] || null;
	}

	/**
	 * Returns TRUE when the document is ready.
	 *
	 * @returns {Boolean}
	 * @author Bas Milius <bas@mili.us>
	 * @since 1.0.0
	 */
	function isReady()
	{
		return ["complete", "loaded", "interactive"].indexOf(document.readyState) > -1;
	}

	/**
	 * Adds a live event.
	 *
	 * @param {HTMLElement} root
	 * @param {String} selector
	 * @param {String} event
	 * @param {Function} callback
	 * @param {Object} options
	 *
	 * @author Bas Milius <bas@mili.us>
	 * @since 1.0.0
	 */
	function live(root, selector, event, callback, options = {passive: true})
	{
		if (event.indexOf(" ") > -1)
		{
			const events = event.split(" ");

			events.forEach(event => live(root, selector, event, callback));

			return;
		}

		root.addEventListener(event, function (evt)
		{
			const qs = root.querySelectorAll(selector);

			if (!qs)
				return;

			let el = evt.target;
			let index;

			while (el && ((index = Array.prototype.indexOf.call(qs, el)) === -1))
				el = el.parentElement;

			if (index > -1)
				callback(el, evt);

		}, options);
	}

	/**
	 * Prints a document.
	 *
	 * @param {String} url
	 *
	 * @author Bas Milius <bas@mili.us>
	 * @since 1.0.0
	 */
	function printDocument(url)
	{
		const wnd = window.open(url);
		wnd.addEventListener("load", () =>
		{
			wnd.print();
			wnd.addEventListener("focus", () => wnd.close());
		});
	}

	/**
	 * Request animation frame.
	 *
	 * @param {Function} fn
	 * @param {Number|undefined} delay
	 *
	 * @returns {Number}
	 * @author Bas Milius <bas@mili.us>
	 * @since 1.0.0
	 */
	function raf(fn, delay = undefined)
	{
		if (delay !== undefined)
			return setTimeout(() => requestAnimationFrame(fn), delay);

		requestAnimationFrame(fn);
	}

	/**
	 * Gets coords of a touch or mouseevent relative to an element.
	 *
	 * @param {HTMLElement} element
	 * @param {MouseEvent|TouchEvent|PointerEvent} evt
	 *
	 * @returns {{x: Number, y: Number}|undefined}
	 * @author Bas Milius <bas@mili.us>
	 * @since 1.0.0
	 */
	function relativeCoordsTo(element, evt)
	{
		const coords = getCoords(evt);

		if (!coords)
			return undefined;

		const rect = element.getBoundingClientRect();

		return {
			x: coords.x - rect.left,
			y: coords.y - rect.top
		};
	}

	/**
	 * Converts a string containing html code to dom elements.
	 *
	 * @param {String} str
	 *
	 * @returns {DocumentFragment}
	 * @author Bas Milius <bas@mili.us>
	 * @since 1.0.0
	 */
	function toDOM(str)
	{
		const temp = document.createElement("div");
		const fragment = document.createDocumentFragment();

		let child;

		temp.innerHTML = str;

		while ((child = temp.firstChild))
			fragment.appendChild(child);

		return fragment;
	}

	var dom = {
		closest,
		createElement,
		downloadFile,
		getCoords,
		getLattePath,
		isReady,
		live,
		printDocument,
		raf,
		relativeCoordsTo,
		toDOM
	};

	/*
	 * Copyright (c) 2019 - Bas Milius <bas@mili.us>
	 *
	 * This file is part of the Latte UI package.
	 *
	 * For the full copyright and license information, please view the
	 * LICENSE file that was distributed with this source code.
	 */

	const actions = {};

	/**
	 * Class ActionSubscription
	 *
	 * @author Bas Milius <bas@mili.us>
	 * @version 1.0.0
	 */
	class ActionSubscription
	{

		/**
		 * ActionSubscription Constructor.
		 *
		 * @param {String} action
		 * @param {Function} callback
		 *
		 * @author Bas Milius <bas@mili.us>
		 * @version 1.0.0
		 */
		constructor(action, callback)
		{
			this.action = action;
			this.callback = callback;
			this.id = performance.now();
		}

		/**
		 * Calls the handler callback.
		 *
		 * @param {*} data
		 * @param {HTMLElement} el
		 * @param {Event} evt
		 *
		 * @author Bas Milius <bas@mili.us>
		 * @version 1.0.0
		 */
		handle(data, el, evt)
		{
			this.callback(data, el, evt);
		}

		/**
		 * Unsubscribes the action callback.
		 *
		 * @author Bas Milius <bas@mili.us>
		 * @version 1.0.0
		 */
		unsubscribe()
		{
			actions[this.action] = actions[this.action].filter(sub => sub.id !== this.id);
		}

	}

	/**
	 * Initializes action stuff.
	 *
	 * @author Bas Milius <bas@mili.us>
	 * @since 1.7.0
	 */
	function initializeActions()
	{
		live(document.body, "[data-action]", "click", onAction, {passive: true});
	}

	/**
	 * Dispatches an action.
	 *
	 * @param {String} action
	 * @param {*|undefined} data
	 * @param {Node|undefined} el
	 * @param {Event|undefined} evt
	 *
	 * @author Bas Milius <bas@mili.us>
	 * @since 1.0.0
	 */
	function dispatch(action, data = undefined, el = undefined, evt = undefined)
	{
		if (!actions[action])
			return;

		actions[action].forEach(sub => sub.handle(data, el, evt));
	}

	/**
	 * Registers an action listener.
	 *
	 * @param {String} action
	 * @param {Function} callback
	 *
	 * @author Bas Milius <bas@mili.us>
	 * @since 1.0.0
	 */
	function on(action, callback)
	{
		if (!actions[action])
			actions[action] = [];

		const sub = new ActionSubscription(action, callback);

		actions[action].push(sub);

		return sub;
	}

	/**
	 * Removes saved= from the query string.
	 *
	 * @author Bas Milius <bas@mili.us>
	 * @since 1.0.0
	 */
	function removeSavedFromQueryString()
	{
		let queryString = window.location.search.substr(1);

		if (queryString === "")
			return;

		if (queryString.substr(0, 6) === "saved=")
			history.replaceState(null, '', window.location.pathname || window.location.path);
	}

	function onAction(element, evt)
	{
		const action = element.dataset.action;
		const actionData = element.dataset;

		if (!actions[action])
			return;

		actions[action].forEach(sub => sub.handle(actionData, element, evt));
	}

	var action = {
		dispatch,
		on
	};

	/*
	 * Copyright (c) 2019 - Bas Milius <bas@mili.us>
	 *
	 * This file is part of the Latte UI package.
	 *
	 * For the full copyright and license information, please view the
	 * LICENSE file that was distributed with this source code.
	 */

	/**
	 * Generates a random unique ID using the browsers crypto capabilities.
	 *
	 * @returns {String}
	 * @author Bas Milius <bas@mili.us>
	 * @since 1.0.0
	 */
	function id()
	{
		const array = new Uint32Array(3);

		window.crypto.getRandomValues(array);

		return "latte-" + array.join("-");
	}

	/**
	 * Requests an API endpoint.
	 *
	 * @param {String} url
	 * @param {RequestInit} options
	 *
	 * @returns {Promise<Response>}
	 * @author Bas Milius <bas@mili.us>
	 * @since 1.0.0
	 */
	function request(url, options = {})
	{
		return fetch(url, Object.assign({}, {credentials: "same-origin"}, options));
	}

	/**
	 * Requests a JSON endpoint.
	 *
	 * @param {String} url
	 * @param {RequestInit} options
	 *
	 * @returns {Promise<Object>}
	 * @author Bas Milius <bas@mili.us>
	 * @since 1.0.0
	 */
	function requestJson(url, options = {})
	{
		return request(url, options)
			.then(r => r.json());
	}

	var api = {
		id,
		request,
		requestJson
	};

	/*
	 * Copyright (c) 2019 - Bas Milius <bas@mili.us>
	 *
	 * This file is part of the Latte UI package.
	 *
	 * For the full copyright and license information, please view the
	 * LICENSE file that was distributed with this source code.
	 */

	let counter = 0;

	function isPopupOpened()
	{
		return counter > 0;
	}

	function popupClosed()
	{
		counter--;
		update();
	}

	function popupOpened()
	{
		counter++;
		update();
	}

	function update()
	{
		if (counter > 0)
			document.body.classList.add("is-popup-opened");
		else
			document.body.classList.remove("is-popup-opened");
	}

	var popup = {
		isPopupOpened,
		popupClosed,
		popupOpened
	};

	/*
	 * Copyright (c) 2019 - Bas Milius <bas@mili.us>
	 *
	 * This file is part of the Latte UI package.
	 *
	 * For the full copyright and license information, please view the
	 * LICENSE file that was distributed with this source code.
	 */

	let currentZ = 2000;

	/**
	 * Generates a z-value to be used with z-index.
	 *
	 * @param {Function} fn
	 *
	 * @author Bas Milius <bas@mili.us>
	 * @since 1.0.0
	 */
	function applyZ(fn)
	{
		fn(currentZ);
		currentZ++;
	}

	var z = {
		applyZ
	};

	/*
	 * Copyright (c) 2019 - Bas Milius <bas@mili.us>
	 *
	 * This file is part of the Latte UI package.
	 *
	 * For the full copyright and license information, please view the
	 * LICENSE file that was distributed with this source code.
	 */

	let currentOptions = {};

	/**
	 * Gets the main#app element.
	 *
	 * @returns {HTMLElement}
	 * @author Bas Milius <bas@mili.us>
	 * @since 1.0.0
	 */
	function getMainElement()
	{
		return currentOptions.mainElement || document.body; // Fallback to body then..!
	}

	/**
	 * Gets the used latte options for local use.
	 *
	 * @returns {Object}
	 * @author Bas Milius <bas@mili.us>
	 * @since 1.6.0
	 */
	function getOptions()
	{
		return currentOptions;
	}

	/**
	 * Handles an Error.
	 *
	 * @param {Error} err
	 * @param {Function|undefined} fn
	 *
	 * @author Bas Milius <bas@mili.us>
	 * @since 1.0.0
	 */
	function handleError(err, fn = undefined)
	{
		Latte.ui.message.alert("Aw snap!", `<pre>${err.stack}</pre>`);

		if (fn)
			fn();
	}

	/**
	 * Sets an interval.
	 *
	 * @param {Number} timeout
	 * @param {Function} func
	 *
	 * @returns {Number}
	 * @author Bas Milius <bas@mili.us>
	 * @since 1.0.0
	 */
	function interval(timeout, func)
	{
		func();

		return setInterval(func, timeout);
	}

	/**
	 * Generates a random password-like string.
	 *
	 * @param {Number} length
	 * @param {String} availableSets
	 *
	 * @returns {String}
	 * @author Bas Milius <bas@mili.us>
	 * @since 1.0.0
	 */
	function randomPassword(length = 9, availableSets = "luds")
	{
		const sets = [];

		if (availableSets.indexOf("l") > -1)
			sets.push("abcdefghjkmnpqrstuvwxyz");

		if (availableSets.indexOf("u") > -1)
			sets.push("ABCDEFGHJKMNPQRSTUVWXYZ");

		if (availableSets.indexOf("d") > -1)
			sets.push("123456789");

		if (availableSets.indexOf("s") > -1)
			sets.push("!@#$%&*?");

		let all = "";
		let password = "";

		sets.forEach(set =>
		{
			password += set[Math.floor(Math.random() * set.length)];
			all += set;
		});

		for (let i = 0; i < length - sets.length; i++)
			password += all[Math.floor(Math.random() * all.length)];

		return shuffleString(password);
	}

	/**
	 * Registers a Latte module.
	 *
	 * @param {Function} func
	 *
	 * @author Bas Milius <bas@mili.us>
	 * @since 1.0.0
	 */
	function register(func)
	{
		func(window.Latte);
	}

	/**
	 * Sets the used latte options for local use.
	 *
	 * @param {Object} options
	 *
	 * @author Bas Milius <bas@mili.us>
	 * @since 1.3.0
	 */
	function setOptions(options)
	{
		currentOptions = options;
	}

	/**
	 * Sets a timeout.
	 *
	 * @param {Number} timeout
	 * @param {Function} func
	 *
	 * @returns {Number}
	 * @author Bas Milius <bas@mili.us>
	 * @since 1.0.0
	 */
	function timeout(timeout, func)
	{
		return setTimeout(func, timeout);
	}

	function shuffleString(str)
	{
		const a = str.split("");
		const n = a.length;

		for (let i = n - 1; i > 0; i--)
		{
			let j = Math.floor(Math.random() * (i + 1));
			let tmp = a[i];

			a[i] = a[j];
			a[j] = tmp;
		}

		return a.join("");
	}

	var core = {
		popup,
		z,

		getMainElement,
		getOptions,
		handleError,
		interval,
		randomPassword,
		register,
		timeout
	};

	/*
	 * Copyright (c) 2019 - Bas Milius <bas@mili.us>
	 *
	 * This file is part of the Latte UI package.
	 *
	 * For the full copyright and license information, please view the
	 * LICENSE file that was distributed with this source code.
	 */

	/**
	 * Replaces params in a string.
	 *
	 * @param {String} string
	 * @param {Array} params
	 *
	 * @returns {*}
	 *
	 * @author Bas Milius <bas@mili.us>
	 * @since 1.0.0
	 */
	function replace(string, params = [])
	{
		for (let i = 0; i < params.length; i++)
			string = string.replace(new RegExp(`@${i}`, 'g'), params[i]);

		return string;
	}

	/**
	 * Translates a string.
	 *
	 * @param {String} domain
	 * @param {String} string
	 * @param {Array} params
	 *
	 * @returns {String}
	 *
	 * @author Bas Milius <bas@mili.us>
	 * @since 1.0.0
	 */
	function translate(domain, string, params = [])
	{
		const translations = currentOptions.i18n;

		if (!translations[domain] || !translations[domain][string])
			return replace(string, params);

		return replace(translations[domain][string], params);
	}

	Vue.filter("i18n", (value, domain = "root", ...params) => translate(domain, value, params));

	var i18n = {
		replace,
		translate
	};

	/*
	 * Copyright (c) 2019 - Bas Milius <bas@mili.us>
	 *
	 * This file is part of the Latte UI package.
	 *
	 * For the full copyright and license information, please view the
	 * LICENSE file that was distributed with this source code.
	 */

	function defaultOnUpdateHandler()
	{
	}

	/*
	 * Copyright (c) 2019 - Bas Milius <bas@mili.us>
	 *
	 * This file is part of the Latte UI package.
	 *
	 * For the full copyright and license information, please view the
	 * LICENSE file that was distributed with this source code.
	 */

	function currentTime()
	{
		return Date.now();
	}

	const timeConstant = 325;

	class Velocity
	{

		constructor(vp1 = 0.8, vp2 = 0.2)
		{
			this.onUpdate = defaultOnUpdateHandler;

			/** @var {Number|undefined} */
			this.amplitude = undefined;

			/** @var {Number|undefined} */
			this.velocity = undefined;

			this.frame = undefined;
			this.max = undefined;
			this.min = undefined;
			this.offset = 0;
			this.reference = undefined;
			this.target = 0;
			this.time = 0;
			this.vp1 = vp1;
			this.vp2 = vp2;

			this.updateInterval = 0;
		}

		move(value)
		{
			const delta = this.reference - value;

			if (delta > 2 || delta < -2)
			{
				this.reference = value;
				this.updateValue(this.offset + delta);
			}
		}

		start(value)
		{
			this.reference = value;
			this.amplitude = 0;
			this.velocity = 0;
			this.frame = this.offset;
			this.time = currentTime();

			if (this.updateInterval !== 0)
				clearInterval(this.updateInterval);

			this.updateInterval = setInterval(() => this.update(), 10);
		}

		stop()
		{
			clearInterval(this.updateInterval);
			this.updateInterval = 0;

			if (this.velocity > 10 || this.velocity < -10)
			{
				// vp1: 0.8
				this.amplitude = 0.8 * this.velocity;
				this.target = Math.round(this.offset + this.amplitude);
				this.time = currentTime();

				raf(() => this.updateValueAuto());
			}
		}

		update()
		{
			const now = currentTime();
			const elapsed = now - this.time;
			const delta = this.offset - this.frame;

			this.frame = this.offset;
			this.time = now;

			const v = 1000 * delta / (1 + elapsed);
			this.velocity = this.vp1 * v + this.vp2 * this.velocity;
		}

		updateValue(value)
		{
			if (this.min !== undefined)
				value = Math.max(this.min, value);

			if (this.max !== undefined)
				value = Math.min(this.max, value);

			this.offset = value;

			if (this.onUpdate)
				this.onUpdate(-this.offset);
		}

		updateValueAuto()
		{
			if (this.amplitude === undefined)
				return;

			const elapsed = currentTime() - this.time;
			const delta = -this.amplitude * Math.exp(-elapsed / timeConstant);

			if (delta > 0.5 || delta < -0.5)
			{
				this.updateValue(this.target + delta);
				raf(() => this.updateValueAuto());
			}
			else
			{
				this.updateValue(this.target);
			}
		}

	}

	/*
	 * Copyright (c) 2019 - Bas Milius <bas@mili.us>
	 *
	 * This file is part of the Latte UI package.
	 *
	 * For the full copyright and license information, please view the
	 * LICENSE file that was distributed with this source code.
	 */

	/**
	 * Clamps a value between min and max.
	 *
	 * @param {Number} value
	 * @param {Number} min
	 * @param {Number} max
	 *
	 * @returns {Number}
	 * @author Bas Milius <bas@mili.us>
	 * @since 1.0.0
	 */
	function clamp(value, min, max)
	{
		return Math.min(Math.max(value, min), max);
	}

	/**
	 * Implementation of the pythagorean equation.
	 *
	 * @param {Number} a
	 * @param {Number} b
	 *
	 * @returns {Number}
	 * @author Bas Milius <bas@mili.us>
	 * @since 1.0.0
	 */
	function pythagorean(a, b)
	{
		return Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));
	}

	var math = {
		clamp,
		pythagorean,
		Velocity
	};

	/*
	 * Copyright (c) 2019 - Bas Milius <bas@mili.us>
	 *
	 * This file is part of the Latte UI package.
	 *
	 * For the full copyright and license information, please view the
	 * LICENSE file that was distributed with this source code.
	 */

	/**
	 * Implementation of the <=> operator.
	 *
	 * @param {*} a
	 * @param {*} b
	 *
	 * @returns {Number|null}
	 * @author Bas Milius <bas@mili.us>
	 * @since 1.0.0
	 */
	function spaceship(a, b)
	{
		if ((a === null || b === null) || typeof a !== typeof b)
			return null;

		if (typeof a === "string")
			return a.localeCompare(b);

		if (a > b)
			return 1;
		else if (a < b)
			return -1;

		return 0;
	}

	var operators = {
		spaceship
	};

	/*
	 * Copyright (c) 2019 - Bas Milius <bas@mili.us>
	 *
	 * This file is part of the Latte UI package.
	 *
	 * For the full copyright and license information, please view the
	 * LICENSE file that was distributed with this source code.
	 */

	function initializeForms()
	{
		document.querySelectorAll(`form[method="post"]`).forEach(form => initializeForm(form));
	}

	function initializeForm(form)
	{
		form.addEventListener("submit", onFormSubmit.bind(window, form));
		form.addEventListener("keyup", onFormKeyUp.bind(window, form));
	}

	function onFormKeyUp(form, evt)
	{
		if (evt.ctrlKey !== true)
			return;

		if ((evt.code || evt.key) !== "Enter")
			return;

		onFormSubmit(form);
		form.submit();
	}

	function onFormSubmit(form)
	{
		form.querySelectorAll(".btn[type=submit]").forEach(btn =>
		{
			if (btn.classList.contains("btn-icon"))
				return;

			const icon = btn.querySelector("i.mdi");

			if (icon === null)
				return;

			icon.classList.add("spinner");

			if (btn.classList.contains("btn-light"))
				icon.classList.add("spinner-primary");
			else
				icon.classList.add("spinner-light");

			btn.classList.add("disabled");
		});
	}

	/*
	 * Copyright (c) 2019 - Bas Milius <bas@mili.us>
	 *
	 * This file is part of the Latte UI package.
	 *
	 * For the full copyright and license information, please view the
	 * LICENSE file that was distributed with this source code.
	 */

	const MessagePanel = Vue.extend({

		props: {

			buttons: {
				default: () => [],
				required: true,
				type: Array
			},

			message: {
				default: "",
				required: true,
				type: String
			},

			prompt: {
				default: false,
				required: true,
				type: Boolean
			},

			resolve: {
				required: true,
				type: Function
			},

			title: {
				default: "",
				required: true,
				type: String
			}

		},

		data()
		{
			return {
				isOpen: false,
				promptResult: "",
				z: 0
			};
		},

		render(h)
		{
			return h("div", {attrs: {role: "dialog"}, class: ["overlay", "is-visible", this.isOpen ? "is-open" : "is-not-open"], style: {zIndex: this.z}}, [
				h("div", {class: ["panel"], style: {width: "540px"}}, [
					h("div", {class: ["panel-header"]}, [
						h("span", {class: ["panel-title"]}, this.title)
					]),
					h("div", {class: ["panel-body"]}, [
						h("p", {domProps: {innerHTML: this.message}}),
						!this.prompt ? undefined : h("div", {class: ["form-group"]}, [
							h("input", {
								attrs: {
									type: "text"
								},
								class: ["form-control"],
								props: {
									value: this.promptResult
								},
								on: {
									input: v => this.promptResult = v.target.value,
									keydown: v => v.key === "Enter" && this.promptResult.trim() !== "" ? this.close(this.buttons[this.buttons.length - 1].id) : undefined
								}
							})
						])
					]),
					h("div", {class: ["panel-footer", "justify-content-end"]}, this.buttons.map(button => h("latte-ripple", {
						class: ["btn", ...button.classes],
						on: {
							click: () => this.close(button.id)
						},
						props: {
							as: "button"
						}
					}, [
						button.icon !== null ? h("i", {class: ["mdi", `mdi-${button.icon}`]}) : undefined,
						h("span", {}, button.label)
					])))
				])
			]);
		},

		methods: {

			close(buttonId)
			{
				raf(() => this.isOpen = false);
				raf(() => this.$emit("delete-me"), 300);

				this.resolve({
					button: buttonId,
					input: this.promptResult
				});
			},

			open()
			{
				applyZ(z => this.z = z);
				raf(() => raf(() => this.isOpen = true));

				if (this.prompt)
					raf(() => this.$el.querySelector("input").focus(), 300);
			}

		},

		watch: {

			isOpen()
			{
				dispatch("latte:overlay", {overlay: this.$el, open: this.isOpen});
			}

		}

	});

	const Buttons = {
		OK: 1,
		CANCEL: 2,
		YES: 4,
		NO: 8,
		UPDATE: 16,
		SAVE: 32,
		REMOVE: 64,
		CREATE: 128,
		GO: 256,
		PROCEED: 512,
		ALLOW: 1024,
		DENY: 2048
	};

	const ButtonsDescribed = [
		{id: Buttons.OK, icon: "check-circle", label: "OK", classes: ["btn-contained", "btn-primary"], weight: 1},
		{id: Buttons.CANCEL, icon: null, label: "Cancel", classes: ["btn-text", "btn-dark"], weight: 0},
		{id: Buttons.YES, icon: "check-circle", label: "Yes", classes: ["btn-contained", "btn-primary"], weight: 1},
		{id: Buttons.NO, icon: null, label: "No", classes: ["btn-text", "btn-dark"], weight: 0},
		{id: Buttons.UPDATE, icon: "check-circle", label: "Update", classes: ["btn-contained", "btn-primary"], weight: 1},
		{id: Buttons.SAVE, icon: "check-circle", label: "Save", classes: ["btn-contained", "btn-primary"], weight: 1},
		{id: Buttons.REMOVE, icon: "alert-circle", label: "Remove", classes: ["btn-contained", "btn-error"], weight: 1},
		{id: Buttons.CREATE, icon: "check-circle", label: "Create", classes: ["btn-contained", "btn-primary"], weight: 1},
		{id: Buttons.GO, icon: "arrow-right-bold-circle", label: "Go", classes: ["btn-contained", "btn-primary"], weight: 1},
		{id: Buttons.PROCEED, icon: "arrow-right-bold-circle", label: "Proceed", classes: ["btn-contained", "btn-primary"], weight: 1},
		{id: Buttons.ALLOW, icon: "check-circle", label: "Allow", classes: ["btn-contained", "btn-primary"], weight: 1},
		{id: Buttons.DENY, icon: "close-circle", label: "Deny", classes: ["btn-text", "btn-dark"], weight: 0}
	];

	function create(title, message, buttons, prompt = false)
	{
		return new Promise(resolve =>
		{
			const mount = createElement("div");
			const dialog = new MessagePanel({
				propsData: {
					buttons: buttonsToButtons(buttons),
					message,
					prompt,
					resolve,
					title
				}
			});

			getMainElement().appendChild(mount);
			dialog.$mount(mount);

			dialog.open();
			dialog.$on("delete-me", () =>
			{
				dialog.$destroy();
				getMainElement().removeChild(dialog.$el);
			});
		});
	}

	function alert(title, message)
	{
		return create(title, message, Buttons.OK);
	}

	function confirm(title, message)
	{
		return create(title, message, Buttons.OK | Buttons.CANCEL);
	}

	function prompt(title, message)
	{
		return create(title, message, Buttons.OK | Buttons.CANCEL, true);
	}

	function buttonsToButtons(buttons)
	{
		let actualButtons = [];

		for (let i in ButtonsDescribed)
			if (ButtonsDescribed.hasOwnProperty(i))
				if ((buttons & ButtonsDescribed[i].id) === ButtonsDescribed[i].id)
					actualButtons.push(ButtonsDescribed[i]);

		actualButtons = actualButtons.sort((a, b) => spaceship(a.weight, b.weight));
		actualButtons.forEach(button => button.label = translate("root", button.label));

		return actualButtons;
	}

	var message = {
		Buttons,
		ButtonsDescribed,
		create,
		alert,
		confirm,
		prompt
	};

	/*
	 * Copyright (c) 2019 - Bas Milius <bas@mili.us>
	 *
	 * This file is part of the Latte UI package.
	 *
	 * For the full copyright and license information, please view the
	 * LICENSE file that was distributed with this source code.
	 */

	/**
	 * Deep merges multiple objects.
	 *
	 * @param {*} target
	 * @param {*} sources
	 *
	 * @returns {*}
	 * @author Bas Milius <bas@mili.us>
	 * @since 1.0.0
	 */
	function deepMerge(target, ...sources)
	{
		if (sources.length === 0)
			return target;

		const source = sources.shift();

		if (!isObject(target) || !isObject(source))
			return deepMerge(target, ...sources);

		for (const key in source)
		{
			if (!source.hasOwnProperty(key))
				continue;

			if (isObject(source[key]))
			{
				if (!target[key])
					Object.assign(target, {[key]: source[key]});

				deepMerge(target[key], source[key]);
			}
			else
			{
				Object.assign(target, {[key]: source[key]});
			}
		}

		return deepMerge(target, ...sources);
	}

	/**
	 * Returns TRUE when obj is iterable.
	 *
	 * @param {*} obj
	 *
	 * @returns {Boolean}
	 * @author Bas Milius <bas@mili.us>
	 * @since 1.0.0
	 */
	function isIterable(obj)
	{
		if (obj === null)
			return false;

		return typeof obj[Symbol.iterator] === "function";
	}

	/**
	 * Returns TRUE when obj is an object.
	 *
	 * @param {*} obj
	 *
	 * @returns {Boolean}
	 * @author Bas Milius <bas@mili.us>
	 * @since 1.0.0
	 */
	function isObject(obj)
	{
		return obj && typeof obj === "object" && !Array.isArray(obj);
	}

	var object = {
		deepMerge,
		isIterable,
		isObject
	};

	/*
	 * Copyright (c) 2019 - Bas Milius <bas@mili.us>
	 *
	 * This file is part of the Latte UI package.
	 *
	 * For the full copyright and license information, please view the
	 * LICENSE file that was distributed with this source code.
	 */

	function initializeNotices()
	{
		let notices = Array.from(document.querySelectorAll("div.notice"));
		notices = notices.filter(notice => notice.querySelector("button.notice-dismiss") !== null);
		notices = notices.map(notice => notice.querySelector("button.notice-dismiss"));

		notices.forEach(dismissButton => dismissButton.addEventListener("click", () => dismissButton.parentNode.parentNode.removeChild(dismissButton.parentNode)));

		on("latte:notice", data => create$1(decodeURIComponent(data.message), data.type || "info"));
	}

	function areEntitiesNotices(entities)
	{
		if (!isIterable(entities))
			return false;

		for (let i in entities)
			if (entities.hasOwnProperty(i))
				if (!isEntityNotice(entities[i]))
					return false;

		return true;
	}

	function create$1(message, type, dismissible = true)
	{
		const noticeId = id();

		const notice = document.createElement("div");
		notice.classList.add("notice", `notice-${type}`);
		notice.setAttribute("id", noticeId);

		const p = document.createElement("p");
		p.innerHTML = message;

		notice.appendChild(p);

		if (dismissible)
		{
			const dismiss = document.createElement("button");
			dismiss.classList.add("btn", "btn-text", "btn-icon", "notice-dismiss");

			const icon = document.createElement("i");
			icon.classList.add("mdi", "mdi-close");

			dismiss.appendChild(icon);
			dismiss.addEventListener("click", () => remove(noticeId), {passive: true});

			notice.appendChild(dismiss);
		}

		const content = document.querySelector("main#app > div.content");

		content.insertBefore(notice, content.querySelector(":scope > *:first-child"));

		return noticeId;
	}

	// This method is used in Latte Framework.
	function isEntityNotice(entity)
	{
		return entity["@type"] === "Latte\\Data\\Model\\Notice";
	}

	function remove(noticeId)
	{
		const notice = document.querySelector(`div.notice#${noticeId}`);
		notice.parentNode.removeChild(notice);
	}

	var notice = {
		areEntitiesNotices,
		create: create$1,
		isEntityNotice,
		remove
	};

	/*
	 * Copyright (c) 2019 - Bas Milius <bas@mili.us>
	 *
	 * This file is part of the Latte UI package.
	 *
	 * For the full copyright and license information, please view the
	 * LICENSE file that was distributed with this source code.
	 */

	const defaultOptions = {
		duration: 3000,
		sound: "default"
	};

	const notifications = [];

	let lastY = 0;

	const Notification = Vue.extend({

		props: {

			options: {
				default: () => ({}),
				required: true,
				type: Object
			},

			resolve: {
				required: true,
				type: Function
			}

		},

		created()
		{
			notifications.push(this);
		},

		data()
		{
			return {
				closing: false,
				opening: true,
				timer: 0,
				y: 0,
				z: 0
			};
		},

		destroyed()
		{
			notifications.splice(notifications.indexOf(this), 1);
		},

		render(h)
		{
			return h("div", {class: this.notificationClasses, style: this.notificationStyles}, [
				conditionalRender(this.options.avatar && typeof this.options.avatar === "function", () => this.options.avatar(h)),
				conditionalRender(this.options.avatar && typeof this.options.avatar === "string", () => h("img", {attrs: {src: this.options.avatar}, class: ["avatar"]})),
				conditionalRender(this.options.icon, () => h("div", {class: ["notification-icon"]}, [
					h("i", {class: ["mdi", `mdi-${this.options.icon}`]})
				])),
				h("div", {class: ["notification-content"]}, [
					h("div", {class: ["notification-body"]}, [
						conditionalRender(this.options.title, () => h("span", {class: ["notification-title"], domProps: {innerHTML: this.options.title}})),
						conditionalRender(this.options.message, () => h("span", {class: ["notification-text"], domProps: {innerHTML: this.options.message}}))
					]),
					conditionalRender(this.options.buttons && this.options.buttons.length > 0, () => h("div", {class: ["notification-actions"]}, [
						...eachRender(this.options.buttons, button => h("latte-ripple", {
							attrs: makeParams(button.params),
							props: {
								as: "button"
							},
							class: ["btn", "btn-text", `btn-${button.color || "dark"}`],
							on: {
								click: () => this.close.call(this, button.id)
							}
						}, [
							conditionalRender(button.icon, () => h("i", {class: ["mdi", `mdi-${button.icon}`]})),
							h("span", {}, button.label)
						]))
					]))
				])
			])
		},

		computed: {

			notificationClasses()
			{
				const classes = ["notification", `notification-${this.options.color || "primary"}`, "is-app-notification"];

				if (this.closing)
					classes.push("is-closing");

				if (this.opening)
					classes.push("is-opening");

				return classes;
			},

			notificationStyles()
			{
				return {
					top: `calc(24px + ${this.y}px)`,
					zIndex: this.z
				};
			}

		},

		methods: {

			close(buttonId = undefined)
			{
				this.resolve(buttonId);

				if (this.timer !== 0)
					clearTimeout(this.timer);

				this.closing = true;
				this.timer = 0;
				updatePositions();

				raf(() => this.$emit("delete-me"), 420);
			},

			closeByTimer()
			{
				this.timer = 0;
				this.close();
			},

			open()
			{
				applyZ(z => this.z = z);
				updatePositions();

				raf(() => raf(() => this.opening = false));

				if (this.options.duration > 0)
					this.timer = setTimeout(() => this.closeByTimer(), this.options.duration);

				if (this.options.sound)
				{
					let audio = new Audio();
					audio.setAttribute("src", this.options.sound);
					audio.setAttribute("preload", "auto");
					audio.volume = 1;
					audio.currentTime = 0;
					audio.play().catch(err => console.error(err));
				}
			}

		}

	});

	function create$2(options = {})
	{
		options = Object.assign({}, defaultOptions, options);
		options.id = options.id || id();

		if (options.sound === "default")
		{
			let lattePath = getLattePath();

			if (lattePath === "/")
				lattePath = "";

			options.sound = (lattePath !== null ? `${lattePath}/sound/notification.ogg` : null);
		}

		return new Promise(resolve =>
		{
			const mount = createElement("div");
			const notification = new Notification({
				data: {
					y: lastY
				},
				propsData: {
					options,
					resolve
				}
			});

			getMainElement().appendChild(mount);
			notification.$mount(mount);

			notification.open();
			notification.$on("delete-me", () =>
			{
				notification.$destroy();
				getMainElement().removeChild(notification.$el);
			});
		});
	}

	function initializeNotifications()
	{
		on("latte:notification", data => create$2(data));
	}

	function makeParams(params)
	{
		const result = {};

		for (let param in params)
			if (params.hasOwnProperty(param))
				result[`data-${param}`] = params[param];

		return result;
	}

	function updatePositions()
	{
		raf(() =>
		{
			let y = 0;

			for (let i = 0; i < notifications.length; i++)
			{
				let notification = notifications[i];

				if (notification.closing)
					continue;

				notification.y = y;

				y += notification.$el.getBoundingClientRect().height + 24;
			}

			lastY = y;
		});
	}

	var notification = {
		create: create$2
	};

	/*
	 * Copyright (c) 2019 - Bas Milius <bas@mili.us>
	 *
	 * This file is part of the Latte UI package.
	 *
	 * For the full copyright and license information, please view the
	 * LICENSE file that was distributed with this source code.
	 */

	let registry = {};

	function initializeOverlays()
	{
		on("latte:ui:overlay", data => open(data.name || undefined));
		on("latte:ui:overlay:close", data => close(data.name || undefined));
	}

	function close(name)
	{
		let overlay = find(name);
		overlay.close();
	}

	function find(name)
	{
		if (name === undefined || !registry[name])
			throw new Error(`Overlay ${name} is not registred!`);

		return registry[name];
	}

	function open(name)
	{
		let overlay = find(name);
		overlay.open();
	}

	function register$1(name, overlay)
	{
		registry[name] = overlay;
	}

	function remove$1(name)
	{
		delete registry[name];
	}

	var overlay = {
		close,
		find,
		open,
		register: register$1,
		remove: remove$1
	};

	/*
	 * Copyright (c) 2019 - Bas Milius <bas@mili.us>
	 *
	 * This file is part of the Latte UI package.
	 *
	 * For the full copyright and license information, please view the
	 * LICENSE file that was distributed with this source code.
	 */

	function initializePanels()
	{
		document.querySelectorAll(".panel > table").forEach(t => closest(t, ".panel").classList.add("panel-table"));
		document.querySelectorAll(".panel.panel-toggleable").forEach(panel => initializePanel(panel));
	}

	function initializePanel(panel)
	{
		const header = panel.querySelector("div.panel-header");

		if (header === null)
			return;

		const hasRightItems = header.querySelectorAll(".ml-auto").length > 0;

		const toggle = document.createElement("button");
		toggle.setAttribute("type", "button");
		toggle.classList.add("panel-toggle", "btn", "btn-text", "btn-icon", "btn-dark");

		if (!hasRightItems)
			toggle.classList.add("ml-auto");

		toggle.innerHTML = '<i class="mdi mdi-chevron-down"></i>';

		header.appendChild(toggle);

		if (panel.classList.contains("is-open"))
			open$1(panel);
		else
			close$1(panel);

		toggle.addEventListener("click", () =>
		{
			if (panel.classList.contains("is-open"))
				close$1(panel);
			else
				open$1(panel);
		});
	}

	function close$1(panel)
	{
		let p = panel;

		if (p.querySelector(":scope > form") !== null)
			p = p.querySelector(":scope > form");

		const hidableItems = p.querySelectorAll(":scope > div:not(.panel-header)");
		for (let i = 0; i < hidableItems.length; i++)
			hidableItems.item(i).classList.add("d-none");

		const toggle = p.querySelector("div.panel-header > button.panel-toggle");
		toggle.querySelector("i.mdi").classList.remove("mdi-rotate-180");

		panel.classList.add("is-closed");
		panel.classList.remove("is-open");
	}

	function open$1(panel)
	{
		let p = panel;

		if (p.querySelector(":scope > form") !== null)
			p = p.querySelector(":scope > form");

		const hidableItems = p.querySelectorAll(":scope > div:not(.panel-header)");
		for (let i = 0; i < hidableItems.length; i++)
			hidableItems.item(i).classList.remove("d-none");

		const toggle = p.querySelector("div.panel-header > button.panel-toggle");
		toggle.querySelector("i.mdi").classList.add("mdi-rotate-180");

		panel.classList.remove("is-closed");
		panel.classList.add("is-open");
	}

	var panel = {
		close: close$1,
		initializePanel,
		open: open$1
	};

	/*
	 * Copyright (c) 2019 - Bas Milius <bas@mili.us>
	 *
	 * This file is part of the Latte UI package.
	 *
	 * For the full copyright and license information, please view the
	 * LICENSE file that was distributed with this source code.
	 */

	const defaultOptions$1 = {
		width: "300px"
	};

	const QuestionPanel = Vue.extend({

		props: {

			buttons: {
				default: () => [],
				required: true,
				type: Array
			},

			icon: {
				default: "home-outline",
				required: false,
				type: String
			},

			message: {
				default: "",
				required: true,
				type: String
			},

			options: {
				default: () => ({}),
				required: true,
				type: Object
			},

			resolve: {
				required: true,
				type: Function
			}

		},

		data()
		{
			return {
				isOpen: false,
				z: 0
			};
		},

		render(h)
		{
			return h("div", {attrs: {role: "dialog"}, class: ["overlay", "is-visible", this.isOpen ? "is-open" : "is-not-open"], style: {zIndex: this.z}}, [
				h("div", {class: ["panel"], style: {width: this.options.width}}, [
					h("div", {class: ["panel-header", "justify-content-center", "border-bottom-0", "py-4"]}, [
						h("i", {class: ["mdi", `mdi-${this.icon}`, "text-primary"], style: {fontSize: "36px"}})
					]),
					h("div", {class: ["panel-body", "py-0", "text-center"], domProps: {innerHTML: this.message}}),
					h("div", {class: ["d-flex", "flex-column", "p-3"]}, this.buttons.map(button => h("latte-ripple", {
						class: ["btn", "btn-text", "btn-pill", "btn-primary"],
						props: {as: "button"},
						on: {
							click: () => this.close(button.id)
						},
						style: {
							"--btn-height": "42px",
							fontSize: ".9em"
						}
					}, button.label)))
				])
			]);
		},

		methods: {

			close(buttonId)
			{
				raf(() => this.isOpen = false);
				raf(() => this.$emit("delete-me"), 300);

				this.resolve(buttonId);
			},

			open()
			{
				applyZ(z => this.z = z);
				raf(() => raf(() => this.isOpen = true));
			}

		},

		watch: {

			isOpen()
			{
				dispatch("latte:overlay", {overlay: this.$el, open: this.isOpen});
			}

		}

	});

	function create$3(icon, message, buttons, options = {})
	{
		options = Object.assign({}, defaultOptions$1, options);

		return new Promise(resolve =>
		{
			const mount = createElement("div");
			const question = new QuestionPanel({
				propsData: {
					buttons,
					icon,
					message,
					options,
					resolve
				}
			});

			getMainElement().appendChild(mount);
			question.$mount(mount);

			question.open();
			question.$on("delete-me", () =>
			{
				question.$destroy();
				getMainElement().removeChild(question.$el);
			});
		});
	}

	var question = {
		create: create$3
	};

	/*
	 * Copyright (c) 2019 - Bas Milius <bas@mili.us>
	 *
	 * This file is part of the Latte UI package.
	 *
	 * For the full copyright and license information, please view the
	 * LICENSE file that was distributed with this source code.
	 */

	let isSnackbarOpen = false;
	let snackbars = [];

	const Locations = {
		BOTTOM: 1,
		BOTTOM_LEFT: 2,
		BOTTOM_RIGHT: 4,
		TOP: 8,
		TOP_LEFT: 16,
		TOP_RIGHT: 32
	};

	const defaultOptions$2 = {
		action: null,
		duration: 4000,
		location: Locations.BOTTOM,
		message: ""
	};

	const defaultActionOptions = {
		color: "primary",
		label: "OK"
	};

	const Snackbar = Vue.extend({

		props: {

			options: {
				required: true,
				type: Object
			},

			resolve: {
				required: true,
				type: Function
			}

		},

		data()
		{
			return {
				isOpen: false,
				timer: 0,
				z: 0
			};
		},

		render(h)
		{
			return h("div", {class: ["snackbar", locationToClass(this.options.location), this.isOpen ? "is-open" : "is-not-open"], style: {zIndex: this.z}}, [
				h("div", {class: "snackbar-body"}, this.options.message),
				conditionalRender(this.options.action, () => h("button", {
					class: ["btn", "btn-text", `btn-${this.options.action.color}`],
					on: {
						click: () => this.close(true)
					}
				}, this.options.action.label))
			]);
		},

		methods: {

			close(wasAction = false)
			{
				this.isOpen = false;

				if (this.timer !== 0)
					clearTimeout(this.timer);

				this.resolve(wasAction);
				raf(() => this.$emit("delete-me"), 240);
			},

			open()
			{
				applyZ(z => this.z = z);
				raf(() => raf(() => this.isOpen = true));

				if (this.options.duration > 0)
					this.timer = setTimeout(() => this.close(), this.options.duration);
			}

		}

	});

	function create$4(options = {})
	{
		options = Object.assign({}, defaultOptions$2, options);

		if (options.action)
			options.action = Object.assign({}, defaultActionOptions, options.action);

		return new Promise(resolve =>
		{
			const mount = createElement("div");
			const snackbar = new Snackbar({
				propsData: {
					options,
					resolve
				}
			});

			snackbars.push(snackbar);

			getMainElement().appendChild(mount);
			snackbar.$mount(mount);

			onTick();

			snackbar.$on("delete-me", () =>
			{
				snackbar.$destroy();
				getMainElement().removeChild(snackbar.$el);
			});
		}).then(r =>
		{
			isSnackbarOpen = false;
			onTick();

			return r;
		});
	}

	function initializeSnackbars()
	{
		on("latte:tick", onTick);
	}

	function locationToClass(location)
	{
		switch (location)
		{
			case Locations.BOTTOM:
				return "snackbar-bottom";

			case Locations.BOTTOM_LEFT:
				return "snackbar-bottom-left";

			case Locations.BOTTOM_RIGHT:
				return "snackbar-bottom-right";

			case Locations.TOP:
				return "snackbar-top";

			case Locations.TOP_LEFT:
				return "snackbar-top-left";

			case Locations.TOP_RIGHT:
				return "snackbar-top-right";


		}
	}

	function onTick()
	{
		if (isSnackbarOpen || snackbars.length === 0)
			return;

		const snackbar = snackbars.shift();
		snackbar.open();

		isSnackbarOpen = true;
	}

	var snackbar = {
		Locations,
		create: create$4
	};

	/*
	 * Copyright (c) 2019 - Bas Milius <bas@mili.us>
	 *
	 * This file is part of the Latte UI package.
	 *
	 * For the full copyright and license information, please view the
	 * LICENSE file that was distributed with this source code.
	 */

	/**
	 * Returns TRUE if this is a touch device.
	 *
	 * @returns {Boolean}
	 * @author Bas Milius <bas@mili.us>
	 * @since 1.0.0
	 */
	function isTouchDevice()
	{
		if ((navigator.maxTouchPoints || navigator.msMaxTouchPoints) > 0)
			return true;

		return /iPad|iPhone|iPod/.test(navigator.platform);
	}

	/**
	 * Executes fn only if we're not on a touch device.
	 *
	 * @param {Function} fn
	 *
	 * @returns {Function}
	 * @author Bas Milius <bas@mili.us>
	 * @since 1.0.0
	 */
	function onlyMouse(fn)
	{
		return function ()
		{
			if (isTouchDevice())
				return undefined;

			return fn.apply(this, arguments);
		};
	}

	/**
	 * Executes fn only if we're on a touch device.
	 *
	 * @param {Function} fn
	 *
	 * @returns {Function}
	 * @author Bas Milius <bas@mili.us>
	 * @since 1.0.0
	 */
	function onlyTouch(fn)
	{
		return function ()
		{
			if (!isTouchDevice())
				return undefined;

			return fn.apply(this, arguments);
		};
	}

	var touch = {
		isTouchDevice,
		onlyMouse,
		onlyTouch
	};

	/*
	 * Copyright (c) 2019 - Bas Milius <bas@mili.us>
	 *
	 * This file is part of the Latte UI package.
	 *
	 * For the full copyright and license information, please view the
	 * LICENSE file that was distributed with this source code.
	 */
	let tooltipElement = null;

	function initializeTooltips()
	{
		tooltipElement = createElement("div", div =>
		{
			div.setAttribute("class", "tooltip is-hidden");

			document.body.appendChild(div);
		});

		live(document.body, "[data-tooltip]", "mouseover", onlyMouse(onTooltipElementHover));
		live(document.body, "[data-tooltip]", "mouseout", onlyMouse(despawnTooltip));

		live(document.body, "[data-tooltip]", "touchstart", onlyTouch(onTooltipElementHover));
		live(document.body, "[data-tooltip]", "touchend", onlyTouch(despawnTooltip));

		on("latte:tooltip", data => spawnTooltip(data));
		on("latte:tooltip:hide", () => despawnTooltip());
	}

	function despawnTooltip()
	{
		tooltipElement.classList.add("is-hidden");
	}

	function spawnTooltip(data)
	{
		let {x, y, content, position = "vertical"} = data;

		if (content === undefined)
			return;

		tooltipElement.innerHTML = "";

		if (content instanceof HTMLElement)
			tooltipElement.appendChild(content);
		else
			tooltipElement.innerHTML = content;

		tooltipElement.classList.remove(...tooltipElement.classList.values());
		tooltipElement.classList.add("tooltip", ...(data.classes || []));

		if (position === "top" || (position === "vertical" && y > window.innerHeight / 2))
			tooltipElement.classList.add("tooltip-top");

		if (position === "left" || (position === "horizontal" && x > window.innerWidth / 2))
			tooltipElement.classList.add("tooltip-left");

		if (position === "right" || (position === "horizontal" && x <= window.innerWidth / 2))
			tooltipElement.classList.add("tooltip-right");

		if (position === "bottom" || (position === "vertical" && y <= window.innerHeight / 2))
			tooltipElement.classList.add("tooltip-bottom");

		tooltipElement.style.removeProperty("--tooltip-arrow-top");
		tooltipElement.style.removeProperty("--tooltip-arrow-left");

		raf(() =>
		{
			const tooltipRect = tooltipElement.getBoundingClientRect();

			let top = 0;
			let left = 0;
			let offset = 9;

			if (tooltipElement.classList.contains("tooltip-top"))
			{
				top = y - tooltipRect.height - offset;
				left = x - (tooltipRect.width / 2);
			}
			else if (tooltipElement.classList.contains("tooltip-left"))
			{
				top = y - (tooltipRect.height / 2);
				left = x - tooltipRect.width - offset;
			}
			else if (tooltipElement.classList.contains("tooltip-right"))
			{
				top = y - (tooltipRect.height / 2);
				left = x + offset;
			}
			else if (tooltipElement.classList.contains("tooltip-bottom"))
			{
				top = y + offset;
				left = x - (tooltipRect.width / 2);
			}

			if (data.adjustCoordinates)
			{
				let coords = data.adjustCoordinates(left, top, tooltipRect);
				top = coords.y;
				left = coords.x;
			}

			{
				let adjustment = 0;
				let offset = 12;

				if (tooltipElement.classList.contains("tooltip-top") || tooltipElement.classList.contains("tooltip-bottom"))
				{
					if (offset > left)
					{
						adjustment = offset - left;
						left += adjustment;
					}

					if ((left + tooltipRect.width + offset) > window.innerWidth)
					{
						adjustment = window.innerWidth - (left + tooltipRect.width + offset);
						left += adjustment;
					}

					if (adjustment !== 0)
						tooltipElement.style.setProperty("--tooltip-arrow-left", `calc((50% - .45em) - ${Math.floor(adjustment)}px)`);
				}
				else if (tooltipElement.classList.contains("tooltip-left") || tooltipElement.classList.contains("tooltip-right"))
				{
					if (offset > top)
					{
						adjustment = offset - top;
						top += adjustment;
					}

					if ((top + tooltipRect.height + offset) > window.innerHeight)
					{
						adjustment = window.innerHeight - (top + tooltipRect.height + offset);
						top += adjustment;
					}

					if (adjustment !== 0)
						tooltipElement.style.setProperty("--tooltip-arrow-top", `calc((50% - .45em) - ${Math.floor(adjustment)}px)`);
				}
			}

			tooltipElement.style.setProperty("transform", `translate3d(${Math.round(left)}px, ${Math.round(top)}px, 0)`);
		});
	}

	function onTooltipElementHover(el)
	{
		const str = el.dataset.tooltip;
		const classes = el.dataset.tooltipClass || "tooltip-bottom";

		if (str.trim() === "")
			return;

		if (el.classList.contains("tooltip-disabled"))
			return;

		const pos = el.getBoundingClientRect();

		spawnTooltip({
			x: pos.left + (pos.width / 2),
			y: pos.top + (pos.height / 2),
			classes: classes.split(" "),
			content: str,
			position: null,

			adjustCoordinates(x, y)
			{
				if (tooltipElement.classList.contains("tooltip-top"))
					y -= pos.height / 2;
				else if (tooltipElement.classList.contains("tooltip-left"))
					x -= pos.width / 2;
				else if (tooltipElement.classList.contains("tooltip-right"))
					x += pos.width / 2;
				else if (tooltipElement.classList.contains("tooltip-bottom"))
					y += pos.height / 2;

				return {x, y};
			}
		});
	}

	/*
	 * Copyright (c) 2019 - Bas Milius <bas@mili.us>
	 *
	 * This file is part of the Latte UI package.
	 *
	 * For the full copyright and license information, please view the
	 * LICENSE file that was distributed with this source code.
	 */

	function initializeUI()
	{
		initializeForms();
		initializeNotices();
		initializeNotifications();
		initializeOverlays();
		initializePanels();
		initializeSnackbars();
		initializeTooltips();
	}

	var ui = {
		message,
		notice,
		notification,
		overlay,
		panel,
		question,
		snackbar
	};

	/*
	 * Copyright (c) 2019 - Bas Milius <bas@mili.us>
	 *
	 * This file is part of the Latte UI package.
	 *
	 * For the full copyright and license information, please view the
	 * LICENSE file that was distributed with this source code.
	 */

	/**
	 * Adds text to the clipboard.
	 *
	 * @param {String} text
	 *
	 * @author Bas Milius <bas@mili.us>
	 * @since 1.0.0
	 */
	function copy(text)
	{
		navigator.clipboard.writeText(text)
			.then(() => console.debug("[Clipboard] Text copied to clipboard!"))
			.catch(err => console.error(err));
	}

	/**
	 * Gets text from the clipboard.
	 *
	 * @returns {Promise<*>}
	 * @author Bas Milius <bas@mili.us>
	 * @since 1.0.0
	 */
	function paste()
	{
		return navigator.clipboard.readText()
			.catch(err => console.error(err));
	}

	var clipboard = {
		copy,
		paste
	};

	/*
	 * Copyright (c) 2019 - Bas Milius <bas@mili.us>
	 *
	 * This file is part of the Latte UI package.
	 *
	 * For the full copyright and license information, please view the
	 * LICENSE file that was distributed with this source code.
	 */

	/**
	 * Gets a cookie.
	 *
	 * @param {String} name
	 *
	 * @returns {*}
	 * @author Bas Milius <bas@mili.us>
	 * @since 1.0.0
	 */
	function getCookie(name)
	{
		name = `${name}=`;

		const decoded = decodeURIComponent(document.cookie);
		const cookies = decoded.split(";");

		for (let i = 0; i < cookies.length; i++)
		{
			let cookie = cookies[i];

			while (cookie.charAt(0) === " ")
				cookie = cookie.substring(1);

			if (cookie.indexOf(name) === 0)
				return JSON.parse(decodeURIComponent(cookie.substring(name.length)));
		}

		return undefined;
	}

	/**
	 * Sets a cookie.
	 *
	 * @param {String} name
	 * @param {*} value
	 * @param {Number} days
	 *
	 * @author Bas Milius <bas@mili.us>
	 * @since 1.0.0
	 */
	function setCookie(name, value, days = 21)
	{
		const date = new Date();
		date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));

		document.cookie = `${name}=${encodeURIComponent(JSON.stringify(value))};expires=${date.toUTCString()};path=/`;
	}

	var cookies = {
		getCookie,
		setCookie
	};

	/*
	 * Copyright (c) 2019 - Bas Milius <bas@mili.us>
	 *
	 * This file is part of the Latte UI package.
	 *
	 * For the full copyright and license information, please view the
	 * LICENSE file that was distributed with this source code.
	 */

	let dateFormatterOptions = {
		day: "numeric",
		month: "long",
		weekday: "long",
		year: "numeric"
	};

	/**
	 * Formats a datetime.
	 *
	 * @param {Date} date
	 * @param {Object} options
	 *
	 * @returns {String}
	 * @author Bas Milius <bas@mili.us>
	 * @since 1.0.0
	 */
	function formatDateTime(date, options = dateFormatterOptions)
	{
		const f = new Intl.DateTimeFormat(currentOptions.locale, options);

		return f.format(date);
	}

	var datetime = {
		formatDateTime
	};

	/*
	 * Copyright (c) 2019 - Bas Milius <bas@mili.us>
	 *
	 * This file is part of the Latte UI package.
	 *
	 * For the full copyright and license information, please view the
	 * LICENSE file that was distributed with this source code.
	 */

	/**
	 * Returns TRUE if str is valid json.
	 *
	 * @param {String} str
	 *
	 * @returns {Boolean}
	 * @author Bas Milius <bas@mili.us>
	 * @since 1.0.0
	 */
	function isJson(str)
	{
		try
		{
			JSON.parse(str);

			return true;
		}
		catch (err)
		{
			return false;
		}
	}

	var json = {
		isJson
	};

	/*
	 * Copyright (c) 2019 - Bas Milius <bas@mili.us>
	 *
	 * This file is part of the Latte UI package.
	 *
	 * For the full copyright and license information, please view the
	 * LICENSE file that was distributed with this source code.
	 */

	/**
	 * Implodes commas between strings and replaces the last comma with an &.
	 *
	 * @param {String[]} strs
	 *
	 * @return {String}
	 * @author Bas Milius <bas@mili.us>
	 * @since 1.0.0
	 */
	function commaCommaAnd(strs)
	{
		return strs.join(", ").replace(/(.*),/, "$1 &");
	}

	/**
	 * Returns TRUE if {@see str} is undefined, NULL or contains only whitespace.
	 *
	 * @param {String} str
	 *
	 * @returns {Boolean}
	 * @author Bas Milius <bas@mili.us>
	 * @since 1.0.0
	 */
	function isNullOrWhitespace(str)
	{
		if (!str)
			return true;

		return str.replace(/\s/g, '').length < 1;
	}

	var string = {
		commaCommaAnd,
		isNullOrWhitespace
	};

	/*
	 * Copyright (c) 2019 - Bas Milius <bas@mili.us>
	 *
	 * This file is part of the Latte UI package.
	 *
	 * For the full copyright and license information, please view the
	 * LICENSE file that was distributed with this source code.
	 */

	var util = {
		clipboard,
		cookies,
		datetime,
		dom,
		json,
		object,
		string,
		touch
	};

	var name = "@bybas/latte-ui";
	var version = "1.8.0-dev";
	var description = "UI Library of Latte Framework.";
	var author = "Bas Milius";

	/*
	 * Copyright (c) 2019 - Bas Milius <bas@mili.us>
	 *
	 * This file is part of the Latte UI package.
	 *
	 * For the full copyright and license information, please view the
	 * LICENSE file that was distributed with this source code.
	 */

	var LatteSDK = {
		author: author,
		description: description,
		name: name,
		version: version,

		action,
		api,
		core,
		i18n,
		math,
		operators,
		ui,
		util,

		vue: Vue
	};

	/*
	 * Copyright (c) 2019 - Bas Milius <bas@mili.us>
	 *
	 * This file is part of the Latte UI package.
	 *
	 * For the full copyright and license information, please view the
	 * LICENSE file that was distributed with this source code.
	 */

	function registerCSSPaintWorklets()
	{
		document.body.classList.add("css-paint-api");

		let path = getLattePath();

		// noinspection JSIgnoredPromiseFromCall
		CSS.paintWorklet.addModule(`${path}worklet/paint/app-bar-cutout.js`);

		// noinspection JSIgnoredPromiseFromCall
		CSS.paintWorklet.addModule(`${path}worklet/paint/btn-background.js`);
	}

	function registerCSSProperties()
	{
		document.body.classList.add("css-props-values");

		CSS.registerProperty({
			name: "--app-bar-alpha",
			syntax: "<number>",
			inherits: true,
			initialValue: 1
		});

		CSS.registerProperty({
			name: "--app-bar-cutout-offset",
			syntax: "<length-percentage>",
			inherits: true,
			initialValue: "50%"
		});

		CSS.registerProperty({
			name: "--btn-alpha",
			syntax: "<number>",
			inherits: false,
			initialValue: 1
		});

		CSS.registerProperty({
			name: "--btn-hover",
			syntax: "<number>",
			inherits: false,
			initialValue: 0
		});
	}

	function initializeHoudiniApis()
	{
		if (CSS && CSS.paintWorklet)
			registerCSSPaintWorklets();

		if (CSS && CSS.registerProperty)
			registerCSSProperties();
	}

	/*
	 * Copyright (c) 2019 - Bas Milius <bas@mili.us>
	 *
	 * This file is part of the Latte UI package.
	 *
	 * For the full copyright and license information, please view the
	 * LICENSE file that was distributed with this source code.
	 */

	class OutsideEvent
	{

		constructor(source)
		{
			this.listeners = [];
			this.source = source;
		}

		addEventListener(type, listener, options = {})
		{
			listener.id = this.listeners.length;

			this.listeners.push(listener);

			const fn = evt =>
			{
				if (this.isWithinSource(evt))
					return;

				listener.apply(this.source, evt);
			};

			document.addEventListener(type, fn, options);
		}

		clearListeners()
		{
			this.listeners = [];
		}

		removeEventListener(type, listener, options = {})
		{
			const index = this.listeners.findIndex(l => l.id === listener.id);

			if (index === -1)
				return;

			document.removeEventListener(type, this.listeners[index], options);

			this.listeners.splice(index, 1);
		}

		isWithinSource(evt)
		{
			const coords = getCoords(evt);

			return coords !== undefined && closest(document.elementFromPoint(coords.x, coords.y), this.source) !== null;
		}

	}

	function registerOutsideEvents()
	{
		EventTarget.prototype.addOutsideEventListener = function (type, listener, options = {})
		{
			if (this.outsideEvent === undefined)
				this.outsideEvent = new OutsideEvent(this);

			this.outsideEvent.addEventListener(type, listener, options);
		};

		EventTarget.prototype.clearOutsideEventListeners = function ()
		{
			if (this.outsideEvent === undefined)
				this.outsideEvent = new OutsideEvent(this);

			this.outsideEvent.clearListeners();
		};

		EventTarget.prototype.removeOutsideEventListener = function (type, listener, options = {})
		{
			if (this.outsideEvent === undefined)
				this.outsideEvent = new OutsideEvent(this);

			this.outsideEvent.removeEventListener(type, listener, options);
		};
	}

	//

	function areArraysEqual(a, b)
	{
		if (a.length !== b.length)
			return false;

		for (let i = 0; i < a.length; i++)
			if (a[i] !== b[i])
				return false;

		return true;
	}

	var script = {

		name: "latte-autocomplete",

		props: {

			defaultValue: {
				default: undefined,
				required: false
			},

			disabled: {
				default: false,
				required: false,
				type: Boolean
			},

			limit: {
				default: 5,
				required: false,
				type: Number
			},

			multiSelect: {
				default: false,
				required: false,
				type: Boolean
			},

			name: {
				default: id(),
				required: false,
				type: String
			},

			offset: {
				default: 0,
				required: false,
				type: Number
			},

			placeholder: {
				default: "Search...",
				required: false,
				type: String
			},

			url: {
				required: true,
				type: String
			},

			value: {
				default: () => [],
				required: false,
				type: Array | Number
			}

		},

		beforeDestroy()
		{
			this.$el.removeOutsideEventListener("click", this.onBlur);
		},

		data()
		{
			return {
				abortController: null,
				canEmit: true,
				canOpen: false,
				isLoading: false,
				currentSuggestion: -1,
				searchTerm: "",
				suggestions: [],
				valueLast: [],
				values: []
			};
		},

		mounted()
		{
			this.$el.addOutsideEventListener("click", this.onBlur);
			this.onValueChanged();
		},

		computed: {

			canSearch()
			{
				return this.multiSelect || this.values.length === 0;
			},

			shouldOpenSuggestions()
			{
				return this.canOpen && this.suggestionsFiltered.length > 0;
			},

			suggestionsFiltered()
			{
				return this.suggestions.filter(s => this.values.filter(v => v.label === s.label && v.value === s.value).length === 0);
			}

		},

		methods: {

			addValue(label, value)
			{
				if (label === undefined || value === undefined)
					return;

				if (this.values.filter(v => v.value === value && v.label === label).length > 0)
					return;

				const remove = () => this.removeValue(value);

				this.values.push({label, remove, value});
			},

			removeValue(value)
			{
				this.values = this.values.filter(v => v.value !== value);
			},

			onBlur()
			{
				this.canOpen = false;
			},

			onFocus()
			{
				this.suggestions = [];
				this.canOpen = true;
			},

			onSelectSuggestion()
			{
				if (!this.suggestionsFiltered[this.currentSuggestion])
					return;

				const {label, value} = this.suggestionsFiltered[this.currentSuggestion];

				this.addValue(label, value);
				this.canOpen = false;
				this.searchTerm = "";
			},

			onSelectFirstSuggestion(evt)
			{
				if (this.suggestions.length === 0 || !this.shouldOpenSuggestions)
					return;

				if (this.currentSuggestion === -1)
					this.onKeyPressDown();

				this.onSelectSuggestion();

				evt.preventDefault();
				evt.stopPropagation();
			},

			onKeyPressDelete()
			{
				if (this.searchTerm !== "")
					return;

				this.values.pop();
			},

			onKeyPressDown()
			{
				if (this.currentSuggestion + 1 >= this.suggestions.length)
					this.currentSuggestion = -1;
				else
					this.currentSuggestion++;
			},

			onKeyPressUp()
			{
				if (this.currentSuggestion - 1 < -1)
					this.currentSuggestion = this.suggestions.length - 1;
				else
					this.currentSuggestion--;
			},

			onReceiveSuggestions(response)
			{
				this.abortController = null;
				this.canOpen = true;
				this.currentSuggestion = -1;
				this.suggestions = response.data;
			},

			onReceiveValues(response)
			{
				response.data.forEach(v => this.addValue(v.label, v.value));

				this.isLoading = false;
			},

			onSearchTermChanged()
			{
				if (this.searchTerm.trim() === "")
				{
					this.currentSuggestion = -1;
					this.canOpen = false;
					return;
				}

				if (this.abortController !== null)
				{
					this.abortController.abort();
					this.abortController = null;
				}

				this.abortController = new AbortController();

				request(`${this.url}?q=${encodeURIComponent(this.searchTerm.toLowerCase())}`, {cache: "no-cache", signal: this.signal})
					.then(r => r.json())
					.then(r => this.onReceiveSuggestions(r))
					.catch(err => console.error(err));
			},

			onValueChanged()
			{
				let value = this.multiSelect ? this.value : [this.value];
				value = value.filter ? value.filter(v => v > 0) : value;

				if (value.length === 0)
				{
					this.values = [];
					this.valueLast = [];
					return;
				}

				if (areArraysEqual(value, this.valueLast))
					return;

				if (this.isLoading)
					return;

				this.isLoading = true;

				request(`${this.url}?ids=${value.join(",")}`)
					.then(r => r.json())
					.then(r => this.onReceiveValues(r))
					.catch(err => console.error(err));

				this.valueLast = value;
			}

		},

		watch: {

			shouldOpenSuggestions()
			{
				this.currentSuggestion = -1;
			},

			searchTerm()
			{
				this.onSearchTermChanged();
			},

			value()
			{
				this.canEmit = false;
				this.onValueChanged();
			},

			values()
			{
				if (this.canEmit === false)
					return this.canEmit = true;

				let values = this.values.map(v => v.value);
				this.$emit("input", (this.multiSelect ? values : values[0]) || this.defaultValue);
			}

		}

	};

	function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier
	/* server only */
	, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
	  if (typeof shadowMode !== 'boolean') {
	    createInjectorSSR = createInjector;
	    createInjector = shadowMode;
	    shadowMode = false;
	  } // Vue.extend constructor export interop.


	  var options = typeof script === 'function' ? script.options : script; // render functions

	  if (template && template.render) {
	    options.render = template.render;
	    options.staticRenderFns = template.staticRenderFns;
	    options._compiled = true; // functional template

	    if (isFunctionalTemplate) {
	      options.functional = true;
	    }
	  } // scopedId


	  if (scopeId) {
	    options._scopeId = scopeId;
	  }

	  var hook;

	  if (moduleIdentifier) {
	    // server build
	    hook = function hook(context) {
	      // 2.3 injection
	      context = context || // cached call
	      this.$vnode && this.$vnode.ssrContext || // stateful
	      this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext; // functional
	      // 2.2 with runInNewContext: true

	      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
	        context = __VUE_SSR_CONTEXT__;
	      } // inject component styles


	      if (style) {
	        style.call(this, createInjectorSSR(context));
	      } // register component module identifier for async chunk inference


	      if (context && context._registeredComponents) {
	        context._registeredComponents.add(moduleIdentifier);
	      }
	    }; // used by ssr in case component is cached and beforeCreate
	    // never gets called


	    options._ssrRegister = hook;
	  } else if (style) {
	    hook = shadowMode ? function () {
	      style.call(this, createInjectorShadow(this.$root.$options.shadowRoot));
	    } : function (context) {
	      style.call(this, createInjector(context));
	    };
	  }

	  if (hook) {
	    if (options.functional) {
	      // register for functional component in vue file
	      var originalRender = options.render;

	      options.render = function renderWithStyleInjection(h, context) {
	        hook.call(context);
	        return originalRender(h, context);
	      };
	    } else {
	      // inject component registration as beforeCreate hook
	      var existing = options.beforeCreate;
	      options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
	    }
	  }

	  return script;
	}

	var normalizeComponent_1 = normalizeComponent;

	/* script */
	const __vue_script__ = script;

	/* template */
	var __vue_render__ = function() {
	  var _vm = this;
	  var _h = _vm.$createElement;
	  var _c = _vm._self._c || _h;
	  return _c(
	    "div",
	    {
	      staticClass: "latte-autocomplete",
	      class: { "is-loading": _vm.isLoading }
	    },
	    [
	      _c(
	        "div",
	        { staticClass: "form-control", attrs: { disabled: _vm.disabled } },
	        [
	          _vm._l(_vm.values, function(selection) {
	            return [
	              _vm._t(
	                "selection",
	                [
	                  _c("span", { staticClass: "badge badge-primary" }, [
	                    _c("span", [_vm._v(_vm._s(selection.label))]),
	                    _vm._v(" "),
	                    _c(
	                      "button",
	                      {
	                        staticClass: "btn",
	                        on: {
	                          click: function($event) {
	                            return selection.remove()
	                          }
	                        }
	                      },
	                      [_c("i", { staticClass: "mdi mdi-window-close" })]
	                    )
	                  ])
	                ],
	                null,
	                selection
	              )
	            ]
	          }),
	          _vm._v(" "),
	          _vm.canSearch
	            ? _c("input", {
	                directives: [
	                  {
	                    name: "model",
	                    rawName: "v-model",
	                    value: _vm.searchTerm,
	                    expression: "searchTerm"
	                  }
	                ],
	                ref: "field",
	                staticClass: "form-control",
	                attrs: {
	                  type: "search",
	                  name: _vm.name,
	                  placeholder: _vm.placeholder,
	                  autocomplete: "false"
	                },
	                domProps: { value: _vm.searchTerm },
	                on: {
	                  focus: _vm.onFocus,
	                  keydown: [
	                    function($event) {
	                      if (
	                        !$event.type.indexOf("key") &&
	                        _vm._k($event.keyCode, "delete", [8, 46], $event.key, [
	                          "Backspace",
	                          "Delete",
	                          "Del"
	                        ])
	                      ) {
	                        return null
	                      }
	                      return _vm.onKeyPressDelete($event)
	                    },
	                    function($event) {
	                      if (
	                        !$event.type.indexOf("key") &&
	                        _vm._k($event.keyCode, "enter", 13, $event.key, "Enter")
	                      ) {
	                        return null
	                      }
	                      return _vm.onSelectSuggestion($event)
	                    },
	                    function($event) {
	                      if (
	                        !$event.type.indexOf("key") &&
	                        _vm._k($event.keyCode, "tab", 9, $event.key, "Tab")
	                      ) {
	                        return null
	                      }
	                      return _vm.onSelectFirstSuggestion($event)
	                    },
	                    function($event) {
	                      if (
	                        !$event.type.indexOf("key") &&
	                        _vm._k($event.keyCode, "down", 40, $event.key, [
	                          "Down",
	                          "ArrowDown"
	                        ])
	                      ) {
	                        return null
	                      }
	                      return _vm.onKeyPressDown($event)
	                    },
	                    function($event) {
	                      if (
	                        !$event.type.indexOf("key") &&
	                        _vm._k($event.keyCode, "up", 38, $event.key, [
	                          "Up",
	                          "ArrowUp"
	                        ])
	                      ) {
	                        return null
	                      }
	                      return _vm.onKeyPressUp($event)
	                    }
	                  ],
	                  input: function($event) {
	                    if ($event.target.composing) {
	                      return
	                    }
	                    _vm.searchTerm = $event.target.value;
	                  }
	                }
	              })
	            : _vm._e()
	        ],
	        2
	      ),
	      _vm._v(" "),
	      _c(
	        "div",
	        {
	          staticClass: "popup",
	          class: { "is-open": _vm.shouldOpenSuggestions },
	          attrs: { role: "combobox" }
	        },
	        [
	          _c("div", { staticClass: "popup-body" }, [
	            _c(
	              "nav",
	              { staticClass: "nav nav-list" },
	              [
	                _vm._l(_vm.suggestionsFiltered, function(suggestion, index) {
	                  return [
	                    _c(
	                      "a",
	                      {
	                        staticClass: "nav-link",
	                        class: { "is-hover": _vm.currentSuggestion === index },
	                        attrs: { role: "option" },
	                        on: {
	                          "&pointermove": function($event) {
	                            _vm.currentSuggestion = index;
	                          },
	                          click: _vm.onSelectSuggestion
	                        }
	                      },
	                      [
	                        _vm._t(
	                          "suggestion",
	                          [
	                            suggestion.sub_label
	                              ? _c("div", { staticClass: "flex-grow-1" }, [
	                                  _c("span", [
	                                    _vm._v(_vm._s(suggestion.label))
	                                  ]),
	                                  _vm._v(" "),
	                                  _c("span", { staticClass: "text-soft" }, [
	                                    _vm._v(_vm._s(suggestion.sub_label))
	                                  ])
	                                ])
	                              : _c("span", [_vm._v(_vm._s(suggestion.label))]),
	                            _vm._v(" "),
	                            _c("i", { staticClass: "mdi mdi-chevron-right" })
	                          ],
	                          null,
	                          suggestion
	                        )
	                      ],
	                      2
	                    )
	                  ]
	                })
	              ],
	              2
	            )
	          ])
	        ]
	      ),
	      _vm._v(" "),
	      _c("span", { staticClass: "spinner spinner-primary" })
	    ]
	  )
	};
	var __vue_staticRenderFns__ = [];
	__vue_render__._withStripped = true;

	  /* style */
	  const __vue_inject_styles__ = undefined;
	  /* scoped */
	  const __vue_scope_id__ = undefined;
	  /* module identifier */
	  const __vue_module_identifier__ = undefined;
	  /* functional template */
	  const __vue_is_functional_template__ = false;
	  /* style inject */
	  
	  /* style inject SSR */
	  

	  
	  var Autocomplete = normalizeComponent_1(
	    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
	    __vue_inject_styles__,
	    __vue_script__,
	    __vue_scope_id__,
	    __vue_is_functional_template__,
	    __vue_module_identifier__,
	    undefined,
	    undefined
	  );

	//

	var script$1 = {

		name: "latte-bottom-nav",

		props: {

			isShifting: {
				default: false,
				required: false,
				type: Boolean
			},

			isSide: {
				default: false,
				required: false,
				type: Boolean
			},

			value: {
				default: 0,
				required: false,
				type: Number
			}

		},

		mounted()
		{
			this.deactivateItems();
			this.activateItem(this.items[this.value]);
		},

		computed: {

			items()
			{
				return Array.from(this.$el.children)
					.filter(c => c.classList.contains("btn-action"))
					.filter(c => !c.disabled);
			}

		},

		methods: {

			activateItem(item)
			{
				item.classList.add("is-active");

				const rootRect = this.$el.getBoundingClientRect();
				const itemRect = item.getBoundingClientRect();

				this.$el.style.setProperty("--bottom-nav-ind-height", `${itemRect.height}px`);
				this.$el.style.setProperty("--bottom-nav-ind-pos", `${itemRect.top - rootRect.top}px`);
			},

			deactivateItems()
			{
				this.$el.querySelectorAll(".btn-action").forEach(item => item.classList.remove("is-active"));
			},

			onClick(evt)
			{
				const item = closest(evt.target, ".btn-action");

				if (item === null)
					return;

				this.deactivateItems();
				this.activateItem(item);

				this.$emit("input", Array.prototype.indexOf.call(this.$el.children, item));
			}

		},

		watch: {

			value()
			{
				this.deactivateItems();
				this.activateItem(this.items[this.value]);
			}

		}

	};

	/* script */
	const __vue_script__$1 = script$1;

	/* template */
	var __vue_render__$1 = function() {
	  var _vm = this;
	  var _h = _vm.$createElement;
	  var _c = _vm._self._c || _h;
	  return _c(
	    "nav",
	    {
	      staticClass: "bottom-nav",
	      class: {
	        "bottom-nav-shifting": _vm.isShifting,
	        "bottom-nav-side": _vm.isSide
	      },
	      on: { click: _vm.onClick }
	    },
	    [_vm._t("default")],
	    2
	  )
	};
	var __vue_staticRenderFns__$1 = [];
	__vue_render__$1._withStripped = true;

	  /* style */
	  const __vue_inject_styles__$1 = undefined;
	  /* scoped */
	  const __vue_scope_id__$1 = undefined;
	  /* module identifier */
	  const __vue_module_identifier__$1 = undefined;
	  /* functional template */
	  const __vue_is_functional_template__$1 = false;
	  /* style inject */
	  
	  /* style inject SSR */
	  

	  
	  var BottomNav = normalizeComponent_1(
	    { render: __vue_render__$1, staticRenderFns: __vue_staticRenderFns__$1 },
	    __vue_inject_styles__$1,
	    __vue_script__$1,
	    __vue_scope_id__$1,
	    __vue_is_functional_template__$1,
	    __vue_module_identifier__$1,
	    undefined,
	    undefined
	  );

	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//


	var script$2 = {

		name: "latte-button-dropdown",

		props: {

			ariaLabel: {
				default: "",
				required: false,
				type: String
			},

			buttonClass: {
				default: "btn-text btn-icon btn-dark",
				required: false,
				type: String
			},

			icon: {
				default: "",
				required: false,
				type: String
			},

			iconAfter: {
				default: "",
				required: false,
				type: String
			},

			iconBefore: {
				default: "",
				required: false,
				type: String
			},

			label: {
				default: "",
				required: false,
				type: String
			},

			marginX: {
				default: -9,
				required: false,
				type: Number
			},

			marginY: {
				default: 0,
				required: false,
				type: Number
			},

			small: {
				default: false,
				required: false,
				type: Boolean
			},

			tooltip: {
				default: "",
				required: false,
				type: String
			}

		},

		data()
		{
			return {
				isOpen: false,
				isRipple: false
			};
		},

		created()
		{
			this.isRipple = this.$parent.$options.name === "latte-ripple";
		},

		computed: {

			avatarUrl()
			{
				if (this.icon.substr(0, 6) === "avatar")
					return this.icon.substr(7);

				return null;
			},

			buttonClasses()
			{
				const classes = this.buttonClass.split(" ");

				if (this.small)
					classes.push("btn-sm");

				if (this.isOpen)
					classes.push("is-open", "tooltip-disabled");

				if (this.isRipple)
					classes.push("is-ripple");

				return classes;
			},

			iconClasses()
			{
				return ["mdi", `mdi-${this.icon}`];
			},

			iconAfterClasses()
			{
				return ["mdi", `mdi-${this.iconAfter}`];
			},

			iconBeforeClasses()
			{
				return ["mdi", `mdi-${this.iconBefore}`];
			},

			self()
			{
				return this;
			}

		},

		methods: {

			onClose()
			{
				this.isOpen = false;
			},

			onOpen()
			{
				this.isOpen = true;
			}

		}

	};

	/* script */
	const __vue_script__$2 = script$2;

	/* template */
	var __vue_render__$2 = function() {
	  var _vm = this;
	  var _h = _vm.$createElement;
	  var _c = _vm._self._c || _h;
	  return _c(
	    "button",
	    {
	      ref: "btn",
	      staticClass: "btn",
	      class: _vm.buttonClasses,
	      attrs: {
	        "data-tooltip": _vm.tooltip,
	        "data-tooltip-class": "tooltip-bottom",
	        "aria-label": _vm.ariaLabel
	      }
	    },
	    [
	      _vm.avatarUrl !== null
	        ? _c("img", {
	            staticClass: "avatar",
	            attrs: { src: _vm.avatarUrl, alt: _vm.ariaLabel }
	          })
	        : _vm.icon !== ""
	        ? _c("i", { class: _vm.iconClasses })
	        : _vm._e(),
	      _vm._v(" "),
	      _vm.iconBefore !== ""
	        ? _c("i", { class: _vm.iconBeforeClasses })
	        : _vm._e(),
	      _vm._v(" "),
	      _vm.label !== "" ? _c("span", [_vm._v(_vm._s(_vm.label))]) : _vm._e(),
	      _vm._v(" "),
	      _vm.iconAfter !== ""
	        ? _c("i", { class: _vm.iconAfterClasses })
	        : _vm._e(),
	      _vm._v(" "),
	      _vm._t("extra"),
	      _vm._v(" "),
	      _c(
	        "latte-popup",
	        {
	          attrs: {
	            "associate-with": _vm.$refs.btn,
	            "margin-x": _vm.marginX,
	            "margin-y": _vm.marginY
	          },
	          on: { close: _vm.onClose, open: _vm.onOpen }
	        },
	        [_vm._t("default", null, null, _vm.self)],
	        2
	      )
	    ],
	    2
	  )
	};
	var __vue_staticRenderFns__$2 = [];
	__vue_render__$2._withStripped = true;

	  /* style */
	  const __vue_inject_styles__$2 = undefined;
	  /* scoped */
	  const __vue_scope_id__$2 = undefined;
	  /* module identifier */
	  const __vue_module_identifier__$2 = undefined;
	  /* functional template */
	  const __vue_is_functional_template__$2 = false;
	  /* style inject */
	  
	  /* style inject SSR */
	  

	  
	  var ButtonDropdown = normalizeComponent_1(
	    { render: __vue_render__$2, staticRenderFns: __vue_staticRenderFns__$2 },
	    __vue_inject_styles__$2,
	    __vue_script__$2,
	    __vue_scope_id__$2,
	    __vue_is_functional_template__$2,
	    __vue_module_identifier__$2,
	    undefined,
	    undefined
	  );

	//

	var script$3 = {

		name: "latte-chart",

		props: {

			options: {
				default: () => ({}),
				required: false,
				type: Object
			},

			title: {
				default: null,
				required: false,
				type: String | null
			},

			url: {
				required: true,
				type: String
			}

		},

		data()
		{
			return {
				instance: null,
				is_loading: true,
				chartData: {},
				chartOptions: {}
			};
		},

		beforeCreate()
		{
			if (typeof self.Chart === "undefined")
				throw new Error("[LatteUI] <latte-chart> You must include chart.js on your page in order to use charts.")
		},

		mounted()
		{
			this.loadChart();
		},

		computed: {

			titleTransformed()
			{
				if (this.title === null)
					return null;

				return this.title.replace(new RegExp("\\${([a-zA-Z0-9_.\\[\\]]+)}"), (match, contents) =>
				{
					return new Function(`return new Intl.NumberFormat(navigator.language).format(this.${contents});`).call(this);
				});
			}

		},

		methods: {

			loadChart()
			{
				this.is_loading = true;

				request(this.url)
					.then(r => r.json())
					.then(r => this.onReceivedChart(r));
			},

			onReceivedChart(response)
			{
				if (response.success !== true)
					return;

				const canvas = this.$refs.chart;
				const chart = this.chartData = response.data;
				const tooltipOptions = {
					tooltips: {
						enabled: false,
						custom: model =>
						{
							if (model.opacity === 0)
							{
								dispatch("latte:tooltip:hide");
							}
							else
							{
								function genDataRow(line, colors)
								{
									return createElement("tr", tr =>
									{
										tr.appendChild(createElement("td", td =>
										{
											td.appendChild(createElement("div", div =>
											{
												div.classList.add("column-content", "pr-0");
												div.innerHTML = `<i class="mdi mdi-color" style="height: 18px; width: 18px; border-radius: 12px; background: ${colors.backgroundColor};"></i>`;
											}));
										}));

										tr.appendChild(createElement("td", td =>
										{
											td.appendChild(createElement("div", div =>
											{
												div.classList.add("column-content");
												div.innerHTML = line;
											}));
										}));
									});
								}

								function genTitleRow(title)
								{
									return createElement("tr", tr => tr.appendChild(createElement("th", th =>
									{
										th.setAttribute("colspan", 2);
										th.appendChild(createElement("div", div =>
										{
											div.classList.add("column-content", "font-weight-bold");
											div.innerText = title;
										}));
									})));
								}

								const rect = canvas.getBoundingClientRect();
								const table = createElement("table", table =>
								{
									table.classList.add("table", "table-compact");
									table.style.setProperty("--outline-color-secondary", "rgba(255, 255, 255, .05)");

									table.appendChild(createElement("thead", thead =>
									{
										model.title.forEach(title => thead.appendChild(genTitleRow(title)));
									}));

									table.appendChild(createElement("tbody", tbody =>
									{
										model.body.map(l => l.lines).forEach((line, i) => tbody.appendChild(genDataRow(line, model.labelColors[i])));
									}));

								});

								dispatch("latte:tooltip", {
									x: Math.floor(rect.left + model.caretX),
									y: Math.floor(rect.top + model.caretY),
									classes: ["p-0"],
									content: table,
									position: "vertical"
								});
							}
						},
						callbacks: {
							label: this.onTooltipLabel.bind(this)
						}
					}
				};

				this.$emit("change", chart);

				if (this.instance === null)
				{
					this.chartOptions = chart.options = deepMerge({}, tooltipOptions, chart.options, this.options);
					this.instance = new self.Chart(canvas, chart);
				}
				else
				{
					chart.data.datasets.forEach((dataset, index) =>
					{
						if (typeof this.instance.data.datasets[index] !== "undefined")
						{
							let remove = (this.instance.data.datasets[index].data.length > dataset.data.length ? this.instance.data.datasets[index].data.length - dataset.data.length : 0);

							for (let i = 0; i < remove; i++)
								this.instance.data.datasets[index].data.pop();

							dataset.data.forEach((data, i) => this.instance.data.datasets[index].data[i] = data);
						}
						else
						{
							this.instance.data.datasets.push(dataset);
						}
					});

					this.instance.data.labels = chart.data.labels;
					this.instance.update();
				}

				this.is_loading = false;
			},

			onTooltipLabel(tooltip, data)
			{
				if (!this.chartData)
					return "";

				const dataset = data.datasets[tooltip.datasetIndex];
				const value = dataset.data[tooltip.index];
				const valueFormatted = Intl !== undefined && Intl.NumberFormat !== undefined ? new Intl.NumberFormat(navigator.language)["format"](value) : value;

				if ((this.chartOptions.tooltips.transform || "default") === "percentage")
					return `${dataset.label}: ${value}%`;
				else
					return `${dataset.label}: ${valueFormatted}`;
			}

		},

		watch: {

			url()
			{
				this.loadChart();
			}

		}

	};

	/* script */
	const __vue_script__$3 = script$3;

	/* template */
	var __vue_render__$3 = function() {
	  var _vm = this;
	  var _h = _vm.$createElement;
	  var _c = _vm._self._c || _h;
	  return _c(
	    "div",
	    {
	      staticClass: "latte-charts latte-charts-line",
	      class: { "is-loading": _vm.is_loading }
	    },
	    [
	      _c("span", { staticClass: "spinner spinner-primary" }),
	      _vm._v(" "),
	      _vm.title !== null
	        ? _c("div", { staticClass: "latte-charts-title" }, [
	            _vm._v(_vm._s(_vm.titleTransformed))
	          ])
	        : _vm._e(),
	      _vm._v(" "),
	      _c("div", { staticClass: "latte-charts-chart" }, [
	        _c("canvas", { ref: "chart" })
	      ])
	    ]
	  )
	};
	var __vue_staticRenderFns__$3 = [];
	__vue_render__$3._withStripped = true;

	  /* style */
	  const __vue_inject_styles__$3 = undefined;
	  /* scoped */
	  const __vue_scope_id__$3 = undefined;
	  /* module identifier */
	  const __vue_module_identifier__$3 = undefined;
	  /* functional template */
	  const __vue_is_functional_template__$3 = false;
	  /* style inject */
	  
	  /* style inject SSR */
	  

	  
	  var Chart = normalizeComponent_1(
	    { render: __vue_render__$3, staticRenderFns: __vue_staticRenderFns__$3 },
	    __vue_inject_styles__$3,
	    __vue_script__$3,
	    __vue_scope_id__$3,
	    __vue_is_functional_template__$3,
	    __vue_module_identifier__$3,
	    undefined,
	    undefined
	  );

	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//


	var script$4 = {

		name: "latte-chart-panel",

		props: {

			url: {
				required: true,
				type: String
			}

		},

		data()
		{
			return {
				name: ""
			};
		},

		methods: {

			onChange(data)
			{
				this.name = data.name;
			}

		}

	};

	/* script */
	const __vue_script__$4 = script$4;

	/* template */
	var __vue_render__$4 = function() {
	  var _vm = this;
	  var _h = _vm.$createElement;
	  var _c = _vm._self._c || _h;
	  return _c(
	    "div",
	    { staticClass: "panel" },
	    [
	      _c(
	        "div",
	        { staticClass: "panel-header" },
	        [
	          _c("span", { staticClass: "panel-title" }, [
	            _vm._v(_vm._s(_vm.name))
	          ]),
	          _vm._v(" "),
	          _c(
	            "latte-button-dropdown",
	            {
	              staticClass: "ml-auto",
	              attrs: { icon: "dots-vertical", type: "list" }
	            },
	            [
	              _c("nav", { staticClass: "nav nav-list" }, [
	                _c(
	                  "a",
	                  {
	                    staticClass: "nav-link",
	                    on: {
	                      click: function($event) {
	                        return _vm.$refs.chart.loadChart()
	                      }
	                    }
	                  },
	                  [
	                    _c("i", { staticClass: "mdi mdi-refresh" }),
	                    _vm._v(" "),
	                    _c("span", [
	                      _vm._v(_vm._s(_vm._f("i18n")("Reload chart", "latte-ui")))
	                    ])
	                  ]
	                )
	              ])
	            ]
	          )
	        ],
	        1
	      ),
	      _vm._v(" "),
	      _c("latte-chart", {
	        ref: "chart",
	        attrs: { url: _vm.url },
	        on: { change: _vm.onChange }
	      })
	    ],
	    1
	  )
	};
	var __vue_staticRenderFns__$4 = [];
	__vue_render__$4._withStripped = true;

	  /* style */
	  const __vue_inject_styles__$4 = undefined;
	  /* scoped */
	  const __vue_scope_id__$4 = undefined;
	  /* module identifier */
	  const __vue_module_identifier__$4 = undefined;
	  /* functional template */
	  const __vue_is_functional_template__$4 = false;
	  /* style inject */
	  
	  /* style inject SSR */
	  

	  
	  var ChartPanel = normalizeComponent_1(
	    { render: __vue_render__$4, staticRenderFns: __vue_staticRenderFns__$4 },
	    __vue_inject_styles__$4,
	    __vue_script__$4,
	    __vue_scope_id__$4,
	    __vue_is_functional_template__$4,
	    __vue_module_identifier__$4,
	    undefined,
	    undefined
	  );

	//

	var script$5 = {

		name: "latte-combo-box",

		props: {

			value: {
				default: null,
				required: false
			}

		},

		data()
		{
			return {
				initialIndex: -1,
				isDropdownOpened: false,
				options: [],
				selectedOptionIndex: -1,
				selectedOptionClasses: []
			};
		},

		computed: {

			selectedOption()
			{
				const option = this.options[this.selectedOptionIndex];

				if (option !== undefined)
					return option;

				return null;
			},

			selectedOptionTemplate()
			{
				const option = this.selectedOption;

				if (option !== null)
				{
					this.selectedOptionClasses = [...option.$el.classList];

					return option.$el.innerHTML;
				}

				return null;
			}

		},

		methods: {

			close()
			{
				this.initialIndex = -1;
				this.isDropdownOpened = false;
			},

			open()
			{
				this.initialIndex = this.selectedOptionIndex;
				this.isDropdownOpened = true;
			},

			toggle()
			{
				this.isDropdownOpened = !this.isDropdownOpened;
			},

			checkValue()
			{
				this.selectedOptionIndex = this.options.findIndex(option => option.value === this.value);
			},

			registerOption(option)
			{
				this.options.push(option);
				this.checkValue();

				option.$on("select", option => this.onOptionSelect(option));
			},

			unregisterOption(option)
			{
				this.options.splice(this.options.findIndex(o => o === option), 1);
				this.checkValue();
			},

			onKeyPressDown()
			{
				this.open();

				if (this.selectedOptionIndex + 1 >= this.options.length)
					this.selectedOptionIndex = 0;
				else
					this.selectedOptionIndex++;
			},

			onKeyPressEnter()
			{
				this.close();
			},

			onKeyPressEscape(evt)
			{
				if (this.initialIndex !== -1)
					this.selectedOptionIndex = Math.min(Math.max(0, this.initialIndex), this.options.length - 1);

				this.close();

				evt.preventDefault();
			},

			onKeyPressUp()
			{
				this.open();

				if (this.selectedOptionIndex - 1 < 0)
					this.selectedOptionIndex = this.options.length - 1;
				else
					this.selectedOptionIndex--;
			},

			onOptionSelect(option)
			{
				raf(() => this.close(), 50);

				this.selectedOptionIndex = this.options.findIndex(o => o === option);
			}

		},

		watch: {

			selectedOptionIndex()
			{
				this.options.forEach(option => this.$set(option, "active", false));

				if (this.selectedOption !== null)
				{
					this.$emit("input", this.selectedOption.value);
					this.$set(this.selectedOption, "active", true);
				}
				else
				{
					this.$emit("input", null);
				}
			},

			value()
			{
				this.checkValue();
			}

		}

	};

	/* script */
	const __vue_script__$5 = script$5;

	/* template */
	var __vue_render__$5 = function() {
	  var _vm = this;
	  var _h = _vm.$createElement;
	  var _c = _vm._self._c || _h;
	  return _c(
	    "div",
	    {
	      staticClass: "form-control combo-box",
	      attrs: { tabindex: "0" },
	      on: {
	        blur: _vm.close,
	        click: _vm.toggle,
	        keydown: [
	          function($event) {
	            if (
	              !$event.type.indexOf("key") &&
	              _vm._k($event.keyCode, "down", 40, $event.key, [
	                "Down",
	                "ArrowDown"
	              ])
	            ) {
	              return null
	            }
	            return _vm.onKeyPressDown($event)
	          },
	          function($event) {
	            if (
	              !$event.type.indexOf("key") &&
	              _vm._k($event.keyCode, "enter", 13, $event.key, "Enter")
	            ) {
	              return null
	            }
	            return _vm.onKeyPressEnter($event)
	          },
	          function($event) {
	            if (
	              !$event.type.indexOf("key") &&
	              _vm._k($event.keyCode, "esc", 27, $event.key, ["Esc", "Escape"])
	            ) {
	              return null
	            }
	            return _vm.onKeyPressEscape($event)
	          },
	          function($event) {
	            if (
	              !$event.type.indexOf("key") &&
	              _vm._k($event.keyCode, "up", 38, $event.key, ["Up", "ArrowUp"])
	            ) {
	              return null
	            }
	            return _vm.onKeyPressUp($event)
	          }
	        ]
	      }
	    },
	    [
	      _vm.selectedOptionTemplate !== null
	        ? _c("a", {
	            staticClass: "combo-box-selection",
	            class: _vm.selectedOptionClasses,
	            domProps: { innerHTML: _vm._s(_vm.selectedOptionTemplate) }
	          })
	        : _c("div", { staticClass: "combo-box-empty" }, [_vm._v("Select...")]),
	      _vm._v(" "),
	      _vm._m(0),
	      _vm._v(" "),
	      _c(
	        "div",
	        {
	          staticClass: "popup",
	          class: { "is-open": _vm.isDropdownOpened },
	          attrs: { role: "combobox" }
	        },
	        [
	          _c("div", { staticClass: "popup-body" }, [
	            _c("nav", { staticClass: "nav nav-list" }, [_vm._t("default")], 2)
	          ])
	        ]
	      )
	    ]
	  )
	};
	var __vue_staticRenderFns__$5 = [
	  function() {
	    var _vm = this;
	    var _h = _vm.$createElement;
	    var _c = _vm._self._c || _h;
	    return _c(
	      "button",
	      {
	        staticClass: "btn btn-text btn-icon btn-dark form-control-suffix",
	        attrs: { type: "button" }
	      },
	      [_c("i", { staticClass: "mdi mdi-chevron-down" })]
	    )
	  }
	];
	__vue_render__$5._withStripped = true;

	  /* style */
	  const __vue_inject_styles__$5 = undefined;
	  /* scoped */
	  const __vue_scope_id__$5 = undefined;
	  /* module identifier */
	  const __vue_module_identifier__$5 = undefined;
	  /* functional template */
	  const __vue_is_functional_template__$5 = false;
	  /* style inject */
	  
	  /* style inject SSR */
	  

	  
	  var ComboBox = normalizeComponent_1(
	    { render: __vue_render__$5, staticRenderFns: __vue_staticRenderFns__$5 },
	    __vue_inject_styles__$5,
	    __vue_script__$5,
	    __vue_scope_id__$5,
	    __vue_is_functional_template__$5,
	    __vue_module_identifier__$5,
	    undefined,
	    undefined
	  );

	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//


	var script$6 = {

		name: "latte-combo-box-item",

		props: {

			value: {
				required: true
			}

		},

		beforeDestroy()
		{
			this.$parent.unregisterOption(this);
		},

		data()
		{
			return {
				active: false
			};
		},

		mounted()
		{
			this.$parent.registerOption(this);
		},

		methods: {

			click()
			{
				this.$emit("select", this);
			}

		}

	};

	/* script */
	const __vue_script__$6 = script$6;

	/* template */
	var __vue_render__$6 = function() {
	  var _vm = this;
	  var _h = _vm.$createElement;
	  var _c = _vm._self._c || _h;
	  return _c(
	    "a",
	    {
	      staticClass: "nav-link",
	      class: { "is-hover": _vm.active },
	      attrs: { role: "option" },
	      on: { click: _vm.click }
	    },
	    [_vm._t("default")],
	    2
	  )
	};
	var __vue_staticRenderFns__$6 = [];
	__vue_render__$6._withStripped = true;

	  /* style */
	  const __vue_inject_styles__$6 = undefined;
	  /* scoped */
	  const __vue_scope_id__$6 = undefined;
	  /* module identifier */
	  const __vue_module_identifier__$6 = undefined;
	  /* functional template */
	  const __vue_is_functional_template__$6 = false;
	  /* style inject */
	  
	  /* style inject SSR */
	  

	  
	  var ComboBoxItem = normalizeComponent_1(
	    { render: __vue_render__$6, staticRenderFns: __vue_staticRenderFns__$6 },
	    __vue_inject_styles__$6,
	    __vue_script__$6,
	    __vue_scope_id__$6,
	    __vue_is_functional_template__$6,
	    __vue_module_identifier__$6,
	    undefined,
	    undefined
	  );

	//

	var script$7 = {

		name: "latte-data-fragment",

		props: {

			as: {
				default: "div",
				required: false,
				type: String
			},

			initialParams: {
				default: () => ({}),
				required: false,
				type: Object

			},

			url: {
				default: null,
				required: true,
				type: String | null
			}

		},

		data()
		{
			return {
				data: null,
				isLoading: false,
				params: this.initialParams
			};
		},

		mounted()
		{
			this.load();
		},

		methods: {

			load()
			{
				this.reset();

				if (this.url === null)
					return;

				this.isLoading = true;

				const params = new URLSearchParams(this.params);

				request(`${this.url}?${params}`)
					.then(r => r.json())
					.then(r => this.onReceivedData(r))
					.catch(err => handleError(err));
			},

			reset()
			{
				this.data = null;
			},

			setParam(name, value)
			{
				this.$set(this.params, name, value);
			},

			onReceivedData(response)
			{
				this.data = response.data;
				this.isLoading = false;
			}

		},

		watch: {

			params: {
				deep: true,
				handler()
				{
					this.load();
				}
			},

			url()
			{
				this.load();
			}

		}

	};

	/* script */
	const __vue_script__$7 = script$7;

	/* template */
	var __vue_render__$7 = function() {
	  var _vm = this;
	  var _h = _vm.$createElement;
	  var _c = _vm._self._c || _h;
	  return _c(
	    _vm.as,
	    { tag: "component" },
	    [
	      _vm._t("default", null, {
	        data: _vm.data,
	        isLoading: _vm.isLoading,
	        params: _vm.params,
	        setParam: _vm.setParam
	      })
	    ],
	    2
	  )
	};
	var __vue_staticRenderFns__$7 = [];
	__vue_render__$7._withStripped = true;

	  /* style */
	  const __vue_inject_styles__$7 = undefined;
	  /* scoped */
	  const __vue_scope_id__$7 = undefined;
	  /* module identifier */
	  const __vue_module_identifier__$7 = undefined;
	  /* functional template */
	  const __vue_is_functional_template__$7 = false;
	  /* style inject */
	  
	  /* style inject SSR */
	  

	  
	  var DataFragment = normalizeComponent_1(
	    { render: __vue_render__$7, staticRenderFns: __vue_staticRenderFns__$7 },
	    __vue_inject_styles__$7,
	    __vue_script__$7,
	    __vue_scope_id__$7,
	    __vue_is_functional_template__$7,
	    __vue_module_identifier__$7,
	    undefined,
	    undefined
	  );

	//

	const columnDefaults = {
		is_searchable: false,
		is_sortable: false,
		width: 0
	};

	async function urlDataSource(url)
	{
		const response = await request(url)
			.then(r => r.json())
			.then(r => r.data)
			.catch(err => handleError(err));

		return {
			actions: response.actions,
			columns: response.columns,
			initial_data: response.initial_data,
			limit: response.limit,
			offset: response.offset,

			async requestData(offset, limit, filters, params, sorting)
			{
				let queryString = `offset=${offset}&limit=${limit}`;

				if (sorting !== null)
					queryString += `&sort=${sorting.order}&by=${sorting.by}`;

				for (let key in filters)
					if (filters.hasOwnProperty(key))
						queryString += `&filter[${key}]=${filters[key]}`;

				for (let key in params)
					if (params.hasOwnProperty(key))
						queryString += `&${key}=${params[key]}`;

				return request(`${url}/data?${queryString}`)
					.then(r => r.json())
					.then(r => r.data)
					.catch(err => handleError(err));
			}
		};
	}

	var script$8 = {

		name: "latte-data-table",

		props: {

			addSpinnerToParent: {
				default: false,
				required: false,
				type: Boolean
			},

			dataSource: {
				default: null,
				required: true,
				type: Function | String | null
			},

			defaultLimit: {
				default: 20,
				required: false,
				type: Number
			},

			name: {
				default: () => id(),
				required: false,
				type: String
			},

			numColumns: {
				default: null,
				required: false,
				type: Number | null
			},

			selectMode: {
				default: "none",
				required: false,
				type: String,
				validator: value => ["none", "single", "multiple"].indexOf(value) > -1
			},

			showHeader: {
				default: true,
				required: false,
				type: Boolean
			},

			showSearch: {
				default: true,
				required: false,
				type: Boolean
			},

			showSorting: {
				default: true,
				required: false,
				type: Boolean
			},

			value: {
				default: () => [],
				required: false,
				type: Array | Number
			}

		},

		beforeDestroy()
		{
			if (this.spinner !== null)
				this.spinner.remove();

			this.subscriptions.refresh.unsubscribe();
		},

		data()
		{
			return {
				subscriptions: {
					refresh: null
				},
				isLoading: false,
				actions: [],
				columns: [],
				data: [],
				dsi: undefined,
				filters: [],
				limit: this.defaultLimit,
				notice: undefined,
				offset: 0,
				pagination: [],
				params: {},
				selection: this.value,
				sort: {
					by: "",
					order: 'DESC'
				},
				spinner: null,
				total: 0,
				uniqueId: id()
			};
		},

		mounted()
		{
			this.subscriptions.refresh = on("data-tables:refresh", () => this.reload());

			this.addSpinner();
		},

		computed: {

			actionsWidth()
			{
				return 52;
			},

			amountOfColumns()
			{
				if (this.numColumns !== null)
					return this.numColumns + (this.hasActions ? 1 : 0) + (this.isSelectionMode ? 1 : 0);

				return this.columns.length + (this.hasActions ? 1 : 0) + (this.isSelectionMode ? 1 : 0);
			},

			hasActions()
			{
				return this.actions && this.actions.length > 0;
			},

			isSelectionMode()
			{
				return this.selectMode !== "none";
			}

		},

		methods: {

			addFilter(filter)
			{
				for (let i in this.filters)
					if (this.filters.hasOwnProperty(i))
						if (this.filters[i].property === filter.property && this.filters[i]["value"] === filter["value"])
							return;

				this.offset = 0;

				filter.class = filter.class || "badge-info";

				this.filters.push(filter);
				this.loadData();
			},

			addSpinner()
			{
				if (!this.addSpinnerToParent)
					return;

				this.spinner = createElement("span", span => span.classList.add("spinner", "spinner-primary"));
				closest(this.$el, ".panel").append(this.spinner);
			},

			removeFilter(evt, filterKey)
			{
				this.offset = 0;

				this.filters.splice(filterKey, 1);
				this.loadData();

				evt.preventDefault();
				evt.stopPropagation();
			},

			createRowColumn(row, column)
			{
				const $this = this;
				const uniqueId = this.uniqueId;

				const badgesHTML = `	<template v-for="badge of (row.badges || [])">
										<a class="badge ml-2" :class="['badge-' + badge.type]" @click="applyFilter($event, badge.filter, badge.type)" v-if="badge.filter !== null">{{ badge.message }}</a>
										<span class="badge ml-2" :class="['badge-' + badge.type]" v-if="badge.filter === null">{{ badge.message }}</span>
									</template>`;

				column.template = column.template.replace(`<slot name="badges"></slot>`, badgesHTML);

				return Vue.extend({

					template: column.template,

					data()
					{
						return {column, row, uniqueId};
					},

					methods: {

						addFilter(property, value, label = undefined, filterClass = "primary")
						{
							label = label || value;

							$this.addFilter({property, value, label, class: filterClass});
						},

						applyFilter(evt, filter, filterClass)
						{
							filter.class = `badge-${filterClass}`;
							$this.addFilter(filter);

							evt.preventDefault();
							evt.stopPropagation();
						}

					}

				});
			},

			loadData()
			{
				this.isLoading = true;

				const filters = {};
				const params = {};
				const sorting = this.sort.by.trim() !== "" ? {order: this.sort.order, by: this.sort.by} : null;

				for (let key in this.params)
					if (this.params.hasOwnProperty(key) && !isNullOrWhitespace(this.params[key]))
						params[key] = encodeURIComponent(params[key]);

				for (let i in this.filters)
					if (this.filters.hasOwnProperty(i))
						if (!isNullOrWhitespace(this.filters[i].value.toString()))
							filters[this.filters[i].property] = this.filters[i]["value"];

				this.dsi.requestData(this.offset, this.limit, filters, params, sorting)
					.then(r => this.onReceivedData(r))
					.catch(err => handleError(err));
			},

			loadSetup()
			{
				this.isLoading = true;

				this.actions = this.dsi.actions;
				this.columns = this.dsi.columns.map(column => Object.assign({}, columnDefaults, column));

				if (this.dsi.sorting !== undefined)
					this.sort = this.dsi.sorting;

				if (this.dsi.initial_data !== undefined)
					this.onReceivedData(this.dsi.initial_data);
				else
					this.loadData();
			},

			navigateToOffset(offset)
			{
				this.offset = offset;
				this.loadData();
			},

			onReceivedData(response)
			{
				if (!response)
					return handleError(new Error("Response is invalid."));

				this.data = response.data;
				this.pagination = response.pagination;
				this.total = response.total || 0;

				this.isLoading = false;
			},

			reload()
			{
				this.loadData();
			},

			search(field, value, evt)
			{
				if (evt)
				{
					evt.preventDefault();
					evt.stopPropagation();
				}

				this.params[field] = value;
				this.offset = 0;
				this.loadData();
			},

			setLimit(limit)
			{
				this.limit = limit;
				this.offset = 0;
				this.loadData();
			},

			sortBy(field)
			{
				if (this.sort.by === field)
					this.sort.order = this.sort.order === "DESC" ? "ASC" : "DESC";

				this.sort.by = field;
				this.loadData();
			}

		},

		watch: {

			dataSource: {
				deep: true,
				immediate: true,
				async handler()
				{
					if (this.dataSource === undefined)
						throw new Error("dataSource is undefined.");

					if (typeof this.dataSource === "string")
						this.dsi = await urlDataSource(this.dataSource);
					else
						this.dsi = await this.dataSource();

					if (!this.dsi)
						throw new Error("Invalid data source instance.");

					this.loadSetup();
				}
			},

			isLoading()
			{
				this.$emit("loading", this.isLoading);

				if (!this.addSpinnerToParent)
					return;

				const parent = closest(this.$el, ".panel");

				if (this.isLoading)
					parent.classList.add("is-loading");
				else
					parent.classList.remove("is-loading");
			},

			selection()
			{
				this.$emit("input", this.selection);
			},

			value()
			{
				this.selection = this.value;
			}

		}

	};

	/* script */
	const __vue_script__$8 = script$8;

	/* template */
	var __vue_render__$8 = function() {
	  var _vm = this;
	  var _h = _vm.$createElement;
	  var _c = _vm._self._c || _h;
	  return _c("table", { staticClass: "table table-hover mb-0" }, [
	    _c("thead", [
	      _vm.showHeader
	        ? _c(
	            "tr",
	            [
	              _vm._t(
	                "data-header",
	                [
	                  _vm.isSelectionMode
	                    ? _c("th", { staticStyle: { width: "42px" } })
	                    : _vm._e(),
	                  _vm._v(" "),
	                  _vm._l(_vm.columns, function(column) {
	                    return _c(
	                      "th",
	                      {
	                        style: {
	                          "min-width": column.width
	                            ? column.width + "px"
	                            : "auto",
	                          width: column.width ? column.width + "px" : "auto"
	                        },
	                        attrs: { "data-field": column.field }
	                      },
	                      [
	                        _c(
	                          "div",
	                          {
	                            staticClass:
	                              "column-content flex-row align-items-center justify-content-start"
	                          },
	                          [
	                            _c("span", [_vm._v(_vm._s(column.label))]),
	                            _vm._v(" "),
	                            _vm.showSorting && column.is_sortable
	                              ? _c("latte-sorting-button", {
	                                  attrs: {
	                                    "is-sorting": _vm.sort.by === column.field,
	                                    "is-sorting-ascending":
	                                      _vm.sort.order === "ASC",
	                                    "button-class":
	                                      "btn btn-icon btn-text btn-dark btn-sm ml-1",
	                                    "aria-label": _vm._f("i18n")(
	                                      "Sort by @0",
	                                      "latte-ui",
	                                      [column.label]
	                                    )
	                                  },
	                                  on: {
	                                    click: function($event) {
	                                      return _vm.sortBy(column.field)
	                                    }
	                                  }
	                                })
	                              : _vm._e()
	                          ],
	                          1
	                        )
	                      ]
	                    )
	                  }),
	                  _vm._v(" "),
	                  _vm.hasActions
	                    ? _c("th", { style: { width: _vm.actionsWidth + "px" } }, [
	                        _vm._m(0)
	                      ])
	                    : _vm._e()
	                ],
	                {
	                  columns: _vm.columns,
	                  isLoading: _vm.isLoading,
	                  isSelectionMode: _vm.isSelectionMode,
	                  selection: _vm.selection,
	                  selectMode: _vm.selectMode,
	                  uniqueId: _vm.uniqueId
	                }
	              )
	            ],
	            2
	          )
	        : _vm._e(),
	      _vm._v(" "),
	      _vm.showSearch
	        ? _c(
	            "tr",
	            { staticClass: "search-row" },
	            [
	              _vm._t(
	                "data-search",
	                [
	                  _vm.isSelectionMode
	                    ? _c("th", { staticStyle: { width: "42px" } })
	                    : _vm._e(),
	                  _vm._v(" "),
	                  _vm._l(_vm.columns, function(column) {
	                    return _c(
	                      "th",
	                      {
	                        style: {
	                          width: column.width ? column.width + "px" : "auto"
	                        },
	                        attrs: { "data-field": column.field }
	                      },
	                      [
	                        column.is_searchable
	                          ? _c("input", {
	                              attrs: {
	                                type: "search",
	                                placeholder: _vm._f("i18n")(
	                                  "Search",
	                                  "latte-ui"
	                                ),
	                                "aria-label": _vm._f("i18n")(
	                                  "Search by @0",
	                                  "data-table",
	                                  [column.label]
	                                )
	                              },
	                              on: {
	                                keydown: function($event) {
	                                  if (
	                                    !$event.type.indexOf("key") &&
	                                    _vm._k(
	                                      $event.keyCode,
	                                      "enter",
	                                      13,
	                                      $event.key,
	                                      "Enter"
	                                    )
	                                  ) {
	                                    return null
	                                  }
	                                  return _vm.search(
	                                    column.field,
	                                    $event.target.value,
	                                    $event
	                                  )
	                                }
	                              }
	                            })
	                          : _vm._e()
	                      ]
	                    )
	                  }),
	                  _vm._v(" "),
	                  _vm.hasActions ? _c("th") : _vm._e()
	                ],
	                {
	                  columns: _vm.columns,
	                  isLoading: _vm.isLoading,
	                  isSelectionMode: _vm.isSelectionMode,
	                  search: _vm.search,
	                  selection: _vm.selection,
	                  selectMode: _vm.selectMode,
	                  uniqueId: _vm.uniqueId
	                }
	              )
	            ],
	            2
	          )
	        : _vm._e(),
	      _vm._v(" "),
	      _vm.filters.length > 0
	        ? _c("tr", [
	            _c("td", { attrs: { colspan: _vm.amountOfColumns } }, [
	              _c(
	                "div",
	                {
	                  staticClass: "column-content flex-row justify-content-start"
	                },
	                [
	                  _vm._l(_vm.filters, function(filter, filterKey) {
	                    return [
	                      _c(
	                        "span",
	                        { staticClass: "badge mr-1", class: filter.class },
	                        [
	                          _c("span", [_vm._v(_vm._s(filter.label))]),
	                          _vm._v(" "),
	                          _c(
	                            "button",
	                            {
	                              staticClass: "btn",
	                              on: {
	                                click: function($event) {
	                                  return _vm.removeFilter($event, filterKey)
	                                }
	                              }
	                            },
	                            [_c("i", { staticClass: "mdi mdi-window-close" })]
	                          )
	                        ]
	                      )
	                    ]
	                  })
	                ],
	                2
	              )
	            ])
	          ])
	        : _vm._e()
	    ]),
	    _vm._v(" "),
	    _c(
	      "tbody",
	      _vm._l(_vm.data, function(row, rowKey) {
	        return _c(
	          "tr",
	          [
	            _vm._t(
	              "data-row",
	              [
	                _vm.isSelectionMode
	                  ? _c(
	                      "td",
	                      { staticStyle: { width: "42px", "z-index": "1" } },
	                      [
	                        _c("div", { staticClass: "column-content pr-0" }, [
	                          _vm.selectMode === "single"
	                            ? _c("input", {
	                                directives: [
	                                  {
	                                    name: "model",
	                                    rawName: "v-model",
	                                    value: _vm.selection,
	                                    expression: "selection"
	                                  }
	                                ],
	                                staticClass:
	                                  "radio-button radio-button-primary mr-0",
	                                attrs: {
	                                  type: "radio",
	                                  id: _vm.uniqueId + ":" + row.id,
	                                  name: _vm.name
	                                },
	                                domProps: {
	                                  value: row.id,
	                                  checked: _vm._q(_vm.selection, row.id)
	                                },
	                                on: {
	                                  change: function($event) {
	                                    _vm.selection = row.id;
	                                  }
	                                }
	                              })
	                            : _vm._e(),
	                          _vm._v(" "),
	                          _vm.selectMode === "multiple"
	                            ? _c("input", {
	                                directives: [
	                                  {
	                                    name: "model",
	                                    rawName: "v-model",
	                                    value: _vm.selection,
	                                    expression: "selection"
	                                  }
	                                ],
	                                staticClass: "checkbox checkbox-primary mr-0",
	                                attrs: {
	                                  type: "checkbox",
	                                  id: _vm.uniqueId + ":" + row.id,
	                                  name: _vm.name + "[]"
	                                },
	                                domProps: {
	                                  value: row.id,
	                                  checked: Array.isArray(_vm.selection)
	                                    ? _vm._i(_vm.selection, row.id) > -1
	                                    : _vm.selection
	                                },
	                                on: {
	                                  change: function($event) {
	                                    var $$a = _vm.selection,
	                                      $$el = $event.target,
	                                      $$c = $$el.checked ? true : false;
	                                    if (Array.isArray($$a)) {
	                                      var $$v = row.id,
	                                        $$i = _vm._i($$a, $$v);
	                                      if ($$el.checked) {
	                                        $$i < 0 &&
	                                          (_vm.selection = $$a.concat([$$v]));
	                                      } else {
	                                        $$i > -1 &&
	                                          (_vm.selection = $$a
	                                            .slice(0, $$i)
	                                            .concat($$a.slice($$i + 1)));
	                                      }
	                                    } else {
	                                      _vm.selection = $$c;
	                                    }
	                                  }
	                                }
	                              })
	                            : _vm._e()
	                        ])
	                      ]
	                    )
	                  : _vm._e(),
	                _vm._v(" "),
	                _vm._l(_vm.columns, function(column, columnKey) {
	                  return [
	                    _c(
	                      "td",
	                      {
	                        style: {
	                          width: column.width ? column.width + "px" : "auto"
	                        },
	                        attrs: {
	                          "data-field": column.field,
	                          "data-row": rowKey,
	                          "data-column": columnKey
	                        }
	                      },
	                      [
	                        _c(_vm.createRowColumn(row, column), {
	                          tag: "component"
	                        })
	                      ],
	                      1
	                    )
	                  ]
	                }),
	                _vm._v(" "),
	                _vm.hasActions
	                  ? _c("latte-data-table-actions", {
	                      attrs: { actions: _vm.actions, row: row }
	                    })
	                  : _vm._e()
	              ],
	              {
	                actions: _vm.actions,
	                columns: _vm.columns,
	                hasActions: _vm.hasActions,
	                isLoading: _vm.isLoading,
	                row: row,
	                rowKey: rowKey,
	                isSelectionMode: _vm.isSelectionMode,
	                selection: _vm.selection,
	                selectMode: _vm.selectMode,
	                uniqueId: _vm.uniqueId
	              }
	            )
	          ],
	          2
	        )
	      }),
	      0
	    ),
	    _vm._v(" "),
	    _c("tfoot", [
	      _vm.total > _vm.limit
	        ? _c("tr", [
	            _c("th", { attrs: { colspan: _vm.amountOfColumns } }, [
	              _c(
	                "div",
	                { staticClass: "column-content" },
	                [
	                  _c("latte-pagination", {
	                    attrs: {
	                      "controller-bar": "",
	                      limit: _vm.limit,
	                      offset: _vm.offset,
	                      total: _vm.total
	                    },
	                    on: { limit: _vm.setLimit, navigate: _vm.navigateToOffset }
	                  })
	                ],
	                1
	              )
	            ])
	          ])
	        : _vm._e()
	    ])
	  ])
	};
	var __vue_staticRenderFns__$8 = [
	  function() {
	    var _vm = this;
	    var _h = _vm.$createElement;
	    var _c = _vm._self._c || _h;
	    return _c("div", { staticClass: "column-content" }, [
	      _c("span", [_vm._v(" ")])
	    ])
	  }
	];
	__vue_render__$8._withStripped = true;

	  /* style */
	  const __vue_inject_styles__$8 = undefined;
	  /* scoped */
	  const __vue_scope_id__$8 = undefined;
	  /* module identifier */
	  const __vue_module_identifier__$8 = undefined;
	  /* functional template */
	  const __vue_is_functional_template__$8 = false;
	  /* style inject */
	  
	  /* style inject SSR */
	  

	  
	  var DataTable = normalizeComponent_1(
	    { render: __vue_render__$8, staticRenderFns: __vue_staticRenderFns__$8 },
	    __vue_inject_styles__$8,
	    __vue_script__$8,
	    __vue_scope_id__$8,
	    __vue_is_functional_template__$8,
	    __vue_module_identifier__$8,
	    undefined,
	    undefined
	  );

	//

	var script$9 = {

		name: "latte-data-table-actions",

		props: {

			actions: {
				default: () => [],
				required: true,
				type: Array
			},

			row: {
				default: () => ({}),
				required: true,
				type: Object
			}

		},

		methods: {

			createAction(action, row)
			{
				return Vue.extend({

					template: action.template,

					data()
					{
						return {action, row};
					}

				});
			}

		}

	};

	/* script */
	const __vue_script__$9 = script$9;

	/* template */
	var __vue_render__$9 = function() {
	  var _vm = this;
	  var _h = _vm.$createElement;
	  var _c = _vm._self._c || _h;
	  return _c("td", { staticClass: "actions" }, [
	    _c(
	      "div",
	      { staticClass: "column-content flex-row align-items-center pl-0" },
	      [
	        _c(
	          "latte-button-dropdown",
	          {
	            attrs: {
	              "aria-label": _vm._f("i18n")("More options...", "latte-ui"),
	              icon: "dots-vertical"
	            }
	          },
	          [
	            _c(
	              "nav",
	              { staticClass: "nav nav-list" },
	              _vm._l(_vm.actions, function(action, actionKey) {
	                return _c(_vm.createAction(action, _vm.row), {
	                  key: actionKey,
	                  tag: "component",
	                  attrs: { "data-close": "" }
	                })
	              }),
	              1
	            )
	          ]
	        )
	      ],
	      1
	    )
	  ])
	};
	var __vue_staticRenderFns__$9 = [];
	__vue_render__$9._withStripped = true;

	  /* style */
	  const __vue_inject_styles__$9 = undefined;
	  /* scoped */
	  const __vue_scope_id__$9 = undefined;
	  /* module identifier */
	  const __vue_module_identifier__$9 = undefined;
	  /* functional template */
	  const __vue_is_functional_template__$9 = false;
	  /* style inject */
	  
	  /* style inject SSR */
	  

	  
	  var DataTableActions = normalizeComponent_1(
	    { render: __vue_render__$9, staticRenderFns: __vue_staticRenderFns__$9 },
	    __vue_inject_styles__$9,
	    __vue_script__$9,
	    __vue_scope_id__$9,
	    __vue_is_functional_template__$9,
	    __vue_module_identifier__$9,
	    undefined,
	    undefined
	  );

	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//


	var script$a = {

		name: "latte-datepicker",

		props: {

			id: {
				default: "date",
				required: false,
				type: String
			},

			name: {
				default: "date",
				required: false,
				type: String
			},

			placeholder: {
				default: "",
				required: false,
				type: String
			},

			value: {
				default: () => new Date(),
				required: false,
				type: Date
			}

		},

		data()
		{
			return {
				current: this.value
			};
		},

		computed: {

			inputValue()
			{
				return this.moment(this.current).format("YYYY-MM-DD");
			}

		},

		watch: {

			current()
			{
				this.$emit("input", this.current);
				this.$refs.popup.close();
			},

			value()
			{
				this.current = this.value;
			}

		}

	};

	/* script */
	const __vue_script__$a = script$a;

	/* template */
	var __vue_render__$a = function() {
	  var _vm = this;
	  var _h = _vm.$createElement;
	  var _c = _vm._self._c || _h;
	  return _c(
	    "div",
	    { staticClass: "datepicker" },
	    [
	      _c("input", {
	        ref: "input",
	        staticClass: "form-control",
	        attrs: {
	          readonly: "",
	          id: _vm.id,
	          name: _vm.name,
	          placeholder: _vm.placeholder,
	          type: "date"
	        },
	        domProps: { value: _vm.inputValue }
	      }),
	      _vm._v(" "),
	      _c(
	        "latte-popup",
	        {
	          ref: "popup",
	          staticStyle: { width: "384px" },
	          attrs: { "associate-with": _vm.$refs.input }
	        },
	        [
	          _c("latte-datepicker-calendar", {
	            model: {
	              value: _vm.current,
	              callback: function($$v) {
	                _vm.current = $$v;
	              },
	              expression: "current"
	            }
	          })
	        ],
	        1
	      )
	    ],
	    1
	  )
	};
	var __vue_staticRenderFns__$a = [];
	__vue_render__$a._withStripped = true;

	  /* style */
	  const __vue_inject_styles__$a = undefined;
	  /* scoped */
	  const __vue_scope_id__$a = undefined;
	  /* module identifier */
	  const __vue_module_identifier__$a = undefined;
	  /* functional template */
	  const __vue_is_functional_template__$a = false;
	  /* style inject */
	  
	  /* style inject SSR */
	  

	  
	  var DatePicker = normalizeComponent_1(
	    { render: __vue_render__$a, staticRenderFns: __vue_staticRenderFns__$a },
	    __vue_inject_styles__$a,
	    __vue_script__$a,
	    __vue_scope_id__$a,
	    __vue_is_functional_template__$a,
	    __vue_module_identifier__$a,
	    undefined,
	    undefined
	  );

	//

	var script$b = {

		name: "latte-datepicker-calendar",

		props: {

			bodyClass: {
				default: "",
				required: false,
				type: String
			},

			value: {
				default: () => new Date(),
				required: false,
				type: Date
			}

		},

		data()
		{
			return {
				selectedMonth: 3,
				selectedView: "dates",
				selectedYear: 1996
			};
		},

		computed: {

			dates()
			{
				let dates = [];
				let monthDays = this.monthEndDate.getDate();
				let beforeDates = Math.max(0, this.monthBeginDate.getDay() - 1);

				for (let x = beforeDates - 1; x >= 0; x--)
					dates.push(new Date(Date.UTC(this.selectedYear, this.selectedMonth - 1, 0 - x, 0, 0, 0)));

				for (let x = 1; x <= monthDays; x++)
					dates.push(new Date(Date.UTC(this.selectedYear, this.selectedMonth - 1, x, 0, 0, 0)));

				const rows = Math.ceil(dates.length / 7);
				const datesToShow = rows * 7;
				let x = 0;

				while (datesToShow > dates.length)
					dates.push(new Date(Date.UTC(this.selectedYear, this.selectedMonth, ++x, 0, 0, 0)));

				return dates;
			},

			monthBeginDate()
			{
				return new Date(this.selectedYear, this.selectedMonth - 1, 1);
			},

			monthEndDate()
			{
				return new Date(this.selectedYear, this.selectedMonth, 0);
			},

			months()
			{
				return {
					1: this.moment().month(0).format("MMMM"),
					2: this.moment().month(1).format("MMMM"),
					3: this.moment().month(2).format("MMMM"),
					4: this.moment().month(3).format("MMMM"),
					5: this.moment().month(4).format("MMMM"),
					6: this.moment().month(5).format("MMMM"),
					7: this.moment().month(6).format("MMMM"),
					8: this.moment().month(7).format("MMMM"),
					9: this.moment().month(8).format("MMMM"),
					10: this.moment().month(9).format("MMMM"),
					11: this.moment().month(10).format("MMMM"),
					12: this.moment().month(11).format("MMMM")
				};
			},

			years()
			{
				const years = [];

				for (let year = 1900; year <= 2100; year++)
					years.push(year);

				return years;
			}

		},

		methods: {

			getClassesForDate(date)
			{
				const classes = ["btn"];

				if (this.isToday(date))
					classes.push("font-italic", "font-weight-bold");

				if (this.isSelected(date))
					classes.push("btn-contained", "btn-primary");
				else
					classes.push("btn-text", "btn-dark");

				return classes;
			},

			getClassesForMonth(month)
			{
				const classes = ["btn", "m-0", "w-100"];

				if (parseInt(month) === this.selectedMonth)
					classes.push("btn-contained", "btn-primary");
				else
					classes.push("btn-text", "btn-dark");

				return classes;
			},

			getClassesForYear(year)
			{
				const classes = ["btn", "m-0", "w-100"];

				if (parseInt(year) === this.selectedYear)
					classes.push("btn-contained", "btn-primary");
				else
					classes.push("btn-text", "btn-dark");

				return classes;
			},

			isOtherMonth(date)
			{
				return (date.getMonth() + 1) !== this.selectedMonth;
			},

			isSame(date, other)
			{
				if (typeof date === 'undefined' || date === null)
					return false;

				if (typeof other === 'undefined' || other === null)
					return false;

				return date.getFullYear() === other.getFullYear() && date.getMonth() === other.getMonth() && date.getDate() === other.getDate();
			},

			isSelected(date)
			{
				return this.isSame(date, this.value);
			},

			isToday(date)
			{
				return this.isSame(date, new Date());
			},

			navigate(dir)
			{
				this.selectedMonth += dir;

				if (this.selectedMonth === 13)
				{
					this.selectedMonth = 1;
					this.selectedYear++;
				}

				if (this.selectedMonth === 0)
				{
					this.selectedMonth = 12;
					this.selectedYear--;
				}
			},

			select(date)
			{
				this.$emit("input", date);
			},

			selectMonth(month)
			{
				this.selectedMonth = parseInt(month);
				this.selectedView = "dates";
			},

			selectYear(year)
			{
				this.selectedYear = parseInt(year);
				this.selectedView = "dates";
			},

			view(view)
			{
				if (this.selectedView === view)
					return this.selectedView = "dates";

				this.selectedView = view;
			}

		},

		watch: {

			selectedView()
			{
				this.$emit("view", this.selectedView);

				raf(() =>
				{
					if (this.selectedView === "months")
						this.$el.querySelector(`[data-month="${this.selectedMonth}"]`).scrollIntoViewIfNeeded();

					if (this.selectedView === "years")
						this.$el.querySelector(`[data-year="${this.selectedYear}"]`).scrollIntoViewIfNeeded();
				});
			},

			value: {
				immediate: true,
				handler()
				{
					this.selectedMonth = this.value.getMonth() + 1;
					this.selectedYear = this.value.getFullYear();
				}
			}

		}

	};

	/* script */
	const __vue_script__$b = script$b;

	/* template */
	var __vue_render__$b = function() {
	  var _vm = this;
	  var _h = _vm.$createElement;
	  var _c = _vm._self._c || _h;
	  return _c("div", { staticClass: "panel panel-blank datepicker-calendar" }, [
	    _c(
	      "div",
	      {
	        staticClass: "panel-header datepicker-calendar-header",
	        class: [_vm.selectedView]
	      },
	      [
	        _c(
	          "latte-ripple",
	          {
	            staticClass: "btn btn-icon btn-text btn-dark",
	            attrs: { as: "button" },
	            on: {
	              click: function($event) {
	                return _vm.navigate(-1)
	              }
	            }
	          },
	          [_c("i", { staticClass: "mdi mdi-chevron-left" })]
	        ),
	        _vm._v(" "),
	        _c(
	          "div",
	          { staticClass: "btn-group mx-auto" },
	          [
	            _c(
	              "latte-ripple",
	              {
	                staticClass: "btn btn-text btn-dark",
	                attrs: { as: "button" },
	                on: {
	                  click: function($event) {
	                    return _vm.view("months")
	                  }
	                }
	              },
	              [
	                _c("span", [
	                  _vm._v(_vm._s(_vm.moment(_vm.monthBeginDate).format("MMMM")))
	                ])
	              ]
	            ),
	            _vm._v(" "),
	            _c(
	              "latte-ripple",
	              {
	                staticClass: "btn btn-text btn-dark",
	                attrs: { as: "button" },
	                on: {
	                  click: function($event) {
	                    return _vm.view("years")
	                  }
	                }
	              },
	              [
	                _c("span", [
	                  _vm._v(_vm._s(_vm.moment(_vm.monthBeginDate).format("YYYY")))
	                ])
	              ]
	            )
	          ],
	          1
	        ),
	        _vm._v(" "),
	        _c(
	          "latte-ripple",
	          {
	            staticClass: "btn btn-icon btn-text btn-dark",
	            attrs: { as: "button" },
	            on: {
	              click: function($event) {
	                return _vm.navigate(1)
	              }
	            }
	          },
	          [_c("i", { staticClass: "mdi mdi-chevron-right" })]
	        )
	      ],
	      1
	    ),
	    _vm._v(" "),
	    _vm.selectedView === "dates"
	      ? _c(
	          "div",
	          {
	            staticClass: "panel-body datepicker-calendar-dates pt-0",
	            class: _vm.bodyClass
	          },
	          [
	            _c("span", { staticClass: "day" }, [
	              _vm._v(
	                _vm._s(
	                  _vm
	                    .moment()
	                    .isoWeekday(1)
	                    .format("dd")
	                )
	              )
	            ]),
	            _vm._v(" "),
	            _c("span", { staticClass: "day" }, [
	              _vm._v(
	                _vm._s(
	                  _vm
	                    .moment()
	                    .isoWeekday(2)
	                    .format("dd")
	                )
	              )
	            ]),
	            _vm._v(" "),
	            _c("span", { staticClass: "day" }, [
	              _vm._v(
	                _vm._s(
	                  _vm
	                    .moment()
	                    .isoWeekday(3)
	                    .format("dd")
	                )
	              )
	            ]),
	            _vm._v(" "),
	            _c("span", { staticClass: "day" }, [
	              _vm._v(
	                _vm._s(
	                  _vm
	                    .moment()
	                    .isoWeekday(4)
	                    .format("dd")
	                )
	              )
	            ]),
	            _vm._v(" "),
	            _c("span", { staticClass: "day" }, [
	              _vm._v(
	                _vm._s(
	                  _vm
	                    .moment()
	                    .isoWeekday(5)
	                    .format("dd")
	                )
	              )
	            ]),
	            _vm._v(" "),
	            _c("span", { staticClass: "day" }, [
	              _vm._v(
	                _vm._s(
	                  _vm
	                    .moment()
	                    .isoWeekday(6)
	                    .format("dd")
	                )
	              )
	            ]),
	            _vm._v(" "),
	            _c("span", { staticClass: "day" }, [
	              _vm._v(
	                _vm._s(
	                  _vm
	                    .moment()
	                    .isoWeekday(7)
	                    .format("dd")
	                )
	              )
	            ]),
	            _vm._v(" "),
	            _vm._l(_vm.dates, function(date, index) {
	              return [
	                _c(
	                  "latte-ripple",
	                  {
	                    key: index,
	                    class: _vm.getClassesForDate(date),
	                    attrs: { as: "button", disabled: _vm.isOtherMonth(date) },
	                    on: {
	                      click: function($event) {
	                        return _vm.select(date)
	                      }
	                    }
	                  },
	                  [_c("span", [_vm._v(_vm._s(date.getDate()))])]
	                )
	              ]
	            })
	          ],
	          2
	        )
	      : _vm._e(),
	    _vm._v(" "),
	    _vm.selectedView === "months"
	      ? _c(
	          "div",
	          { staticClass: "panel-body datepicker-calendar-months" },
	          [
	            _vm._l(_vm.months, function(month, index) {
	              return [
	                _c(
	                  "latte-ripple",
	                  {
	                    key: index,
	                    class: _vm.getClassesForMonth(index),
	                    attrs: { as: "button", "data-month": index },
	                    on: {
	                      click: function($event) {
	                        return _vm.selectMonth(index)
	                      }
	                    }
	                  },
	                  [_c("span", [_vm._v(_vm._s(month))])]
	                )
	              ]
	            })
	          ],
	          2
	        )
	      : _vm._e(),
	    _vm._v(" "),
	    _vm.selectedView === "years"
	      ? _c(
	          "div",
	          { staticClass: "panel-body datepicker-calendar-years" },
	          [
	            _vm._l(_vm.years, function(year, index) {
	              return [
	                _c(
	                  "latte-ripple",
	                  {
	                    key: index,
	                    class: _vm.getClassesForYear(year),
	                    attrs: { as: "button", "data-year": year },
	                    on: {
	                      click: function($event) {
	                        return _vm.selectYear(year)
	                      }
	                    }
	                  },
	                  [_c("span", [_vm._v(_vm._s(year))])]
	                )
	              ]
	            })
	          ],
	          2
	        )
	      : _vm._e()
	  ])
	};
	var __vue_staticRenderFns__$b = [];
	__vue_render__$b._withStripped = true;

	  /* style */
	  const __vue_inject_styles__$b = undefined;
	  /* scoped */
	  const __vue_scope_id__$b = undefined;
	  /* module identifier */
	  const __vue_module_identifier__$b = undefined;
	  /* functional template */
	  const __vue_is_functional_template__$b = false;
	  /* style inject */
	  
	  /* style inject SSR */
	  

	  
	  var DatePickerCalendar = normalizeComponent_1(
	    { render: __vue_render__$b, staticRenderFns: __vue_staticRenderFns__$b },
	    __vue_inject_styles__$b,
	    __vue_script__$b,
	    __vue_scope_id__$b,
	    __vue_is_functional_template__$b,
	    __vue_module_identifier__$b,
	    undefined,
	    undefined
	  );

	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//


	var script$c = {

		name: "latte-datetime-picker",

		props: {

			id: {
				default: "date",
				required: false,
				type: String
			},

			name: {
				default: "date",
				required: false,
				type: String
			},

			placeholder: {
				default: "",
				required: false,
				type: String
			},

			value: {
				default: () => new Date(),
				required: false,
				type: Date
			}

		},

		data()
		{
			return {
				canReset: true,
				calendarView: "dates",
				currentDate: new Date(),
				currentTime: new Date()
			};
		},

		computed: {

			current()
			{
				const dt = new Date(this.currentDate);
				dt.setHours(this.currentTime.getHours());
				dt.setMinutes(this.currentTime.getMinutes());

				return dt;
			},

			inputValue()
			{
				return this.moment(this.current).format("YYYY-MM-DD[T]HH:mm");
			}

		},

		methods: {

			close()
			{
				this.$refs.popup.close();
			},

			select()
			{
				this.$emit("input", this.current);
				this.canReset = false;
				this.close();
			},

			onClose()
			{
				if (!this.canReset)
					return;

				this.currentDate = new Date(this.value.getTime());
				this.currentTime = new Date(this.value.getTime());
			},

			onOpen()
			{
				this.canReset = true;
			}

		},

		watch: {

			value: {
				immediate: true,
				handler()
				{
					this.currentDate = new Date(this.value.getTime());
					this.currentTime = new Date(this.value.getTime());
				}
			}

		}

	};

	/* script */
	const __vue_script__$c = script$c;

	/* template */
	var __vue_render__$c = function() {
	  var _vm = this;
	  var _h = _vm.$createElement;
	  var _c = _vm._self._c || _h;
	  return _c(
	    "div",
	    { staticClass: "datepicker" },
	    [
	      _c("input", {
	        ref: "input",
	        staticClass: "form-control",
	        attrs: {
	          readonly: "",
	          id: _vm.id,
	          name: _vm.name,
	          placeholder: _vm.placeholder,
	          type: "datetime-local"
	        },
	        domProps: { value: _vm.inputValue }
	      }),
	      _vm._v(" "),
	      _c(
	        "latte-popup",
	        {
	          ref: "popup",
	          staticStyle: { width: "384px" },
	          attrs: { "associate-with": _vm.$refs.input },
	          on: { close: _vm.onClose, open: _vm.onOpen }
	        },
	        [
	          _c(
	            "div",
	            { staticClass: "panel panel-blank" },
	            [
	              _c("latte-datepicker-calendar", {
	                attrs: { "body-class": "pb-0" },
	                on: {
	                  view: function($event) {
	                    _vm.calendarView = $event;
	                  }
	                },
	                model: {
	                  value: _vm.currentDate,
	                  callback: function($$v) {
	                    _vm.currentDate = $$v;
	                  },
	                  expression: "currentDate"
	                }
	              }),
	              _vm._v(" "),
	              _vm.calendarView === "dates"
	                ? _c("latte-timepicker-clock", {
	                    staticClass: "mx-4 my-3",
	                    staticStyle: { "min-height": "unset" },
	                    model: {
	                      value: _vm.currentTime,
	                      callback: function($$v) {
	                        _vm.currentTime = $$v;
	                      },
	                      expression: "currentTime"
	                    }
	                  })
	                : _vm._e(),
	              _vm._v(" "),
	              _vm.calendarView === "dates"
	                ? _c(
	                    "div",
	                    { staticClass: "btn-group" },
	                    [
	                      _c(
	                        "latte-ripple",
	                        {
	                          staticClass: "btn btn-contained btn-pill btn-primary",
	                          attrs: { as: "button" },
	                          on: { click: _vm.select }
	                        },
	                        [_c("i", { staticClass: "mdi mdi-check" })]
	                      )
	                    ],
	                    1
	                  )
	                : _vm._e()
	            ],
	            1
	          )
	        ]
	      )
	    ],
	    1
	  )
	};
	var __vue_staticRenderFns__$c = [];
	__vue_render__$c._withStripped = true;

	  /* style */
	  const __vue_inject_styles__$c = undefined;
	  /* scoped */
	  const __vue_scope_id__$c = undefined;
	  /* module identifier */
	  const __vue_module_identifier__$c = undefined;
	  /* functional template */
	  const __vue_is_functional_template__$c = false;
	  /* style inject */
	  
	  /* style inject SSR */
	  

	  
	  var DateTimePicker = normalizeComponent_1(
	    { render: __vue_render__$c, staticRenderFns: __vue_staticRenderFns__$c },
	    __vue_inject_styles__$c,
	    __vue_script__$c,
	    __vue_scope_id__$c,
	    __vue_is_functional_template__$c,
	    __vue_module_identifier__$c,
	    undefined,
	    undefined
	  );

	//
	//
	//
	//
	//
	//
	//
	//
	//


	var script$d = {

		name: "latte-draggable",

		props: {

			options: Object,

			list: {
				type: Array,
				required: false,
				default: null
			},

			value: {
				type: Array,
				required: false,
				default: null
			},

			noTransitionOnDrag: {
				type: Boolean,
				default: false
			},

			clone: {
				type: Function,
				default: function (original)
				{
					return original;
				}
			},

			element: {
				type: String,
				default: 'div'
			},

			move: {
				type: Function,
				default: null
			}

		},

		beforeDestroy()
		{
			this._sortable.destroy();
		},

		data()
		{
			return {
				componentMode: false,
				transitionMode: false
			};
		},

		mounted()
		{
			this.componentMode = this.element.toLowerCase() !== this.$el.nodeName.toLowerCase();

			if (this.componentMode && this.transitionMode)
				throw new Error('Transition-group inside component is not supported. Please alter element value or remove transition-group. Current element value: ' + this.element);

			let optionsAdded = {};

			eventsListened.forEach(elt => optionsAdded['on' + elt] = delegateAndEmit.call(this, elt));
			eventsToEmit.forEach(elt => optionsAdded['on' + elt] = emit.bind(this, elt));

			let options = _extends({}, this.options, optionsAdded, {onMove: (event, originalEvent) => this.onDragMove(event, originalEvent)});

			!('draggable' in options) && (options.draggable = '>*');

			this._sortable = new Sortable(this.rootContainer, options);
			this.computeIndexes();
		},

		render(createElement)
		{
			let slots = this.$slots.default;

			if (slots && slots.length === 1)
			{
				let child = slots[0];

				if (child.componentOptions && child.componentOptions.tag === 'transition-group')
					this.transitionMode = true;
			}

			let children = slots;
			let footer = this.$slots.footer;

			if (footer)
				children = slots ? [].concat(_toConsumableArray(slots), _toConsumableArray(footer)) : [].concat(_toConsumableArray(footer));

			return createElement(this.element, null, children);
		},

		computed: {

			rootContainer()
			{
				return this.transitionMode ? this.$el.children[0] : this.$el;
			},

			isCloning()
			{
				return this.options && this.options.group && this.options.group.pull === 'clone';
			},

			realList()
			{
				return this.list ? this.list : this.value;
			}

		},

		methods: {

			getChildrenNodes()
			{
				if (this.componentMode)
					return this.$children[0].$slots.default;

				let rawNodes = this.$slots.default;

				return this.transitionMode ? rawNodes[0].child.$slots.default : rawNodes;
			},

			computeIndexes()
			{
				this.$nextTick(() => this.visibleIndexes = computeIndexes(this.getChildrenNodes(), this.rootContainer.children, this.transitionMode));
			},

			getUnderlyingVm(htmlElement)
			{
				let index = computeVmIndex(this.getChildrenNodes() || [], htmlElement);

				if (index === -1)
					return null;

				return {index: index, element: this.realList[index]};
			},

			getUnderlyingPotencialDraggableComponent(reference)
			{
				const vue = reference.__vue__;

				if (!vue || !vue.$options || vue.$options._componentTag !== 'transition-group')
					return vue;

				return vue.$parent;
			},

			emitChanges(event)
			{
				this.$nextTick(() => this.$emit('change', event));
			},

			alterList(onList)
			{
				if (this.list)
				{
					onList(this.list);
				}
				else
				{
					let newList = [].concat(_toConsumableArray(this.value));
					onList(newList);
					this.$emit('input', newList);
				}
			},

			spliceList()
			{
				let _arguments = arguments;
				this.alterList(list => list.splice.apply(list, _arguments));
			},

			updatePosition(oldIndex, newIndex)
			{
				this.alterList(list => list.splice(newIndex, 0, list.splice(oldIndex, 1)[0]));
			},

			getRelatedContextFromMoveElement(reference)
			{
				let to = reference.to,
					related = reference.related;

				let component = this.getUnderlyingPotencialDraggableComponent(reference);

				if (!component)
					return {component: component};

				let list = component.realList;
				let context = {list: list, component: component};

				if (to !== related && list && component.getUnderlyingVm)
				{
					let destination = component.getUnderlyingVm(related);

					if (destination)
						return _extends(destination, context);
				}

				return context;
			},

			getVmIndex(domIndex)
			{
				let indexes = this.visibleIndexes;
				let numberIndexes = indexes.length;

				return domIndex > numberIndexes - 1 ? numberIndexes : indexes[domIndex];
			},

			getComponent()
			{
				return this.$slots.default[0].componentInstance;
			},

			resetTransitionData(index)
			{
				if (!this.noTransitionOnDrag || !this.transitionMode)
					return;

				let nodes = this.getChildrenNodes();
				nodes[index].data = null;

				let transitionContainer = this.getComponent();
				transitionContainer.children = [];
				transitionContainer.kept = undefined;
			},

			onDragStart(event)
			{
				this.context = this.getUnderlyingVm(event.item);
				event.item._underlying_vm_ = this.clone(this.context.element);
				draggingElement = event.item;

				this.$el.classList.add('is-dragging');
			},

			onDragAdd(event)
			{
				let element = event.item._underlying_vm_;

				if (element === undefined)
					return;

				removeNode(event.item);

				let newIndex = this.getVmIndex(event.newIndex);
				this.spliceList(newIndex, 0, element);
				this.computeIndexes();
				this.emitChanges({added: {element: element, newIndex: newIndex}});
			},

			onDragRemove(event)
			{
				insertNodeAt(this.rootContainer, event.item, event.oldIndex);

				if (this.isCloning)
				{
					removeNode(event.clone);
					return;
				}

				let oldIndex = this.context.index;
				this.spliceList(oldIndex, 1);
				this.resetTransitionData(oldIndex);
				this.emitChanges({removed: {element: this.context.element, oldIndex: oldIndex}});
			},

			onDragUpdate(event)
			{
				removeNode(event.item);
				insertNodeAt(event.from, event.item, event.oldIndex);

				let oldIndex = this.context.index;
				let newIndex = this.getVmIndex(event.newIndex);

				this.updatePosition(oldIndex, newIndex);
				this.emitChanges({moved: {element: this.context.element, oldIndex: oldIndex, newIndex: newIndex}});
			},

			computeFutureIndex(relatedContext, event)
			{
				if (!relatedContext.element)
					return 0;

				let domChildren = [].concat(_toConsumableArray(event.to.children)).filter(el => el.style.display !== 'none');
				let currentDomIndex = domChildren.indexOf(event.related);
				let currentIndex = relatedContext.component.getVmIndex(currentDomIndex);
				let draggedInList = domChildren.indexOf(draggingElement) !== -1;

				return draggedInList || !event.willInsertAfter ? currentIndex : currentIndex + 1;
			},

			onDragMove(event, originalEvent)
			{
				let onMove = this.move;

				if (!onMove || !this.realList)
					return true;

				let relatedContext = this.getRelatedContextFromMoveElement(event);
				let draggedContext = this.context;
				let futureIndex = this.computeFutureIndex(relatedContext, event);

				_extends(draggedContext, {futureIndex: futureIndex});
				_extends(event, {relatedContext: relatedContext, draggedContext: draggedContext});

				return onMove(event, originalEvent);
			},

			onDragEnd()
			{
				this.computeIndexes();
				draggingElement = null;

				this.$el.classList.remove('is-dragging');
			}

		},

		watch: {

			options: {

				deep: true,
				handler(newOptionValue)
				{
					for (let property in newOptionValue)
						if (newOptionValue.hasOwnProperty(property))
							if (readonlyProperties.indexOf(property) === -1)
								this._sortable.option(property, newOptionValue[property]);
				}

			},

			realList()
			{
				this.computeIndexes();
			}

		}

	};

	const eventsListened = ['Start', 'Add', 'Remove', 'Update', 'End'];
	const eventsToEmit = ['Choose', 'Sort', 'Filter', 'Clone'];
	const readonlyProperties = ['Move'].concat(eventsListened, eventsToEmit).map(event => 'on' + event);

	let draggingElement = null;

	const _extends = Object.assign || function (target)
	{
		for (let i = 1; i < arguments.length; i++)
		{
			let source = arguments[i];

			for (let key in source)
				if (source.hasOwnProperty(key))
					target[key] = source[key];
		}

		return target;
	};

	const _toConsumableArray = function (arr)
	{
		if (Array.isArray(arr))
		{
			let arr2 = Array(arr.length);

			for (let i = 0; i < arr.length; i++)
				arr2[i] = arr[i];

			return arr2;
		}
		else
		{
			return Array.from(arr);
		}
	};

	Array.from = Array.from || function (object)
	{
		return [].slice.call(object);
	};

	function removeNode(node)
	{
		node.parentElement.removeChild(node);
	}

	function insertNodeAt(parentNode, node, position)
	{
		let refNode = position === 0 ? parentNode.children[0] : parentNode.children[position - 1].nextSibling;
		parentNode.insertBefore(node, refNode);
	}

	function computeVmIndex(vnodes, element)
	{
		return vnodes.map(elt => elt.elm).indexOf(element);
	}

	function computeIndexes(slots, children, isTransition)
	{
		if (!slots)
			return [];

		let elmFromNodes = slots.map(elt => elt.elm);
		let rawIndexes = [].concat(_toConsumableArray(children)).map(elt => elmFromNodes.indexOf(elt));

		return isTransition ? rawIndexes.filter(ind => ind !== -1) : rawIndexes;
	}

	function emit(eventName, eventData)
	{
		this.$nextTick(() => this.$emit(eventName.toLowerCase(), eventData));
	}

	function delegateAndEmit(eventName)
	{
		let that = this;

		return eventData =>
		{
			if (that.realList !== null)
				that['onDrag' + eventName](eventData);

			emit.call(that, eventName, eventData);
		};
	}

	/* script */
	const __vue_script__$d = script$d;

	/* template */

	  /* style */
	  const __vue_inject_styles__$d = undefined;
	  /* scoped */
	  const __vue_scope_id__$d = undefined;
	  /* module identifier */
	  const __vue_module_identifier__$d = undefined;
	  /* functional template */
	  const __vue_is_functional_template__$d = undefined;
	  /* style inject */
	  
	  /* style inject SSR */
	  

	  
	  var Draggable = normalizeComponent_1(
	    {},
	    __vue_inject_styles__$d,
	    __vue_script__$d,
	    __vue_scope_id__$d,
	    __vue_is_functional_template__$d,
	    __vue_module_identifier__$d,
	    undefined,
	    undefined
	  );

	//

	var script$e = {

		name: "latte-expandable",

		props: {

			group: {
				default: null,
				required: false,
				type: String | null
			},

			opened: {
				default: false,
				required: false,
				type: Boolean
			}

		},

		created()
		{
			on("latte:expandable:open", expandable => this.onExpandableOpened(expandable));
		},

		data()
		{
			return {
				bodyStyle: {
					height: "0",
					overflow: "hidden",
					transition: "height 210ms var(--ease-swift-out)"
				},
				isOpen: false
			};
		},

		mounted()
		{
			if (this.opened)
				this.open();
		},

		methods: {

			onExpandableOpened(expandable)
			{
				if (this === expandable)
					return;

				if (this.group !== expandable.group)
					return;

				raf(() => this.close());
			},

			updateBody()
			{
				if (this.isOpen)
				{
					this.bodyStyle.height = "auto";

					raf(() =>
					{
						const rect = this.$el.querySelector("div.expandable-body").getBoundingClientRect();
						const height = rect.height;

						this.bodyStyle.height = "0";

						raf(() => this.bodyStyle.height = height + "px");
					});
				}
				else
				{
					this.bodyStyle.height = "0";
				}
			},

			close()
			{
				this.isOpen = false;
			},

			open()
			{
				this.isOpen = true;
			},

			toggle()
			{
				if (this.isOpen)
					this.close();
				else
					this.open();
			}

		},

		watch: {

			isOpen()
			{
				if (this.isOpen)
					dispatch("latte:expandable:open", this);

				this.$emit(this.isOpen ? "open" : "close");
				this.updateBody();
			},

			opened()
			{
				if (this.opened)
					this.open();
				else
					this.close();
			}

		}

	};

	/* script */
	const __vue_script__$e = script$e;

	/* template */
	var __vue_render__$d = function() {
	  var _vm = this;
	  var _h = _vm.$createElement;
	  var _c = _vm._self._c || _h;
	  return _c("div", { staticClass: "expandable" }, [
	    _c(
	      "div",
	      { staticClass: "expandable-header", on: { click: _vm.toggle } },
	      [_vm._t("header", [_vm._m(0)], { isOpen: _vm.isOpen })],
	      2
	    ),
	    _vm._v(" "),
	    _c(
	      "div",
	      { staticClass: "expandable-body", style: _vm.bodyStyle },
	      [_vm._t("default")],
	      2
	    )
	  ])
	};
	var __vue_staticRenderFns__$d = [
	  function() {
	    var _vm = this;
	    var _h = _vm.$createElement;
	    var _c = _vm._self._c || _h;
	    return _c("button", { staticClass: "btn btn-icon btn-text btn-dark" }, [
	      _c("i", { staticClass: "mdi mdi-menu-swap" })
	    ])
	  }
	];
	__vue_render__$d._withStripped = true;

	  /* style */
	  const __vue_inject_styles__$e = undefined;
	  /* scoped */
	  const __vue_scope_id__$e = undefined;
	  /* module identifier */
	  const __vue_module_identifier__$e = undefined;
	  /* functional template */
	  const __vue_is_functional_template__$e = false;
	  /* style inject */
	  
	  /* style inject SSR */
	  

	  
	  var Expandable = normalizeComponent_1(
	    { render: __vue_render__$d, staticRenderFns: __vue_staticRenderFns__$d },
	    __vue_inject_styles__$e,
	    __vue_script__$e,
	    __vue_scope_id__$e,
	    __vue_is_functional_template__$e,
	    __vue_module_identifier__$e,
	    undefined,
	    undefined
	  );

	/*
	 * Copyright (c) 2019 - Bas Milius <bas@mili.us>
	 *
	 * This file is part of the Latte UI package.
	 *
	 * For the full copyright and license information, please view the
	 * LICENSE file that was distributed with this source code.
	 */

	const eventBus = new Vue({});

	function bottom(layout)
	{
		let max = 0, bottomY;

		for (let i = 0, len = layout.length; i < len; i++)
		{
			bottomY = layout[i].y + layout[i].height;

			if (bottomY > max)
				max = bottomY;
		}

		return max;
	}

	function collides(item1, item2)
	{
		if (item1 === item2)
			return false;

		if (item1.x + item1.width <= item2.x)
			return false;

		if (item1.x >= item2.x + item2.width)
			return false;

		if (item1.y + item1.height <= item2.y)
			return false;

		if (item1.y >= item2.y + item2.height)
			return false;

		// Yay!

		return true;
	}

	function compact(layout, verticalCompact)
	{
		const compareWith = getStatics(layout);
		const sorted = sortLayoutItemsByRowCol(layout);
		const out = Array(layout.length);

		for (let i = 0, len = sorted.length; i < len; i++)
		{
			let item = sorted[i];

			if (!item.static)
			{
				item = compactItem(compareWith, item, verticalCompact);

				compareWith.push(item);
			}

			out[layout.indexOf(item)] = item;

			item.moved = false;
		}

		return out;
	}

	function compactItem(compareWith, item, verticalCompact)
	{
		if (verticalCompact)
			while (item.y > 0 && !getFirstCollision(compareWith, item))
				item.y--;

		let collides;

		while ((collides = getFirstCollision(compareWith, item)))
			item.y = collides.y + collides.height;

		return item;
	}

	function createCoreData(lastX, lastY, x, y)
	{
		const isStart = !isNum(lastX);

		if (isStart)
		{
			return {
				deltaX: 0, deltaY: 0,
				lastX: x, lastY: y,
				x: x, y: y
			};
		}
		else
		{
			return {
				deltaX: x - lastX, deltaY: y - lastY,
				lastX: lastX, lastY: lastY,
				x: x, y: y
			};
		}
	}

	function getAllCollisions(layout, layoutItem)
	{
		return layout.filter((l) => collides(l, layoutItem));
	}

	function getControlPosition(evt)
	{
		return offsetXYFromParentOf(evt);
	}

	function getFirstCollision(layout, layoutItem)
	{
		for (let i = 0, len = layout.length; i < len; i++)
			if (collides(layout[i], layoutItem))
				return layout[i];
	}

	function getLayoutItem(layout, id)
	{
		for (let i = 0, len = layout.length; i < len; i++)
			if (layout[i].i === id)
				return layout[i];
	}

	function getStatics(layout)
	{
		return layout.filter((l) => l.static);
	}

	function isNum(num)
	{
		return typeof num === "number" && !isNaN(num);
	}

	function moveElement(layout, item, x, y, isUserAction)
	{
		if (item.static)
			return layout;

		if (item.y === y && item.x === x) return layout;

		const movingUp = y && item.y > y;

		if (typeof x === "number")
			item.x = x;

		if (typeof y === "number")
			item.y = y;

		item.moved = true;

		let sorted = sortLayoutItemsByRowCol(layout);

		if (movingUp)
			sorted = sorted.reverse();

		const collisions = getAllCollisions(sorted, item);

		for (let i = 0, len = collisions.length; i < len; i++)
		{
			const collision = collisions[i];

			if (collision.moved)
				continue;


			if (item.y > collision.y && item.y - collision.y > collision.height / 4)
				continue;

			if (collision.static)
				layout = moveElementAwayFromCollision(layout, collision, item, isUserAction);
			else
				layout = moveElementAwayFromCollision(layout, item, collision, isUserAction);
		}

		return layout;
	}

	function moveElementAwayFromCollision(layout, collidesWith, itemToMove, isUserAction)
	{
		if (isUserAction)
		{
			const fakeItem = {
				x: itemToMove.x,
				y: itemToMove.y,
				width: itemToMove.width,
				height: itemToMove.height,
				id: "__fake__"
			};

			fakeItem.y = Math.max(collidesWith.y - itemToMove.height, 0);

			if (!getFirstCollision(layout, fakeItem))
				return moveElement(layout, itemToMove, undefined, fakeItem.y);
		}

		return moveElement(layout, itemToMove, undefined, itemToMove.y + 1);
	}

	function offsetXYFromParentOf(evt)
	{
		const offsetParent = evt.target.offsetParent || document.body;
		const offsetParentRect = evt.offsetParent === document.body ? {left: 0, top: 0} : offsetParent.getBoundingClientRect();

		const x = evt.clientX + offsetParent.scrollLeft - offsetParentRect.left;
		const y = evt.clientY + offsetParent.scrollTop - offsetParentRect.top;

		return {x, y};
	}

	function setTransform(top, left, width, height)
	{
		const translate = `translate3d(${left}px,${top}px, 0)`;

		return {
			transform: translate,
			WebkitTransform: translate,
			MozTransform: translate,
			msTransform: translate,
			OTransform: translate,
			width: width + "px",
			height: height + "px",
			position: "absolute"
		};
	}

	function sortLayoutItemsByRowCol(layout)
	{
		return [].concat(layout).sort((a, b) => (a.y > b.y || (a.y === b.y && a.x > b.x)) ? 1 : -1);
	}

	function validateLayout(layout, contextName = "Layout")
	{
		const subProps = ["x", "y", "width", "height"];

		if (!Array.isArray(layout))
			throw new Error(`${contextName} must be an array!`);

		for (let i = 0, len = layout.length; i < len; i++)
		{
			const item = layout[i];

			for (let j = 0; j < subProps.length; j++)
				if (typeof item[subProps[j]] !== "number")
					throw new Error(`Latte Grid: ${contextName}[${i}].${subProps[j]} must be a number!`);

			if (item.i && typeof item.i !== "string")
				throw new Error(`Latte Grid: ${contextName}[${i}].i must be a string!`);

			if (item.static !== undefined && typeof item.static !== "boolean")
				throw new Error(`Latte Grid: ${contextName}[${i}].static must be a boolean!`);
		}
	}

	//

	var script$f = {

		name: "latte-grid",

		props: {

			autoSize: {
				default: true,
				required: false,
				type: Boolean
			},

			columns: {
				default: 12,
				required: false,
				type: Number
			},

			rowHeight: {
				default: 100,
				required: false,
				type: Number
			},

			maxRows: {
				default: Infinity,
				required: false,
				type: Number
			},

			margin: {
				default: () => [24, 24],
				required: false,
				type: Array
			},

			isDraggable: {
				default: true,
				required: false,
				type: Boolean
			},

			isResizable: {
				default: true,
				required: false,
				type: Boolean
			},

			verticalCompact: {
				default: true,
				required: false,
				type: Boolean
			},

			layout: {
				required: true,
				type: Array
			}

		},

		beforeDestroy()
		{
			eventBus.$off("dragEvent", this.dragEventHandler);
			eventBus.$off("resizeEvent", this.resizeEventHandler);

			window.removeEventListener("resize", this.onWindowResize);
		},

		created()
		{
			const $this = this;

			this.dragEventHandler = function (eventType, id, x, y, height, width)
			{
				$this.dragEvent(eventType, id, x, y, height, width);
			};

			this.resizeEventHandler = function (eventType, id, x, y, height, width)
			{
				$this.resizeEvent(eventType, id, x, y, height, width);
			};

			eventBus.$on("dragEvent", this.dragEventHandler);
			eventBus.$on("resizeEvent", this.resizeEventHandler);
		},

		data()
		{
			return {
				width: null,
				mergedStyle: {},
				lastLayoutLength: 0,
				isDragging: false,
				placeholder: {
					x: 0,
					y: 0,
					height: 0,
					width: 0
				}
			};
		},

		mounted()
		{
			const $this = this;

			this.$nextTick(() =>
			{
				validateLayout(this.layout);

				const init = () =>
				{
					if (this.width === null)
					{
						this.onWindowResize();

						window.addEventListener("resize", this.onWindowResize);
					}

					compact(this.layout, this.verticalCompact);

					this.updateHeight();

					this.$nextTick(() =>
					{
						elementResizeDetectorMaker({strategy: "scroll"}).listenTo(this.$refs.grid, function ()
						{
							$this.onWindowResize();
						});
					});
				};

				this.$nextTick(() => init());

				window.onload = init.bind(this);
			});
		},

		computed: {

			is_dragging()
			{
				return this.isDragging;
			},

			styles()
			{
				return this.mergedStyle
			}

		},

		methods: {

			containerHeight()
			{
				if (!this.autoSize)
					return;

				return `${bottom(this.layout) * (this.rowHeight + this.margin[1]) + this.margin[1]}px`;
			},

			dragEvent(eventType, id, x, y, height, width)
			{
				if (eventType === "dragmove" || eventType === "dragstart")
				{
					this.placeholder.x = x;
					this.placeholder.y = y;
					this.placeholder.height = height;
					this.placeholder.width = width;

					this.$nextTick(() => this.isDragging = true);

					eventBus.$emit("updateWidth", this.width);
				}
				else
				{
					this.$nextTick(() => this.isDragging = false);
				}

				let item = getLayoutItem(this.layout, id);

				if (item === undefined || item === null)
					item = {x: 0, y: 0};

				item.x = x;
				item.y = y;

				this.layout = moveElement(this.layout, item, x, y, true);

				compact(this.layout, this.verticalCompact);
				eventBus.$emit("compact");

				this.updateHeight();

				if (eventType === "dragend")
					this.$emit("layout-updated", this.layout);
			},

			layoutUpdate()
			{
				if (typeof this.layout === "undefined")
					return;

				if (this.layout.length !== this.lastLayoutLength)
					this.lastLayoutLength = this.layout.length;

				compact(this.layout, this.verticalCompact);
				eventBus.$emit("updateWidth", this.width);
				this.updateHeight();
			},

			onWindowResize()
			{
				if (typeof this.$refs.grid === "undefined")
					return;

				this.width = this.$refs.grid.offsetWidth;
			},

			resizeEvent(eventType, id, x, y, height, width)
			{
				if (eventType === "resizestart" || eventType === "resizemove")
				{
					this.placeholder.x = x;
					this.placeholder.y = y;
					this.placeholder.height = height;
					this.placeholder.width = width;

					this.$nextTick(() => this.isDragging = true);
					eventBus.$emit("updateWidth", this.width);
				}
				else
				{
					this.$nextTick(() => this.isDragging = false);
				}

				let item = getLayoutItem(this.layout, id);

				if (item === undefined || item === null)
					item = {height: 0, width: 0};

				item.height = height;
				item.width = width;

				compact(this.layout, this.verticalCompact);
				eventBus.$emit("compact");

				this.updateHeight();

				if (eventType === "resizeend")
					this.$emit("layout-updated", this.layout);
			},

			updateHeight()
			{
				this.mergedStyle = {
					height: this.containerHeight()
				};
			}

		},

		watch: {

			columns()
			{
				eventBus.$emit("setColumns", this.columns);
			},

			isDraggable()
			{
				eventBus.$emit("setDraggable", this.isDraggable);
			},

			isResizable()
			{
				eventBus.$emit("setResizable", this.isResizable);
			},

			layout()
			{
				this.layoutUpdate();
			},

			rowHeight()
			{
				eventBus.$emit("setRowHeight", this.rowHeight);
			},

			width()
			{
				this.$nextTick(() =>
				{
					eventBus.$emit("updateWidth", this.width);
					this.updateHeight();
				});
			}

		}

	};

	/* script */
	const __vue_script__$f = script$f;

	/* template */
	var __vue_render__$e = function() {
	  var _vm = this;
	  var _h = _vm.$createElement;
	  var _c = _vm._self._c || _h;
	  return _c(
	    "div",
	    {
	      ref: "grid",
	      staticClass: "latte-grid",
	      class: { "is-dragging": _vm.is_dragging },
	      style: _vm.styles,
	      attrs: { role: "grid" }
	    },
	    [
	      _vm._t("default"),
	      _vm._v(" "),
	      _c("latte-grid-item", {
	        directives: [
	          {
	            name: "show",
	            rawName: "v-show",
	            value: _vm.isDragging,
	            expression: "isDragging"
	          }
	        ],
	        staticClass: "latte-grid-placeholder",
	        attrs: {
	          x: _vm.placeholder.x,
	          y: _vm.placeholder.y,
	          height: _vm.placeholder.height,
	          width: _vm.placeholder.width,
	          id: "__placeholder__"
	        }
	      })
	    ],
	    2
	  )
	};
	var __vue_staticRenderFns__$e = [];
	__vue_render__$e._withStripped = true;

	  /* style */
	  const __vue_inject_styles__$f = undefined;
	  /* scoped */
	  const __vue_scope_id__$f = undefined;
	  /* module identifier */
	  const __vue_module_identifier__$f = undefined;
	  /* functional template */
	  const __vue_is_functional_template__$f = false;
	  /* style inject */
	  
	  /* style inject SSR */
	  

	  
	  var Grid = normalizeComponent_1(
	    { render: __vue_render__$e, staticRenderFns: __vue_staticRenderFns__$e },
	    __vue_inject_styles__$f,
	    __vue_script__$f,
	    __vue_scope_id__$f,
	    __vue_is_functional_template__$f,
	    __vue_module_identifier__$f,
	    undefined,
	    undefined
	  );

	//

	var script$g = {

		name: "latte-grid-item",

		props: {

			id: {
				required: true
			},

			isDraggable: {
				default: true,
				required: false,
				type: Boolean
			},

			isResizable: {
				default: true,
				required: false,
				type: Boolean
			},

			maxHeight: {
				default: Infinity,
				required: false,
				type: Number
			},

			maxWidth: {
				default: Infinity,
				required: false,
				type: Number
			},

			minHeight: {
				default: 1,
				required: false,
				type: Number
			},

			minWidth: {
				default: 1,
				required: false,
				type: Number
			},

			x: {
				required: true,
				type: Number
			},

			y: {
				required: true,
				type: Number
			},

			height: {
				required: true,
				type: Number
			},

			width: {
				required: true,
				type: Number
			},

			dragIgnoreFrom: {
				default: null,
				required: false,
				type: String | null
			},

			dragAllowFrom: {
				default: ".grid-item-drag-handle",
				required: false,
				type: String | null
			},

			resizeIgnoreFrom: {
				default: null,
				required: false,
				type: String | null
			},

			resizeAllowFrom: {
				default: ".grid-item-resize-handle",
				required: false,
				type: String | null
			}

		},

		beforeDestroy()
		{
			eventBus.$off("updateWidth", this.updateWidthHandler);
			eventBus.$off("compact", this.compactHandler);
			eventBus.$off("setDraggable", this.setDraggableHandler);
			eventBus.$off("setResizable", this.setResizableHandler);
			eventBus.$off("setRowHeight", this.setRowHeightHandler);
			eventBus.$off("setColumns", this.setColumns);
		},

		created()
		{
			const $this = this;

			this.updateWidthHandler = function (width)
			{
				$this.updateWidth(width);
			};

			this.compactHandler = function (layout)
			{
				$this.compact(layout);
			};

			this.setDraggableHandler = function (isDraggable)
			{
				$this.draggable = isDraggable;
			};

			this.setResizableHandler = function (isResizable)
			{
				$this.resizable = isResizable;
			};

			this.setRowHeightHandler = function (rowHeight)
			{
				$this.rowHeight = rowHeight;
			};

			this.setColumns = function (colNum)
			{
				$this.columns = parseInt(colNum);
			};

			eventBus.$on("updateWidth", this.updateWidthHandler);
			eventBus.$on("compact", this.compactHandler);
			eventBus.$on("setDraggable", this.setDraggableHandler);
			eventBus.$on("setResizable", this.setResizableHandler);
			eventBus.$on("setRowHeight", this.setRowHeightHandler);
			eventBus.$on("setColumns", this.setColumns);
		},

		data()
		{
			return {
				columns: 1,
				containerWidth: 100,
				rowHeight: 100,
				margin: [24, 24],
				maxRows: Infinity,
				draggable: null,
				resizable: null,

				dragging: null,
				resizing: null,

				lastX: NaN,
				lastY: NaN,
				lastHeight: NaN,
				lastWidth: NaN,

				isDragEventSet: false,
				isResizeEventSet: false,

				previousX: null,
				previousY: null,
				previousHeight: null,
				previousWidth: null,

				innerX: this.x,
				innerY: this.y,
				innerHeight: this.height,
				innerWidth: this.width,

				style: {}
			};
		},

		mounted()
		{
			this.columns = this.$parent.columns;
			this.rowHeight = this.$parent.rowHeight;
			this.containerWidth = this.$parent.width !== null ? this.$parent.width : 100;
			this.margin = this.$parent.margin !== undefined ? this.$parent.margin : [24, 24];
			this.maxRows = this.$parent.maxRows;

			if (this.isDraggable === null)
				this.draggable = this.$parent.isDraggable;
			else
				this.draggable = this.isDraggable;

			if (this.isResizable === null)
				this.resizable = this.$parent.isResizable;
			else
				this.resizable = this.isResizable;

			this.createStyle();
		},

		computed: {

			is_dragging()
			{
				return this.dragging !== null;
			},

			is_resizing()
			{
				return this.resizing !== null;
			},

			resize_handle_class()
			{
				return "grid-item-resize-handle";
			}

		},

		methods: {

			calculateColumnWidth()
			{
				return (this.containerWidth - (this.margin[0] * (this.columns + 1))) / this.columns;
			},

			calculatePosition(x, y, width, height)
			{
				const columnWidth = this.calculateColumnWidth();

				return {
					top: Math.round(this.rowHeight * y + (y + 1) * this.margin[1]),
					left: Math.round(columnWidth * x + (x + 1) * this.margin[0]),
					height: height === Infinity ? height : Math.round(this.rowHeight * height + Math.max(0, height - 1) * this.margin[1]),
					width: width === Infinity ? width : Math.round(columnWidth * width + Math.max(0, width - 1) * this.margin[0])
				};
			},

			calculateWidthHeight(height, width)
			{
				const columnWidth = this.calculateColumnWidth();

				let w = Math.round((width + this.margin[0]) / (columnWidth + this.margin[0]));
				let h = Math.round((height + this.margin[1]) / (this.rowHeight + this.margin[1]));

				return {
					width: Math.max(Math.min(w, this.columns - this.innerX), 0),
					height: Math.max(Math.min(h, this.maxRows - this.innerY), 0)
				};
			},

			calculateXY(top, left)
			{
				const columnWidth = this.calculateColumnWidth();

				let x = Math.round((left - this.margin[0]) / (columnWidth + this.margin[0]));
				let y = Math.round((top - this.margin[1]) / (this.rowHeight + this.margin[1]));

				x = Math.max(Math.min(x, this.columns - this.innerWidth), 0);
				y = Math.max(Math.min(y, this.maxRows - this.innerHeight), 0);

				return {x, y};
			},

			compact()
			{
				this.createStyle();
			},

			createStyle()
			{
				if (this.x + this.width > this.columns)
				{
					this.innerX = 0;
					this.innerWidth = (this.width > this.columns) ? this.columns : this.width;
				}
				else
				{
					this.innerX = this.x;
					this.innerWidth = this.width;
				}

				const pos = this.calculatePosition(this.innerX, this.innerY, this.innerWidth, this.innerHeight);

				if (this.is_dragging)
				{
					pos.top = this.dragging.top;
					pos.left = this.dragging.left;
				}

				if (this.is_resizing)
				{
					pos.height = this.resizing.height;
					pos.width = this.resizing.width;
				}

				this.style = setTransform(pos.top, pos.left, pos.width, pos.height);
			},

			handleDrag(evt)
			{
				if (this.is_resizing)
					return;

				const position = getControlPosition(evt);
				const {x, y} = position;

				const newPosition = {top: 0, left: 0};
				let parentRect;
				let clientRect;

				switch (evt.type)
				{
					case "dragstart":
					{
						this.previousX = this.innerX;
						this.previousY = this.innerY;

						parentRect = evt.target.offsetParent.getBoundingClientRect();
						clientRect = evt.target.getBoundingClientRect();

						newPosition.left = clientRect.left - parentRect.left;
						newPosition.top = clientRect.top - parentRect.top;

						this.dragging = newPosition;
						break;
					}

					case "dragend":
					{
						if (!this.is_dragging)
							return;

						parentRect = evt.target.offsetParent.getBoundingClientRect();
						clientRect = evt.target.getBoundingClientRect();

						newPosition.left = clientRect.left - parentRect.left;
						newPosition.top = clientRect.top - parentRect.top;

						this.dragging = null;
						break;
					}

					case "dragmove":
					{
						const coreEvent = createCoreData(this.lastX, this.lastY, x, y);

						newPosition.left = this.dragging.left + coreEvent.deltaX;
						newPosition.top = this.dragging.top + coreEvent.deltaY;

						this.dragging = newPosition;
						break;
					}
				}

				const pos = this.calculateXY(newPosition.top, newPosition.left);

				this.lastX = x;
				this.lastY = y;

				if (this.innerX !== pos.x || this.innerY !== pos.y)
					this.$emit("move", this.id, pos.x, pos.y);

				if (evt.type === "dragend" && (this.previousX !== this.innerX || this.previousY !== this.innerY))
					this.$emit("moved", this.id, pos.x, pos.y);

				eventBus.$emit("dragEvent", evt.type, this.id, pos.x, pos.y, this.innerHeight, this.innerWidth);
			},

			handleResize(evt)
			{
				const position = getControlPosition(evt);
				const {x, y} = position;

				const newSize = {width: 0, height: 0};

				switch (evt.type)
				{
					case "resizestart":
					{
						this.previousHeight = this.innerHeight;
						this.previousWidth = this.innerWidth;

						const pos = this.calculatePosition(this.innerX, this.innerY, this.innerWidth, this.innerHeight);

						newSize.height = pos.height;
						newSize.width = pos.width;

						this.resizing = newSize;
						break;
					}

					case "resizemove":
					{
						const coreEvent = createCoreData(this.lastWidth, this.lastHeight, x, y);

						newSize.height = this.resizing.height + coreEvent.deltaY;
						newSize.width = this.resizing.width + coreEvent.deltaX;

						this.resizing = newSize;
						break;
					}

					case "resizeend":
					{
						const pos = this.calculatePosition(this.innerX, this.innerY, this.innerWidth, this.innerHeight);

						newSize.height = pos.height;
						newSize.width = pos.width;

						this.resizing = null;
						break;
					}
				}

				const pos = this.calculateWidthHeight(newSize.height, newSize.width);

				if (pos.width < this.minWidth)
					pos.width = this.minWidth;

				if (pos.width > this.maxWidth)
					pos.width = this.maxWidth;

				if (pos.height < this.minHeight)
					pos.height = this.minHeight;

				if (pos.height > this.maxHeight)
					pos.height = this.maxHeight;

				if (pos.height < 1)
					pos.height = 1;

				if (pos.width < 1)
					pos.width = 1;

				this.lastHeight = y;
				this.lastWidth = x;

				if (this.innerWidth !== pos.width || this.innerHeight !== pos.height)
					this.$emit("resize", this.id, pos.height, pos.width);

				if (evt.type === "resizeend" && (this.previousWidth !== this.innerWidth || this.previousHeight !== this.innerHeight))
					this.$emit("resized", this.id, newSize.height, newSize.width);

				eventBus.$emit("resizeEvent", evt.type, this.id, this.innerX, this.innerY, pos.height, pos.width);
			},

			updateWidth(width, column)
			{
				this.containerWidth = width;

				if (typeof column !== "undefined")
					this.column = column;
			}

		},

		watch: {

			columns()
			{
				this.createStyle();
			},

			containerWidth()
			{
				this.createStyle();
			},

			draggable()
			{
				if (typeof this.interact === "undefined" || this.interact === null)
					this.interact = interact(this.$refs.item);

				if (this.draggable)
				{
					this.interact.draggable({
						allowFrom: this.dragAllowFrom,
						ignoreFrom: this.dragIgnoreFrom
					});

					if (!this.isDragEventSet)
					{
						this.isDragEventSet = true;

						this.interact.on("dragstart dragmove dragend", evt => this.handleDrag(evt));
					}
				}
				else
				{
					this.interact.draggable({
						enabled: false
					});
				}
			},

			height()
			{
				this.innerHeight = this.height;
				this.createStyle();
			},

			isDraggable()
			{
				this.draggable = this.isDraggable;
			},

			isResizable()
			{
				this.resizable = this.isResizable;
			},

			resizable()
			{
				if (typeof this.interact === "undefined" || this.interact === null)
					this.interact = interact(this.$refs.item);

				if (this.resizable)
				{
					this.interact.resizable({
						preserveAspectRatio: false,
						edges: {
							top: false,
							left: false,
							right: `.${this.resize_handle_class}`,
							bottom: `.${this.resize_handle_class}`
						},
						ignoreFrom: this.resizeIgnoreFrom
					});

					if (!this.isResizeEventSet)
					{
						this.isResizeEventSet = true;

						this.interact.on("resizestart resizemove resizeend", evt => this.handleResize(evt));
					}
				}
				else
				{
					this.interact.resizable({
						enabled: false
					});
				}
			},

			rowHeight()
			{
				this.createStyle();
			},

			width()
			{
				this.innerWidth = this.width;
				this.createStyle();
			},

			x()
			{
				this.innerX = this.x;
				this.createStyle();
			},

			y()
			{
				this.innerY = this.y;
				this.createStyle();
			}

		}

	};

	/* script */
	const __vue_script__$g = script$g;

	/* template */
	var __vue_render__$f = function() {
	  var _vm = this;
	  var _h = _vm.$createElement;
	  var _c = _vm._self._c || _h;
	  return _c(
	    "div",
	    {
	      ref: "item",
	      staticClass: "latte-grid-item",
	      class: {
	        "is-draggable": _vm.isDraggable,
	        "is-dragging": _vm.is_dragging,
	        "is-resizable": _vm.isResizable,
	        "is-resizing": _vm.is_resizing
	      },
	      style: _vm.style,
	      attrs: { role: "gridcell" }
	    },
	    [
	      _vm._t("default"),
	      _vm._v(" "),
	      _vm.resizable
	        ? _c("div", { staticClass: "grid-item-resize-handle" })
	        : _vm._e()
	    ],
	    2
	  )
	};
	var __vue_staticRenderFns__$f = [];
	__vue_render__$f._withStripped = true;

	  /* style */
	  const __vue_inject_styles__$g = undefined;
	  /* scoped */
	  const __vue_scope_id__$g = undefined;
	  /* module identifier */
	  const __vue_module_identifier__$g = undefined;
	  /* functional template */
	  const __vue_is_functional_template__$g = false;
	  /* style inject */
	  
	  /* style inject SSR */
	  

	  
	  var GridItem = normalizeComponent_1(
	    { render: __vue_render__$f, staticRenderFns: __vue_staticRenderFns__$f },
	    __vue_inject_styles__$g,
	    __vue_script__$g,
	    __vue_scope_id__$g,
	    __vue_is_functional_template__$g,
	    __vue_module_identifier__$g,
	    undefined,
	    undefined
	  );

	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//


	const AVATAR_COLORS = [
		"#477d59",
		"#a54549",
		"#c1823f",
		"#3c9b9f",
		"#aa4b83",
		"#b3464b",
		"#e5993b",
		"#7f51a9"
	];

	var script$h = {

		name: "latte-initials",

		props: {

			initials: {
				default: "BM",
				required: false,
				type: String
			}

		},

		data()
		{
			return {
				seed: 0
			};
		},

		mounted()
		{
			this.onInitialsChanged();
		},

		computed: {

			color()
			{
				return AVATAR_COLORS[this.seed % AVATAR_COLORS.length];
			}

		},

		methods: {

			onInitialsChanged()
			{
				let seed = 0;

				for (let i = 0; i < this.initials.length; i++)
					seed ^= this.initials.charCodeAt(i);

				this.seed = seed;
			}

		},

		watch: {

			initials()
			{
				this.onInitialsChanged();
			}

		}

	};

	/* script */
	const __vue_script__$h = script$h;

	/* template */
	var __vue_render__$g = function() {
	  var _vm = this;
	  var _h = _vm.$createElement;
	  var _c = _vm._self._c || _h;
	  return _c(
	    "svg",
	    { attrs: { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24" } },
	    [
	      _c("rect", {
	        attrs: { fill: _vm.color, height: "24", width: "24", opacity: "0.1" }
	      }),
	      _vm._v(" "),
	      _c(
	        "text",
	        {
	          attrs: {
	            fill: _vm.color,
	            x: "12",
	            y: "15.5",
	            "font-family": "proxima-nova,Arial,Helvetica",
	            "font-size": "10",
	            "font-weight": "600",
	            "text-anchor": "middle",
	            "text-rendering": "geometricPrecision"
	          }
	        },
	        [_vm._v(_vm._s(_vm.initials.toUpperCase()))]
	      )
	    ]
	  )
	};
	var __vue_staticRenderFns__$g = [];
	__vue_render__$g._withStripped = true;

	  /* style */
	  const __vue_inject_styles__$h = undefined;
	  /* scoped */
	  const __vue_scope_id__$h = undefined;
	  /* module identifier */
	  const __vue_module_identifier__$h = undefined;
	  /* functional template */
	  const __vue_is_functional_template__$h = false;
	  /* style inject */
	  
	  /* style inject SSR */
	  

	  
	  var Initials = normalizeComponent_1(
	    { render: __vue_render__$g, staticRenderFns: __vue_staticRenderFns__$g },
	    __vue_inject_styles__$h,
	    __vue_script__$h,
	    __vue_scope_id__$h,
	    __vue_is_functional_template__$h,
	    __vue_module_identifier__$h,
	    undefined,
	    undefined
	  );

	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//


	var script$i = {

		name: "latte-moment",

		props: {

			format: {
				default: "d MMMM YYYY",
				required: false,
				type: String
			},

			unixTimestamp: {
				default: () => Date.now(),
				required: false,
				type: Number
			}

		},

		computed: {

			formatted_moment()
			{
				return this.moment(this.unixTimestamp).format(this.format);
			}

		}
	};

	/* script */
	const __vue_script__$i = script$i;

	/* template */
	var __vue_render__$h = function() {
	  var _vm = this;
	  var _h = _vm.$createElement;
	  var _c = _vm._self._c || _h;
	  return _c("span", { staticClass: "latte-moment" }, [
	    _vm._v(_vm._s(_vm.formatted_moment))
	  ])
	};
	var __vue_staticRenderFns__$h = [];
	__vue_render__$h._withStripped = true;

	  /* style */
	  const __vue_inject_styles__$i = undefined;
	  /* scoped */
	  const __vue_scope_id__$i = undefined;
	  /* module identifier */
	  const __vue_module_identifier__$i = undefined;
	  /* functional template */
	  const __vue_is_functional_template__$i = false;
	  /* style inject */
	  
	  /* style inject SSR */
	  

	  
	  var Moment = normalizeComponent_1(
	    { render: __vue_render__$h, staticRenderFns: __vue_staticRenderFns__$h },
	    __vue_inject_styles__$i,
	    __vue_script__$i,
	    __vue_scope_id__$i,
	    __vue_is_functional_template__$i,
	    __vue_module_identifier__$i,
	    undefined,
	    undefined
	  );

	//

	var script$j = {

		name: "latte-overlay",

		props: {

			name: {
				default: "",
				required: true,
				type: String
			},

			opened: {
				default: false,
				required: false,
				type: Boolean
			},

			responsive: {
				default: true,
				required: false,
				type: Boolean
			}

		},

		data()
		{
			return {
				isOpen: false,
				isVisible: false
			};
		},

		destroyed()
		{
			remove$1(this.name);
		},

		mounted()
		{
			register$1(this.name, this);

			if (this.$el.parentNode)
				this.$el.parentNode.removeChild(this.$el);

			getMainElement().appendChild(this.$el);

			if (this.opened)
				this.open(this.name);
		},

		computed: {

			overlayClasses()
			{
				const classes = [];

				if (this.isOpen)
					classes.push("is-open");

				if (this.responsive)
					classes.push("is-responsive");

				if (this.isVisible)
					classes.push("is-visible");

				return classes;
			}

		},

		methods: {

			close()
			{
				if (!this.isVisible)
					return;

				raf(() => this.isOpen = false);
				raf(() => this.isVisible = false, 270);

				dispatch("latte:overlay", {overlay: this, open: false});
				this.$emit("close", this);
			},

			open()
			{
				if (this.isVisible)
					return;

				raf(() =>
				{
					this.isVisible = true;

					raf(() =>
					{
						applyZ(z => this.$el.style.setProperty("z-index", z));
						this.isOpen = true;
					});
				});

				dispatch("latte:overlay", {overlay: this, open: true});
				this.$emit("open", this);
			}

		},

		watch: {

			name(n, o)
			{
				remove$1(o);
				register$1(n, this);
			},

			opened()
			{
				if (this.opened)
					this.open();
				else
					this.close();
			}

		}

	};

	/* script */
	const __vue_script__$j = script$j;

	/* template */
	var __vue_render__$i = function() {
	  var _vm = this;
	  var _h = _vm.$createElement;
	  var _c = _vm._self._c || _h;
	  return _vm.isVisible
	    ? _c(
	        "div",
	        {
	          staticClass: "overlay",
	          class: _vm.overlayClasses,
	          attrs: { role: "dialog" }
	        },
	        [_vm._t("default")],
	        2
	      )
	    : _vm._e()
	};
	var __vue_staticRenderFns__$i = [];
	__vue_render__$i._withStripped = true;

	  /* style */
	  const __vue_inject_styles__$j = undefined;
	  /* scoped */
	  const __vue_scope_id__$j = undefined;
	  /* module identifier */
	  const __vue_module_identifier__$j = undefined;
	  /* functional template */
	  const __vue_is_functional_template__$j = false;
	  /* style inject */
	  
	  /* style inject SSR */
	  

	  
	  var Overlay = normalizeComponent_1(
	    { render: __vue_render__$i, staticRenderFns: __vue_staticRenderFns__$i },
	    __vue_inject_styles__$j,
	    __vue_script__$j,
	    __vue_scope_id__$j,
	    __vue_is_functional_template__$j,
	    __vue_module_identifier__$j,
	    undefined,
	    undefined
	  );

	//

	var script$k = {

		name: "latte-pagination",

		props: {

			controllerBar: {
				default: false,
				required: false,
				type: Boolean
			},

			limit: {
				default: 10,
				required: true,
				type: Number
			},

			navigationControls: {
				default: true,
				required: false,
				type: Boolean
			},

			offset: {
				default: 0,
				required: false,
				type: Number
			},

			sizeEnd: {
				default: 2,
				required: false,
				type: Number,
				validator: num => num >= 0
			},

			sizeMid: {
				default: 1,
				required: false,
				type: Number,
				validator: num => num >= 0
			},

			total: {
				default: 0,
				required: true,
				type: Number
			}

		},

		data()
		{
			return {
				limits: [5, 10, 20, 50, 100]
			};
		},

		computed: {

			currentPage()
			{
				return Math.min(this.totalPages, Math.floor(this.offset / this.limit) + 1);
			},

			totalPages()
			{
				return Math.ceil(this.total / this.limit);
			},

			visiblePages()
			{
				const current = this.currentPage;
				const total = this.totalPages;

				if (this.totalPages === 0)
					return [];

				let dots = false;
				let pages = [];

				if (this.totalPages === (this.sizeEnd + this.sizeMid + 2))
				{
					for (let n = 1; n <= total; n++)
						pages.push(n);
				}
				else
				{
					for (let n = 1; n <= total; n++)
					{
						if (current === n)
						{
							dots = true;
							pages.push(n);
						}
						else if (n <= this.sizeEnd || (n >= current - this.sizeMid && n <= current + this.sizeMid) || n > total - this.sizeEnd)
						{
							dots = true;
							pages.push(n);
						}
						else if (dots)
						{
							dots = false;
							pages.push("...");
						}
					}
				}

				return pages;
			}

		},

		methods: {

			askForPage()
			{
				prompt(translate("latte-ui", "Navigate to page..."), translate("latte-ui", "To which page do you want to go?")).then(r =>
				{
					if (r.button !== Buttons.OK)
						return;

					const page = parseInt(r.input);

					if (isNaN(page))
						return;

					this.navigate(clamp(page, 1, this.totalPages));
				});
			},

			navigate(page)
			{
				this.$emit("navigate", (page - 1) * this.limit);
			}

		}

	};

	/* script */
	const __vue_script__$k = script$k;

	/* template */
	var __vue_render__$j = function() {
	  var _vm = this;
	  var _h = _vm.$createElement;
	  var _c = _vm._self._c || _h;
	  return _c(
	    "nav",
	    {
	      staticClass: "pagination",
	      class: { "pagination-bar": _vm.controllerBar },
	      attrs: { role: "navigation" }
	    },
	    [
	      _vm.controllerBar
	        ? [
	            _c(
	              "div",
	              { staticClass: "d-flex align-items-center mr-auto" },
	              [
	                _c(
	                  "button",
	                  {
	                    ref: "entriesButton",
	                    staticClass: "btn btn-sm btn-text btn-dark btn-small pr-1",
	                    staticStyle: { "--btn-height": "30px" }
	                  },
	                  [
	                    _c("span", [
	                      _vm._v(
	                        _vm._s(
	                          _vm._f("i18n")("@0 entries", "latte-ui", _vm.limit)
	                        )
	                      )
	                    ]),
	                    _vm._v(" "),
	                    _c("i", { staticClass: "mdi mdi-menu-swap" })
	                  ]
	                ),
	                _vm._v(" "),
	                _c(
	                  "latte-popup",
	                  {
	                    attrs: {
	                      "associate-with": _vm.$refs.entriesButton,
	                      "margin-y": 9
	                    }
	                  },
	                  [
	                    _c(
	                      "nav",
	                      { staticClass: "nav nav-list" },
	                      [
	                        _vm._l(_vm.limits, function(l) {
	                          return [
	                            _c(
	                              "latte-ripple",
	                              {
	                                staticClass: "nav-link",
	                                attrs: { as: "a", "data-close": "" },
	                                on: {
	                                  click: function($event) {
	                                    return _vm.$emit("limit", l)
	                                  }
	                                }
	                              },
	                              [
	                                _c("span", [
	                                  _vm._v(
	                                    _vm._s(
	                                      _vm._f("i18n")(
	                                        "@0 entries",
	                                        "latte-ui",
	                                        l
	                                      )
	                                    )
	                                  )
	                                ])
	                              ]
	                            )
	                          ]
	                        })
	                      ],
	                      2
	                    )
	                  ]
	                ),
	                _vm._v(" "),
	                _c("span", { staticClass: "ml-3" }, [
	                  _vm._v(
	                    _vm._s(
	                      _vm._f("i18n")(
	                        "Showing @0 - @1 of @2",
	                        "latte-ui",
	                        _vm.offset + 1,
	                        Math.min(_vm.offset + _vm.limit, _vm.total),
	                        _vm.total
	                      )
	                    )
	                  )
	                ])
	              ],
	              1
	            )
	          ]
	        : _vm._e(),
	      _vm._v(" "),
	      _vm.visiblePages.length > 0
	        ? [
	            _c(
	              "div",
	              { staticClass: "d-flex align-items-center" },
	              [
	                _vm.navigationControls && _vm.currentPage > 1
	                  ? [
	                      _c(
	                        "button",
	                        {
	                          staticClass: "pagination-item d-none d-md-block",
	                          on: {
	                            click: function($event) {
	                              return _vm.navigate(1)
	                            }
	                          }
	                        },
	                        [
	                          _c("i", {
	                            staticClass: "mdi mdi-chevron-double-left"
	                          })
	                        ]
	                      ),
	                      _vm._v(" "),
	                      _c(
	                        "button",
	                        {
	                          staticClass: "pagination-item",
	                          on: {
	                            click: function($event) {
	                              return _vm.navigate(_vm.currentPage - 1)
	                            }
	                          }
	                        },
	                        [_c("i", { staticClass: "mdi mdi-chevron-left" })]
	                      )
	                    ]
	                  : _vm._e(),
	                _vm._v(" "),
	                _vm._l(_vm.visiblePages, function(page) {
	                  return [
	                    page === "..."
	                      ? _c(
	                          "button",
	                          {
	                            staticClass: "pagination-item",
	                            on: { click: _vm.askForPage }
	                          },
	                          [_vm._v("…")]
	                        )
	                      : _c(
	                          "button",
	                          {
	                            staticClass: "pagination-item",
	                            class: { "is-active": _vm.currentPage === page },
	                            on: {
	                              click: function($event) {
	                                return _vm.navigate(page)
	                              }
	                            }
	                          },
	                          [_vm._v(_vm._s(page))]
	                        )
	                  ]
	                }),
	                _vm._v(" "),
	                _vm.navigationControls && _vm.currentPage < _vm.totalPages
	                  ? [
	                      _c(
	                        "button",
	                        {
	                          staticClass: "pagination-item",
	                          on: {
	                            click: function($event) {
	                              return _vm.navigate(_vm.currentPage + 1)
	                            }
	                          }
	                        },
	                        [_c("i", { staticClass: "mdi mdi-chevron-right" })]
	                      ),
	                      _vm._v(" "),
	                      _c(
	                        "button",
	                        {
	                          staticClass: "pagination-item d-none d-md-block",
	                          on: {
	                            click: function($event) {
	                              return _vm.navigate(_vm.totalPages)
	                            }
	                          }
	                        },
	                        [
	                          _c("i", {
	                            staticClass: "mdi mdi-chevron-double-right"
	                          })
	                        ]
	                      )
	                    ]
	                  : _vm._e()
	              ],
	              2
	            )
	          ]
	        : _vm._e()
	    ],
	    2
	  )
	};
	var __vue_staticRenderFns__$j = [];
	__vue_render__$j._withStripped = true;

	  /* style */
	  const __vue_inject_styles__$k = undefined;
	  /* scoped */
	  const __vue_scope_id__$k = undefined;
	  /* module identifier */
	  const __vue_module_identifier__$k = undefined;
	  /* functional template */
	  const __vue_is_functional_template__$k = false;
	  /* style inject */
	  
	  /* style inject SSR */
	  

	  
	  var Pagination = normalizeComponent_1(
	    { render: __vue_render__$j, staticRenderFns: __vue_staticRenderFns__$j },
	    __vue_inject_styles__$k,
	    __vue_script__$k,
	    __vue_scope_id__$k,
	    __vue_is_functional_template__$k,
	    __vue_module_identifier__$k,
	    undefined,
	    undefined
	  );

	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//


	var script$l = {

		name: "latte-password",

		props: {

			autocomplete: {
				default: "",
				required: false,
				type: String
			},

			id: {
				default: "",
				required: false,
				type: String
			},

			name: {
				default: "",
				required: false,
				type: String
			},

			placeholder: {
				default: "",
				required: false,
				type: String
			},

			show: {
				default: false,
				required: false,
				type: Boolean
			},

			value: {
				default: "",
				required: false,
				type: String
			}

		},

		data()
		{
			return {
				fieldType: this.show ? "text" : "password",
				password: this.value,
				shouldShow: this.show
			};
		},

		computed: {

			bindings()
			{
				const bindings = {};

				if (this.id !== "")
					bindings.id = this.id;

				if (this.name !== "")
					bindings.name = this.name;

				if (this.placeholder !== "")
					bindings.placeholder = this.placeholder;

				return bindings;
			},

			iconClass()
			{
				return this.fieldType === "password" ? "mdi-eye" : "mdi-eye-off";
			}

		},

		methods: {

			toggle()
			{
				this.shouldShow = !this.shouldShow;
			}

		},

		watch: {

			password()
			{
				this.$emit("input", this.password);
			},

			shouldShow()
			{
				this.fieldType = this.shouldShow ? "text" : "password";

				this.$emit("visible", this.shouldShow);
			},

			show()
			{
				this.shouldShow = this.show;
			},

			value()
			{
				this.password = this.value;
			}

		}

	};

	/* script */
	const __vue_script__$l = script$l;

	/* template */
	var __vue_render__$k = function() {
	  var _vm = this;
	  var _h = _vm.$createElement;
	  var _c = _vm._self._c || _h;
	  return _c("div", { staticClass: "form-control" }, [
	    _vm.fieldType === "checkbox"
	      ? _c(
	          "input",
	          _vm._b(
	            {
	              directives: [
	                {
	                  name: "model",
	                  rawName: "v-model",
	                  value: _vm.password,
	                  expression: "password"
	                }
	              ],
	              staticClass: "form-control-plain",
	              attrs: { autocomplete: _vm.autocomplete, type: "checkbox" },
	              domProps: {
	                checked: Array.isArray(_vm.password)
	                  ? _vm._i(_vm.password, null) > -1
	                  : _vm.password
	              },
	              on: {
	                change: function($event) {
	                  var $$a = _vm.password,
	                    $$el = $event.target,
	                    $$c = $$el.checked ? true : false;
	                  if (Array.isArray($$a)) {
	                    var $$v = null,
	                      $$i = _vm._i($$a, $$v);
	                    if ($$el.checked) {
	                      $$i < 0 && (_vm.password = $$a.concat([$$v]));
	                    } else {
	                      $$i > -1 &&
	                        (_vm.password = $$a
	                          .slice(0, $$i)
	                          .concat($$a.slice($$i + 1)));
	                    }
	                  } else {
	                    _vm.password = $$c;
	                  }
	                }
	              }
	            },
	            "input",
	            _vm.bindings,
	            false
	          )
	        )
	      : _vm.fieldType === "radio"
	      ? _c(
	          "input",
	          _vm._b(
	            {
	              directives: [
	                {
	                  name: "model",
	                  rawName: "v-model",
	                  value: _vm.password,
	                  expression: "password"
	                }
	              ],
	              staticClass: "form-control-plain",
	              attrs: { autocomplete: _vm.autocomplete, type: "radio" },
	              domProps: { checked: _vm._q(_vm.password, null) },
	              on: {
	                change: function($event) {
	                  _vm.password = null;
	                }
	              }
	            },
	            "input",
	            _vm.bindings,
	            false
	          )
	        )
	      : _c(
	          "input",
	          _vm._b(
	            {
	              directives: [
	                {
	                  name: "model",
	                  rawName: "v-model",
	                  value: _vm.password,
	                  expression: "password"
	                }
	              ],
	              staticClass: "form-control-plain",
	              attrs: { autocomplete: _vm.autocomplete, type: _vm.fieldType },
	              domProps: { value: _vm.password },
	              on: {
	                input: function($event) {
	                  if ($event.target.composing) {
	                    return
	                  }
	                  _vm.password = $event.target.value;
	                }
	              }
	            },
	            "input",
	            _vm.bindings,
	            false
	          )
	        ),
	    _vm._v(" "),
	    _c(
	      "button",
	      {
	        staticClass: "btn btn-text btn-icon btn-dark form-control-suffix",
	        attrs: { type: "button" },
	        on: { click: _vm.toggle }
	      },
	      [_c("i", { staticClass: "mdi", class: _vm.iconClass })]
	    )
	  ])
	};
	var __vue_staticRenderFns__$k = [];
	__vue_render__$k._withStripped = true;

	  /* style */
	  const __vue_inject_styles__$l = undefined;
	  /* scoped */
	  const __vue_scope_id__$l = undefined;
	  /* module identifier */
	  const __vue_module_identifier__$l = undefined;
	  /* functional template */
	  const __vue_is_functional_template__$l = false;
	  /* style inject */
	  
	  /* style inject SSR */
	  

	  
	  var Password = normalizeComponent_1(
	    { render: __vue_render__$k, staticRenderFns: __vue_staticRenderFns__$k },
	    __vue_inject_styles__$l,
	    __vue_script__$l,
	    __vue_scope_id__$l,
	    __vue_is_functional_template__$l,
	    __vue_module_identifier__$l,
	    undefined,
	    undefined
	  );

	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//


	window.pdfjsLib = window.pdfjsLib || undefined;

	var script$m = {

		name: "latte-pdf-viewer",

		props: {

			source: {
				type: String,
				required: true
			}

		},

		data()
		{
			return {
				isLoading: false,
				pages: 0,
				pdf: null,
				rendered: 0
			};
		},

		mounted()
		{
			this.load();
		},

		computed: {

			hasSupport()
			{
				return pdfjsLib !== undefined;
			}

		},

		methods: {

			load()
			{
				if (!this.hasSupport)
					return;

				this.isLoading = true;
				this.rendered = 0;

				pdfjsLib.getDocument(this.source).then(pdf => this.onPDFLoaded(pdf));
			},

			onPDFLoaded(pdf)
			{
				this.pdf = pdf;
				this.pages = this.pdf.numPages;

				this.$nextTick(() => this.onPDFLoadedSecondTask());
			},

			onPDFLoadedSecondTask()
			{
				for (let i = 1; i <= this.pages; i++)
				{
					let pageElement = this.$el.querySelector(`div.page#page-${i}`);

					if (typeof pageElement === "undefined")
						throw new Error("Page Element not found!");

					let pageCanvas = pageElement.querySelector("canvas");

					this.pdf.getPage(i).then(this.onPDFPageReady.bind(this, pageElement, pageCanvas));
				}
			},

			onPDFPageReady(pageElement, pageCanvas, page)
			{
				this.renderPage(pageElement, pageCanvas, page);
			},

			renderPage(pageElement, pageCanvas, page)
			{
				let desiredWidth = pageElement.getBoundingClientRect().width;
				let viewport = page.getViewport(1);
				let viewScale = 1;
				let scale = desiredWidth / viewport.width;
				viewport = page.getViewport(scale * viewScale);

				let context = pageCanvas.getContext("2d");
				pageElement.style.height = pageCanvas.style.height = ((pageCanvas.height = Math.round(viewport.height)) / viewScale) + 'px';
				pageElement.style.width = pageCanvas.style.width = ((pageCanvas.width = Math.round(viewport.width)) / viewScale) + 'px';

				let renderContext = {
					canvasContext: context,
					viewport: viewport
				};

				page.render(renderContext).then(() =>
				{
					this.rendered++;
					this.isLoading = !(this.rendered === this.pages);
				});
			}

		},

		watch: {

			source()
			{
				this.load();
			}

		}

	};

	/* script */
	const __vue_script__$m = script$m;

	/* template */
	var __vue_render__$l = function() {
	  var _vm = this;
	  var _h = _vm.$createElement;
	  var _c = _vm._self._c || _h;
	  return _vm.hasSupport
	    ? _c(
	        "div",
	        {
	          staticClass: "panel pdf-viewer",
	          class: { "is-loading": _vm.isLoading },
	          staticStyle: { "min-height": "84px" },
	          attrs: { role: "presentation" }
	        },
	        [
	          _vm._l(_vm.pages, function(i) {
	            return _c(
	              "div",
	              { staticClass: "page", attrs: { id: "page-" + i } },
	              [_c("canvas")]
	            )
	          }),
	          _vm._v(" "),
	          _c("span", { staticClass: "spinner" })
	        ],
	        2
	      )
	    : _c("div", { staticClass: "panel" }, [
	        _c("div", { staticClass: "panel-body text-center" }, [
	          _vm._v("\n\t\tPlease include PDF.js in your project.\n\t")
	        ])
	      ])
	};
	var __vue_staticRenderFns__$l = [];
	__vue_render__$l._withStripped = true;

	  /* style */
	  const __vue_inject_styles__$m = undefined;
	  /* scoped */
	  const __vue_scope_id__$m = undefined;
	  /* module identifier */
	  const __vue_module_identifier__$m = undefined;
	  /* functional template */
	  const __vue_is_functional_template__$m = false;
	  /* style inject */
	  
	  /* style inject SSR */
	  

	  
	  var PdfViewer = normalizeComponent_1(
	    { render: __vue_render__$l, staticRenderFns: __vue_staticRenderFns__$l },
	    __vue_inject_styles__$m,
	    __vue_script__$m,
	    __vue_scope_id__$m,
	    __vue_is_functional_template__$m,
	    __vue_module_identifier__$m,
	    undefined,
	    undefined
	  );

	//

	var script$n = {

		name: "latte-popup",

		props: {

			associateWith: {
				default: undefined,
				required: false
			},

			marginX: {
				default: 0,
				required: false,
				type: Number
			},

			marginY: {
				default: 0,
				required: false,
				type: Number
			},

			persistent: {
				default: false,
				required: false,
				type: Boolean
			},

			withArrow: {
				default: true,
				required: false,
				type: Boolean
			}

		},

		beforeDestroy()
		{
			if (this.isOpen)
				popupClosed();

			this.$el.clearOutsideEventListeners();
		},

		destroyed()
		{
			const mainElement = getMainElement();

			if (!(this.$el.parentNode && this.$el.parentNode === mainElement))
				return;

			mainElement.removeChild(this.$el);
		},

		data()
		{
			return {
				isOpen: false,
				popupX: 0,
				popupY: 0,
				rect: null,
				x: 0,
				y: 0,
				lattePersistent: false
			};
		},

		mounted()
		{
			if (this.$el.parentNode)
				this.$el.parentNode.removeChild(this.$el);
			else
				this.bindEvents();

			getMainElement().appendChild(this.$el);

			// Update associate-with prop by updating our parent.
			if (this.$parent && this.$parent.$forceUpdate)
				this.$parent.$forceUpdate();

			this.$el.addOutsideEventListener("mousedown", onlyMouse(this.onOutsideClick), {passive: true});
			this.$el.addOutsideEventListener("touchstart", onlyTouch(this.onOutsideClick), {passive: true});

			live(this.$el, "[href],[data-close]", "click", () => raf(() => this.close()));

			on("latte:tick", () => this.onTick());
			on("latte:context-menu", () => this.close());
			on("latte:overlay", () => this.close());
		},

		render(h)
		{
			return h("div", {class: this.popupClasses, scopedSlots: this.$scopedSlots, style: this.popupStyles}, [
				h("div", {class: "popup-body"}, this.$slots.default)
			]);
		},

		computed: {

			associatedElement()
			{
				if (this.associateWith === undefined)
					return undefined;

				if (this.associateWith instanceof Vue)
					return this.associateWith.$el;

				return this.associateWith;
			},

			popupClasses()
			{
				const classes = ["popup"];

				if (this.withArrow)
				{
					const aboveUnder = this.y > (window.innerHeight / 2) ? "above" : "under";
					const position = this.x > (window.innerWidth / 2) ? "right" : "left";

					classes.push(`popup-${position}-${aboveUnder}`);
				}

				if (this.isOpen === true)
					classes.push("is-open");

				return classes;
			},

			popupStyles()
			{
				return {
					"transform": `translate3d(${this.popupX}px, ${this.popupY}px, 0)`
				};
			},

			isPersistent()
			{
				return this.persistent || this.lattePersistent;
			},

			self()
			{
				return this;
			}

		},

		methods: {

			bindEvents()
			{
				this.rect = this.associatedElement.getBoundingClientRect();
				this.associatedElement.addEventListener("click", this.onClick, {passive: true});
			},

			unbindEvents()
			{
				if (this.associatedElement === undefined)
					return;

				this.rect = null;
				this.associatedElement.removeEventListener("click", this.onClick, {passive: true});
			},

			close()
			{
				if (!this.isOpen)
					return;

				this.isOpen = false;
			},

			open()
			{
				applyZ(z => this.$el.style.setProperty("z-index", z));
				this.isOpen = true;
			},

			toggle()
			{
				if (this.isOpen)
					this.close();
				else
					this.open();
			},

			calculatePosition()
			{
				raf(() =>
				{
					const pcr = this.$el.getBoundingClientRect();
					const px = this.x > (window.innerWidth / 2) ? "right" : "left";
					const py = this.y > (window.innerHeight / 2) ? "above" : "under";

					const l = this.x;
					const t = this.y;
					const h = this.rect !== null ? this.rect.height : 0;
					const w = this.rect !== null ? this.rect.width : 0;

					let x = l + this.marginX;
					let y = t + h + this.marginY;

					if (px === "right")
						x = (l + w) - (pcr.width + this.marginX);

					if (py === "above")
						y = t - (pcr.height + this.marginY);

					this.popupX = Math.round(x);
					this.popupY = Math.round(y + (this.isOpen ? 0 : py === "above" ? -24 : 24));
				});
			},

			setPosition(x, y)
			{
				this.x = x;
				this.y = y;
			},

			onClick()
			{
				this.toggle();
			},

			onOutsideClick()
			{
				if (!this.isOpen || this.isPersistent)
					return;

				this.close();
			},

			onTick()
			{
				if (this.associatedElement !== undefined)
					this.rect = this.associatedElement.getBoundingClientRect();

				this.calculatePosition();
			}

		},

		watch: {

			associateWith(n, o)
			{
				if (o !== undefined)
					this.unbindEvents();

				if (n !== undefined)
					this.bindEvents();
			},

			isOpen()
			{
				this.calculatePosition();

				dispatch("latte:tooltip:hide");

				if (this.isOpen)
				{
					dispatch("latte:popup:open", this);
					popupOpened();
					this.$emit("open");
				}
				else
				{
					dispatch("latte:popup:close", this);
					popupClosed();
					this.$emit("close");
				}
			},

			rect()
			{
				if (this.rect !== null)
				{
					this.x = this.rect.left;
					this.y = this.rect.top;
				}
				else
				{
					this.x = 0;
					this.y = 0;
				}

				this.calculatePosition();
			}

		}

	};

	/* script */
	const __vue_script__$n = script$n;

	/* template */

	  /* style */
	  const __vue_inject_styles__$n = undefined;
	  /* scoped */
	  const __vue_scope_id__$n = undefined;
	  /* module identifier */
	  const __vue_module_identifier__$n = undefined;
	  /* functional template */
	  const __vue_is_functional_template__$n = undefined;
	  /* style inject */
	  
	  /* style inject SSR */
	  

	  
	  var Popup = normalizeComponent_1(
	    {},
	    __vue_inject_styles__$n,
	    __vue_script__$n,
	    __vue_scope_id__$n,
	    __vue_is_functional_template__$n,
	    __vue_module_identifier__$n,
	    undefined,
	    undefined
	  );

	/*
	 * Copyright (c) 2019 - Bas Milius <bas@mili.us>
	 *
	 * This file is part of the Latte UI package.
	 *
	 * For the full copyright and license information, please view the
	 * LICENSE file that was distributed with this source code.
	 */

	function extractAttributes(elm)
	{
		const map = elm.hasAttributes() ? elm.attributes : [];
		const attrs = {};

		for (let i = 0; i < map.length; i++)
		{
			const attr = map[i];

			if (attr.value)
				attrs[attr.name] = attr.value === "" ? true : attr.value;
		}

		let cls;
		let style;

		if (attrs.class)
		{
			cls = attrs.class;
			delete attrs.class;
		}

		if (attrs.style)
		{
			style = attrs.style;
			delete attrs.style;
		}

		return {
			attrs,
			class: cls,
			style
		};
	}

	function freeze(item)
	{
		if (Array.isArray(item) || typeof item === "object")
			return Object.freeze(item);

		return item;
	}

	function combinePassengers(transports, slotProps = {})
	{
		return transports.reduce((passengers, transport) =>
		{
			let newPassengers = transport.passengers[0];

			return passengers.concat(typeof newPassengers === "function" ? newPassengers(slotProps) : transport.passengers);
		}, []);
	}

	function stableSort(array, compareFn)
	{
		return array
			.map((v, idx) => [idx, v])
			.sort(function (a, b)
			{
				return this(a[1], b[1]) || a[0] - b[0]
			}.bind(compareFn))
			.map(c => c[1]);
	}

	/*
	 * Copyright (c) 2019 - Bas Milius <bas@mili.us>
	 *
	 * This file is part of the Latte UI package.
	 *
	 * For the full copyright and license information, please view the
	 * LICENSE file that was distributed with this source code.
	 */

	const transports = {};

	const Wormhole = Vue.extend({

		data: () => ({transports}),

		methods: {

			open(transport)
			{
				const {to, from, passengers} = transport;

				if (!to || !from || !passengers)
					return;

				transport.passengers = freeze(passengers);

				const keys = Object.keys(this.transports);

				if (keys.indexOf(to) === -1)
					Vue.set(this.transports, to, []);

				const currentIndex = this.getTransportIndex(transport);
				const newTransports = this.transports[to].slice(0);

				if (currentIndex === -1)
					newTransports.push(transport);
				else
					newTransports[currentIndex] = transport;

				this.transports[to] = stableSort(newTransports, function (a, b)
				{
					return a.order - b.order;
				});
			},

			close(transport, force = false)
			{
				const {to, from} = transport;

				if (!to || !from)
					return;

				if (!this.transports[to])
					return;

				if (force)
				{
					this.transports[to] = [];
				}
				else
				{
					const index = this.getTransportIndex(transport);

					if (index >= 0)
					{
						const newTransports = this.transports[to].slice(0);
						newTransports.splice(index, 1);
						this.transports[to] = newTransports;
					}
				}
			},

			hasTarget(to)
			{
				return this.transports.hasOwnProperty(to);
			},

			hasContentFor(to)
			{
				if (!this.transports[to])
					return false;

				return this.getContentFor(to).length > 0;
			},

			getSourceFor(to)
			{
				return this.transports[to] && this.transports[to][0].from;
			},

			getContentFor(to)
			{
				const transports = this.transports[to];

				if (!transports)
					return undefined;

				return combinePassengers(transports);
			},

			getTransportIndex({to, from})
			{
				for (const i in this.transports[to])
					if (this.transports[to][i].from === from)
						return i;

				return -1
			}

		}

	});

	const wormhole = new Wormhole(transports);

	//

	var script$o = {

		abstract: false,

		name: "latte-portal-target",

		props: {

			attributes: {
				default: () => ({}),
				required: false,
				type: Object
			},

			multiple: {
				default: false,
				required: false,
				type: Boolean
			},

			name: {
				required: true,
				type: String
			},

			slim: {
				default: false,
				type: Boolean
			},

			slotProps: {
				default: () => ({}),
				type: Object
			},

			tag: {
				default: "div",
				type: String
			},

			transition: {
				default: false,
				type: [Boolean, String, Object]
			},

			transitionEvents: {
				default: () => ({}),
				type: Object
			}

		},

		beforeDestroy()
		{
			this.unwatch();
		},

		created()
		{
			if (!this.transports[this.name])
				this.$set(this.transports, this.name, []);
		},

		data()
		{
			return {
				transports: wormhole.transports,
				firstRender: true
			};
		},

		mounted()
		{
			this.unwatch = this.$watch("ownTransports", this.emitChange);

			this.$nextTick(() =>
			{
				if (this.transition)
					this.firstRender = false;
			});

			if (this.$options.abstract)
				this.$options.abstract = false;
		},

		render(ce)
		{
			const children = this.children();
			const noWrapper = this.noWrapper();

			if (this.withTransition)
			{
				const transitionType = noWrapper ? "transition" : "transition-group";

				return ce(transitionType, {
					class: ["latte-portal-target"],
					props: this.transitionData
				}, children);
			}

			if (noWrapper)
				return children[0];

			return ce(this.tag, {
				class: ["latte-portal-target", ...this.transportedClasses].filter(c => c !== undefined),
				props: this.attributes
			}, children);
		},

		updated()
		{
			if (this.$options.abstract)
				this.$options.abstract = false;
		},

		computed: {

			hasAttributes()
			{
				return Object.keys(this.attributes).length > 0;
			},

			ownTransports()
			{
				const transports = this.transports[this.name] || [];

				return this.multiple ? transports : (transports.length === 0 ? [] : [transports[transports.length - 1]]);
			},

			passengers()
			{
				return combinePassengers(this.ownTransports, this.slotProps);
			},

			transitionData()
			{
				const t = this.transition;
				const data = {};

				if (this.firstRender && (typeof this.transition === "object" && !this.transition.appear))
				{
					data.props = {name: ""};

					return data;
				}

				if (typeof t === "string")
					data.props = {name: t};
				else if (typeof t === "object")
					data.props = t;

				if (this.renderSlim)
					data.props.tag = this.tag;

				data.on = this.transitionEvents;

				return data;
			},

			transportedClasses()
			{
				return this.ownTransports
					.map(transport => transport.class)
					.reduce((array, subarray) => array.concat(subarray), []);
			},

			withTransition()
			{
				return !!this.transition;
			}

		},

		methods: {

			children()
			{
				return this.passengers.length > 0 ? this.passengers : this.$slots.default || []
			},

			emitChange(newTransports, oldTransports)
			{
				if (this.multiple)
				{
					this.$emit("change", [...newTransports], [...oldTransports]);
				}
				else
				{
					const newTransport = newTransports.length === 0 ? undefined : newTransports[0];
					const oldTransport = oldTransports.length === 0 ? undefined : oldTransports[0];

					this.$emit("change", {...newTransport}, {...oldTransport});
				}
			},

			noWrapper()
			{
				const noWrapper = !this.hasAttributes && this.slim;

				if (noWrapper && this.children().length > 1)
					throw new Error("[LatteUI] <latte-portal-target> with slim option received more than one child element.");

				return noWrapper;
			}

		}

	};

	/* script */
	const __vue_script__$o = script$o;

	/* template */

	  /* style */
	  const __vue_inject_styles__$o = undefined;
	  /* scoped */
	  const __vue_scope_id__$o = undefined;
	  /* module identifier */
	  const __vue_module_identifier__$o = undefined;
	  /* functional template */
	  const __vue_is_functional_template__$o = undefined;
	  /* style inject */
	  
	  /* style inject SSR */
	  

	  
	  var PortalTarget = normalizeComponent_1(
	    {},
	    __vue_inject_styles__$o,
	    __vue_script__$o,
	    __vue_scope_id__$o,
	    __vue_is_functional_template__$o,
	    __vue_module_identifier__$o,
	    undefined,
	    undefined
	  );

	//

	let portalId = 0;

	var script$p = {

		abstract: false,

		name: "latte-portal",

		props: {

			disabled: {
				default: false,
				required: false,
				type: Boolean
			},

			name: {
				default: () => String(++portalId),
				required: false,
				type: String
			},

			order: {
				default: 0,
				required: false,
				type: Number
			},

			slim: {
				default: false,
				required: false,
				type: Boolean
			},

			slotProps: {
				default: () => ({}),
				required: false,
				type: Object
			},

			tag: {
				default: "div",
				required: false,
				type: String
			},

			targetEl: {
				default: undefined,
				required: false,
				type: [String, HTMLElement]
			},

			targetClass: {
				default: undefined,
				required: false,
				type: String
			},

			to: {
				default: () => String(Math.round(Math.random() * 10000000)),
				required: true,
				type: String
			}

		},

		beforeDestroy()
		{
			this.clear();

			if (this.mountedComp)
				this.mountedComp.$destroy();
		},

		mounted()
		{
			if (this.targetEl)
				this.mountToTarget();

			if (!this.disabled)
				this.sendUpdate();

			if (this.$options.abstract)
				this.$options.abstract = false;
		},

		render(h)
		{
			const children = this.$slots.default || this.$scopedSlots.default || [];

			if (children.length && this.disabled)
			{
				this.$options.abstract = true;

				return children.length <= 1 && this.slim ? children[0] : h(this.tag, {class: ["latte-portal"]}, this.normalizeChildren(children));
			}
			else
			{
				return h(this.tag, {class: ["latte-portal"], key: "latte-portal-placeholder", style: {display: "none"}}, []);
			}
		},

		updated()
		{
			if (this.disabled)
				this.clear();
			else
				this.sendUpdate();

			if (this.$options.abstract)
				this.$options.abstract = false;
		},

		methods: {

			clear(target)
			{
				wormhole.close({
					from: this.name,
					to: target || this.to
				});
			},

			mountToTarget()
			{
				let elm;
				const target = this.targetEl;

				if (typeof target === "string")
					elm = document.querySelector(target);
				else if (target instanceof HTMLElement)
					elm = target;
				else
					throw new Error("[LatteUI] <latte-portal> value of targetEl must be of type String or HTMLElement.");

				if (!elm)
					throw new Error("[LatteUI] <latte-portal> The specified target was not found.");

				const newTarget = new Vue({

					...PortalTarget,

					parent: this,

					propsData: {
						attributes: extractAttributes(elm),
						name: this.to,
						tag: elm.tagName
					}

				});

				newTarget.$mount(elm);

				this.mountedComp = newTarget;
			},

			normalizeChildren(children)
			{
				return typeof children === "function" ? children(this.slotProps) : children;
			},

			normalizedSlots()
			{
				return this.$scopedSlots.default ? [this.$scopedSlots.default] : this.$slots.default;
			},

			sendUpdate()
			{
				const slotContent = this.normalizedSlots();

				if (slotContent)
				{
					wormhole.open({
						from: this.name,
						to: this.to,
						passengers: [...slotContent],
						class: this.targetClass && this.targetClass.split(" "),
						order: this.order
					});
				}
				else
				{
					this.clear();
				}
			}
		},

		watch: {

			to(newValue, oldValue)
			{
				oldValue && oldValue !== newValue && this.clear(oldValue);

				this.sendUpdate();
			},

			targetEl(newValue)
			{
				if (newValue)
					this.mountToTarget();
			}
		}

	};

	/* script */
	const __vue_script__$p = script$p;

	/* template */

	  /* style */
	  const __vue_inject_styles__$p = undefined;
	  /* scoped */
	  const __vue_scope_id__$p = undefined;
	  /* module identifier */
	  const __vue_module_identifier__$p = undefined;
	  /* functional template */
	  const __vue_is_functional_template__$p = undefined;
	  /* style inject */
	  
	  /* style inject SSR */
	  

	  
	  var Portal = normalizeComponent_1(
	    {},
	    __vue_inject_styles__$p,
	    __vue_script__$p,
	    __vue_scope_id__$p,
	    __vue_is_functional_template__$p,
	    __vue_module_identifier__$p,
	    undefined,
	    undefined
	  );

	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//


	const DASH_CAP = 69;

	var script$q = {

		name: "latte-progress",

		props: {

			isIndeterminate: {
				default: false,
				required: false,
				type: Boolean
			},

			isRing: {
				default: false,
				required: false,
				type: Boolean
			},

			max: {
				default: 100,
				required: false,
				type: Number
			},

			min: {
				default: 0,
				required: false,
				type: Number
			},

			value: {
				default: 0,
				required: false,
				type: Number
			}

		},

		data()
		{
			return {
				bar: 0,
				ring: 0
			};
		},

		mounted()
		{
			this.renderProgress();
		},

		computed: {

			barStyle()
			{
				if (this.isIndeterminate)
					return {};

				return {
					width: `${this.bar}%`
				};
			},

			ringStyle()
			{
				if (this.isIndeterminate)
					return "40 999";

				return `${this.ring} 999`;
			}

		},

		methods: {

			renderProgress()
			{
				if (this.isIndeterminate)
					return;

				const max = this.max - this.min;
				const value = Math.max(this.min, Math.min(this.max, this.value)) - this.min;
				const p = value / max;

				if (this.isRing)
					this.renderProgressRing(p);
				else
					this.renderProgressBar(p);
			},

			renderProgressBar(p)
			{
				this.bar = p * 100;
			},

			renderProgressRing(p)
			{
				this.ring = p * DASH_CAP;
			}

		},

		watch: {

			isIndeterminate()
			{
				this.renderProgress();
			},

			isRing()
			{
				this.renderProgress();
			},

			max()
			{
				this.renderProgress();
			},

			min()
			{
				this.renderProgress();
			},

			value()
			{
				this.renderProgress();
			}

		}

	};

	/* script */
	const __vue_script__$q = script$q;

	/* template */
	var __vue_render__$m = function() {
	  var _vm = this;
	  var _h = _vm.$createElement;
	  var _c = _vm._self._c || _h;
	  return _vm.isRing
	    ? _c(
	        "svg",
	        {
	          staticClass: "progress progress-ring",
	          class: {
	            "is-determinate": !_vm.isIndeterminate,
	            "is-indeterminate": _vm.isIndeterminate
	          },
	          staticStyle: { height: "48px", width: "48px" },
	          attrs: { viewBox: "0 0 24 24" }
	        },
	        [
	          _c(
	            "defs",
	            [
	              _c(
	                "linearGradient",
	                { attrs: { id: "wave" } },
	                [
	                  _c("stop", {
	                    attrs: {
	                      offset: "0%",
	                      "stop-color": "rgb(var(--progress-color))"
	                    }
	                  }),
	                  _vm._v(" "),
	                  _c("stop", {
	                    attrs: {
	                      offset: "25%",
	                      "stop-color": "rgb(var(--progress-color))"
	                    }
	                  }),
	                  _vm._v(" "),
	                  _c("stop", {
	                    attrs: { offset: "25.1%", "stop-color": "transparent" }
	                  }),
	                  _vm._v(" "),
	                  _c("stop", {
	                    attrs: { offset: "100%", "stop-color": "transparent" }
	                  })
	                ],
	                1
	              )
	            ],
	            1
	          ),
	          _vm._v(" "),
	          _c("circle", {
	            staticClass: "progress-track",
	            attrs: {
	              r: "11",
	              cx: "12",
	              cy: "12",
	              fill: "transparent",
	              "stroke-width": "3"
	            }
	          }),
	          _vm._v(" "),
	          _c("circle", {
	            staticClass: "progress-value",
	            attrs: {
	              r: "11",
	              cx: "12",
	              cy: "12",
	              fill: "transparent",
	              "stroke-width": "3",
	              "stroke-dasharray": _vm.ringStyle
	            }
	          })
	        ]
	      )
	    : _c(
	        "div",
	        {
	          staticClass: "progress progress-bar",
	          class: { "is-indeterminate": _vm.isIndeterminate }
	        },
	        [_c("div", { staticClass: "progress-value", style: _vm.barStyle })]
	      )
	};
	var __vue_staticRenderFns__$m = [];
	__vue_render__$m._withStripped = true;

	  /* style */
	  const __vue_inject_styles__$q = undefined;
	  /* scoped */
	  const __vue_scope_id__$q = undefined;
	  /* module identifier */
	  const __vue_module_identifier__$q = undefined;
	  /* functional template */
	  const __vue_is_functional_template__$q = false;
	  /* style inject */
	  
	  /* style inject SSR */
	  

	  
	  var Progress = normalizeComponent_1(
	    { render: __vue_render__$m, staticRenderFns: __vue_staticRenderFns__$m },
	    __vue_inject_styles__$q,
	    __vue_script__$q,
	    __vue_scope_id__$q,
	    __vue_is_functional_template__$q,
	    __vue_module_identifier__$q,
	    undefined,
	    undefined
	  );

	//

	const defaultPlugins = ["RTEBasicFormattingPlugin", "RTEAlignmentPlugin", "RTEMentionsPlugin"];
	const domObserverConfig = {attributes: true, childList: true, subtree: true};

	var script$r = {

		name: "latte-rich-text-editor",

		props: {

			plugins: {
				default: () => defaultPlugins,
				required: false,
				type: Array
			},

			value: {
				default: "<p><br></p>",
				required: false,
				type: String
			}

		},

		destroyed()
		{
			if (this.domObserver !== null)
				this.domObserver.disconnect();
		},

		data()
		{
			return {
				commands: [],
				toolbar: {
					enabled: true,
					rows: []
				},
				html: this.value,
				text: "",
				domObserver: null,
				isFocused: false,
				isMutationsAllowed: true
			};
		},

		mounted()
		{
			this.initialize();

			this.addToolbarAction("indent-increase", "format-indent-increase", "Indent", 0, {groupId: "indention"});
			this.addToolbarAction("indent-decrease", "format-indent-decrease", "Outdent", 0, {groupId: "indention"});

			this.addToolbarAction("extra-image", "image", "Insert image...", 0, {groupId: "extra"});
			this.addToolbarAction("extra-link", "link", "Insert link...", 0, {groupId: "extra"});
			this.addToolbarAction("extra-code", "code-braces", "Insert code...", 0, {groupId: "extra"});
			this.addToolbarAction("extra-plus", "plus", "Insert...", 0, {groupId: "extra"});
		},

		computed: {

			editableContent()
			{
				return this.$refs.editableContent;
			},

			isPlaceholderShown()
			{
				return this.text.trim() === "";
			},

			toolbarRows()
			{
				const definitions = [];

				for (let row of this.toolbar.rows)
				{
					let rd = [];

					for (let action of row)
					{
						if (action.groupId)
						{
							let groupIndex = rd.findIndex(g => g.type === "group" && g.group.id === action.groupId);

							if (groupIndex === -1)
							{
								if (rd.length > 0)
									rd.push({type: "separator"});

								groupIndex = rd.length;

								rd.push({type: "group", actions: [], group: {id: action.groupId}});
							}

							rd[groupIndex].actions.push({type: "action", action});
						}
						else
						{
							if (rd.length > 0)
								rd.push({type: "separator"});

							rd.push({type: "action", action});
						}
					}

					definitions.push(rd);
				}

				return definitions;
			}

		},

		methods: {

			initialize()
			{
				this.editableContent.innerHTML = this.html;
				this.text = this.editableContent.innerText;

				this.domObserver = new MutationObserver(mutations => this.onContentChanged(mutations));
				this.domObserver.observe(this.editableContent, domObserverConfig);

				document.addEventListener("selectionchange", evt => this.onSelectionChanged(evt));
				document.execCommand("defaultParagraphSeparator", false, "p");
				document.execCommand("styleWithCSS", true);
			},

			addElementAtCursor(el)
			{
				const selection = window.getSelection();

				if (selection.rangeCount > 0)
				{
					const range = selection.getRangeAt(0);
					range.deleteContents();
					range.insertNode(el);
				}
				else
				{
					this.editableContent.appendChild(el);
				}
			},

			addToolbarAction(id, icon, label, row = 0, options = {})
			{
				while (this.toolbar.rows[row] === undefined)
					this.toolbar.rows.push([]);

				this.toolbar.rows[row].push({id, icon, label, ...options});
			},

			executeCommand(id, ...params)
			{
				const command = this.commands.find(c => c.id === id);

				if (!command)
					return;

				this.isMutationsAllowed = false;
				this.editableContent.focus();
				command.fn(...params);
				this.isMutationsAllowed = true;
				this.onContentChanged();
			},

			getToolbarAction(id)
			{
				let action;

				for (let row of this.toolbar.rows)
					if ((action = row.find(a => a.id === id)) !== null)
						return action;

				return undefined;
			},

			registerCommand(id, fn)
			{
				this.commands.push({id, fn});
			},

			removeEmptyness()
			{
				this.isMutationsAllowed = false;

				this.$emit("remove-emptyness");
				this.editableContent.querySelectorAll("p:empty").forEach(el => el.remove());

				this.isMutationsAllowed = true;
			},

			setSelection(el, offset = 0, collapse = true)
			{
				const range = document.createRange();
				const selection = window.getSelection();

				range.setStart(el, offset);
				range.collapse(collapse);
				selection.removeAllRanges();
				selection.addRange(range);
			},

			setSelectionAfter(el, collapse = false, char = "\u00A0")
			{
				if (char === " ")
					char = "\u00A0";

				const range = document.createRange();
				const selection = window.getSelection();
				let dummy = document.createTextNode(char);

				if (el.nextSibling && !(el.nextSibling instanceof HTMLBRElement) && el.nextSibling.wholeText !== "")
				{
					range.setStart(el.nextSibling, 1);
				}
				else
				{
					if (el.nextSibling)
						el.parentNode.insertBefore(dummy, el.nextSibling);
					else
						el.parentNode.appendChild(dummy);

					range.setStartAfter(dummy);
				}

				range.collapse(collapse);

				selection.removeAllRanges();
				selection.addRange(range);
			},

			setSelectionBefore(el, collapse = false)
			{
				const range = document.createRange();
				const selection = window.getSelection();

				range.setStartBefore(el);
				range.collapse(collapse);

				selection.removeAllRanges();
				selection.addRange(range);
			},

			onBlur()
			{
				this.isFocused = false;
				this.$emit("blur");
			},

			onContentChanged()
			{
				this.removeEmptyness();

				this.html = this.editableContent.innerHTML;
				this.text = this.editableContent.innerText;

				if (this.isPlaceholderShown && this.isFocused)
				{
					document.execCommand("selectAll", false, null);
					document.execCommand("removeFormat", false, null);
				}
			},

			onFocus()
			{
				this.isFocused = true;
				this.$emit("focus");
			},

			onKeyDown(evt)
			{
				this.$emit("keydown", evt);
			},

			onKeyUp(evt)
			{
				this.$emit("keyup", evt);
			},

			onSelectionChanged(evt)
			{
				const selection = window.getSelection();

				if (closest(selection.anchorNode, this.$el) === null)
					return;

				this.$emit("selection-changed", selection, evt);
			},

			onToolbarActionClick(evt, action)
			{
				this.$emit("toolbar-action", evt, action);
				this.$emit(`toolbar-action:${action.id}`, evt, action);
			}

		},

		watch: {

			html()
			{
				if (this.html === "")
					this.html = "<p><br></p>";

				this.$emit("input", this.html);
			},

			isMutationsAllowed()
			{
				if (this.isMutationsAllowed)
					this.domObserver.observe(this.editableContent, domObserverConfig);
				else
					this.domObserver.disconnect();
			},

			value()
			{
				this.editableContent.innerHTML = this.html;
				this.text = this.editableContent.innerText;
			}

		}

	};

	/* script */
	const __vue_script__$r = script$r;

	/* template */
	var __vue_render__$n = function() {
	  var _vm = this;
	  var _h = _vm.$createElement;
	  var _c = _vm._self._c || _h;
	  return _c(
	    "div",
	    {
	      staticClass: "panel panel-blank rich-text-editor",
	      class: { "is-focused": _vm.isFocused },
	      staticStyle: { "min-height": "300px" }
	    },
	    [
	      _c(
	        "div",
	        { staticClass: "app-bar rte-toolbar" },
	        _vm._l(_vm.toolbarRows, function(row, rowIndex) {
	          return _vm.toolbar.enabled
	            ? _c(
	                "div",
	                { staticClass: "app-bar-row" },
	                [
	                  _vm._l(row, function(el) {
	                    return [
	                      el.type === "separator"
	                        ? _c("div", { staticClass: "divider divider-vertical" })
	                        : el.type === "group"
	                        ? _c(
	                            "div",
	                            { staticClass: "btn-group" },
	                            _vm._l(el.actions, function(a) {
	                              return _c(
	                                "button",
	                                {
	                                  staticClass:
	                                    "btn btn-icon btn-text btn-dark m-0",
	                                  class: {
	                                    "is-active": a.action.isActive || false
	                                  },
	                                  attrs: { "data-tooltip": a.action.label },
	                                  on: {
	                                    click: function($event) {
	                                      return _vm.onToolbarActionClick(
	                                        $event,
	                                        a.action
	                                      )
	                                    }
	                                  }
	                                },
	                                [
	                                  _c("i", {
	                                    staticClass: "mdi",
	                                    class: ["mdi-" + a.action.icon]
	                                  })
	                                ]
	                              )
	                            }),
	                            0
	                          )
	                        : el.type === "action"
	                        ? _c(
	                            "button",
	                            {
	                              staticClass: "btn btn-icon btn-text btn-dark m-0",
	                              class: {
	                                "is-active": el.action.isActive || false
	                              },
	                              attrs: { "data-tooltip": el.action.label },
	                              on: {
	                                click: function($event) {
	                                  return _vm.onToolbarActionClick(
	                                    $event,
	                                    el.action
	                                  )
	                                }
	                              }
	                            },
	                            [
	                              _c("i", {
	                                staticClass: "mdi",
	                                class: ["mdi-" + el.action.icon]
	                              })
	                            ]
	                          )
	                        : _vm._e()
	                    ]
	                  }),
	                  _vm._v(" "),
	                  rowIndex === 0
	                    ? [
	                        _c("div", {
	                          staticClass: "divider divider-vertical ml-auto"
	                        }),
	                        _vm._v(" "),
	                        _vm._m(0, true)
	                      ]
	                    : _vm._e()
	                ],
	                2
	              )
	            : _vm._e()
	        }),
	        0
	      ),
	      _vm._v(" "),
	      _c("div", { staticClass: "rte-frame" }, [
	        _vm.isPlaceholderShown
	          ? _c("div", { staticClass: "rte-frame-placeholder" }, [
	              _vm._v("Type something here…")
	            ])
	          : _vm._e(),
	        _vm._v(" "),
	        _c("div", {
	          ref: "editableContent",
	          staticClass: "rte-frame-content",
	          attrs: { contenteditable: "", spellcheck: "false" },
	          on: {
	            blur: _vm.onBlur,
	            focus: _vm.onFocus,
	            keydown: _vm.onKeyDown,
	            keyup: _vm.onKeyUp
	          }
	        })
	      ]),
	      _vm._v(" "),
	      _vm._l(_vm.plugins, function(plugin, key) {
	        return _c(plugin, { key: key, tag: "component" })
	      })
	    ],
	    2
	  )
	};
	var __vue_staticRenderFns__$n = [
	  function() {
	    var _vm = this;
	    var _h = _vm.$createElement;
	    var _c = _vm._self._c || _h;
	    return _c("div", { staticClass: "btn-group" }, [
	      _c(
	        "button",
	        {
	          staticClass: "btn btn-icon btn-text btn-dark m-0",
	          attrs: { "data-tooltip": "More..." }
	        },
	        [_c("i", { staticClass: "mdi mdi-dots-vertical" })]
	      )
	    ])
	  }
	];
	__vue_render__$n._withStripped = true;

	  /* style */
	  const __vue_inject_styles__$r = undefined;
	  /* scoped */
	  const __vue_scope_id__$r = undefined;
	  /* module identifier */
	  const __vue_module_identifier__$r = undefined;
	  /* functional template */
	  const __vue_is_functional_template__$r = false;
	  /* style inject */
	  
	  /* style inject SSR */
	  

	  
	  var RichTextEditor = normalizeComponent_1(
	    { render: __vue_render__$n, staticRenderFns: __vue_staticRenderFns__$n },
	    __vue_inject_styles__$r,
	    __vue_script__$r,
	    __vue_scope_id__$r,
	    __vue_is_functional_template__$r,
	    __vue_module_identifier__$r,
	    undefined,
	    undefined
	  );

	//

	var script$s = {

		name: "latte-ripple",

		props: {

			as: {
				default: "div",
				required: false,
				type: String
			}

		},

		data()
		{
			return {
				clip: true,
				observer: null,
				ripples: []
			};
		},

		destroyed()
		{
			if (this.observer !== null)
				this.observer.disconnect();

			// Remove all ripples, we don't want any animation at this point.
			while (this.ripples.length > 0)
				this.ripples.shift().remove();
		},

		mounted()
		{
			this.$el.classList.add("is-ripple");

			// TODO(Bas): Should probably find something that doesn't only work in Chrome :)
			if (window.ResizeObserver)
			{
				this.observer = new ResizeObserver(entries => this.onResizeObserved(entries));
				this.observer.observe(this.$el);
			}

			this.$el.addEventListener("touchcancel", onlyTouch(this.onPointerUp), {passive: true});
			this.$el.addEventListener("touchmove", onlyTouch(this.onPointerUp), {passive: true});
			this.$el.addEventListener("touchstart", onlyTouch(this.onPointerDown), {passive: true});
			this.$el.addEventListener("touchend", onlyTouch(this.onPointerUp), {passive: true});

			this.$el.addEventListener("mouseleave", onlyMouse(this.onPointerUp), {passive: true});
			this.$el.addEventListener("mousedown", onlyMouse(this.onPointerDown), {passive: true});
			this.$el.addEventListener("mouseup", onlyMouse(this.onPointerUp), {passive: true});
		},

		render(h)
		{
			return h(this.as, {attrs: {...this.$attrs}, on: this.$listeners, scopedSlots: this.$scopedSlots}, [
				h("div", {class: ["ripple-container", !this.clip ? "is-ripple-out" : undefined]}),
				...this.$slots.default
			]);
		},

		methods: {

			createRipple(x, y)
			{
				const rect = this.$el.getBoundingClientRect();
				const size = pythagorean(rect.width, rect.height) + 2; // Add two, just to be sure we cover everything.
				const sizeHalf = size / 2;

				const computedStyles = window.getComputedStyle(this.$el);
				const isCentered = computedStyles.getPropertyValue("--ripple-center").trim() !== "false";
				this.clip = computedStyles.getPropertyValue("--ripple-clip").trim() !== "false";

				if (isCentered)
				{
					x = rect.width / 2;
					y = rect.height / 2;
				}

				const ripple = createElement("div", ripple =>
				{
					ripple.classList.add("ripple");

					const minSize = isCentered ? 12 : Math.max(size * .1, 24);

					ripple.style.setProperty("--ripple-scale", `${minSize / size}`);
					ripple.style.setProperty("--ripple-size", `${size}px`);
					ripple.style.setProperty("--ripple-x", `${x - sizeHalf}px`);
					ripple.style.setProperty("--ripple-y", `${y - sizeHalf}px`);

					this.$el.querySelector(".ripple-container").appendChild(ripple);
				});

				raf(() =>
				{
					ripple.style.setProperty("--ripple-scale", "1");

					if (isCentered)
						return;

					ripple.style.setProperty("--ripple-x", `${rect.width / 2 - sizeHalf}px`);
					ripple.style.setProperty("--ripple-y", `${rect.height / 2 - sizeHalf}px`);
				});

				return ripple;
			},

			onPointerDown(evt)
			{
				const {x, y} = relativeCoordsTo(this.$el, evt);

				this.ripples.push(this.createRipple(x, y));
			},

			onPointerUp()
			{
				if (this.ripples.length === 0)
					return;

				const ripple = this.ripples.filter(r => !r.classList.contains("is-removing"))[0];

				if (ripple === undefined)
					return;

				ripple.classList.add("is-removing");

				raf(() => ripple.style.setProperty("opacity", "0"), 180);

				raf(() =>
				{
					this.ripples = this.ripples.filter(r => r !== ripple);
					ripple.remove();
				}, 360);
			},

			onResizeObserved()
			{
				if (this.ripples.length === 0)
					return;

				const rect = this.$el.getBoundingClientRect();
				const size = pythagorean(rect.width, rect.height) + 2; // Add two, just to be sure we cover everything.
				const sizeHalf = size / 2;

				this.ripples.forEach(ripple =>
				{
					ripple.style.setProperty("--ripple-size", `${size}px`);
					ripple.style.setProperty("--ripple-x", `${rect.width / 2 - sizeHalf}px`);
					ripple.style.setProperty("--ripple-y", `${rect.height / 2 - sizeHalf}px`);
				});
			}

		}

	};

	/* script */
	const __vue_script__$s = script$s;

	/* template */

	  /* style */
	  const __vue_inject_styles__$s = undefined;
	  /* scoped */
	  const __vue_scope_id__$s = undefined;
	  /* module identifier */
	  const __vue_module_identifier__$s = undefined;
	  /* functional template */
	  const __vue_is_functional_template__$s = undefined;
	  /* style inject */
	  
	  /* style inject SSR */
	  

	  
	  var Ripple = normalizeComponent_1(
	    {},
	    __vue_inject_styles__$s,
	    __vue_script__$s,
	    __vue_scope_id__$s,
	    __vue_is_functional_template__$s,
	    __vue_module_identifier__$s,
	    undefined,
	    undefined
	  );

	//

	const TRIGGER_SIZE = 24;

	var script$t = {

		name: "latte-sheet",

		props: {

			position: {
				default: "left",
				required: false,
				type: String,
				validator: val => ["top", "left", "right", "bottom"].includes(val)
			},

			touchEnabled: {
				default: true,
				required: false,
				type: Boolean
			}

		},

		data()
		{
			return {
				isDragging: false,
				current: 0.0,
				previous: 0.0,
				content: null,
				overlay: null,
				currentPosition: {x: 0, y: 0},
				previousPosition: {x: 0, y: 0},
				startPosition: {x: 0, y: 0},
				timer: null
			};
		},

		mounted()
		{
			this.overlay = this.$el;
			this.content = this.$el.querySelector("div.sheet-content");

			window.addEventListener("resize", () => this.close());

			window.addEventListener("touchcancel", onlyTouch(this.onPointerCancel), {passive: false});
			window.addEventListener("touchstart", onlyTouch(this.onPointerDown), {passive: false});
			window.addEventListener("touchmove", onlyTouch(this.onPointerMove), {passive: false});
			window.addEventListener("touchend", onlyTouch(this.onPointerUp), {passive: false});

			window.addEventListener("mousewheel", onlyMouse(this.onMouseWheel), {passive: false});
			window.addEventListener("mousedown", onlyMouse(this.onPointerDown), {passive: false});
			window.addEventListener("mouseup", onlyMouse(this.onPointerUp), {passive: false});
		},

		computed: {

			isOpen()
			{
				return this.current > 0.0;
			},

			contentClasses()
			{
				const classes = [];

				classes.push(`sheet-${this.position}`);

				if (this.isDragging)
					classes.push("is-dragging");

				if (this.isOpen)
					classes.push("is-open");

				return classes;
			},

			overlayClasses()
			{
				const classes = [];

				if (this.isDragging)
					classes.push("is-dragging");

				if (this.isOpen)
					classes.push("is-open");

				return classes;
			},

			contentStyles()
			{
				let touchAction;
				let transform;

				switch (this.position)
				{
					case "top":
						touchAction = "pan-x";
						transform = `translate3d(0, ${(this.current - 1) * 100}%, 0)`;
						break;

					case "left":
						touchAction = "pan-y";
						transform = `translate3d(${(this.current - 1) * 100}%, 0, 0)`;
						break;

					case "right":
						touchAction = "pan-y";
						transform = `translate3d(${(this.current - 1) * -100}%, 0, 0)`;
						break;

					case "bottom":
						touchAction = "pan-x";
						transform = `translate3d(0, ${(this.current - 1) * -100}%, 0)`;
						break;

				}

				return {
					touchAction,
					transform
				};
			},

			overlayStyles()
			{
				return {
					background: `rgba(0, 0, 0, ${this.current * .85})`
				};
			}

		},

		methods: {

			close()
			{
				this.current = 0.0;
				this.previous = 1.0;
			},

			open()
			{
				this.current = 1.0;
				this.previous = 0.0;
			},

			toggle()
			{
				if (this.isOpen)
					this.close();
				else
					this.open();
			},

			calculateCurrent()
			{
				const rect = this.content.getBoundingClientRect();

				switch (this.position)
				{
					case "top":
						return (this.currentPosition.y - this.startPosition.y) / rect.height;

					case "left":
						return (this.currentPosition.x - this.startPosition.x) / rect.width;

					case "right":
						return (this.currentPosition.x - this.startPosition.x) / rect.width * -1;

					case "bottom":
						return (this.currentPosition.y - this.startPosition.y) / rect.height * -1;

				}
			},

			checkState()
			{
				this.current = Math.max(0, Math.min(1, this.calculateCurrent() + this.previous));

				if (!(this.current > 0 && this.current < 1 && !this.isDragging))
					return;

				this.current = this.getEnd();
			},

			getEnd()
			{
				switch (this.position)
				{
					case "top":
						if (this.currentPosition.y >= this.previousPosition.y)
							return 1;
						else
							return 0;

					case "left":
						if (this.currentPosition.x >= this.previousPosition.x)
							return 1;
						else
							return 0;

					case "right":
						if (this.currentPosition.x <= this.previousPosition.x)
							return 1;
						else
							return 0;

					case "bottom":
						if (this.currentPosition.y <= this.previousPosition.y)
							return 1;
						else
							return 0;
				}

				return -1;
			},

			isContentDragAvailable(position)
			{
				if (this.current < 1)
					return true;

				if (!this.isWithinElement(position, this.content))
					return true;

				if (this.position === "left" || this.position === "right")
					return Math.abs(position.x - this.currentPosition.x) > TRIGGER_SIZE;

				if (this.position === "top" || this.position === "bottom")
					return Math.abs(position.y - this.currentPosition.y) > TRIGGER_SIZE;

				return true;
			},

			isWithinElement(position, element)
			{
				return closest(document.elementFromPoint(position.x, position.y), element) !== null;
			},

			isWithinTriggerBounds(position)
			{
				if (position === undefined)
					return false;

				const rect = this.$el.getBoundingClientRect();

				switch (this.position)
				{
					case "top":
						return position.y - rect.top < TRIGGER_SIZE;

					case "left":
						return position.x - rect.left < TRIGGER_SIZE;

					case "right":
						return position.x > rect.left + rect.width - TRIGGER_SIZE;

					case "bottom":
						return position.y > rect.top + rect.height - TRIGGER_SIZE;
				}
			},

			onMouseWheel(evt)
			{
				if (!this.isOpen)
					return;

				const {deltaX, deltaY} = evt;

				if (Math.abs(deltaX) > 20 && (this.position === "left" || this.position === "right"))
					this.close();

				if (Math.abs(deltaY) > 20 && (this.position === "top" || this.position === "bottom"))
					this.close();

				if (!this.isWithinElement(getCoords(evt), this.content))
					evt.preventDefault();
			},

			onPointerCancel(evt)
			{
				if (!this.touchEnabled)
					return;

				this.isDragging = false;
				this.currentPosition = getCoords(evt);

				this.checkState();
			},

			onPointerDown(evt)
			{
				if (!this.touchEnabled)
					return;

				const position = getCoords(evt);

				if (!this.isOpen && !this.isWithinTriggerBounds(position))
					return;

				this.isDragging = true;

				this.previous = this.current;
				this.currentPosition = position;
				this.previousPosition = position;
				this.startPosition = position;

				this.checkState();
			},

			onPointerMove(evt)
			{
				if (!this.touchEnabled || !this.isDragging)
					return;

				const position = getCoords(evt);

				if (!this.isContentDragAvailable(position))
					return;

				this.previousPosition = this.currentPosition;
				this.currentPosition = position;

				this.checkState();
			},

			onPointerUp(evt)
			{
				if (!this.touchEnabled || !this.isDragging || this.currentPosition === undefined || this.startPosition === undefined)
					return;

				const isSameLocation = this.currentPosition.x === this.startPosition.x && this.currentPosition.y === this.startPosition.y;

				if (!isSameLocation && evt.cancelable)
					evt.preventDefault();

				this.currentPosition = getCoords(evt);
				this.isDragging = false;

				if (this.previous === 1 && isSameLocation && !this.isWithinElement(this.currentPosition, this.content))
					this.current = 0.0;
				else
					this.checkState();
			}

		},

		watch: {

			isOpen()
			{
				if (this.isOpen)
					popupOpened();
				else
					popupClosed();
			}

		}

	};

	/* script */
	const __vue_script__$t = script$t;

	/* template */
	var __vue_render__$o = function() {
	  var _vm = this;
	  var _h = _vm.$createElement;
	  var _c = _vm._self._c || _h;
	  return _c(
	    "div",
	    {
	      staticClass: "sheet-overlay",
	      class: _vm.overlayClasses,
	      style: _vm.overlayStyles
	    },
	    [
	      _c(
	        "div",
	        {
	          staticClass: "sheet-content",
	          class: _vm.contentClasses,
	          style: _vm.contentStyles
	        },
	        [_vm._t("default")],
	        2
	      )
	    ]
	  )
	};
	var __vue_staticRenderFns__$o = [];
	__vue_render__$o._withStripped = true;

	  /* style */
	  const __vue_inject_styles__$t = undefined;
	  /* scoped */
	  const __vue_scope_id__$t = undefined;
	  /* module identifier */
	  const __vue_module_identifier__$t = undefined;
	  /* functional template */
	  const __vue_is_functional_template__$t = false;
	  /* style inject */
	  
	  /* style inject SSR */
	  

	  
	  var Sheet = normalizeComponent_1(
	    { render: __vue_render__$o, staticRenderFns: __vue_staticRenderFns__$o },
	    __vue_inject_styles__$t,
	    __vue_script__$t,
	    __vue_scope_id__$t,
	    __vue_is_functional_template__$t,
	    __vue_module_identifier__$t,
	    undefined,
	    undefined
	  );

	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//


	var script$u = {

		name: "latte-sorting-button",

		props: {

			ariaLabel: {
				default: null,
				required: false,
				type: String | null
			},

			buttonClass: {
				default: "btn btn-icon btn-text btn-dark",
				required: false,
				type: String
			},

			isSorting: {
				default: false,
				required: false,
				type: Boolean
			},

			isSortingAscending: {
				default: true,
				required: false,
				type: Boolean
			}

		},

		methods: {

			onClick(evt)
			{
				this.$emit("click", evt);
			}

		}

	};

	/* script */
	const __vue_script__$u = script$u;

	/* template */
	var __vue_render__$p = function() {
	  var _vm = this;
	  var _h = _vm.$createElement;
	  var _c = _vm._self._c || _h;
	  return _c(
	    "button",
	    {
	      class: _vm.buttonClass,
	      attrs: { "aria-label": _vm.ariaLabel },
	      on: { click: _vm.onClick }
	    },
	    [
	      !_vm.isSorting
	        ? _c("i", { staticClass: "mdi latte-sorting none" })
	        : _vm.isSortingAscending
	        ? _c("i", { staticClass: "mdi latte-sorting down" })
	        : _c("i", { staticClass: "mdi latte-sorting up" })
	    ]
	  )
	};
	var __vue_staticRenderFns__$p = [];
	__vue_render__$p._withStripped = true;

	  /* style */
	  const __vue_inject_styles__$u = undefined;
	  /* scoped */
	  const __vue_scope_id__$u = undefined;
	  /* module identifier */
	  const __vue_module_identifier__$u = undefined;
	  /* functional template */
	  const __vue_is_functional_template__$u = false;
	  /* style inject */
	  
	  /* style inject SSR */
	  

	  
	  var SortingButton = normalizeComponent_1(
	    { render: __vue_render__$p, staticRenderFns: __vue_staticRenderFns__$p },
	    __vue_inject_styles__$u,
	    __vue_script__$u,
	    __vue_scope_id__$u,
	    __vue_is_functional_template__$u,
	    __vue_module_identifier__$u,
	    undefined,
	    undefined
	  );

	//

	var script$v = {

		name: "latte-submenu",

		props: {

			icon: {
				default: null,
				required: false,
				type: String | null
			},

			label: {
				default: "Submenu",
				required: false,
				type: String
			}

		},

		data()
		{
			return {
				popup: null,
				isOpen: false,
				timeout: null,
				x: 0,
				y: 0
			};
		},

		beforeDestroy()
		{
			this.popup.remove();
		},

		mounted()
		{
			this.popup = this.$refs.popup;
			this.popup.remove();

			getMainElement().appendChild(this.popup);
		},

		computed: {

			popupStyles()
			{
				return {
					transform: `translate3d(${this.x}px, ${this.y}px, 0)`
				};
			}

		},

		methods: {

			calculatePosition()
			{
				const rect = this.$el.getBoundingClientRect();
				const popupRect = this.popup.getBoundingClientRect();

				let top = rect.top;
				let left = rect.left;

				let x = left + rect.width;
				let y = top - 15;
				let mode = "right";

				if (x + popupRect.width > window.innerWidth)
				{
					x = left - popupRect.width;
					mode = "left";
				}

				if (y + popupRect.height > window.innerHeight)
					y = top - popupRect.height + 59;

				if (mode === "right")
					x -= this.isOpen ? 0 : 24;
				else
					x += this.isOpen ? 0 : 24;

				this.x = x;
				this.y = y;
			},

			onPointerEnter()
			{
				if (this.timeout !== null)
					clearTimeout(this.timeout);

				if (this.$parent && this.$parent.$options && this.$parent.$options.name === "latte-popup")
					this.$parent.lattePersistent = true;

				if (this.$parent && this.$parent.$options && this.$parent.$options.name === "latte-submenu")
					this.$parent.onPointerEnter();

				if (this.isOpen)
					return;

				this.popup.style.setProperty("transition", "unset");
				applyZ(z => this.popup.style.setProperty("z-index", z));

				this.calculatePosition();

				this.timeout = raf(() =>
				{
					this.popup.style.removeProperty("transition");
					this.isOpen = true;
					this.calculatePosition();
				}, 50);
			},

			onPointerLeave()
			{
				if (this.timeout !== null)
					clearTimeout(this.timeout);

				if (!this.isOpen)
					return;

				if (this.$parent && this.$parent.$options && this.$parent.$options.name === "latte-popup")
					this.$parent.lattePersistent = false;

				if (this.$parent && this.$parent.$options && this.$parent.$options.name === "latte-submenu")
					this.$parent.onPointerLeave();

				this.timeout = raf(() =>
				{
					this.isOpen = false;
					this.calculatePosition();
				}, 50);
			}

		},

		watch: {

			isOpen()
			{
				if (this.isOpen)
					this.$emit("open");
				else
					this.$emit("close");
			}

		}

	};

	/* script */
	const __vue_script__$v = script$v;

	/* template */
	var __vue_render__$q = function() {
	  var _vm = this;
	  var _h = _vm.$createElement;
	  var _c = _vm._self._c || _h;
	  return _c(
	    "div",
	    {
	      on: { pointerover: _vm.onPointerEnter, pointerleave: _vm.onPointerLeave }
	    },
	    [
	      _vm._t("item", [
	        _c(
	          "a",
	          { staticClass: "nav-link", class: { "is-hover": _vm.isOpen } },
	          [
	            _vm.icon
	              ? _c("i", { staticClass: "mdi", class: "mdi-" + _vm.icon })
	              : _vm._e(),
	            _vm._v(" "),
	            _c("span", { staticClass: "mr-4" }, [_vm._v(_vm._s(_vm.label))]),
	            _vm._v(" "),
	            _c("i", { staticClass: "mdi mdi-chevron-right ml-auto" })
	          ]
	        )
	      ]),
	      _vm._v(" "),
	      _c(
	        "div",
	        {
	          ref: "popup",
	          staticClass: "popup",
	          class: { "is-open": _vm.isOpen },
	          style: _vm.popupStyles,
	          on: {
	            pointerover: _vm.onPointerEnter,
	            pointerleave: _vm.onPointerLeave
	          }
	        },
	        [_c("div", { staticClass: "popup-content" }, [_vm._t("default")], 2)]
	      )
	    ],
	    2
	  )
	};
	var __vue_staticRenderFns__$q = [];
	__vue_render__$q._withStripped = true;

	  /* style */
	  const __vue_inject_styles__$v = undefined;
	  /* scoped */
	  const __vue_scope_id__$v = undefined;
	  /* module identifier */
	  const __vue_module_identifier__$v = undefined;
	  /* functional template */
	  const __vue_is_functional_template__$v = false;
	  /* style inject */
	  
	  /* style inject SSR */
	  

	  
	  var Submenu = normalizeComponent_1(
	    { render: __vue_render__$q, staticRenderFns: __vue_staticRenderFns__$q },
	    __vue_inject_styles__$v,
	    __vue_script__$v,
	    __vue_scope_id__$v,
	    __vue_is_functional_template__$v,
	    __vue_module_identifier__$v,
	    undefined,
	    undefined
	  );

	//

	function convertPadding(p)
	{
		if (typeof p === "number")
			return {top: p, left: p, right: p, bottom: p};
		else if (p.length === 2)
			return {top: p[0], left: p[1], right: p[1], bottom: p[0]};
		else if (p.length === 4)
			return {top: p[0], left: p[3], right: p[1], bottom: p[2]};
		else
			return {top: 0, left: 0, right: 0, bottom: 0};
	}

	var script$w = {

		name: "latte-swiper",

		props: {

			center: {
				default: true,
				required: false,
				type: Boolean
			},

			itemPadding: {
				default: 0,
				required: false,
				type: Number | Array
			},

			itemWidth: {
				default: undefined,
				required: false,
				type: Number | undefined
			},

			viewPadding: {
				default: 0,
				required: false,
				type: Number | Array
			}

		},

		beforeDestroy()
		{
			this.observer.disconnect();
		},

		data()
		{
			return {
				can: {
					navigate: true,
					observe: true
				},
				is: {
					dragging: true,
					swipeToEnd: false,
					swipeToStart: false
				},
				offset: {
					start: 0
				},
				rect: {
					root: null,
					body: null
				},
				observer: new MutationObserver(mutations => this.onDOMMutations(mutations)),
				viewCount: 0,
				currentPosition: undefined,
				startPosition: undefined,
				position: 0,
				positionBeforeTouch: 0
			}
		},

		mounted()
		{
			this.$el.addEventListener("touchstart", onlyTouch(this.onTouchStart), {passive: true});
			this.$el.addEventListener("touchmove", onlyTouch(this.onTouchMove), {passive: true});
			this.$el.addEventListener("touchend", onlyTouch(this.onTouchEnd), {passive: true});
			this.$el.addEventListener("wheel", onlyMouse(this.onMouseWheel));

			this.observer.observe(this.$el, {
				attributes: true,
				characterData: true,
				childList: true,
				subtree: true
			});

			this.update();
			this.navigate(0);
		},

		computed: {

			bodyStyle()
			{
				return {
					transform: `translate3d(${this.position + this.offset.start}px, 0, 0)`
				};
			},

			iPadding()
			{
				return convertPadding(this.itemPadding);
			},

			rootClasses()
			{
				const classes = [];

				if (this.is.dragging)
					classes.push("is-dragging");

				return classes;
			},

			vPadding()
			{
				return convertPadding(this.viewPadding);
			}

		},

		methods: {

			centerize(containerWidth, itemWidth)
			{
				if (!this.center)
					this.offset.start = 0;
				else
					this.offset.start = Math.round((containerWidth - itemWidth) / 2) - this.vPadding.left;
			},

			onDOMMutations()
			{
				if (!this.can.observe)
					return;

				this.update();
			},

			onMouseWheel(evt)
			{
				evt.preventDefault();

				if (!this.can.navigate)
					return;

				this.can.navigate = false;

				if (evt.deltaY > 0)
					this.navigate(1);
				else if (evt.deltaY < 0)
					this.navigate(-1);

				raf(() => this.can.navigate = true, 240);
			},

			onTouchStart(evt)
			{
				const coords = getCoords(evt);

				this.currentPosition = coords;
				this.startPosition = coords;
				this.positionBeforeTouch = this.position;
				this.can.observe = false;
				this.is.dragging = true;
			},

			onTouchMove(evt)
			{
				if (!this.is.dragging)
					return;

				const coords = getCoords(evt);

				this.is.swipeToEnd = coords.x > this.currentPosition.x;
				this.is.swipeToStart = !this.is.swipeToEnd;
				this.currentPosition = coords;

				let change = (this.startPosition.x - this.currentPosition.x);
				let itemWidth = (this.itemWidth || this.rect.root.width) - (this.vPadding.left + this.vPadding.right);
				let overflow = 0;
				let position = this.positionBeforeTouch - change;
				let width = this.viewCount * itemWidth;

				let max = itemWidth / 2;
				let min = -width + (itemWidth / 2);

				if (position > 0)
					overflow = position;

				if (position < -(width - itemWidth))
					overflow = position - -(width - itemWidth);

				this.centerize(this.rect.root.width, itemWidth);
				this.position = clamp(position - (overflow / 1.5), min, max);
			},

			onTouchEnd()
			{
				this.can.observe = true;
				this.is.dragging = false;

				let index = 0;
				let position = 0;
				let itemWidth = (this.itemWidth || this.rect.root.width) - (this.vPadding.left + this.vPadding.right);
				let width = this.viewCount * itemWidth;

				if (this.position > 0)
				{
					position = 0;
				}
				else if (this.position < -(width - itemWidth))
				{
					position = -(width - itemWidth);
				}
				else
				{
					let change = (this.startPosition.x - this.currentPosition.x);

					if (Math.abs(change) < (itemWidth * .2))
						index = Math.abs(Math.round(this.position / itemWidth));
					else if (this.is.swipeToEnd)
						index = Math.abs(Math.ceil(this.position / itemWidth));
					else if (this.is.swipeToStart)
						index = Math.abs(Math.floor(this.position / itemWidth));

					position = index * -itemWidth;
				}

				index = Math.abs(Math.round(position / itemWidth));

				this.centerize(this.rect.root.width, itemWidth);
				this.position = position;

				this.currentPosition = undefined;
				this.startPosition = undefined;
			},

			navigate(change)
			{
				this.is.dragging = false;

				let itemWidth = (this.itemWidth || this.rect.root.width) - (this.vPadding.left + this.vPadding.right);
				let index = Math.abs(Math.round(this.position / itemWidth));

				this.centerize(this.rect.root.width, itemWidth);
				this.position = Math.max(0, Math.min(this.viewCount - 1, index + change)) * -itemWidth;
			},

			update()
			{
				this.can.observe = false;

				const body = this.$el.querySelector(".swiper-body");

				this.rect.root = this.$el.getBoundingClientRect();
				this.rect.body = body.getBoundingClientRect();
				this.viewCount = body.children.length;

				let gutter = this.iPadding.left + this.iPadding.right + this.vPadding.left + this.vPadding.right;
				let width = (this.itemWidth || this.rect.root.width) - gutter;

				this.$el.style.setProperty("--swiper-item-padding", `${this.iPadding.top}px ${this.iPadding.right}px ${this.iPadding.bottom}px ${this.iPadding.left}px`);
				this.$el.style.setProperty("--swiper-item-width", `${width}px`);
				this.$el.style.setProperty("--swiper-view-padding", `${this.vPadding.top}px ${this.vPadding.right}px ${this.vPadding.bottom}px ${this.vPadding.left}px`);

				raf(() => this.can.observe = true, 100);
			}

		},

		watch: {

			itemPadding()
			{
				this.update();
			},

			viewPadding()
			{
				this.update();
			}

		}

	};

	/* script */
	const __vue_script__$w = script$w;

	/* template */
	var __vue_render__$r = function() {
	  var _vm = this;
	  var _h = _vm.$createElement;
	  var _c = _vm._self._c || _h;
	  return _c("div", { staticClass: "swiper", class: _vm.rootClasses }, [
	    _c(
	      "div",
	      { staticClass: "swiper-body", style: _vm.bodyStyle },
	      [_vm._t("default")],
	      2
	    )
	  ])
	};
	var __vue_staticRenderFns__$r = [];
	__vue_render__$r._withStripped = true;

	  /* style */
	  const __vue_inject_styles__$w = undefined;
	  /* scoped */
	  const __vue_scope_id__$w = undefined;
	  /* module identifier */
	  const __vue_module_identifier__$w = undefined;
	  /* functional template */
	  const __vue_is_functional_template__$w = false;
	  /* style inject */
	  
	  /* style inject SSR */
	  

	  
	  var Swiper = normalizeComponent_1(
	    { render: __vue_render__$r, staticRenderFns: __vue_staticRenderFns__$r },
	    __vue_inject_styles__$w,
	    __vue_script__$w,
	    __vue_scope_id__$w,
	    __vue_is_functional_template__$w,
	    __vue_module_identifier__$w,
	    undefined,
	    undefined
	  );

	//

	var script$x = {

		name: "latte-svg-undraw",

		props: {

			color: {
				default: "#000000",
				required: false,
				type: String
			},

			url: {
				default: "",
				required: true,
				type: String
			}

		},

		data()
		{
			return {
				svg: null
			};
		},

		mounted()
		{
			this.onUrlChanged();
		},

		methods: {

			onReceivedSVG(response)
			{
				const color = this.color;

				this.svg = Vue.extend({

					template: response.replace(/fill="#6c63ff"/g, ":fill=\"color\""),

					data()
					{
						return {
							color
						};
					}

				});
			},

			onUrlChanged()
			{
				request(this.url)
					.then(r => r.text())
					.then(r => this.onReceivedSVG(r))
					.catch(err => handleError(err));
			}

		},

		watch: {

			color()
			{
				if (this.$refs.svgComponent)
					this.$refs.svgComponent.color = this.color;
			},

			url()
			{
				this.onUrlChanged();
			}

		}

	};

	/* script */
	const __vue_script__$x = script$x;

	/* template */
	var __vue_render__$s = function() {
	  var _vm = this;
	  var _h = _vm.$createElement;
	  var _c = _vm._self._c || _h;
	  return _vm.svg !== null
	    ? _c(_vm.svg, { ref: "svgComponent", tag: "component" })
	    : _vm._e()
	};
	var __vue_staticRenderFns__$s = [];
	__vue_render__$s._withStripped = true;

	  /* style */
	  const __vue_inject_styles__$x = undefined;
	  /* scoped */
	  const __vue_scope_id__$x = undefined;
	  /* module identifier */
	  const __vue_module_identifier__$x = undefined;
	  /* functional template */
	  const __vue_is_functional_template__$x = false;
	  /* style inject */
	  
	  /* style inject SSR */
	  

	  
	  var SVGUndraw = normalizeComponent_1(
	    { render: __vue_render__$s, staticRenderFns: __vue_staticRenderFns__$s },
	    __vue_inject_styles__$x,
	    __vue_script__$x,
	    __vue_scope_id__$x,
	    __vue_is_functional_template__$x,
	    __vue_module_identifier__$x,
	    undefined,
	    undefined
	  );

	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//


	var script$y = {

		name: "latte-tab",

		props: {

			badge: {
				default: "",
				required: false,
				type: String
			},

			icon: {
				default: "",
				required: false,
				type: String
			},

			label: {
				default: "",
				required: false,
				type: String
			}

		},

		data()
		{
			return {
				active: false
			};
		},

		mounted()
		{
			this.$parent.updateChildren();
		},

		watch: {

			active()
			{
				this.$emit("active", this.active);
			}

		}

	};

	/* script */
	const __vue_script__$y = script$y;

	/* template */
	var __vue_render__$t = function() {
	  var _vm = this;
	  var _h = _vm.$createElement;
	  var _c = _vm._self._c || _h;
	  return _vm.active
	    ? _c("div", { staticClass: "tab" }, [_vm._t("default")], 2)
	    : _vm._e()
	};
	var __vue_staticRenderFns__$t = [];
	__vue_render__$t._withStripped = true;

	  /* style */
	  const __vue_inject_styles__$y = undefined;
	  /* scoped */
	  const __vue_scope_id__$y = undefined;
	  /* module identifier */
	  const __vue_module_identifier__$y = undefined;
	  /* functional template */
	  const __vue_is_functional_template__$y = false;
	  /* style inject */
	  
	  /* style inject SSR */
	  

	  
	  var Tab = normalizeComponent_1(
	    { render: __vue_render__$t, staticRenderFns: __vue_staticRenderFns__$t },
	    __vue_inject_styles__$y,
	    __vue_script__$y,
	    __vue_scope_id__$y,
	    __vue_is_functional_template__$y,
	    __vue_module_identifier__$y,
	    undefined,
	    undefined
	  );

	//

	var script$z = {

		name: "latte-tab-bar",

		props: {

			animatedIndicator: {
				default: false,
				required: false,
				type: Boolean
			}

		},

		data()
		{
			return {
				current: 0,
				indicatorBarRect: null,
				indicatorTabRect: null,
				tabs: []
			};
		},

		mounted()
		{
			this.$parent.$on("change", current => this.onTabChange(current));
			this.$parent.updateTabBars();

			on("latte:tick", () => raf(() => this.updateIndicator()));

			window.addEventListener("load", () => raf(() => this.updateIndicator(), 50));
		},

		computed: {

			indicatorStyles()
			{
				if (this.indicatorBarRect === null || this.indicatorTabRect === null)
					return null;

				return {
					width: `${Math.round(this.indicatorTabRect.width)}px`,
					transform: `translate3d(${Math.round(this.indicatorTabRect.left - this.indicatorBarRect.left)}px, 0, 0)`
				};
			}

		},

		methods: {

			click(index)
			{
				this.$parent.current = index;
			},

			updateIndicator()
			{
				this.indicatorTabRect = null;

				if (!this.animatedIndicator)
					return;

				const tab = this.$el.querySelector(`a.nav-link:nth-child(${this.current + 1})`);

				if (tab === null)
					return;

				this.indicatorBarRect = this.$el.getBoundingClientRect();
				this.indicatorTabRect = tab.getBoundingClientRect();
			},

			onTabChange(current)
			{
				this.current = current;
			}

		},

		watch: {

			animatedIndicator()
			{
				raf(() => this.updateIndicator());
			},

			current()
			{
				raf(() => this.updateIndicator());
			},

			tabs()
			{
				raf(() => this.updateIndicator());
			}

		}

	};

	/* script */
	const __vue_script__$z = script$z;

	/* template */
	var __vue_render__$u = function() {
	  var _vm = this;
	  var _h = _vm.$createElement;
	  var _c = _vm._self._c || _h;
	  return _c(
	    "nav",
	    { staticClass: "nav nav-tabs" },
	    [
	      _vm._l(_vm.tabs, function(tab, index) {
	        return [
	          _c(
	            "a",
	            {
	              staticClass: "nav-link",
	              class: {
	                "is-active": tab.active,
	                "no-indicator": _vm.animatedIndicator
	              },
	              on: {
	                click: function($event) {
	                  return _vm.click(index)
	                }
	              }
	            },
	            [
	              tab.icon !== ""
	                ? _c("i", { staticClass: "mdi", class: "mdi-" + tab.icon })
	                : _vm._e(),
	              _vm._v(" "),
	              tab.label !== ""
	                ? _c("span", [_vm._v(_vm._s(tab.label))])
	                : _vm._e(),
	              _vm._v(" "),
	              tab.badge !== ""
	                ? _c("span", { staticClass: "badge badge-primary ml-2" }, [
	                    _vm._v(_vm._s(tab.badge))
	                  ])
	                : _vm._e()
	            ]
	          )
	        ]
	      }),
	      _vm._v(" "),
	      _vm.animatedIndicator
	        ? _c("div", {
	            staticClass: "nav-tabs-indicator",
	            style: _vm.indicatorStyles
	          })
	        : _vm._e()
	    ],
	    2
	  )
	};
	var __vue_staticRenderFns__$u = [];
	__vue_render__$u._withStripped = true;

	  /* style */
	  const __vue_inject_styles__$z = undefined;
	  /* scoped */
	  const __vue_scope_id__$z = undefined;
	  /* module identifier */
	  const __vue_module_identifier__$z = undefined;
	  /* functional template */
	  const __vue_is_functional_template__$z = false;
	  /* style inject */
	  
	  /* style inject SSR */
	  

	  
	  var TabBar = normalizeComponent_1(
	    { render: __vue_render__$u, staticRenderFns: __vue_staticRenderFns__$u },
	    __vue_inject_styles__$z,
	    __vue_script__$z,
	    __vue_scope_id__$z,
	    __vue_is_functional_template__$z,
	    __vue_module_identifier__$z,
	    undefined,
	    undefined
	  );

	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//


	var script$A = {

		name: "latte-tab-container",

		props: {

			initialTab: {
				default: 0,
				required: false,
				type: Number
			}

		},

		data()
		{
			return {
				current: this.initialTab,
				tabs: []
			};
		},

		mounted()
		{
			this.updateChildren();
		},

		methods: {

			updateChildren()
			{
				this.tabs = this.$children
					.filter(c => c.$options.name === "latte-tab");
			},

			updateCurrent()
			{
				this.tabs.forEach(t => t.active = false);

				if (this.tabs[this.current])
					this.tabs[this.current].active = true;
			},

			updateTabBars()
			{
				this.$children
					.filter(c => c.$options.name === "latte-tab-bar")
					.forEach(c => this.$set(c, "tabs", this.tabs));

				this.updateCurrent();
			}

		},

		watch: {

			current()
			{
				this.$emit("change", this.current);
				this.updateCurrent();
			},

			initialTab()
			{
				this.current = this.initialTab;
			},

			tabs()
			{
				this.updateTabBars();
			}

		}

	};

	/* script */
	const __vue_script__$A = script$A;

	/* template */
	var __vue_render__$v = function() {
	  var _vm = this;
	  var _h = _vm.$createElement;
	  var _c = _vm._self._c || _h;
	  return _c("div", { staticClass: "tab-container" }, [_vm._t("default")], 2)
	};
	var __vue_staticRenderFns__$v = [];
	__vue_render__$v._withStripped = true;

	  /* style */
	  const __vue_inject_styles__$A = undefined;
	  /* scoped */
	  const __vue_scope_id__$A = undefined;
	  /* module identifier */
	  const __vue_module_identifier__$A = undefined;
	  /* functional template */
	  const __vue_is_functional_template__$A = false;
	  /* style inject */
	  
	  /* style inject SSR */
	  

	  
	  var TabContainer = normalizeComponent_1(
	    { render: __vue_render__$v, staticRenderFns: __vue_staticRenderFns__$v },
	    __vue_inject_styles__$A,
	    __vue_script__$A,
	    __vue_scope_id__$A,
	    __vue_is_functional_template__$A,
	    __vue_module_identifier__$A,
	    undefined,
	    undefined
	  );

	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//


	var script$B = {

		name: "latte-timepicker-clock",

		props: {

			value: {
				default: () => new Date(),
				required: false,
				type: Date
			}

		},

		data()
		{
			return {
				selectedHour: 1,
				selectedMinute: 0,
				selectedMeridiem: "am"
			};
		},

		computed: {

			isAMPM()
			{
				return this.moment().localeData().longDateFormat("LT").endsWith("A");
			}

		},

		methods: {

			updateTime()
			{
				const date = new Date(this.value.getTime());
				date.setHours((this.isAMPM && this.selectedMeridiem === "pm" && this.selectedHour < 12 ? this.selectedHour + 12 : (this.isAMPM && this.selectedMeridiem === "am" && this.selectedHour === 12 ? 0 : this.selectedHour)) % 24);
				date.setMinutes(this.selectedMinute);

				this.$emit("input", date);
			}

		},

		watch: {

			selectedHour()
			{
				this.updateTime();
			},

			selectedMinute()
			{
				this.updateTime();
			},

			selectedMeridiem()
			{
				this.updateTime();
			},

			value: {
				immediate: true,
				handler()
				{
					this.selectedMeridiem = this.value.getHours() >= 12 ? "pm" : "am";
					this.selectedHour = this.isAMPM && this.value.getHours() > 12 ? this.value.getHours() - 12 : this.value.getHours();
					this.selectedMinute = this.value.getMinutes();
				}
			}

		}

	};

	/* script */
	const __vue_script__$B = script$B;

	/* template */
	var __vue_render__$w = function() {
	  var _vm = this;
	  var _h = _vm.$createElement;
	  var _c = _vm._self._c || _h;
	  return _c(
	    "div",
	    { staticClass: "timepicker-clock" },
	    [
	      _c("input", {
	        directives: [
	          {
	            name: "model",
	            rawName: "v-model",
	            value: _vm.selectedHour,
	            expression: "selectedHour"
	          }
	        ],
	        staticClass: "form-control timepicker-control",
	        attrs: {
	          type: "number",
	          min: _vm.isAMPM ? 1 : 0,
	          max: _vm.isAMPM ? 12 : 23,
	          required: ""
	        },
	        domProps: { value: _vm.selectedHour },
	        on: {
	          input: function($event) {
	            if ($event.target.composing) {
	              return
	            }
	            _vm.selectedHour = $event.target.value;
	          }
	        }
	      }),
	      _vm._v(" "),
	      _c("input", {
	        directives: [
	          {
	            name: "model",
	            rawName: "v-model",
	            value: _vm.selectedMinute,
	            expression: "selectedMinute"
	          }
	        ],
	        staticClass: "form-control timepicker-control",
	        attrs: { type: "number", min: 0, max: 59, required: "" },
	        domProps: { value: _vm.selectedMinute },
	        on: {
	          input: function($event) {
	            if ($event.target.composing) {
	              return
	            }
	            _vm.selectedMinute = $event.target.value;
	          }
	        }
	      }),
	      _vm._v(" "),
	      _vm.isAMPM
	        ? _c(
	            "select",
	            {
	              directives: [
	                {
	                  name: "model",
	                  rawName: "v-model",
	                  value: _vm.selectedMeridiem,
	                  expression: "selectedMeridiem"
	                }
	              ],
	              staticClass: "custom-select timepicker-control",
	              on: {
	                change: function($event) {
	                  var $$selectedVal = Array.prototype.filter
	                    .call($event.target.options, function(o) {
	                      return o.selected
	                    })
	                    .map(function(o) {
	                      var val = "_value" in o ? o._value : o.value;
	                      return val
	                    });
	                  _vm.selectedMeridiem = $event.target.multiple
	                    ? $$selectedVal
	                    : $$selectedVal[0];
	                }
	              }
	            },
	            [
	              _c("option", { attrs: { value: "am" } }, [_vm._v("AM")]),
	              _vm._v(" "),
	              _c("option", { attrs: { value: "pm" } }, [_vm._v("PM")])
	            ]
	          )
	        : _vm._e(),
	      _vm._v(" "),
	      _vm._t("after")
	    ],
	    2
	  )
	};
	var __vue_staticRenderFns__$w = [];
	__vue_render__$w._withStripped = true;

	  /* style */
	  const __vue_inject_styles__$B = undefined;
	  /* scoped */
	  const __vue_scope_id__$B = undefined;
	  /* module identifier */
	  const __vue_module_identifier__$B = undefined;
	  /* functional template */
	  const __vue_is_functional_template__$B = false;
	  /* style inject */
	  
	  /* style inject SSR */
	  

	  
	  var TimePickerClock = normalizeComponent_1(
	    { render: __vue_render__$w, staticRenderFns: __vue_staticRenderFns__$w },
	    __vue_inject_styles__$B,
	    __vue_script__$B,
	    __vue_scope_id__$B,
	    __vue_is_functional_template__$B,
	    __vue_module_identifier__$B,
	    undefined,
	    undefined
	  );

	//

	const defaultStrings = {
		dropFile: "Drop here to upload!",
		dropFiles: "Drop here to upload!",
		placeFile: "Place your file here to upload",
		placeFiles: "Place your file(s) here to upload"
	};

	function arrayToFileList(files)
	{
		if (files === undefined)
			files = [];

		const dataTransfer = new DataTransfer();
		files.forEach(file => dataTransfer.items.add(file));

		return dataTransfer.files;
	}

	var script$C = {

		name: "latte-uploader",

		props: {

			accept: {
				default: undefined,
				required: false,
				type: String | undefined
			},

			droppable: {
				default: true,
				required: false,
				type: Boolean
			},

			i18nDomain: {
				default: "latte-ui",
				required: false,
				type: String
			},

			id: {
				default: () => id(),
				required: false,
				type: String
			},

			multiple: {
				default: false,
				required: false,
				type: Boolean
			},

			name: {
				default: () => id(),
				required: false,
				type: String
			},

			strings: {
				default: () => defaultStrings,
				required: false,
				type: Object
			}

		},

		beforeDestroy()
		{
			window.removeEventListener("dragend", this.fn.onDragEnd);
			window.removeEventListener("dragleave", this.fn.onDragLeave);
			window.removeEventListener("dragover", this.fn.onDragOver);
			window.removeEventListener("drop", this.fn.onDrop);
		},

		data()
		{
			return {
				blobs: [],
				files: [],
				fn: {
					onDragEnd: evt => this.onDragEnd(evt),
					onDragLeave: evt => this.onDragLeave(evt),
					onDragOver: evt => this.onDragOver(evt),
					onDrop: evt => this.onDrop(evt)
				},
				isDragging: false,
				isDraggingOver: false
			};
		},

		mounted()
		{
			window.addEventListener("dragend", this.fn.onDragEnd);
			window.addEventListener("dragleave", this.fn.onDragLeave);
			window.addEventListener("dragover", this.fn.onDragOver);
			window.addEventListener("drop", this.fn.onDrop);
		},

		computed: {

			fileInput()
			{
				return this.$refs.fileInput;
			}

		},

		methods: {

			openDialog()
			{
				this.fileInput.click();
			},

			removeFile(index)
			{
				dispatch("latte:tooltip:hide");
				this.files.splice(index, 1);
				this.fileInput.files = arrayToFileList(this.files);
			},

			onDragEnd(evt)
			{
				evt.preventDefault();

				this.isDragging = false;
				this.isDraggingOver = false;
			},

			onDragLeave(evt)
			{
				evt.preventDefault();
			},

			onDragOver(evt)
			{
				evt.preventDefault();

				this.isDragging = true;
				this.isDraggingOver = closest(evt.target, this.$el) !== null;
			},

			onDrop(evt)
			{
				if (!this.isDragging)
					return;

				evt.preventDefault();

				this.isDragging = false;
				this.isDraggingOver = false;

				if (closest(evt.target, this.$el) === null)
					return;

				const files = Array.from(evt.dataTransfer.files);

				if (!this.multiple && files.length > 1)
					return;

				if (this.multiple)
					files.push(...this.files);

				this.fileInput.files = arrayToFileList(files);
				this.onFilesUpdate();
			},

			onFilesUpdate()
			{
				this.files = Array.from(this.fileInput.files);
			}

		},

		watch: {

			files()
			{
				while (this.blobs.length > 0)
					URL.revokeObjectURL(this.blobs.shift());

				this.files.forEach(file => this.blobs.push(URL.createObjectURL(file)));
				this.$emit("change", this.files);
			}

		}

	};

	/* script */
	const __vue_script__$C = script$C;

	/* template */
	var __vue_render__$x = function() {
	  var _vm = this;
	  var _h = _vm.$createElement;
	  var _c = _vm._self._c || _h;
	  return _c(
	    "div",
	    { staticClass: "uploader" },
	    [
	      _c("input", {
	        ref: "fileInput",
	        attrs: {
	          type: "file",
	          accept: _vm.accept,
	          id: _vm.id,
	          multiple: _vm.multiple,
	          name: _vm.name
	        },
	        on: { change: _vm.onFilesUpdate }
	      }),
	      _vm._v(" "),
	      _vm._t("default", null, null, {
	        blobs: _vm.blobs,
	        files: _vm.files,
	        id: _vm.id,
	        multiple: _vm.multiple,
	        name: _vm.name,
	        openDialog: _vm.openDialog,
	        removeFile: _vm.removeFile
	      }),
	      _vm._v(" "),
	      _c(
	        "div",
	        {
	          staticClass: "drop-target",
	          class: {
	            "is-dragging": _vm.isDragging,
	            "is-dragging-over": _vm.isDraggingOver
	          }
	        },
	        [
	          !_vm.isDraggingOver
	            ? _c("div", { staticClass: "drop-target-info" }, [
	                _vm._v(
	                  _vm._s(
	                    _vm._f("i18n")(
	                      _vm.multiple
	                        ? _vm.strings.placeFiles
	                        : _vm.strings.placeFile,
	                      _vm.i18nDomain
	                    )
	                  )
	                )
	              ])
	            : _c("div", { staticClass: "drop-target-info" }, [
	                _vm._v(
	                  _vm._s(
	                    _vm._f("i18n")(
	                      _vm.multiple
	                        ? _vm.strings.dropFiles
	                        : _vm.strings.dropFile,
	                      _vm.i18nDomain
	                    )
	                  )
	                )
	              ])
	        ]
	      )
	    ],
	    2
	  )
	};
	var __vue_staticRenderFns__$x = [];
	__vue_render__$x._withStripped = true;

	  /* style */
	  const __vue_inject_styles__$C = undefined;
	  /* scoped */
	  const __vue_scope_id__$C = undefined;
	  /* module identifier */
	  const __vue_module_identifier__$C = undefined;
	  /* functional template */
	  const __vue_is_functional_template__$C = false;
	  /* style inject */
	  
	  /* style inject SSR */
	  

	  
	  var Uploader = normalizeComponent_1(
	    { render: __vue_render__$x, staticRenderFns: __vue_staticRenderFns__$x },
	    __vue_inject_styles__$C,
	    __vue_script__$C,
	    __vue_scope_id__$C,
	    __vue_is_functional_template__$C,
	    __vue_module_identifier__$C,
	    undefined,
	    undefined
	  );

	/*
	 * Copyright (c) 2019 - Bas Milius <bas@mili.us>
	 *
	 * This file is part of the Latte UI package.
	 *
	 * For the full copyright and license information, please view the
	 * LICENSE file that was distributed with this source code.
	 */

	var Components = /*#__PURE__*/Object.freeze({
		Autocomplete: Autocomplete,
		BottomNav: BottomNav,
		ButtonDropdown: ButtonDropdown,
		Chart: Chart,
		ChartPanel: ChartPanel,
		ComboBox: ComboBox,
		ComboBoxItem: ComboBoxItem,
		DataFragment: DataFragment,
		DataTable: DataTable,
		DataTableActions: DataTableActions,
		DatePicker: DatePicker,
		DatePickerCalendar: DatePickerCalendar,
		DateTimePicker: DateTimePicker,
		Draggable: Draggable,
		Expandable: Expandable,
		Grid: Grid,
		GridItem: GridItem,
		Initials: Initials,
		Moment: Moment,
		Overlay: Overlay,
		Pagination: Pagination,
		Password: Password,
		PdfViewer: PdfViewer,
		Popup: Popup,
		Portal: Portal,
		PortalTarget: PortalTarget,
		Progress: Progress,
		RichTextEditor: RichTextEditor,
		Ripple: Ripple,
		Sheet: Sheet,
		SortingButton: SortingButton,
		Submenu: Submenu,
		Swiper: Swiper,
		SVGUndraw: SVGUndraw,
		Tab: Tab,
		TabBar: TabBar,
		TabContainer: TabContainer,
		TimePickerClock: TimePickerClock,
		Uploader: Uploader
	});

	/*
	 * Copyright (c) 2019 - Bas Milius <bas@mili.us>
	 *
	 * This file is part of the Latte UI package.
	 *
	 * For the full copyright and license information, please view the
	 * LICENSE file that was distributed with this source code.
	 */

	var MomentMixin = {

		methods: {

			moment(...args)
			{
				return moment(...args);
			},

			momentDuration(...args)
			{
				return moment.duration(...args);
			},

			momentUtc(...args)
			{
				return moment.utc(...args);
			}

		}

	};

	/*
	 * Copyright (c) 2019 - Bas Milius <bas@mili.us>
	 *
	 * This file is part of the Latte UI package.
	 *
	 * For the full copyright and license information, please view the
	 * LICENSE file that was distributed with this source code.
	 */

	var Mixins = /*#__PURE__*/Object.freeze({
		MomentMixin: MomentMixin
	});

	//
	//
	//
	//
	//
	//
	//
	//
	//


	var script$D = {

		name: "RTEAlignmentPlugin",

		mounted()
		{
			this.$parent.addToolbarAction("align-left", "format-align-left", "Left", 0, {groupId: "alignment"});
			this.$parent.addToolbarAction("align-center", "format-align-center", "Center", 0, {groupId: "alignment"});
			this.$parent.addToolbarAction("align-right", "format-align-right", "Right", 0, {groupId: "alignment"});
			this.$parent.addToolbarAction("align-justify", "format-align-justify", "Justify", 0, {groupId: "alignment"});

			this.$parent.$on("toolbar-action:align-left", () => this.$parent.executeCommand("align-left"));
			this.$parent.$on("toolbar-action:align-center", () => this.$parent.executeCommand("align-center"));
			this.$parent.$on("toolbar-action:align-right", () => this.$parent.executeCommand("align-right"));
			this.$parent.$on("toolbar-action:align-justify", () => this.$parent.executeCommand("align-justify"));

			this.$parent.registerCommand("align-left", () => document.execCommand("justifyLeft"));
			this.$parent.registerCommand("align-center", () => document.execCommand("justifyCenter"));
			this.$parent.registerCommand("align-right", () => document.execCommand("justifyRight"));
			this.$parent.registerCommand("align-justify", () => document.execCommand("justifyFull"));
		},

		render(h)
		{
			return h("div");
		}

	};

	/* script */
	const __vue_script__$D = script$D;

	/* template */

	  /* style */
	  const __vue_inject_styles__$D = undefined;
	  /* scoped */
	  const __vue_scope_id__$D = undefined;
	  /* module identifier */
	  const __vue_module_identifier__$D = undefined;
	  /* functional template */
	  const __vue_is_functional_template__$D = undefined;
	  /* style inject */
	  
	  /* style inject SSR */
	  

	  
	  var RTEAlignmentPlugin = normalizeComponent_1(
	    {},
	    __vue_inject_styles__$D,
	    __vue_script__$D,
	    __vue_scope_id__$D,
	    __vue_is_functional_template__$D,
	    __vue_module_identifier__$D,
	    undefined,
	    undefined
	  );

	//
	//
	//
	//
	//
	//
	//
	//
	//


	var script$E = {

		name: "RTEBasicFormattingPlugin",

		mounted()
		{
			this.$parent.addToolbarAction("basic-bold", "format-bold", "Bold", 0, {groupId: "basic"});
			this.$parent.addToolbarAction("basic-italic", "format-italic", "Italic", 0, {groupId: "basic"});
			this.$parent.addToolbarAction("basic-underline", "format-underline", "Underline", 0, {groupId: "basic"});

			this.$parent.$on("selection-changed", selection => this.onSelectionChanged(selection));
			this.$parent.$on("toolbar-action:basic-bold", () => this.$parent.executeCommand("bold"));
			this.$parent.$on("toolbar-action:basic-italic", () => this.$parent.executeCommand("italic"));
			this.$parent.$on("toolbar-action:basic-underline", () => this.$parent.executeCommand("underline"));

			this.$parent.registerCommand("bold", () => document.execCommand("bold"));
			this.$parent.registerCommand("italic", () => document.execCommand("italic"));
			this.$parent.registerCommand("underline", () => document.execCommand("underline"));
		},

		render(h)
		{
			return h("div");
		},

		methods: {

			onSelectionChanged(selection)
			{
				let node = selection.anchorNode;

				if (!(node instanceof HTMLElement))
					node = node.parentElement;

				this.$parent.getToolbarAction("basic-bold").isActive = node.style.fontWeight === "bold";
				this.$parent.getToolbarAction("basic-italic").isActive = node.style.fontStyle === "italic";
				this.$parent.getToolbarAction("basic-underline").isActive = node.style.textDecorationLine === "underline";
				this.$parent.$forceUpdate();
			}

		}

	};

	/* script */
	const __vue_script__$E = script$E;

	/* template */

	  /* style */
	  const __vue_inject_styles__$E = undefined;
	  /* scoped */
	  const __vue_scope_id__$E = undefined;
	  /* module identifier */
	  const __vue_module_identifier__$E = undefined;
	  /* functional template */
	  const __vue_is_functional_template__$E = undefined;
	  /* style inject */
	  
	  /* style inject SSR */
	  

	  
	  var RTEBasicFormattingPlugin = normalizeComponent_1(
	    {},
	    __vue_inject_styles__$E,
	    __vue_script__$E,
	    __vue_scope_id__$E,
	    __vue_is_functional_template__$E,
	    __vue_module_identifier__$E,
	    undefined,
	    undefined
	  );

	//

	var script$F = {

		name: "RTEMentionsPlugin",

		data()
		{
			return {
				isLookingForMentions: false,
				span: null,
				text: "",
				mentions: [
					"Bas Milius",
					"Martijn Woolschot",
					"Jorden Willemsen",
					"Ynze Hettema",
					"Fleur Nijhuis",
					"Geert Milius",
					"Nina Milius"
				]
			};
		},

		mounted()
		{
			// this.$parent.$on("blur", () => this.moveOut());
			this.$parent.$on("keydown", evt => this.onEditorKeyDown(evt));
			this.$parent.$on("keyup", evt => this.onEditorKeyUp(evt));
			this.$parent.$on("remove-emptyness", () => this.onRemoveEmptyness());
		},

		render(h)
		{
			return h("div");
		},

		computed: {

			mentionsFiltered()
			{
				return this.mentions.filter(m => m.toLowerCase().startsWith(this.text.toLowerCase())).slice(0, 3);
			}

		},

		methods: {

			moveOut(evt)
			{
				if (this.span === null)
					return;

				if (evt && evt.key.length === 1)
					this.$parent.setSelectionAfter(this.span, false, evt.key);
				else
					this.$parent.setSelectionAfter(this.span);

				if (this.span.innerText.trim() === "@")
					this.span.remove();

				this.text = "";
				this.span = null;
			},

			onEditorKeyDown(evt)
			{
				const shouldCancel = evt.key === "Escape" || (evt.key === "Backspace" && this.text === "") || (evt.key !== "@" && evt.key.match("[a-zA-Z0-9-_ ]") === null);

				if (this.isLookingForMentions && shouldCancel)
				{
					evt.preventDefault();
					this.moveOut(evt);
				}

				this.isLookingForMentions = (this.isLookingForMentions || evt.key === "@") && !shouldCancel;

				if (evt.key === "@")
				{
					evt.preventDefault();

					this.span = createElement("span", span =>
					{
						span.classList.add("rte-mention");
						span.innerHTML = "@";
					});

					this.$parent.addElementAtCursor(this.span);
					this.$parent.setSelection(this.span, 1);
				}
			},

			onEditorKeyUp()
			{
				if (!this.isLookingForMentions)
					return;

				const el = window.getSelection().anchorNode;
				const offset = window.getSelection().anchorOffset;

				if (!(el instanceof Text))
					return;

				this.text = el.splitText(offset).wholeText.substr(1);
			},

			onRemoveEmptyness()
			{
				this.$parent.editableContent.querySelectorAll("span.rte-mention:empty").forEach(el => el.remove());
			}

		},

		watch: {

			isLookingForMentions()
			{
				if (this.isLookingForMentions)
					this.$refs.popup.open();
				else
					this.$refs.popup.close();
			}

		}

	};

	/* script */
	const __vue_script__$F = script$F;

	/* template */
	var __vue_render__$y = function() {
	  var _vm = this;
	  var _h = _vm.$createElement;
	  var _c = _vm._self._c || _h;
	  return _c(
	    "latte-popup",
	    {
	      ref: "popup",
	      attrs: {
	        "associate-with": _vm.span || undefined,
	        "margin-x": -30,
	        "margin-y": 9
	      }
	    },
	    [
	      _c(
	        "nav",
	        { staticClass: "nav nav-list" },
	        [
	          _vm._l(_vm.mentionsFiltered, function(mention) {
	            return _c("a", { staticClass: "nav-link" }, [
	              _c("span", [_vm._v(_vm._s(mention))])
	            ])
	          }),
	          _vm._v(" "),
	          _vm.mentionsFiltered.length === 0
	            ? _c("div", { staticClass: "section" }, [_vm._v("No results...")])
	            : _vm._e()
	        ],
	        2
	      )
	    ]
	  )
	};
	var __vue_staticRenderFns__$y = [];
	__vue_render__$y._withStripped = true;

	  /* style */
	  const __vue_inject_styles__$F = undefined;
	  /* scoped */
	  const __vue_scope_id__$F = undefined;
	  /* module identifier */
	  const __vue_module_identifier__$F = undefined;
	  /* functional template */
	  const __vue_is_functional_template__$F = false;
	  /* style inject */
	  
	  /* style inject SSR */
	  

	  
	  var RTEMentionsPlugin = normalizeComponent_1(
	    { render: __vue_render__$y, staticRenderFns: __vue_staticRenderFns__$y },
	    __vue_inject_styles__$F,
	    __vue_script__$F,
	    __vue_scope_id__$F,
	    __vue_is_functional_template__$F,
	    __vue_module_identifier__$F,
	    undefined,
	    undefined
	  );

	/*
	 * Copyright (c) 2019 - Bas Milius <bas@mili.us>
	 *
	 * This file is part of the Latte UI package.
	 *
	 * For the full copyright and license information, please view the
	 * LICENSE file that was distributed with this source code.
	 */

	var RTEPlugins = /*#__PURE__*/Object.freeze({
		RTEAlignmentPlugin: RTEAlignmentPlugin,
		RTEBasicFormattingPlugin: RTEBasicFormattingPlugin,
		RTEMentionsPlugin: RTEMentionsPlugin
	});

	/*
	 * Copyright (c) 2019 - Bas Milius <bas@mili.us>
	 *
	 * This file is part of the Latte UI package.
	 *
	 * For the full copyright and license information, please view the
	 * LICENSE file that was distributed with this source code.
	 */

	const DefaultOptions = Object.assign({}, {
		i18n: {},
		locale: navigator.language,
		tickInterval: 250
	}, self["LatteOptions"] || {});

	let foundMainElement = false;
	let lastScroll = 0;

	const LatteUI = {

		install(Vue, options = {})
		{
			options = this.normalizeOptions(options);

			Vue.prototype.$latte = LatteSDK;

			Vue.mixin({
				created()
				{
					if (foundMainElement)
						return;

					foundMainElement = true;

					setOptions(Object.assign({}, getOptions(), {
						mainElement: this.$root.$el
					}));
				}
			});

			setOptions(options);

			registerOutsideEvents();
			initializeHoudiniApis();

			this.registerMixins(Vue);
			this.registerComponents(Vue);

			interval(options.tickInterval, () => this.onTick());
			on("latte:switch-theme", data => this.onSwitchTheme(data));

			window.addEventListener("load", () => this.onDOMContentLoaded(), {passive: true});
			window.addEventListener("scroll", () => this.onWindowScroll(), {passive: true});

			if (window)
				window.Latte = LatteSDK;
			else
				self.Latte = LatteSDK;
		},

		normalizeOptions(options)
		{
			return Object.assign({}, DefaultOptions, options);
		},

		registerComponents(Vue)
		{
			Object.values(Components).forEach(c => Vue.component(c.name, c));
			Object.values(RTEPlugins).forEach(p => Vue.component(p.name, p));
		},

		registerMixins(Vue)
		{
			Object.values(Mixins).forEach(m => Vue.mixin(m));
		},

		onDOMContentLoaded()
		{
			initializeActions();
			initializeUI();
			removeSavedFromQueryString();
		},

		onSwitchTheme(data)
		{
			const {themeId} = data;

			if (themeId === undefined)
				return;

			document.documentElement.dataset.theme = themeId;
			setCookie("$ui:theme", themeId);
		},

		onTick()
		{
			if (document.hidden === true)
				return;

			if (Date.now() - lastScroll < 100)
				return;

			dispatch("latte:tick", window.performance.now());
		},

		onWindowScroll()
		{
			lastScroll = Date.now();
		}

	};

	/*
	 * Copyright (c) 2019 - Bas Milius <bas@mili.us>
	 *
	 * This file is part of the Latte UI package.
	 *
	 * For the full copyright and license information, please view the
	 * LICENSE file that was distributed with this source code.
	 */

	self.LatteUI = LatteUI;

}));

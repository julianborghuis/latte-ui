"use strict";

export function getCookie(name)
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

export function setCookie(name, value, days = 21)
{
	const date = new Date();
	date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));

	document.cookie = `${name}=${encodeURIComponent(JSON.stringify(value))};expires=${date.toUTCString()};path=/`;
}

export default {

	getCookie,

	setCookie

}

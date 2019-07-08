import { Latte } from "@bybas/latte-ui";

export function editorInstance(component)
{
	while ((component = component.$parent) !== undefined)
		if (component.$options.name === "BEEditor")
			return component;

	return undefined;
}

export function getLatte()
{
	return Latte;
}

export function replaceIndex(arr, index, obj)
{
	arr.splice(index, 1, obj);

	return arr;
}

export function setSelection(el, offset = 0, collapse = true)
{
	if (!(el instanceof Node))
		return;

	const range = document.createRange();
	const selection = window.getSelection();

	range.setStart(el, offset);
	range.collapse(collapse);

	selection.removeAllRanges();
	selection.addRange(range);
}

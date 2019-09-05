import { BlockBase } from "../block";
import { blockActions, settingsGroup } from "../primitive/settings";

export class PageBreakBlock extends BlockBase
{

	get description()
	{
		return "Breaks the page into multiple pages";
	}

	get keywords()
	{
		return ["page break", "break", "pages"];
	}

	get name()
	{
		return "Page Break";
	}

	constructor()
	{
		super("page-break", "layout", "format-page-break");
	}

	render(h, entry)
	{
		return document.createComment("page-break");
	}

	renderEditor(h, entry)
	{
		return h("div", {
			attrs: {
				"data-text": "Page break"
			},
			class: "be-page-break"
		});
	}

	renderOptions(h, entry)
	{
		return settingsGroup(h, this.name, [
			blockActions(h, entry)
		]);
	}

}

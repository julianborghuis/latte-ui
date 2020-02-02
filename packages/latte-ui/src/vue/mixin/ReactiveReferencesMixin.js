/*
 * Copyright (c) 2018-2020 - Bas Milius <bas@mili.us>
 *
 * This file is part of the Latte UI package.
 *
 * For the full copyright and license information, please view the
 * LICENSE file that was distributed with this source code.
 */

import Vue from "vue";

export default {

	beforeCreate()
	{
		const { refs } = this.$options;

		if (!refs)
			return;

		this.$refs = Vue.observable(refs.reduce(($refs, key) =>
		{
			$refs[key] = undefined;
			return $refs;
		}, {}));
	}

};

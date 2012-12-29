/*
 * jQuery.liveFilter
 *
 * Copyright (c) 2009 Mike Merritt
 *
 * Forked by Lim Chee Aun (cheeaun.com)
 * 
 */
 
(function($){
	$.fn.liveFilter = function(inputEl, filterEl, options){
		var defaults = {
			filterChildSelector: null,
			before: function(){},
			after: function(){}
		};
		var options = $.extend(defaults, options);
		var filterTag = (typeof filterEl === 'object') ? filterEl.selector : filterEl;

		var el = $(this).find(filterEl);
		if (options.filterChildSelector) el = el.find(options.filterChildSelector);
	 
		$(inputEl).keyup(function(){
			var val = $(this).val();

			// don't filter if filter value is empty
			if (val.trim() === '') {
				el.parents(filterTag).show();
				return;
			}

			var contains = el.filter(':inContains("'+val+'")');
			var containsNot = el.filter(':not(:inContains("'+val+'"))');

			if (options.filterChildSelector){
				contains = contains.parent(filterTag);
				containsNot = containsNot.parent(filterTag).hide();
			}

			options.before.call(this, contains, containsNot);
			
			contains.show();
			containsNot.hide();
			
			options.after.call(this, contains, containsNot);
		});
		
		$.extend($.expr[':'], {
			inContains: function(a,i,m){
				return $(a).text().toUpperCase().indexOf(m[3].toUpperCase()) >= 0;
			}
		});
	}
})(jQuery);

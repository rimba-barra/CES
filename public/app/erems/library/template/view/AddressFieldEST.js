/// Create by erwin 12042021
/// Untuk input address
Ext.define('Erems.library.template.view.AddressFieldEST', {
	extend           : 'Ext.form.field.TextArea',
	alias            : 'widget.xaddressfieldEST',
	// maskRe           : /[a-zA-Z0-9_`\s,./()-]/,
	enforceMaxLength : true,
	maxLength        : 500,
	initComponent    : function() {
		var me = this;
		Ext.applyIf(me, {});
		me.callParent(arguments);
	},
	// listeners        : {
	// 	// beforerender : function(field){
	// 	// 	this.maskRe = new RegExp(`[${apps.maskre_address_field}]`);
	// 	// },
	// 	afterrender: function(field) {
	// 		var me  = this,
	// 			dom = Ext.get(me.id);

	// 		dom.on('paste', function(event, element){
	// 			setTimeout(() => {
	// 				me.setRawvalue(field);
	// 			}, 10);
	// 		});
	// 	},
	// 	// paste : {
	// 	// 	element : 'inputEl',
	// 	// 	fn      : function(event, inputEl, obj) {
	// 	// 		setTimeout(function() {
	// 	// 			var cleanText = new Erems.library.CleanText();
	// 	// 			inputEl.value = cleanText.copyPaste(inputEl.value);
	// 	// 		}, 0);
	// 	// 	}
	// 	// },
	// },
	// setRawvalue : function(field){
	// 	var me  		= this,
	// 		libFormdata = new Erems.library.template.view.FormData(),
	// 		val         = libFormdata.pasteCleanText(field.getValue());

	// 	field.setValue(libFormdata.getValueRegex(me.maskRe, val));
	// }
});
/// Create by erwin 09112022
Ext.define('Erems.library.template.view.PhonenumberFieldEST', {
	extend           : 'Ext.form.field.Text',
	alias            : 'widget.xphonenumberfieldEST',
	// maskRe           : /[0-9+]/,
	enforceMaxLength : true,
	maxLength        : 20,
	enableKeyEvents  : true,
	initComponent    : function() {
		var me = this;
		Ext.applyIf(me, {});
		me.callParent(arguments);
	},
	// listeners       : {
	// 	// beforerender : function(field){
	// 	// 	this.maskRe = new RegExp(`[${apps.maskre_phonenumber_field}]`);
	// 	// },
	// 	afterrender: function(field) {
	// 		var me  = this, 
	// 			dom = Ext.get(me.id);

	//         dom.on('paste', function(event, element){
	//         	setTimeout(() => {
	//         		me.setRawvalue(field);
	//         	}, 10);
	//         });
	//     },
	// 	keyup : function(field) {
	// 		this.setRawvalue(field);
	// 	},
	// },
	// setRawvalue : function(field){
	// 	var me  		= this,
	// 		libFormdata = new Erems.library.template.view.FormData(),
	// 		val         = libFormdata.pasteCleanText(field.getValue());
		
	// 	val = libFormdata.getValueRegex(me.maskRe, val);

	// 	var char   = val.charAt(0) == '+' ? '+' : '';
	// 	var valTmp = char == '+' ? val.substring(1, val.length) : val;

	// 	val  = char + valTmp.replace(/[^0-9]/g, '');

	// 	field.setValue(val);
	// }
});
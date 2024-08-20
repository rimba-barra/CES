/// Create by erwin 17112022
Ext.define('Erems.library.template.view.NumericFieldEST', {
	extend           : 'Ext.form.field.Text',
	alias            : 'widget.xnumericfieldEST',
	// maskRe           : /[0-9]/,
	enforceMaxLength : true,
	maxLength        : 50,
	initComponent    : function() {
        var me = this;
        Ext.applyIf(me, {});
        me.callParent(arguments);
    },
	// listeners : {
	// 	// beforerender : function(field){
	// 	// 	this.maskRe = new RegExp(`[${apps.maskre_numeric_field}]`);
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
	// },
	// setRawvalue : function(field){
	// 	var me  		= this,
	// 		libFormdata = new Erems.library.template.view.FormData(),
	// 		val         = libFormdata.pasteCleanText(field.getValue());

	// 	field.setValue(libFormdata.getValueRegex(me.maskRe, val));
	// }
});
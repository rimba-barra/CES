/// Create by erwin 12042021
/// Untuk input nama orang
Ext.define('Erems.library.template.view.NameFieldEST', {
	extend           : 'Ext.form.field.Text',
	alias            : 'widget.xnamefieldEST',
	// maskRe           : /[a-zA-Z`\s,./-]/,
	enforceMaxLength : true,
	maxLength        : 150,
	initComponent    : function() {
        var me = this;
        Ext.applyIf(me, {});
        me.callParent(arguments);
    },
	// listeners : {
	// 	// beforerender : function(field){
	// 	// 	this.maskRe = new RegExp(`[${apps.maskre_name_field}]`);
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
/// Create by erwin 14112022
/// Untuk input note
Ext.define('Erems.library.template.view.NoteFieldEST', {
	extend           : 'Ext.form.field.TextArea',
	alias            : 'widget.xnotefieldEST',
	// maskRe           : /[a-zA-Z0-9_:@\%*&\s,./()+-]/,
	//enforceMaxLength : true,
	//maxLength        : 600,
	initComponent    : function() {
        var me = this;
        Ext.applyIf(me, {});
        me.callParent(arguments);
    },
 //    listeners : {
	// 	afterrender : function(field) {
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
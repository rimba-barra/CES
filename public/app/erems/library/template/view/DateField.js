/// Create by erwin 28122021
/// Untuk input date
Ext.define('Erems.library.template.view.DateField', {
	extend           : 'Ext.form.field.Date',
	alias            : 'widget.xdatefield',
	format           : 'd-m-Y',
	altFormats       : 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
	submitFormat     : 'Y-m-d H:i:s.u',
	maskRe           : /[0-9\.\/\-]/,
	enforceMaxLength : true,
	maxLength        : 10,
	initComponent    : function() {
        var me = this;
        Ext.applyIf(me, {});
        me.callParent(arguments);
    },
});
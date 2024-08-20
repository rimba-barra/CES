Ext.define('Erems.view.admincollection.FormDataOpen', {
	extend      : 'Erems.library.template.view.FormData',
	alias       : 'widget.admincollectionformdataopen',
	frame       : true,
	autoScroll  : true,
	anchorSize  : 100,
	// height      : 135,
	// width       : 380,
	bodyBorder  : true,
	bodyPadding : 10,
	bodyStyle   : 'padding:5px 5px 0',
	defaults    : {
		border : false,
		xtype  : 'panel',
		flex   : 1,
		layout : ''
	},
	initComponent: function() {
		var me = this;

		Ext.applyIf(me, {
			defaults : {
				labelAlign     : 'top',
				labelSeparator : ' ',
				labelClsExtra  : 'small',
				fieldStyle     : 'margin-bottom:3px;',
				anchor         : '100%'
			},
			items: [
				{
					xtype  : 'hiddenfield',
					itemId : 'fdms_flag_form',
					name   : 'flag_form',
					value  : 'open_va',
				},
				{
					xtype  : 'hiddenfield',
					itemId : 'fdms_pl_id',
					name   : 'purchaseletter_id'
				},
				{
					xtype            : 'numberfield',
					name             : 'open_hari_va',
					itemId           : 'fdms_open_va',
					fieldLabel       : 'Open Hari VA',
					allowBlank       : false,
					enforceMaxLength : true,
					maxLength        : 30,
					anchor           : '-5'
				},
				{
					xtype          : 'checkboxfield',
					fieldLabel     : 'Include Denda',
					name           : 'include_denda_va',
					checked        : true,
					inputValue     : '1',
					hidden         :true,
					uncheckedValue : '0',
					margin         : '0 5px 0 0',
					width          : 20
				}
			],
			dockedItems: me.generateDockedItem()
		});

		me.callParent(arguments);
	}
});
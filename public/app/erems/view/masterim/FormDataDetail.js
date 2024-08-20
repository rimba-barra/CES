Ext.define('Erems.view.masterim.FormDataDetail', {
	extend: 'Erems.library.template.view.FormData',
	alias: 'widget.masterimformdatadetail',
	requires: [
        'Erems.template.ComboBoxFields',
	],
	autoScroll: true,
    anchorSize  : 100,
    width       : 400,
	bodyBorder: true,
	bodyPadding: 10,
	bodyStyle: 'border-top:none;border-left:none;border-right:none;',
	initComponent: function () {
		var me = this;
        var statess = Ext.create('Ext.data.Store', {
            fields : ['group', 'group_text'],
            data   : [
                { "group": 1, "group_text": "Reward Sales" },
                { "group": 2, "group_text": "Reward Customer" },
            ]
        });
        
		Ext.applyIf(me, {
			defaults: {
				//labelAlign: 'top',
				labelSeparator: ' ',
				labelClsExtra: 'small',
				fieldStyle: 'margin-bottom:3px;',
				anchor: '100%'
			},
			items: [
                {
                    xtype: 'hiddenfield',
                    itemId: 'internalmemo_detail_id',
                    name: 'internalmemo_detail_id'
                },
				{
					xtype: 'hiddenfield',
					itemId: 'internalmemo_id',
					name: 'internalmemo_id'
				},
                {
                    xtype              : 'combobox',
                    anchor             : '-5',
                    name               : 'group_id',
                    store              : statess,
                    fieldLabel         : 'Group',
                    displayField       : 'group_text',
                    valueField         : 'group',
                    allowBlank         : false,
                    typeAhead          : true,
                    queryMode          : 'local',
                    forceSelection     : true,
                    autoSelect         : true,
                    lastSelectedRecord : null,
                    flex               : 1,
                    listeners          : {
                        change : function (comboBox, newValue, oldValue) {
                            if (!newValue && comboBox.lastSelectedRecord) {
                                comboBox.getStore().clearFilter();
                                comboBox.setValue(comboBox.lastSelectedRecord);
                            } else {
                                comboBox.lastSelectedRecord = comboBox.getValue();
                            }
                        }
                    }
                },
                {
                    xtype          : 'combobox',
                    fieldLabel     : 'Reward',
                    anchor         : '-5',
                    queryMode      : 'local',
                    displayField   : 'name',
                    valueField     : 'reward_id',
                    name           : 'reward_id',
                    flex           : 1,
                    readonly       : true,
                    editable       : false,
                    allowBlank     : false,
                    forceSelection : true,
                },
                {
                    xtype           : 'xmoneyfieldEST',
                    fieldLabel      : 'Amount',
                    anchor          : '-5',
                    name            : 'amount',
                    enableKeyEvents : true,
                    allowBlank      : false,
                    value           : 0.00,
                    flex            : 1,
                },
                {
                    xtype      : 'xnotefieldEST',
                    fieldLabel : 'Note',
                    anchor     : '-5',
                    name       : 'notes',
                    flex       : 1,
                    allowBlank : true
                },
			],
			dockedItems: me.generateDockedItem()
		});
		me.callParent(arguments);
	}
});


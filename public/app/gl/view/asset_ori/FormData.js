Ext.define('Gl.view.asset.FormData', {
    extend: 'Gl.library.template.view.FormData',
    alias: 'widget.assetformdata',
    // requires: ['Gl.library.template.component.Facilitiestypecombobox'],
    frame: true,
    autoScroll: true,
    anchorSize: 100,
    height: 200,
    bodyBorder: true,
    bodyPadding: 10,
    bodyStyle: 'border-top:none;border-left:none;border-right:none;',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            defaults: {
                //labelAlign: 'top',
                labelSeparator: ' ',
                labelClsExtra: 'small',
                fieldStyle: 'margin-bottom:3px;',
                anchor: '100%'
            },
            items: [{
                    xtype: 'hiddenfield',
                    itemId: 'fdms_asset_id',
                    name: 'asset_id'
                },
                {
                    xtype: 'textfield',
                    itemId: 'fdms_asset_account',
                    name: 'asset_account',
                    fieldLabel: 'Account',
                    allowBlank: false,
                    enforceMaxLength: true,
		    maskRe: /[^\`\"\']/,
                    maxLength: 50,
                    anchor: '-5'
                },
                {
                    xtype: 'textfield',
                    itemId: 'fdms_asset_name',
                    name: 'asset_name',
                    fieldLabel: 'Name',
                    allowBlank: false,
                    enforceMaxLength: true,
                    maskRe: /[^\`\"\']/,
                    maxLength: 50,
                    anchor: '-5'
                },
                {
                    xtype: 'textfield',
                    itemId: 'fdms_asset_note',
                    name: 'asset_note',
                    fieldLabel: 'Note',
                    allowBlank: false,
                    enforceMaxLength: true,
                    maskRe: /[^\`\"\']/,
                    maxLength: 50,
                    anchor: '-5'
                },
				
				],
            dockedItems: me.generateDockedItem()
        });

        me.callParent(arguments);
    }
});


Ext.define('Gl.view.subaccountgroup.FormData', {
    extend: 'Gl.library.template.view.FormData',
    alias: 'widget.subaccountgroupformdata',
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
            items: [
                {
                    xtype: 'hiddenfield',
                    name: 'hideparam',
                    value: 'defaultdata'
                },
                {
                    xtype: 'hiddenfield',
                    itemId: 'fdms_kelsub_id',
                    name: 'kelsub_id'
                },
                {
                    xtype: 'textfield',
                    itemId: 'fdms_kelsub',
                    name: 'kelsub',
                    fieldLabel: 'Group Sub COA',
                    allowBlank: false,
                    enforceMaxLength: true,
					maskRe: /[^\`\"\']/,
                    maxLength: 50,
                    anchor: '-5'
                },
                {
                    xtype: 'textfield',
                    itemId: 'fdms_description',
                    name: 'description',
                    fieldLabel: 'Description',
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


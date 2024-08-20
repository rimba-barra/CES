Ext.define('Erems.view.openticket.FormData', {
    extend: 'Erems.library.template.view.FormData',
    alias: 'widget.openticketformdata',
    requires: ['Erems.library.template.component.Openticketcombobox','Erems.library.template.component.Directedcombobox'],
    frame: true,
    autoScroll: true,
    anchorSize: 100,
    bodyBorder: true,
    bodyPadding: 10,
    bodyStyle: 'border-top:none;border-left:none;border-right:none;',
    editedRow:-1,
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            defaults: {
                labelAlign: 'top',
                labelSeparator: ' ',
                labelClsExtra: 'small',
                fieldStyle: 'margin-bottom:3px;',
                anchor: '100%'
            },
            items: [{
                    xtype: 'hiddenfield',
                    itemId: 'fdms_id',
                    name: 'side_id'
                },
                
                {
                    xtype: 'textfield',
                    itemId: 'fdms_subject',
                    name: 'subject',
                    fieldLabel: 'Subject ',
                    allowBlank: false,
                    enforceMaxLength: true,
                    maskRe: /[^\`\"\']/,
                    maxLength: 50,
                    anchor: '-5'
                },
                {
                    xtype: 'openticketcombobox',      
                    name: 'priority',
                    //allowBlank: false,
                    width: 80,
                },
                {
                    xtype: 'directedcombobox',      
                    name: 'directed',
                    width: 80,
                },
                {
                    xtype      : 'xnotefieldEST',
                    height     : 100,
                    itemId     : 'fdms_description',
                    name       : 'message',
                    fieldLabel : 'Message',
                    anchor     : '-5'
                }],
            dockedItems: me.generateDockedItem()
        });

        me.callParent(arguments);
    }
});


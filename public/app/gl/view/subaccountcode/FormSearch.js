Ext.define('Gl.view.subaccountcode.FormSearch',{
    extend:'Gl.library.template.view.FormSearch',
    alias:'widget.subaccountcodeformsearch',
   
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            defaults: me.generateDefaults(),
            items: [
                {
                    xtype: 'hiddenfield',
                    name: 'hideparam',
                    value: 'default'
                },
                 {
                    xtype: 'subaccountgroupcombobox', //dari alias yang di riquires Gl.library.template.combobox.Subaccountgroupcombobox
                    fieldLabel: 'Kelompok Sub Account',
                    anchor: '-5',
                    allowBlank: true,
                    name: 'kelsub_id', // kelsub_id disamakan dengan yang ada di Subaccountgroupcombobox
                    itemId: 'fsms_kelsub_id', //kelsub_id disamakan dengan yang ada di Subaccountgroupcombobox
                    id: 'fsms_kelsub_id',
                    flex: 1
                },
                {
                    xtype: 'textfield',
                    itemId: 'fsms_code1',
                    name: 'code1',
                    fieldLabel: 'Code 1',
                    enforceMaxLength: true,
                    maxLength: 50,
                    enableKeyEvents : true
                },
                {
                    xtype: 'textfield',
                    itemId: 'fsms_code2',
                    name: 'code2',
                    fieldLabel: 'Code 2',
                    enforceMaxLength: true,
                    maxLength: 50,
                    enableKeyEvents : true
                },
                {
                    xtype: 'subdesccodecombobox', //dari alias yang di riquires Gl.library.template.combobox.subdesccodecombobox
                    fieldLabel: 'Code 3',
                    anchor: '-5',
                    allowBlank: true,
                    name: 'code3', // subdsk_id disamakan dengan yang ada di Subdesccodecombobox
                    itemId: 'fsms_code3', //subdsk_id disamakan dengan yang ada di Subdesccodecombobox
                    id: 'fsms_code3',
                    flex: 1
                },
                {
                    xtype: 'subdesccodecombobox', //dari alias yang di riquires Gl.library.template.combobox.subdesccodecombobox
                    fieldLabel: 'Code 4',
                    anchor: '-5',
                    allowBlank: true,
                    name: 'code4', // subdsk_id disamakan dengan yang ada di Subdesccodecombobox
                    itemId: 'fsms_code4', //subdsk_id disamakan dengan yang ada di Subdesccodecombobox
                    id: 'fsms_code4',
                    flex: 1
                },
                {
                    xtype: 'textfield',
                    itemId: 'fsms_code',
                    id: 'fsms_code',
                    name: 'code',
                    fieldLabel: 'Code sub Account',
                    allowBlank: true,
                    enforceMaxLength: true,
                    maskRe: /[^\`\"\']/,
                    anchor: '-5',
                    enableKeyEvents : true
                },
            ],
            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    }
});

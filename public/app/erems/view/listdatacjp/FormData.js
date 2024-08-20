Ext.define('Erems.view.listdatacjp.FormData', {
    extend: 'Erems.library.template.view.FormData',
    alias: 'widget.listdatacjpformdata',
    frame: true,
    autoScroll: true,
    anchorSize: 100,
    height: 240,
    bodyBorder: true,
    bodyPadding: 10,
    bodyStyle: 'border-top:none;border-left:none;border-right:none;',
    initComponent: function () {
        var me = this;
        Ext.applyIf(me, {
            defaults: {
                labelSeparator: ' ',
                labelClsExtra: 'small',
                fieldStyle: 'margin-bottom:3px;',
                anchor: '100%'
            },
            items: [
                {
                    xtype: 'hiddenfield',
                    name: 'hideparam',
                    value: 'default'
                },
                {
                    xtype: 'hiddenfield',
                    name: 'upload_id',
                },
                {
                    xtype: 'textfield',
                    itemId: 'fdms_spt_no',
                    name: 'spt_no',
                    fieldLabel: 'Nomor SPT',
                    allowBlank: false,
                    enableKeyEvents: true,
                    enforceMaxLength: true,
                    maxLength: 20,
                },               
               
              
            ],
            dockedItems: me.generateDockedItem()
        });

        me.callParent(arguments);
    }
});


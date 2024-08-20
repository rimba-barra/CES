Ext.define('Gl.view.postingstepdua.FormData', {
    extend: 'Gl.library.template.view.FormData',
    alias: 'widget.postingstepduaformdata',
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
                    name: 'postingstepdua_id',
                },
                {
                    xtype: 'textfield',
                    itemId: 'fdms_postingstepdua',
                    name: 'postingstepdua',
                    fieldLabel: 'Jenis usaha',
                    allowBlank: false,
                    enableKeyEvents: true,
                    enforceMaxLength: true,
                    maxLength: 20,
                },               
                {
                    xtype: 'textfield',
                    itemId: 'fdms_description',
                    name: 'description',
                    fieldLabel: 'Description',
                    enableKeyEvents: true,
                    allowBlank: true,
                    enforceMaxLength: true,
                },
              
            ],
            dockedItems: me.generateDockedItem()
        });

        me.callParent(arguments);
    }
});


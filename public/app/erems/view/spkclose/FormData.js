Ext.define('Erems.view.spkclose.FormData', {
    extend: 'Erems.library.template.view.FormData',
    alias: 'widget.spkcloseformdata',
    frame: true,
    autoScroll: true,
    anchorSize: 100,
    bodyBorder: true,
    bodyPadding: 10,
    bodyStyle: 'border-top:none;border-left:none;border-right:none;',
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
                    name: 'spk_id'
                },
                {
                    xtype: 'datefield',
                    fieldLabel: 'Close Date',
                    name: 'status_change_date',
                    value: new Date(),
                    format: 'd-m-Y',
                    submitFormat:'Y-m-d'
                }, {
                    xtype      : 'xnotefieldEST',
                    fieldLabel : 'Description',
                    name       : 'status_note',
                    width      : '100%'
                }],
            dockedItems: me.generateDockedItem()
        });

        me.callParent(arguments);
    }
});
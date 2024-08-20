Ext.define('Cashier.view.vdposting.FormContentDesc', {
    extend: 'Cashier.library.template.view.FormData',
    alias: 'widget.vdpostingdescformcontent',
    frame: true,
    autoScroll: true,
    anchorSize: 100,
    height: 380,
    bodyBorder: true,
    bodyPadding: 10,
    uniquename: '_voucherpostingcontentdesc',
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
                    xtype: 'vdpostinggriddesc',
                    itemId: 'fd_vdpostinggriddesc'+me.uniquename,
                    id: 'vdpostinggriddesc'+me.uniquename,
                    name: 'vdpostinggriddesc',
                    title: 'DESCRIPTION DETAIL',
                    width: '600',
                    height: 250,
                },
            ],
            dockedItems: me.generateDockedItem()
        });

        me.callParent(arguments);
    }
});


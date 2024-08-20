Ext.define('Cashier.view.vdrequest.FormContentDesc', {
    extend: 'Cashier.library.template.view.FormData',
    alias: 'widget.vdrequestdescformcontent',
    frame: true,
    autoScroll: true,
    anchorSize: 100,
    height: 380,
    bodyBorder: true,
    bodyPadding: 10,
    uniquename: '_voucherrequestcontentdesc',
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
                    xtype: 'vdrequestgriddesc',
                    itemId: 'fd_vdrequestgriddesc'+me.uniquename,
                    id: 'vdrequestgriddesc'+me.uniquename,
                    name: 'vdrequestgriddesc',
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


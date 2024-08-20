Ext.define('Cashier.view.vdapprove.FormContentDesc', {
    extend: 'Cashier.library.template.view.FormData',
    alias: 'widget.vdapprovedescformcontent',
    frame: true,
    autoScroll: true,
    anchorSize: 100,
    height: 380,
    bodyBorder: true,
    bodyPadding: 10,
    uniquename: '_voucherapprovecontentdesc',
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
                    xtype: 'vdapprovegriddesc',
                    itemId: 'fd_vdapprovegriddesc'+me.uniquename,
                    id: 'vdapprovegriddesc'+me.uniquename,
                    name: 'vdapprovegriddesc',
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


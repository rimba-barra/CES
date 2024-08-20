Ext.define('Hrd.view.personalselfservice.FormContact', {
    extend: 'Ext.form.Panel',
    alias: 'widget.personalselfserviceformcontact',
    requires: [
        'Hrd.view.personalselfservice.GridContact',
    ],
    frame: true,
    autoScroll: true,
    height: 500,
    bodyBorder: true,
    bodyPadding: 0,
    bodyStyle: 'border-top:none;border-left:none;border-right:none;',
    uniquename: '_personalselfserviceformcontact',
    initComponent: function () {
        var me = this;
        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'fieldcontainer',
                    layout: 'vbox',
                    align: 'right',
                    autoScroll: true,
                    bodyBorder: false,
                    defaults: {
                        layout: 'fit'
                    },
                    items: [
                        {
                            xtype: 'familycontactgrid',
                            name: 'griddatacontact',
                            readOnly: false,
                            width: 900,
                            height: 380,
                        },
                    ]
                },
            ],
        });
        me.callParent(arguments);
    },
});


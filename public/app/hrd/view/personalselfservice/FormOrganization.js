Ext.define('Hrd.view.personalselfservice.FormOrganization', {
    extend: 'Ext.form.Panel',
    alias: 'widget.personalselfserviceformorganization',
    requires: [
        'Hrd.view.personalselfservice.GridOrganization',
    ],
    frame: true,
    autoScroll: true,
    height: 500,
    bodyBorder: true,
    bodyPadding: 0,
    bodyStyle: 'border-top:none;border-left:none;border-right:none;',
    uniquename: '_personalselfserviceformorganization',
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
                            xtype: 'familyorganizationgrid',
                            name: 'griddataorganization',
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


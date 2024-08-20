Ext.define('Hrd.view.personalselfservice.FormJobHis', {
    extend: 'Ext.form.Panel',
    alias: 'widget.personalselfserviceformjobhis',
    requires: [
        'Hrd.view.personalselfservice.GridJobHis',
    ],
    frame: true,
    autoScroll: true,
    height: 500,
    bodyBorder: true,
    bodyPadding: 0,
    bodyStyle: 'border-top:none;border-left:none;border-right:none;',
    uniquename: '_personalselfserviceformjobhis',
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
                            xtype: 'familyjobhisgrid',
                            name: 'griddatajobhis',
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


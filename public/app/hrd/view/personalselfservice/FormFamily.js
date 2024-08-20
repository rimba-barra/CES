Ext.define('Hrd.view.personalselfservice.FormFamily', {
    extend: 'Ext.form.Panel',
    alias: 'widget.personalselfserviceformfamily',
    requires: [
        'Hrd.view.personalselfservice.FormFamilySpouse',
        'Hrd.view.personalselfservice.FormFamilyParent',
    ],
    frame: true,
    autoScroll: true,
    height: 500,
    bodyBorder: true,
    bodyPadding: 0,
    bodyStyle: 'border-top:none;border-left:none;border-right:none;',
    uniquename: '_personalselfserviceformfamily',
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
                            xtype: 'tabpanel',
                            autoScroll: true,
                            itemId: 'tabfamily',
                            name: 'tabfamily',
                            width: 900,
                            height: 350,
                            activeTab: 0,
                            defaults: {layout: 'fit'},
                            items: [
                                {
                                    title: 'Spouse and Children',
                                    xtype: 'personalselfserviceformfamilyspouse',
                                    name: 'familyspouse',
                                    readOnly: false,
                                },
                                {
                                    title: 'Parents and Siblings',
                                    xtype: 'personalselfserviceformfamilyparent',
                                    name: 'familyparent',
                                    readOnly: false,
                                },
                            ],
                        }
                    ]
                },
            ],
        });
        me.callParent(arguments);
    },
});


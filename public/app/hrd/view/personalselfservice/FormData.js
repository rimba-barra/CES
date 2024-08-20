Ext.define('Hrd.view.personalselfservice.FormData', {
    extend: 'Hrd.library.template.view.FormData',
    alias: 'widget.personalselfserviceformdata',
    requires: [
        'Hrd.view.personalselfservice.FormPersonal',
        'Hrd.view.personalselfservice.FormFamily',
        'Hrd.view.personalselfservice.FormContact',
        'Hrd.view.personalselfservice.FormOrganization',
        'Hrd.view.personalselfservice.FormEducation',
        'Hrd.view.personalselfservice.FormPotency',
        'Hrd.view.personalselfservice.FormJobHis',
        'Hrd.view.personalselfservice.FormDocument',
        'Hrd.view.personalselfservice.FormApprove',
    ],
    frame: true,
    autoScroll: true,
    anchorSize: 100,
    height: 550,
    bodyBorder: true,
    bodyPadding: 10,
    bodyStyle: 'border-top:none;border-left:none;border-right:none;',
    title: 'PERSONAL SELF SERVICE',
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
                    name: 'mode_read',
                    value: 'default'
                },
                {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    bodyBorder: false,
                    defaults: {
                        layout: 'fit'
                    },
                    items: [
                        {
                            xtype: 'hiddenfield',
                            name: 'employee_id',
                            id: 'employee_id' + me.uniquename
                        },
                        {
                            xtype: 'tabpanel',
                            autoScroll: true,
                            itemId: 'tabviewdataselfservive',
                            name: 'tabviewdataselfservive',
                            width: 930,
                            height: 430,
                            activeTab: 0,
                            defaults: {layout: 'fit'},
                            items: [
                                {
                                    title: 'Personal Data',
                                    xtype: 'personalselfserviceformpersonal',
                                    name: 'personaldata',
                                    readOnly: false,
                                },
                                {
                                    title: 'Family',
                                    xtype: 'personalselfserviceformfamily',
                                    name: 'family',
                                    readOnly: false,
                                },
                                {
                                    title: 'Contact',
                                    xtype: 'personalselfserviceformcontact',
                                    name: 'contact',
                                    readOnly: false,
                                },
                                {
                                    title: 'Organization',
                                    xtype: 'personalselfserviceformorganization',
                                    name: 'organization',
                                    readOnly: false,
                                },
                                {
                                    title: 'Education',
                                    xtype: 'personalselfserviceformeducation',
                                    name: 'education',
				    id: 'tabeducation',	
                                    readOnly: false,
                                },
                                {
                                    title: 'Potential',
                                    xtype: 'personalselfserviceformpotency',
                                    name: 'potential',
                                    readOnly: false,
                                },
                                {
                                    title: 'Job Histroy',
                                    xtype: 'personalselfserviceformjobhis',
                                    name: 'jobhis',
                                    readOnly: false,
                                },
                                {
                                    title: 'Documents',
                                    xtype: 'personalselfserviceformdocument',
                                    name: 'document',
                                    readOnly: false,
                                },
                                {
                                    title: 'Data Already Valid/ Approved',
                                    xtype: 'personalselfserviceformapprove',
                                    name: 'dataapprove',
                                    readOnly: false,
                                },
                            ],
                        }
                    ]
                },
            ],
            dockedItems: me.generateDockedItem()
        });

        me.callParent(arguments);
    },
    generateDockedItem: function () {
        var x = [
            {
                xtype: 'toolbar',
                dock: 'bottom',
                ui: 'footer',
                padding: '0 0 0 0',
                layout: {
                    padding: 6,
                    type: 'hbox',
                },
                items: [
                    {
                        xtype: 'fieldcontainer',
                        layout: 'vbox',
                        align: 'right',
                        bodyBorder: false,
                        defaults: {
                            layout: 'fit'
                        },
                        items: [
                            {
                                xtype: 'fieldcontainer',
                                layout: 'hbox',
                                align: 'right',
                                bodyBorder: false,
                                defaults: {
                                    layout: 'fit'
                                },
                                items: [
                                    {
                                        xtype: 'button',
                                        action: 'approve',
                                        itemId: 'btnApprove',
                                        padding: 5,
                                        width: 75,
                                        iconCls: 'icon-save',
                                        text: 'Approve',
                                    },
                                    {
                                        xtype: 'button',
                                        action: 'cancel',
                                        itemId: 'btnCancel',
                                        padding: 5,
                                        width: 75,
                                        iconCls: 'icon-cancel',
                                        text: 'Cancel',
                                        handler: function () {
                                            this.up('window').close();
                                        }
                                    },
                                ]
                            },
                        ]
                    },
                ]
            }
        ];
        return x;
    }
});


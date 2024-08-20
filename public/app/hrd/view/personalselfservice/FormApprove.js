Ext.define('Hrd.view.personalselfservice.FormApprove', {
    extend: 'Ext.form.Panel',
    alias: 'widget.personalselfserviceformapprove',
    frame: true,
    autoScroll: true,
    height: 500,
    bodyBorder: true,
    bodyPadding: 0,
    bodyStyle: 'border-top:none;border-left:none;border-right:none;',
    uniquename: '_personalselfserviceformapprove',
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
                    width: 500,
                    items: [
                        {
                            xtype: 'hiddenfield',
                            name: 'project_id',
                            id: 'project_id' + me.uniquename
                        },
                        {
                            xtype: 'hiddenfield',
                            name: 'pt_id',
                            id: 'pt_id' + me.uniquename
                        },
                        {
                            xtype: 'hiddenfield',
                            name: 'employee_id',
                            id: 'employee_id' + me.uniquename
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Last update user',
                            itemId: 'fd_last_update_by_user' + me.uniquename,
                            id: 'last_update_by_user' + me.uniquename,
                            name: 'last_update_by_user',                          
                            emptyText: 'Auto Value',
                            width: 300,
                            readOnly: false,
                            allowBlank: false,
                            enforceMaxLength: true,
                            enableKeyEvents: true,
                            rowdata: null
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Last update admin',
                            itemId: 'fd_last_update_by_admin' + me.uniquename,
                            id: 'last_update_by_admin' + me.uniquename,
                            name: 'last_update_by_admin',                           
                            emptyText: 'Auto Value',
                            width: 300,
                            readOnly: false,
                            allowBlank: false,
                            enforceMaxLength: true,
                            enableKeyEvents: true,
                            rowdata: null
                        },
                    ]
                },
            ],
        });
        me.callParent(arguments);
    },
});


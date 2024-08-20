Ext.define('Hrd.view.workgroupemployee.FormData', {
    extend: 'Hrd.library.template.view.FormData',
    alias: 'widget.workgroupemployeeformdata',
    requires: [
        'Hrd.view.workgroupemployee.Griddetail',
        'Hrd.view.workgroupemployee.Griddetailshift',
    ],
    frame: true,
    autoScroll: true,
    anchorSize: 100,
    height: 550,
    bodyBorder: true,
    bodyPadding: 10,
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
                    xtype: 'hiddenfield',
                    name: 'hideparam',
                    value: 'default'
                },
                {
                    xtype: 'hiddenfield',
                    name: 'workgroup_id',
                },
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
                            xtype: 'textfield',
                            fieldLabel: 'Code',
                            itemId: 'fd_code',
                            id: 'code',
                            name: 'code',
                            emptyText: 'Code',
                            width: 300,
                            allowBlank: false,
                            enforceMaxLength: true,
                            enableKeyEvents: true,
                            rowdata: null
                        },
                        {
                            xtype: 'textareafield',
                            itemId: 'fdms_description',
                            name: 'description',
                            fieldLabel: 'Description',
                            allowBlank: true,
                            enforceMaxLength: true,
                            grow: true,
                            width: 300,
                        },
                    ]
                },
                {
                    xtype: 'tbspacer',
                    height: 4
                },
                {
                    xtype: 'workgroupemployeedetailshiftgrid',
                    itemId: 'fd_workgroupemployeedetailshiftgrid',
                    title: 'Data Shift Type',
                    name: 'workgroupemployeedetailshiftgrid',
                    width: '98%',
                    height: 200,
                    padding: '20px 0 0 20px',
                },
                {
                    xtype: 'tbspacer',
                    height: 4
                },
                {
                    xtype: 'workgroupemployeedetailgrid',
                    itemId: 'fd_workgroupemployeedetailgrid',
                    title: 'Data Employee',
                    name: 'workgroupemployeedetailgrid',
                    title: 'Employee Data',
                    width: '98%',
                    height: 200,
                    padding: '20px 0 0 20px',
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
                padding: '0 0 0 250',
                layout: {
                    padding: 6,
                    type: 'hbox',
                },
                items: [
                    {
                        xtype: 'button',
                        action: 'save',
                        itemId: 'btnSave',
                        padding: 5,
                        width: 75,
                        iconCls: 'icon-save',
                        text: 'Save'
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
            }
        ];
        return x;
    }
});


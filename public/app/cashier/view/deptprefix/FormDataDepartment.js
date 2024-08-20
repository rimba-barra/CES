Ext.define('Cashier.view.deptprefix.FormDataDepartment', {
    extend: 'Cashier.library.template.view.FormData',
    alias: 'widget.deptprefixformdatadepartment',   
    frame: true,
    autoScroll: true,
    anchorSize: 100,
    height: 400,
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
                    xtype: 'deptprefixdepartmentgrid',
                    itemId: 'fd_deptprefixdepartmentgrid',
                    name: 'deptprefixdepartmentgrid',
                    title: 'Department Data',
                    width: '98%',
                    height: 300,
                    padding: '20px 0 0 20px',
                    disabled:true,
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
                padding: '0 0 0 180',
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


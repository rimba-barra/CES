/*
 * @name GridFlash [ Automate add  events ]
 * 
 * 
 */
Ext.define('Erems.library.template.view.GridFlash', {
    extend: 'Erems.library.template.view.GridDS2',
    alias: 'widget.templateviewgridflash',
    formFile:'formFile',
    generateDockedItems: function() {
        var me = this;

        var dockedItems = [
            {
                xtype: 'toolbar',
                dock: 'top',
                height: 28,
                items: [
                    {
                        xtype: 'button',
                        action: 'create',
                      
                        itemId: 'btnNew',
                        margin: '0 5 0 0',
                        iconCls: 'icon-new',
                        text: me.newButtonLabel
                    },
                    {
                        xtype: 'button',
                        action: 'update',
                        itemId: 'btnEdit',
                        margin: '0 5 0 0',
                        iconCls: 'icon-edit',
                        text: 'Edit',
                    },
                    {
                        xtype: 'button',
                        action: 'destroy',
                        itemId: 'btnDelete',
                        iconCls: 'icon-delete',
                        text: 'Delete Selected'
                    },
                ]
            },
        ];
        return dockedItems;
    },
});
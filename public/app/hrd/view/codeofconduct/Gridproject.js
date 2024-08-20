Ext.define('Hrd.view.codeofconduct.Gridemployee', {
    extend: 'Hrd.library.box.view.Grid',
    alias: 'widget.codeofconductgridproject',
    storeConfig: {
        id: 'codeofconductgridproject',
        idProperty: 'name',
        extraParams: {
            mode_read: 'getproject'
        }
    },
    bindPrefixName: 'Codeofconduct',
    newButtonLabel: 'Add',
    initComponent: function () {
        var me = this;
        Ext.applyIf(me, {
            contextMenu: me.generateContextMenu(),
            dockedItems: me.generateDockedItems(),
            defaults: {
                xtype: 'gridcolumn'
            },
            viewConfig: {},
            selModel: Ext.create('Ext.selection.CheckboxModel', {}),
            columns: [
                {
                    dataIndex: 'name',
                    text: 'Project',
                    width: 250,
                    name: 'name',
                    sortable: true
                },               
                {
                    dataIndex: 'file_name',
                    text: 'File Name',
                    width: 250,
                    name: 'file_name',
                    align: 'left',
                    sortable: true
                },
                
            ]
        });

        me.callParent(arguments);
    },
    generateDockedItems: function () {
        var me = this;
        var dockedItems = [{
                xtype: 'pagingtoolbar',
                dock: 'bottom',
                width: 360,
                displayInfo: true,
                store: this.getStore()
            }];

        return dockedItems;
    },
    generateActionColumn: function () {
        var me = this;
        var ac = {
            xtype: 'actioncolumn',
            width: 60,
            hidden: false,
            resizable: false,
            align: 'center',
            items: [
            ]
        };

        return ac;
    }
});
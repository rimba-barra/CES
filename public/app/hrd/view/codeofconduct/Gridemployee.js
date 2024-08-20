Ext.define('Hrd.view.codeofconduct.Gridemployee', {
    extend: 'Hrd.library.box.view.Grid',
    alias: 'widget.codeofconductgridemployee',
    storeConfig: {
        id: 'codeofconductgridemployee',
        idProperty: 'employee_codeofconduct_id',
        extraParams: {
            mode_read: 'getemployee'
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
                    dataIndex: 'employee_name',
                    text: 'Employee Name',
                    width: 250,
                    name: 'employee_name',
                    sortable: true,
                    renderer : function(value, metaData, record, rowIndex, colIndex, store) {
                            if (record.get('email_ciputra') == '' && record.get('email') == ''){
                                metaData.tdAttr = 'style="background-color: #e53b0b;"';	                                
                            }
                            return value;
                    }
                },               
                {
                    dataIndex: 'tgl_menyetujui',
                    text: 'Acceptance Date',
                    width: 120,
                    name: 'tgl_menyetujui',
                    align: 'left',
                    sortable: true,
                    renderer : function(value, metaData, record, rowIndex, colIndex, store) {
                            if (record.get('email_ciputra') == '' && record.get('email') == ''){
                                metaData.tdAttr = 'style="background-color: #e53b0b;"';	                                
                            }
                            return value;
                    }
                },
                {
                    dataIndex: 'email_ciputra',
                    text: 'Email Ciputra',
                    width: 200,
                    name: 'email_ciputra',
                    align: 'center',
                    sortable: true,
                    renderer : function(value, metaData, record, rowIndex, colIndex, store) {
                            if (record.get('email_ciputra') == '' && record.get('email') == ''){
                                metaData.tdAttr = 'style="background-color: #e53b0b;"';	                                
                            }
                            return value;
                    }
                },   
                {
                    dataIndex: 'email',
                    text: 'Email',
                    width: 200,
                    name: 'email',
                    align: 'center',
                    sortable: true,
                    renderer : function(value, metaData, record, rowIndex, colIndex, store) {
                            if (record.get('email_ciputra') == '' && record.get('email') == ''){
                                metaData.tdAttr = 'style="background-color: #e53b0b;"';	                                
                            }
                            return value;
                    }
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
                /*
                {
                    defaultIcon: 'icon-edit',
                    iconCls: ' ux-actioncolumn icon-edit act-update',
                    action: 'update',
                    altText: 'Edit',
                    tooltip: 'Edit'
                }
                */
            ]
        };

        return ac;
    }
});
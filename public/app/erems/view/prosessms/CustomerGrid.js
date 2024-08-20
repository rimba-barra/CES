Ext.define('Erems.view.prosessms.CustomerGrid', {
    extend: 'Erems.library.template.view.GridDS2Browse',
    alias: 'widget.prosessmscustomergrid',
    
    storeConfig: {
        id: 'PLProsessmsGridStore',
        idProperty: 'customer_id',
        extraParams: {
            mode_read:'customerlist'
        }
    },
    simpleSelect: true,
    height: 300,
    bindPrefixName: 'Prosessms',
    newButtonLabel: 'New',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            contextMenu: me.generateContextMenu(),
            dockedItems: me.generateDockedItems(),
           
            viewConfig: {
            },
            selModel: { 
              selType: 'checkboxmodel',
              mode: 'SINGLE',
              allowDeselect: true               
            },
            defaults: {
                xtype: 'gridcolumn',
                width: 11
            },
            columns: [
                {
                    xtype: 'rownumberer'
                },
                {
                    dataIndex: 'name',
                    text: 'Name'
                },
                {
                    dataIndex: 'home_phone',
                    text: 'Home Phone'
                },
                {
                    dataIndex: 'office_phone',
                    text: 'Office Phone'
                },
                {
                    dataIndex: 'mobile_phone',
                    text: 'Mobile Phone'
                },


                me.generateActionColumn()
            ]
        });

        me.callParent(arguments);
    },
    generateDockedItems: function() {
        var me = this;

        var dockedItems = [
            {
                xtype: 'pagingtoolbar',
                dock: 'bottom',
                width: 360,
                displayInfo: true,
                store: this.getStore()
            },
            {
                xtype: 'toolbar',
                dock: 'top',
                height: 28,
                items: [
                    {
                        xtype: 'button',
                        action: 'select',
                        disabled: true,
                        margin: '0 5 0 0',
                        text: "Select Customer"
                    }
                ]
            }
        ];
        return dockedItems;
    },
    getFormSearch: function() {
        var x = [
            {
                xtype: 'textfield',
                name: 'name',
                fieldLabel: 'Name',
                enforceMaxLength: true,
                maskRe: /[^\`"\']/,
            },
            {
                xtype: 'textfield',
                name: 'address',
                fieldLabel: 'Address',
                enforceMaxLength: true,
                maskRe: /[^\`"\']/,
            },
            {
                xtype: 'textfield',
                name: 'mobile_phone',
                fieldLabel: 'Mobile Phone',
                enforceMaxLength: true,
                maskRe: /[^\`"\']/,
            },
            {
                xtype: 'textfield',
                name: 'home_phone',
                fieldLabel: 'Home Phone',
                enforceMaxLength: true,
                maskRe: /[^\`"\']/,
            }
        ];
        return x;
    }
});
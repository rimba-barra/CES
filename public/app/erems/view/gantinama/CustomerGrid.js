Ext.define('Erems.view.gantinama.CustomerGrid', {
    extend: 'Erems.library.template.view.GridDS2Browse',
    alias: 'widget.gantinamacustomergrid',
    
    storeConfig: {
        id: 'CNCustomerGridStore',
        idProperty: 'customer_id',
        extraParams: {
            mode_read:'customerlist'
        }
    },
    simpleSelect: true,
    height: 300,
    bindPrefixName: 'Gantinama',
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
                allowDeselect: true,
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
                    width:300,
                    text: 'Name'
                },
                {
                    dataIndex: 'address',
                    width:200,
                    text: 'Address'
                },
                {
                    dataIndex: 'city_city_name',
                    text: 'City'
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
                xtype      : 'xphonenumberfieldEST',
                name       : 'mobile_phone',
                fieldLabel : 'Mobile Phone',
            },
            {
                xtype      : 'xphonenumberfieldEST',
                name       : 'home_phone',
                fieldLabel : 'Home Phone',
            }
        ];
        return x;
    }
});
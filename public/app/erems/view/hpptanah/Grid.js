Ext.define('Erems.view.hpptanah.Grid', {
    extend: 'Erems.library.template.view.GridDS2',
    alias: 'widget.hpptanahgrid',
    storeConfig: {
        id: 'HpptanahGridStore',
        idProperty: 'payment_id',
        extraParams: {}
    },
    bindPrefixName: 'Hpptanah',
    newButtonLabel: 'New Hpp Tanah',
    plugins: [
        Ext.create('Ext.grid.plugin.CellEditing', {
            clicksToEdit: 1
        })
    ],
    initComponent: function () {
        var me = this;



        Ext.applyIf(me, {
            contextMenu: me.generateContextMenu(),
            dockedItems: me.generateDockedItems(),
            viewConfig: {

            },
            selModel: Ext.create('Ext.selection.CheckboxModel', {

            }),

            columns: [
                {
                    xtype: 'rownumberer',
                    width: 30
                },
                {
                    xtype: 'gridcolumn',
                    width: 100,
                    align: 'center',
                    dataIndex: 'cluster_cluster',
                    text: 'Kawasan'
                }, {
                    xtype: 'gridcolumn',
                    width: 70,
                    dataIndex: 'unit_unit_number',
                    hideable: false,
                    text: 'Unit Number'
                }, {
                    xtype: 'gridcolumn',
                    width: 40,
                    dataIndex: 'unit_land_size',
                    hideable: false,
                    text: 'LT'
                }, {
                    xtype: 'gridcolumn',
                    width: 40,
                    dataIndex: 'unit_building_size',
                    hideable: false,
                    text: 'LB'
                }, {
                    xtype: 'gridcolumn',
                    width: 70,
                    dataIndex: 'pricetype_pricetype',
                    hideable: false,
                    text: 'Cara Bayar'
                }, {
                    xtype: 'datecolumn',
                    format: 'd-m-Y',
                    width: 70,
                    dataIndex: 'purchase_date',
                    hideable: false,
                    text: 'Tgl. SP'
                }, {
                    xtype: 'numbercolumn',
                    width: 120,
                    dataIndex: 'price_tanahpermeter',
                    hideable: false,
                    text: 'Tanah/M2',

                }, {
                    xtype: 'numbercolumn',
                    width: 120,
                    dataIndex: 'hpptanahtanah_mentah',
                    renderer: function (value) {
                        if(value==0){
                            return "";
                        }else{
                            return accounting.formatMoney(value);
                        }

                    },
                    hideable: false,
                    text: 'Tanah Mentah',
                    align: 'right',
                    editor: {
                        xtype: 'textfield',
                        maskRe: /[0-9\.]/,
                        fieldStyle: 'text-align:right'
                    }
                }, {
                    xtype: 'numbercolumn',
                    width: 120,
                    dataIndex: 'hpptanah_devcost',
                    hideable: false,
                    text: 'Devcost',
                    renderer: function (value) {
                        if(value==0){
                            return "";
                        }else{
                            return accounting.formatMoney(value);
                        }

                    },
                    align: 'right',
                    editor: {
                        xtype: 'textfield',
                        maskRe: /[0-9\.]/,
                        fieldStyle: 'text-align:right'
                    }
                }, {
                    xtype: 'numbercolumn',
                    width: 120,
                    dataIndex: 'hpptanah_skalakota',
                    hideable: false,
                    align: 'right',
                    text: 'Skala Kota',
                    renderer: function (value) {
                        if(value==0){
                            return "";
                        }else{
                            return accounting.formatMoney(value);
                        }

                    },
                    editor: {
                        xtype: 'textfield',
                        maskRe: /[0-9\.]/,
                        fieldStyle: 'text-align:right'
                    }
                }, {
                    xtype: 'numbercolumn',
                    width: 120,
                    dataIndex: 'hpptanah_skalaeco',
                    hideable: false,
                    align: 'right',
                    text: 'Skala Eco',
                    renderer: function (value) {
                        if(value==0){
                            return "";
                        }else{
                            return accounting.formatMoney(value);
                        }

                    },
                    editor: {
                        xtype: 'textfield',
                        maskRe: /[0-9\.]/,
                        fieldStyle: 'text-align:right'
                    }
                }, {
                    xtype: 'numbercolumn',
                    width: 120,
                    dataIndex: 'hpptanah_bunga',
                    hideable: false,
                    text: 'Bunga',
                    align: 'right',
                    renderer: function (value) {
                        if(value==0){
                            return "";
                        }else{
                            return accounting.formatMoney(value);
                        }

                    },
                    editor: {
                        xtype: 'textfield',
                        maskRe: /[0-9\.]/,
                        fieldStyle: 'text-align:right'
                    }
                }, {
                    xtype: 'numbercolumn',
                    width: 120,
                    dataIndex: 'hpptanah_bangunanpermeter',
                    hideable: false,
                    text: 'Bangunan/M2',
                    renderer: function (value) {
                        if(value==0){
                            return "";
                        }else{
                            return accounting.formatMoney(value);
                        }

                    },
                    align: 'right',
                    editor: {
                        xtype: 'textfield',
                        maskRe: /[0-9\.]/,
                        fieldStyle: 'text-align:right'
                    }
                },
                        //  me.generateActionColumn()
            ]
        });

        me.callParent(arguments);
    },
    generateDockedItems: function () {
        var me = this;

        var dockedItems = [
            {
                xtype: 'toolbar',
                dock: 'top',
                height: 28,
                items: []
            },
            {
                xtype: 'pagingtoolbar',
                dock: 'bottom',
                width: 360,
                displayInfo: true,
                store: this.getStore()
            },
        ];
        return dockedItems;
    },
    generateActionColumn: function () {
        var me = this;
        var ac = {
            xtype: 'actioncolumn',
            hidden: true,
            itemId: 'actioncolumn',
            width: 50,
            resizable: false,
            align: 'right',
            hideable: false,
            items: []
        };
        return ac;
    },
});

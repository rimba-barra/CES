Ext.define('Erems.view.townplanninglegal.Grid',{

    alias:'widget.townplanninglegalgrid',
    
    bindPrefixName:'Townplanninglegal',
   // itemId:'',
    newButtonLabel:'New Town Planning',
    extend:'Erems.library.template.view.GridDS2',
    
    storeConfig:{
        id:'TownPlanningGridStore',
        idProperty:'unit_id',
        extraParams:{}
    },
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            contextMenu: me.generateContextMenu(),
            dockedItems: me.generateDockedItems(),
            viewConfig: {

            },
            selModel: Ext.create('Ext.selection.CheckboxModel', {

            }),
            defaults:{
                align: 'center',
                xtype:'gridcolumn'
            },
            plugins: [
            Ext.create('Ext.grid.plugin.CellEditing', {
                ptype: 'cellediting',
                clicksToEdit: 1
            })
            ],
            columns: [
            {
                xtype: 'rownumberer'
            },
            {
                dataIndex: 'unit_id',
                text: 'ID',
                width:50
            },
            {
                xtype: 'booleancolumn',
                header: 'Legal',
                dataIndex: 'is_readylegal',
                hidden: true,
                width: 50,
                renderer: me.inlineEditLegal
            },
            {
                xtype: 'booleancolumn',
                header: 'Siap Stock',
                dataIndex: 'is_readystock',
                hidden: true,
                width: 60,
                renderer: me.inlineEditStock
            },
            {
                dataIndex: 'unit_number',
                text: 'Kav. Number',
                width:65
            },
            {
                dataIndex: 'cluster_cluster',
                text: 'Cluster'
            },{
                dataIndex: 'block_block',
                text: 'Block Name'
            },{
                dataIndex: 'pt_name',
                text: 'PT. Name'
            },
            // added by rico 08032023
            {
                dataIndex: 'tanahcode_name',
                text: 'PT. Tanah 1'
            },
            {
                dataIndex: 'tanahcode2_name',
                text: 'PT. Tanah 2'
            },
            {
                dataIndex: 'type_name',
                text: 'Type'
            },{
                dataIndex: 'productcategory_productcategory',
                text: 'Category'
            },{
                dataIndex: 'land_size',
                text: 'Land Size',
                width:40
            },{
                dataIndex: 'building_size',
                text: 'Building Size',
                width:40
            },{
                dataIndex: 'kelebihan',
                text: 'Kelebihan',
                width:40
            },{
                dataIndex: 'floor',
                text: 'Floor',
                width:40
            },{
                dataIndex: 'floor_size',
                text: 'Floor size',
                width:40
            },{
                dataIndex: 'bedroom',
                text: 'Bedroom',
                width:40
            },{
                dataIndex: 'bathroom',
                text: 'Bathroom',
                width:40
            },{
                dataIndex: 'electricity',
                text: 'Electricity',
                width:40
            },{
                dataIndex: 'unitstatus_status',
                text: 'Status'
            },{  dataIndex: 'progress',
            text: 'Progress ( % )'
        },
        /* start added by ahmad riadi 10-01-2017 */
        {
            dataIndex: 'useradd',
            text: 'Added By'
        },
        {
            dataIndex: 'Addon',
            text: 'Added Date'
        },
        {
            dataIndex: 'useredit',
            text: 'Edited By'
        },
        {
            dataIndex: 'Modion',
            text: 'Edited Date'
        },
        /* end added by ahmad riadi 10-01-2017 */

        me.generateActionColumn()
        ]
    });

        me.callParent(arguments);
    },
    inlineEditStock: function (val, meta, record, rowIndex, colIndex, store) {
        name = 'is_readystock';
        return this.comboBoxFieldGen(name, record, false);  
    },
    inlineEditSell: function (val, meta, record, rowIndex, colIndex, store) {
        name = 'is_readysell';
        return this.comboBoxFieldGen(name, record, false);
    },
    inlineEditLegal: function (val, meta, record, rowIndex, colIndex, store) {
        name = 'is_readylegal';
        return this.comboBoxFieldGen(name, record, true);  
    },
    comboBoxFieldGen: function(name, record, enable){
        if (record.get(name)) {
            if(enable){
                var a = '<input type="checkbox" name="'+name+'" data=' + record.get("unit_id") + ' checked />';
            }else{
                var a = '&#10003;';
            }
        } else {
            if(enable){
                var a = '<input type="checkbox" name="'+name+'" data=' + record.get("unit_id") + ' />';
            }else{
                var a = '';
            }
        }
        return a;  
    },
    generateDockedItems: function() {
        var me = this;

        var dockedItems = [
            {
                xtype  : 'toolbar',
                dock   : 'top',
                height : 28,
                items  : [
                    {
                        xtype      : 'button',
                        action     : 'updatePT',
                        itemId     : 'btnUpdatePT',
                        margin     : '0 5 0 0',
                        iconCls    : 'icon-edit',
                        text       : 'Update PT dan Tanah',
                        disabled   : true
                    },
                ]
            },
            {
                xtype: 'pagingtoolbar',
                dock: 'bottom',
                width: 360,
                displayInfo: true,
                store: this.getStore()
            }
        ];
        return dockedItems;
    },
});



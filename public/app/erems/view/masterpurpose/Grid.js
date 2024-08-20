Ext.define('Erems.view.masterpurpose.Grid',{
     extend: 'Erems.library.template.view.GridDS2',
    storeConfig: {
        id: 'MasterPurposeGridStore',
        idProperty: 'purpose_id',
        extraParams: {}
    },
    alias:'widget.masterpurposegrid',
   // itemId:'',
    bindPrefixName:'Masterpurpose',
    newButtonLabel:'New Purpose',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            contextMenu: me.generateContextMenu(),
            dockedItems: me.generateDockedItems(),
            viewConfig: {

            },
            selModel    : Ext.create('Ext.selection.CheckboxModel', {}),
            plugins     : [
                Ext.create('Ext.grid.plugin.CellEditing', {
                    ptype        : 'cellediting',
                    clicksToEdit : 1
                })
            ],
            columns: [
                {
                    xtype: 'rownumberer'
                }
               /* {
                    xtype: 'gridcolumn',
                    itemId: 'colms_id',
                    width: 60,
                    align: 'right',
                    dataIndex: 'purpose_id',
                    text: 'ID'
                }*/,
                {
                    xtype     : 'booleancolumn',
                    header    : 'Target Sales',
                    dataIndex : 'use_target_sales',
                    itemId    : 'use_target_sales',
                    // hidden    : true,
                    width     : 80,
                    renderer  : me.inlineEditTargetSales
                },
				{
                    xtype: 'gridcolumn',
                    itemId: 'colms_code',
                    width: 100,
                    dataIndex: 'code',
                    hideable: false,
                    text: 'Code'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_side',
                    width: 200,
                    dataIndex: 'purpose',
                    hideable: false,
                    text: 'Purpose'
                },{
                    xtype: 'gridcolumn',
                    itemId: 'colms_createdby',
                    width: 110,
                    dataIndex: 'user_name',
                    hideable: false,
                    text: 'Created By'
                },{
                    xtype: 'gridcolumn',
                    itemId: 'colms_createddate',
                    width: 110,
                    dataIndex: 'Addon',
                    hideable: false,
                    text: 'Created Date'
                },{
                    xtype: 'gridcolumn',
                    itemId: 'colms_modiby',
                    width: 110,
                    dataIndex: 'modi_user_name',
                    hideable: false,
                    text: 'Last Edit By'
                },{
                    xtype: 'gridcolumn',
                    itemId: 'colms_modion',
                    width: 110,
                    dataIndex: 'Modion',
                    hideable: false,
                    text: 'Last Edit Date'
                },
                
                me.generateActionColumn()
            ]
        });

        me.callParent(arguments);
    },
    inlineEditTargetSales: function (val, meta, record, rowIndex, colIndex, store) {
        name = 'use_target_sales';
        return this.comboBoxFieldGen(name, record, true);  
    },
    comboBoxFieldGen: function(name, record, enable){
        if (record.get(name)) {
            if(enable){
                var a = '<input type="checkbox" name="'+name+'" data=' + record.get("purpose_id") + ' checked />';
            }
            else{
                var a = '&#10003;';
            }
        } 
        else {
            if(enable){
                var a = '<input type="checkbox" name="'+name+'" data=' + record.get("purpose_id") + ' />';
            }
            else{
                var a = '';
            }
        }
        return a;  
    }
});


